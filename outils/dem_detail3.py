import json, glob, numpy as np, cv2
from PIL import Image
m=json.load(open('/home/claude/dem1/meta.json')); A=np.load('/home/claude/dem1/detail_raw.npy'); x0,y0,R,W,H=m['x0'],m['y0'],m['res'],m['W'],m['H']; y1=y0+H*R
T=json.load(open('/home/claude/g2/terrain.json')); base=T['base']
# coarse terrain sampled the same way the game does (bilinear on texel centres)
ci=np.array(Image.open('/home/claude/g2/terrain.png'))[...,:2].astype(np.int32); C=(ci[...,0]*256+ci[...,1]-32768)/10.0
def coarse(xs,ys):
    fx=np.clip((xs-T['x0'])/T['res']-.5,0,T['W']-1.001); fy=np.clip((T['y0']+T['H']*T['res']-ys)/T['res']-.5,0,T['H']-1.001)
    i=fx.astype(int); j=fy.astype(int); tx=fx-i; ty=fy-j
    return (C[j,i]*(1-tx)+C[j,i+1]*tx)*(1-ty)+(C[j+1,i]*(1-tx)+C[j+1,i+1]*tx)*ty
# fine model: 1 m IGN, light smoothing, resampled to 2 m
F=cv2.GaussianBlur(A,(0,0),2.2)-base  # squares and streets are flat: only walls make sharp level changes (below)
DR=1.0; DW=int(W*R/DR); DH=int(H*R/DR)
F2=cv2.resize(F,(DW,DH),interpolation=cv2.INTER_AREA)
xs=x0+(np.arange(DW)+.5)*DR; ys=y1-(np.arange(DH)+.5)*DR; X,Y=np.meshgrid(xs,ys)
Cg=coarse(X,Y)
# mask: where the city has real level changes OSM knows about (retaining walls, flights of steps)
mask=np.zeros((DH,DW),np.uint8)
def P(x,y): return (int(round((x-x0)/DR-.5)),int(round((y1-y)/DR-.5)))
for f in glob.glob('/home/claude/g2/tiles/t*.json'):
    d=json.load(open(f))
    for it in d.get('fn',[]):
        if it[0]!=3: continue
        p=it[2:]; cv2.polylines(mask,[np.array([P(p[k],p[k+1]) for k in range(0,len(p),2)],np.int32)],False,255,1)
    for it in d.get('st',[]):
        p=it[4:]; cv2.polylines(mask,[np.array([P(p[k],p[k+1]) for k in range(0,len(p),2)],np.int32)],False,255,1)
dist=cv2.distanceTransform(255-mask,cv2.DIST_L2,5)*DR
w=np.clip((30-dist)/12,0,1)
# only where the fine model actually disagrees; keep the coarse model elsewhere (roads are big flat triangles)
D=Cg+(F2-Cg)*w
# retaining walls are sharp: each side keeps its own level right up to the wall
F2s=F2.copy()
def samp(x,y):
    fx=np.clip((x-x0)/DR-.5,0,DW-1.001); fy=np.clip((y1-y)/DR-.5,0,DH-1.001); i=int(fx); j=int(fy); tx=fx-i; ty=fy-j
    return (F2[j,i]*(1-tx)+F2[j,i+1]*tx)*(1-ty)+(F2[j+1,i]*(1-tx)+F2[j+1,i+1]*tx)*ty
best=np.full((DH,DW),1e9); newv=np.zeros((DH,DW))
# hand-modelled Place des Lices flight: its top edge is a level change too
O=(-471.8,93.8); U=(0.8417,0.5399); LW=lambda s,t:(O[0]+U[0]*s-U[1]*t,O[1]+U[1]*s+U[0]*t)
extra=[[3,0]+[*LW(4.3,-7.6),*LW(4.3,7.3)]]
for f in glob.glob('/home/claude/g2/tiles/t*.json')+['EXTRA']:
    d={'fn':extra} if f=='EXTRA' else json.load(open(f)); BAND,OUT=(7,8.5) if f=='EXTRA' else (5,5.5)
    for it in d.get('fn',[]):
        if it[0]!=3: continue
        p=it[2:]
        for k in range(0,len(p)-2,2):
            ax,ay,bx,by=p[k],p[k+1],p[k+2],p[k+3]; L=np.hypot(bx-ax,by-ay)
            if L<0.5: continue
            ux,uy=(bx-ax)/L,(by-ay)/L; nx,ny=-uy,ux
            i0=int((min(ax,bx)-7-x0)/DR); i1=int((max(ax,bx)+7-x0)/DR)+1; j0=int((y1-max(ay,by)-7)/DR); j1=int((y1-min(ay,by)+7)/DR)+1
            for j in range(max(0,j0),min(DH,j1)):
                for i in range(max(0,i0),min(DW,i1)):
                    x=x0+(i+.5)*DR; y=y1-(j+.5)*DR; t=(x-ax)*ux+(y-ay)*uy; dn=(x-ax)*nx+(y-ay)*ny
                    if t<-0.5 or t>L+0.5 or abs(dn)>BAND or abs(dn)>=best[j,i]: continue
                    tc=min(max(t,0),L); sg=1 if dn>=0 else -1
                    best[j,i]=abs(dn); newv[j,i]=samp(ax+ux*tc+nx*sg*OUT,ay+uy*tc+ny*sg*OUT)
m2=best<1e8; F2s[m2]=newv[m2]
D=Cg+(F2s-Cg)*w
# carriageways are big flat triangles: under them the relief is smoothed (no steps a road mesh cannot follow)
g=json.load(open('/home/claude/g2/global.json')); GB0,GB1=g['bounds'][:2]; GT=g['tile']
cwm=np.zeros((DH,DW),np.uint8)
for f in glob.glob('/home/claude/g2/tiles/t*.json'):
    ti,tj=map(int,f.split('/t')[-1][:-5].split('_')); d=json.load(open(f)); ox,oy=GB0+ti*GT,GB1+tj*GT
    for key in ('rp','rq'):
        if not d.get(key): continue
        v=d[key]['v']; I=d[key]['i']
        for q in range(0,len(I),3):
            pts=np.array([P(ox+v[I[q+k]*2]/10,oy+v[I[q+k]*2+1]/10) for k in range(3)],np.int32)
            cv2.fillConvexPoly(cwm,pts,255)
cwf=cv2.GaussianBlur(cv2.dilate(cwm,np.ones((3,3),np.uint8)).astype(np.float32)/255,(0,0),1.5)
Dsm=cv2.GaussianBlur(D.astype(np.float32),(0,0),3.0)
D=D+(Dsm-D)*cwf
# under the hand-built Lices flight the ground stays below the treads, the ramp and the terrace
L0s,Ts=2.40,5.03
def hstruct(s_,t_):
    if t_<-3.0: return L0s+(Ts-L0s)*min(1,max(0,s_)/6.4)
    if t_>2.6: return L0s+0.45*max(0,s_)/1.05 if s_<1.05 else Ts
    if s_<1.05: return L0s+0.45*max(0,s_)/1.05
    if s_<1.8: return L0s+0.45
    return L0s+0.45+(Ts-L0s-0.45)*min(1,(s_-1.8)/4.5)
for j in range(DH):
    yy=y1-(j+.5)*DR
    if abs(yy-O[1])>16: continue
    for i in range(DW):
        xx=x0+(i+.5)*DR
        if abs(xx-O[0])>16: continue
        dx,dy=xx-O[0],yy-O[1]; s_=dx*U[0]+dy*U[1]; t_=-dx*U[1]+dy*U[0]
        if -0.6<=s_<=6.5 and -7.7<=t_<=7.4: D[j,i]=min(D[j,i],hstruct(s_,t_)-0.12)
# fade to the coarse model at the edge of the fine area
e=np.minimum.reduce([np.arange(DW)[None,:].repeat(DH,0),np.arange(DW)[::-1][None,:].repeat(DH,0),np.arange(DH)[:,None].repeat(DW,1),np.arange(DH)[::-1][:,None].repeat(DW,1)])
D=Cg+(D-Cg)*np.clip((e-4)/20,0,1)
print('changed px',(np.abs(D-Cg)>0.25).sum(),'max',np.abs(D-Cg).max())
v=np.clip(np.round(D*10)+32768,0,65535).astype(np.uint16)
img=np.zeros((DH,DW,3),np.uint8); img[...,0]=v>>8; img[...,1]=v&255
# blue channel: where a street surface is laid ON the ground (footways, squares, paths, pedestrian setts) the ground
# plane sinks a few centimetres in the shader, so the two never fight for the same depth
ov=np.zeros((DH,DW),np.uint8)
for f in glob.glob('/home/claude/g2/tiles/t*.json'):
    ti,tj=map(int,f.split('/t')[-1][:-5].split('_')); d=json.load(open(f)); ox,oy=GB0+ti*GT,GB1+tj*GT
    for r in d.get('r',[]):
        w,k,fl=r[0],r[1],r[2]
        if k in (0,3) or (k==1 and (fl&8) and abs(w-5.5)<0.01): continue
        p=r[4:]; pts=np.array([P(p[q],p[q+1]) for q in range(0,len(p),2)],np.int32)
        cv2.polylines(ov,[pts],False,255,max(1,int(round(w/DR))))
    if d.get('rf'):
        v2=d['rf']['v']; I=d['rf']['i']
        for q in range(0,len(I),3):
            pts=np.array([P(ox+v2[I[q+k]*2]/10,oy+v2[I[q+k]*2+1]/10) for k in range(3)],np.int32); cv2.fillConvexPoly(ov,pts,255)
ov=cv2.dilate(ov,np.ones((3,3),np.uint8))
img[...,2]=ov
Image.fromarray(img).save('/home/claude/g2/terrain_d.png',optimize=True)
T['detail']={'x0':x0,'y0':y0,'res':DR,'W':DW,'H':DH}; json.dump(T,open('/home/claude/g2/terrain.json','w'))
def at(x,y): return D[int((y1-y)/DR),int((x-x0)/DR)]
print('stair top/bottom', at(-466.5,97.2), at(-471.8,93.8), 'beyond top',at(-463,99.5),'lower',at(-475,88))
