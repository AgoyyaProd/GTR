import xml.etree.ElementTree as ET, math, pickle, collections
LAT0=(48.1055+48.1192)/2; LON0=(-1.6905-1.6625)/2; KX=math.cos(math.radians(LAT0))*111320; KY=110540
nodes={}; ntag={}; steps=[]; bollards=[]; barriers=[]; widths=[]; kerbs=[]; sidewalks=[]
cnt=collections.Counter()
for ev,el in ET.iterparse('/mnt/user-data/uploads/map',events=('end',)):
    if el.tag=='node':
        x=(float(el.get('lon'))-LON0)*KX; y=(float(el.get('lat'))-LAT0)*KY; nodes[el.get('id')]=(x,y)
        t={c.get('k'):c.get('v') for c in el if c.tag=='tag'}
        if t.get('barrier') in ('bollard','block'): bollards.append((round(x,2),round(y,2)))
        if t.get('barrier') in ('kerb',) or t.get('kerb'): kerbs.append((x,y,t.get('kerb')))
        el.clear()
    elif el.tag=='way':
        t={c.get('k'):c.get('v') for c in el if c.tag=='tag'}
        pts=[nodes[c.get('ref')] for c in el if c.tag=='nd' and c.get('ref') in nodes]
        hw=t.get('highway')
        if len(pts)>=2:
            if hw=='steps': steps.append({'pts':pts,'n':t.get('step_count'),'inc':t.get('incline'),'w':t.get('width'),'hand':t.get('handrail'),'conv':t.get('conveying')}); cnt['steps']+=1
            if t.get('barrier') in ('fence','railing','wall','retaining_wall','guard_rail','handrail','bollard','hedge','city_wall'): barriers.append({'k':t.get('barrier'),'pts':pts,'h':t.get('height'),'mat':t.get('material') or t.get('fence_type')}); cnt['b_'+t.get('barrier')]+=1
            if hw and (t.get('width') or t.get('est_width')): cnt['width']+=1
            if hw and any(k.startswith('sidewalk') for k in t): cnt['sidewalk']+=1
            if hw=='footway' and t.get('footway')=='sidewalk': sidewalks.append({'pts':pts,'w':t.get('width'),'surf':t.get('surface')}); cnt['sw_ways']+=1
            if hw: cnt['surface_'+(t.get('surface') or '-')]+=1
        el.clear()
    elif el.tag=='relation': el.clear()
print(len(bollards),'bollards',len(kerbs),'kerb nodes'); print(cnt.most_common(40))
pickle.dump({'steps':steps,'bollards':bollards,'barriers':barriers,'sidewalks':sidewalks},open('/home/claude/tools/street_osm.pkl','wb'))
