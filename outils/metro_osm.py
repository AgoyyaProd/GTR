#!/usr/bin/env python3
"""Reconstruit metro.json depuis l'extrait OSM, sans toucher aux stations ni aux lignes."""
import json
import math
import os
import unicodedata
import xml.etree.ElementTree as ET
from collections import defaultdict, Counter

LAT0 = (48.1055 + 48.1192) / 2
LON0 = (-1.6905 - 1.6625) / 2
KX = math.cos(math.radians(LAT0)) * 111320
KY = 110540
ROAD_HW = {"motorway":13.0,"trunk":11.0,"primary":9.0,"secondary":8.0,"tertiary":7.0,
           "unclassified":6.0,"residential":5.5,"living_street":5.0,"service":4.0,"road":6.0}
TRUTHY = {"yes","true","1","designated","permissive"}


def project(lon, lat):
    return ((float(lon)-LON0)*KX, (float(lat)-LAT0)*KY)


def truth(value):
    return str(value or "").strip().lower() in TRUTHY


def norm(value):
    value = unicodedata.normalize("NFKD", str(value or "").casefold())
    return "".join(c for c in value if not unicodedata.combining(c) and c.isalnum())


def parse_width(value, fallback):
    try:
        s = str(value).strip().lower().replace(",", ".")
        number = float("".join(c for c in s if c.isdigit() or c in ".-"))
        return max(1.0, min(8.0, number))
    except (TypeError, ValueError):
        return fallback


def polyline_length(points):
    return sum(math.hypot(b[0]-a[0], b[1]-a[1]) for a,b in zip(points,points[1:]))


def bounds(points):
    return (min(p[0] for p in points), min(p[1] for p in points),
            max(p[0] for p in points), max(p[1] for p in points))


def boxes_overlap(a, b, margin=0.0):
    return not (a[2]+margin < b[0] or a[0]-margin > b[2] or
                a[3]+margin < b[1] or a[1]-margin > b[3])


def point_segment_distance(p, a, b):
    dx,dy=b[0]-a[0],b[1]-a[1]
    ll=dx*dx+dy*dy
    t=0.0 if ll==0 else max(0.0,min(1.0,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/ll))
    q=(a[0]+t*dx,a[1]+t*dy)
    return math.hypot(p[0]-q[0],p[1]-q[1]),q


def point_in_polygon(x, y, points):
    inside=False
    if len(points)<3: return False
    j=len(points)-1
    for i,(xi,yi) in enumerate(points):
        xj,yj=points[j]
        if (yi>y)!=(yj>y) and x < (xj-xi)*(y-yi)/((yj-yi) or 1e-12)+xi:
            inside=not inside
        j=i
    return inside


def station_for(tags,x,y,stations):
    names={norm(s.get("name")):s for s in stations}
    for key in ("station","name","ref","uic_ref"):
        candidate=norm(tags.get(key))
        if candidate in names: return names[candidate]
    return min(stations,key=lambda s:math.hypot(x-float(s["x"]),y-float(s["y"])))


def line_for(tags,station):
    for key in ("subway:line","line","route","ref"):
        value=norm(tags.get(key))
        if value in ("a","lignea","linea"): return "a"
        if value in ("b","ligneb","lineb"): return "b"
    lines=str(station.get("lines","a")).lower()
    return "a" if "a" in lines else "b"


def orient_stairway(entrance_id,way,nodes):
    """Angle du sens de descente, depuis l'axe X du jeu."""
    refs=way.get("refs",[])
    if len(refs)<2 or entrance_id not in (refs[0],refs[-1]): return None
    points=[nodes.get(r) for r in refs]
    if any(p is None for p in points): return None
    length=polyline_length(points)
    if length<1.5: return None
    dx,dy=points[-1][0]-points[0][0],points[-1][1]-points[0][1]
    ll=math.hypot(dx,dy)
    if ll<0.5: return None
    ux,uy=dx/ll,dy/ll
    incline=str(way.get("tags",{}).get("incline","")).strip().lower()
    if incline=="down": sign=1.0
    elif incline=="up": sign=-1.0
    else: sign=1.0 if entrance_id==refs[0] else -1.0
    return math.atan2(uy*sign,ux*sign),length


def connected_stairway(entrance_id,candidates,nodes):
    best=None
    best_score=-1
    for way in candidates:
        result=orient_stairway(entrance_id,way,nodes)
        if not result: continue
        tags=way.get("tags",{})
        score=100 if tags.get("highway")=="steps" else 50 if tags.get("highway")=="footway" else 20
        if tags.get("conveying") in ("yes","forward","backward","reversible"): score+=30
        if tags.get("incline") in ("up","down"): score+=10
        if result[1]>20: score-=20
        if score>best_score: best,best_score=(way,result),score
    return best


def near_polygon(x,y,polygon,tolerance=0.35):
    if point_in_polygon(x,y,polygon): return True
    return any(point_segment_distance((x,y),a,b)[0] <= tolerance
               for a,b in zip(polygon,polygon[1:]+polygon[:1]))


def facade_anchor(x,y,polygon):
    best=None
    for a,b in zip(polygon,polygon[1:]+polygon[:1]):
        d,q=point_segment_distance((x,y),a,b)
        if best is None or d<best[0]: best=(d,q,a,b)
    if best is None: return None
    _,q,a,b=best
    angle=math.atan2(b[1]-a[1],b[0]-a[0])
    mx=sum(p[0] for p in polygon)/len(polygon)
    my=sum(p[1] for p in polygon)/len(polygon)
    nx,ny=-math.sin(angle),math.cos(angle)
    if (mx-q[0])*nx+(my-q[1])*ny>0: nx,ny=-nx,-ny
    # Dans le repère F du jeu, le côté extérieur correspond à +lz.
    if nx*math.sin(angle)-ny*math.cos(angle)<0: angle += math.pi
    return q[0]+nx*0.08,q[1]+ny*0.08,angle


def footprint_samples(x,y,angle,length,width,step=0.75,start_at_node=False):
    ca,sa=math.cos(angle),math.sin(angle)
    nx=max(2,int(math.ceil(length/step)))
    nz=max(2,int(math.ceil(width/step)))
    for i in range(nx+1):
        lx=length*i/nx if start_at_node else -length/2+length*i/nx
        for j in range(nz+1):
            lz=-width/2+width*j/nz
            yield x+ca*lx+sa*lz,y+sa*lx-ca*lz


def point_in_footprint(px,py,x,y,angle,length,width,start_at_node=False):
    dx,dy=px-x,py-y
    lx=dx*math.cos(angle)+dy*math.sin(angle)
    lz=dx*math.sin(angle)-dy*math.cos(angle)
    inside_x=(0<=lx<=length) if start_at_node else (abs(lx)<=length/2)
    return inside_x and abs(lz)<=width/2


def footprint_block_reason(x,y,angle,length,width,buildings,roads,crossings,start_at_node=False):
    samples=list(footprint_samples(x,y,angle,length,width,start_at_node=start_at_node))
    box=bounds(samples)
    for poly,pbox in buildings:
        if not boxes_overlap(box,pbox): continue
        if any(point_in_polygon(sx,sy,poly) for sx,sy in samples):
            return "building"
        if any(point_in_footprint(px,py,x,y,angle,length,width,start_at_node) for px,py in poly):
            return "building"
    for line,half_width,lbox in roads:
        if not boxes_overlap(box,lbox,half_width): continue
        for sx,sy in samples:
            for a,b in zip(line,line[1:]):
                if point_segment_distance((sx,sy),a,b)[0] < half_width:
                    return "carriageway"
    for px,py,radius in crossings:
        if box[0]-radius<=px<=box[2]+radius and box[1]-radius<=py<=box[3]+radius:
            if any(math.hypot(sx-px,sy-py)<radius for sx,sy in samples):
                return "crossing"
    return None



def _angle_delta(a,b):
    return abs((a-b+math.pi)%(2*math.pi)-math.pi)


def merge_nearby_stairs(entries, distance=10.0, angle_limit=math.radians(25)):
    """Fusionne les accès proches partageant une way ou un axe presque identique."""
    stairs=[e for e in entries if e.get("kind")=="stairs" and e.get("angle") is not None]
    parent={id(e):id(e) for e in stairs}
    def root(k):
        while parent[k]!=k:
            parent[k]=parent[parent[k]]
            k=parent[k]
        return k
    for i,a in enumerate(stairs):
        for b in stairs[i+1:]:
            if a.get("station")!=b.get("station"): continue
            if math.hypot(a["x"]-b["x"],a["y"]-b["y"])>distance: continue
            same_way=bool(a.get("source_way") and a.get("source_way")==b.get("source_way"))
            if not same_way and _angle_delta(float(a["angle"]),float(b["angle"]))>angle_limit: continue
            ra,rb=root(id(a)),root(id(b))
            if ra!=rb: parent[rb]=ra
    groups=defaultdict(list)
    for e in stairs: groups[root(id(e))].append(e)
    replacements={}
    for group in groups.values():
        if len(group)<2: continue
        base=float(group[0]["angle"])
        aligned=[]
        for e in group:
            a=float(e["angle"])
            if math.cos(a-base)<0: a += math.pi
            aligned.append(a)
        angle=math.atan2(sum(math.sin(a) for a in aligned),sum(math.cos(a) for a in aligned))
        x=sum(e["x"] for e in group)/len(group)
        y=sum(e["y"] for e in group)/len(group)
        ca,sa=math.cos(angle),math.sin(angle)
        half_width=max(e.get("width",2.0)/2 + abs((e["x"]-x)*sa-(e["y"]-y)*ca) for e in group)
        length=max(float(e.get("length",0))+abs((e["x"]-x)*ca+(e["y"]-y)*sa) for e in group)
        merged=dict(group[0])
        merged.update({"x":round(x,2),"y":round(y,2),"angle":round(angle,6),
                       "length":round(max(2.5,min(14.0,length)),2),
                       "width":round(max(1.0,min(8.0,half_width*2)),2),
                       "osm_ids":[e["osm_id"] for e in group],"merged_count":len(group)})
        merged["safe"]=all(e.get("safe",True) for e in group)
        blocked=next((e.get("blocked_reason") for e in group if e.get("blocked_reason")),None)
        if blocked: merged["blocked_reason"]=blocked
        replacements[id(group[0])]=merged
        for e in group[1:]: replacements[id(e)]=None
    return [replacements.get(id(e),e) for e in entries if replacements.get(id(e),e) is not None]


def _trench_corners(e):
    angle=float(e["angle"])
    length=float(e.get("length",0))+(2.0 if e.get("line")=="b" else 0.8)
    width=float(e.get("width",2.0))+0.6
    ca,sa=math.cos(angle),math.sin(angle)
    return [(e["x"]+ca*along+sa*side*width/2,
             e["y"]+sa*along-ca*side*width/2)
            for along,side in ((0,-1),(length,-1),(length,1),(0,1))]


def trench_rectangles_intersect(a,b):
    """Test SAT exact entre deux rectangles orientés de trémie."""
    pa,pb=_trench_corners(a),_trench_corners(b)
    for poly in (pa,pb):
        for i in range(2):
            p1,p2=poly[i],poly[i+1]
            axis=(-(p2[1]-p1[1]),p2[0]-p1[0])
            ll=math.hypot(*axis) or 1.0
            axis=(axis[0]/ll,axis[1]/ll)
            aa=[p[0]*axis[0]+p[1]*axis[1] for p in pa]
            bb=[p[0]*axis[0]+p[1]*axis[1] for p in pb]
            if max(aa)<=min(bb)+1e-6 or max(bb)<=min(aa)+1e-6: return False
    return True


def reject_overlapping_trenches(entries):
    """Rejette toute emprise de trémie qui chevauche une emprise déjà retenue."""
    accepted=[]
    for e in entries:
        if (e.get("kind")!="stairs" or e.get("angle") is None or
                e.get("integrated") or not e.get("safe",True)):
            continue
        if any(trench_rectangles_intersect(a,e) for a in accepted):
            e["safe"]=False
            e["blocked_reason"]="overlap"
        else:
            accepted.append(e)
    return entries

def build_entrances(nodes,ways,metro):
    stations=metro.get("stations",[])
    if not stations: raise ValueError("metro.json ne contient aucune station")
    ways_by_endpoint=defaultdict(list)
    buildings,roads,crossing_nodes=[],[],[]
    for way in ways:
        refs,tags=way["refs"],way["tags"]
        if len(refs)<2: continue
        hw=tags.get("highway")
        if hw in ("steps","footway") or tags.get("conveying"):
            for endpoint in (refs[0],refs[-1]): ways_by_endpoint[endpoint].append(way)
        pts=[(nodes[r][0],nodes[r][1]) for r in refs if r in nodes]
        if len(pts)!=len(refs): continue
        if refs[0]==refs[-1] and tags.get("building") not in (None,"no","roof"):
            poly=pts[:-1] if pts[0]==pts[-1] else pts
            if len(poly)>=3: buildings.append((poly,bounds(poly)))
        if hw in ROAD_HW:
            width=parse_width(tags.get("width"),ROAD_HW[hw])
            if not tags.get("width") and tags.get("lanes"):
                try: width=max(width,min(16.0,float(tags["lanes"])*3.1))
                except ValueError: pass
            roads.append((pts,width/2+0.25,bounds(pts)))
        if hw=="footway" and tags.get("footway")=="crossing":
            for px,py in pts: crossing_nodes.append((px,py,2.4))
    for _,(x,y,tags) in nodes.items():
        if tags.get("highway")=="crossing": crossing_nodes.append((x,y,3.0))

    result=[]
    for node_id,(x,y,tags) in nodes.items():
        railway=tags.get("railway")=="subway_entrance"
        elevator=tags.get("highway")=="elevator"
        if not railway and not elevator: continue
        station=station_for(tags,x,y,stations)
        if elevator and math.hypot(x-float(station["x"]),y-float(station["y"]))>60: continue
        item={"osm_id":node_id,"x":round(x,2),"y":round(y,2),
              "station":station["name"],"st":station["name"],"line":line_for(tags,station),
              "wheelchair":tags.get("wheelchair"),
              "covered":truth(tags.get("covered")) or truth(tags.get("roof")),
              "indoor":truth(tags.get("indoor")),
              "kind":"elevator" if elevator else "stairs",
              "angle":None,"length":0.0,"width":2.2 if elevator else 2.0,
              "conveying":None,"handrail":None,"safe":True,"integrated":False}
        if elevator:
            item["angle"],item["length"]=0.0,2.2
        else:
            found=connected_stairway(node_id,ways_by_endpoint.get(node_id,[]),nodes)
            if found:
                way,(angle,length)=found
                wt=way["tags"]
                item.update({"angle":round(angle,6),"length":round(max(2.5,min(14.0,length)),2),
                             "width":round(parse_width(wt.get("width"),2.0),2),
                             "conveying":wt.get("conveying"),"handrail":wt.get("handrail"),
                             "incline":wt.get("incline"),"source_way":way["id"]})
        containing=next((poly for poly,pbox in buildings
                         if pbox[0]-0.35<=x<=pbox[2]+0.35 and pbox[1]-0.35<=y<=pbox[3]+0.35
                         and near_polygon(x,y,poly)),None)
        if containing:
            anchor=facade_anchor(x,y,containing)
            if anchor:
                item["integrated"]=True
                item["facade_x"],item["facade_y"],item["facade_angle"]=[round(v,3) for v in anchor]
        check_x=item.get("facade_x",x) if item["integrated"] else x
        check_y=item.get("facade_y",y) if item["integrated"] else y
        check_angle=item.get("facade_angle",item["angle"] or 0.0) if item["integrated"] else (item["angle"] or 0.0)
        check_len=1.8 if item["integrated"] else (2.2 if elevator else (item["length"]+(2.0 if item["line"]=="b" else 0.8) if item["length"] else 2.2))
        check_width=1.4 if item["integrated"] else (2.5 if elevator else item["width"]+0.6)
        start_at_node=(not item["integrated"] and not elevator and item["length"]>0)
        reason=footprint_block_reason(check_x,check_y,check_angle,check_len,check_width,
                                      [] if item["integrated"] else buildings,roads,crossing_nodes,start_at_node)
        if not reason:
            totem_lx=-1.25 if item["integrated"] else (-1.55 if elevator else -0.78)
            totem_w=0.9 if item["integrated"] else (1.0 if elevator else item["width"])
            totem_z=totem_w/2+0.62
            tx=check_x+math.cos(check_angle)*totem_lx+math.sin(check_angle)*totem_z
            ty=check_y+math.sin(check_angle)*totem_lx-math.cos(check_angle)*totem_z
            reason=footprint_block_reason(tx,ty,check_angle,0.7,0.7,
                                          [] if item["integrated"] else buildings,roads,crossing_nodes)
        if reason:
            item["safe"]=False
            item["blocked_reason"]=reason
        result.append(item)
    result=merge_nearby_stairs(result)
    result=reject_overlapping_trenches(result)
    result.sort(key=lambda e:(e["station"],e["kind"],e["osm_id"]))
    return result


def extract(osm_path,metro):
    nodes,ways={},[]
    for _,el in ET.iterparse(osm_path,events=("end",)):
        if el.tag=="node":
            tags={c.get("k"):c.get("v") for c in el if c.tag=="tag"}
            node_id=el.get("id")
            x,y=project(el.get("lon"),el.get("lat"))
            nodes[node_id]=(x,y,tags)
            el.clear()
        elif el.tag=="way":
            tags={c.get("k"):c.get("v") for c in el if c.tag=="tag"}
            refs=[c.get("ref") for c in el if c.tag=="nd"]
            if refs: ways.append({"id":el.get("id"),"refs":refs,"tags":tags})
            el.clear()
    return build_entrances(nodes,ways,metro)


def main():
    root=os.environ.get("GTR_ROOT",os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    osm_file=os.environ.get("GTR_OSM_FILE","/mnt/user-data/uploads/map")
    metro_file=os.environ.get("GTR_METRO_JSON",os.path.join(root,"metro.json"))
    if not os.path.isfile(osm_file): raise SystemExit("Extrait OSM introuvable : "+osm_file)
    with open(metro_file,encoding="utf-8") as f: metro=json.load(f)
    stations,viaducts,order=metro.get("stations"),metro.get("viaducts"),metro.get("order")
    entrances=extract(osm_file,metro)
    metro["entrances"]=entrances
    metro["stations"],metro["viaducts"],metro["order"]=stations,viaducts,order
    os.makedirs(os.path.dirname(metro_file) or ".",exist_ok=True)
    tmp=metro_file+".tmp"
    with open(tmp,"w",encoding="utf-8") as f:
        json.dump(metro,f,ensure_ascii=False,separators=(",",":"))
    os.replace(tmp,metro_file)
    print("Entrées métro OSM :",len(entrances))
    print("Par type :",dict(Counter(e["kind"] for e in entrances)))
    print("Par ligne :",dict(Counter(e["line"] for e in entrances)))
    print("Escaliers avec way orientée :",sum(e["kind"]=="stairs" and e["angle"] is not None for e in entrances))
    print("Ascenseurs :",sum(e["kind"]=="elevator" for e in entrances))
    print("Intégrées aux bâtiments :",sum(e["integrated"] for e in entrances))
    print("Bloquées chaussée/passage/bâtiment :",dict(Counter(e.get("blocked_reason") for e in entrances if not e["safe"])))
    print("Stations, viaducs et ordre conservés.")


if __name__=="__main__": main()
