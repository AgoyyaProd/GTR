import xml.etree.ElementTree as ET, math, json, heapq
LAT0=(48.1055+48.1192)/2; LON0=(-1.6905-1.6625)/2; KX=math.cos(math.radians(LAT0))*111320; KY=110540
nodes={}; ways={}; rels=[]; names={}
for ev,el in ET.iterparse('/mnt/user-data/uploads/map',events=('end',)):
    if el.tag=='node':
        nodes[el.get('id')]=((float(el.get('lon'))-LON0)*KX,(float(el.get('lat'))-LAT0)*KY)
        for c in el:
            if c.tag=='tag' and c.get('k')=='name': names[el.get('id')]=c.get('v')
        el.clear()
    elif el.tag=='way': ways[el.get('id')]=[c.get('ref') for c in el if c.tag=='nd']; el.clear()
    elif el.tag=='relation':
        t={c.get('k'):c.get('v') for c in el if c.tag=='tag'}
        r=(t.get('ref') or '').upper()
        if t.get('route')=='bus' and r in ('C1','C2','C3','C4','C5','C6','C7'):
            rels.append((r,t,[(c.get('type'),c.get('ref'),c.get('role') or '') for c in el if c.tag=='member']))
        el.clear()
G=json.load(open('/home/claude/g2/global.json'))['g']
XY=G['xy']; OFF=G['off']; NB=G['nb']; FL=G['fl']; N=len(OFF)-1
# grid index for nearest node
from collections import defaultdict
grid=defaultdict(list)
for i in range(N): grid[(int(XY[2*i]//50),int(XY[2*i+1]//50))].append(i)
def nearest(x,y):
    best=None;bd=1e9
    for gx in range(int(x//50)-1,int(x//50)+2):
        for gy in range(int(y//50)-1,int(y//50)+2):
            for i in grid[(gx,gy)]:
                d=math.hypot(XY[2*i]-x,XY[2*i+1]-y)
                if d<bd: bd=d;best=i
    return best,bd
def path(a,b,lim=6000):
    dist={a:0};prev={};h=[(0,a)]
    while h:
        d,u=heapq.heappop(h)
        if u==b: break
        if d>lim: return None
        if d>dist[u]: continue
        for k in range(OFF[u],OFF[u+1]):
            if not FL[k]&1: continue
            v=NB[k]; nd=d+math.hypot(XY[2*v]-XY[2*u],XY[2*v+1]-XY[2*u+1])
            if nd<dist.get(v,1e18): dist[v]=nd;prev[v]=u;heapq.heappush(h,(nd,v))
    if b not in dist: return None
    out=[b]
    while out[-1]!=a: out.append(prev[out[-1]])
    return [(XY[2*i],XY[2*i+1]) for i in out[::-1]]
def bridge(p,q):
    if math.hypot(p[0]-q[0],p[1]-q[1])<15: return []
    a,da=nearest(*p); b,db=nearest(*q)
    if a is None or b is None or da>40 or db>40: return []
    r=path(a,b)
    return r or []
def chain(mem):
    segs=[[nodes[n] for n in ways[ref] if n in nodes] for typ,ref,role in mem if typ=='way' and ref in ways and role in ('','forward','backward')]
    segs=[s for s in segs if len(s)>=2]
    out=[]
    for i,s in enumerate(segs):
        if not out:
            # orient first by the next segment
            if len(segs)>1:
                nx=segs[1]; e=lambda p:min(math.hypot(p[0]-q[0],p[1]-q[1]) for q in (nx[0],nx[-1]))
                if e(s[0])<e(s[-1]): s=s[::-1]
            out=s[:]; continue
        end=out[-1]
        if math.hypot(s[-1][0]-end[0],s[-1][1]-end[1])<math.hypot(s[0][0]-end[0],s[0][1]-end[1]): s=s[::-1]
        out+=bridge(end,s[0])+s
    return out
def clean(P):
    o=[P[0]]
    for p in P[1:]:
        if math.hypot(p[0]-o[-1][0],p[1]-o[-1][1])>0.5: o.append(p)
    # drop spikes (back and forth)
    k=1
    while k<len(o)-1:
        a,b,c=o[k-1],o[k],o[k+1]
        v1=(b[0]-a[0],b[1]-a[1]); v2=(c[0]-b[0],c[1]-b[1])
        l1=math.hypot(*v1); l2=math.hypot(*v2)
        if l1*l2>0 and (v1[0]*v2[0]+v1[1]*v2[1])/(l1*l2)<-0.95: del o[k]; k=max(1,k-1)
        else: k+=1
    return o
done={}
for r,t,mem in rels: done.setdefault(r,[]).append((t,mem))
out=[]
for r in sorted(done):
    dirs=done[r][:2]
    loop=[]; stops=[]
    for t,mem in dirs:
        P=chain(mem)
        if loop: loop+=bridge(loop[-1],P[0])
        loop+=P
        for typ,ref,role in mem:
            if typ=='node' and (role.startswith('stop') or role.startswith('platform')) and ref in nodes: stops.append((nodes[ref],names.get(ref,'')))
    loop+=bridge(loop[-1],loop[0])
    loop=clean(loop)
    cum=[0]
    for i in range(len(loop)-1): cum.append(cum[-1]+math.hypot(loop[i+1][0]-loop[i][0],loop[i+1][1]-loop[i][1]))
    jumps=sum(1 for i in range(len(loop)-1) if cum[i+1]-cum[i]>60)
    # stop positions along loop
    S=[]
    for (x,y),nm in stops:
        best=None;bd=25
        for i in range(len(loop)-1):
            ax,ay=loop[i];bx,by=loop[i+1];dx,dy=bx-ax,by-ay;l2=dx*dx+dy*dy or 1
            u=max(0,min(1,((x-ax)*dx+(y-ay)*dy)/l2));d=math.hypot(ax+dx*u-x,ay+dy*u-y)
            if d<bd: bd=d;best=cum[i]+u*math.sqrt(l2)
        if best is not None and all(abs(best-s[0])>120 for s in S): S.append((round(best,1),nm))
    if len(S)<4: S=[(round(s,1),'') for s in range(200,int(cum[-1]),450)]
    S.sort()
    print(r,len(loop),round(cum[-1]),'jumps',jumps,'stops',len(S), dirs[0][0].get('colour'))
    out.append({'ref':r,'col':dirs[0][0].get('colour') or '#e3051b','ends':[d[0].get('to','') for d in dirs],'pts':[round(v,1) for p in loop for v in p],'stops':S})
json.dump(out,open('/home/claude/g2/chrono.json','w'),ensure_ascii=False,separators=(',',':'))
import os; print(os.path.getsize('/home/claude/g2/chrono.json'))
