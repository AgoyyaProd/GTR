import math, json, subprocess, numpy as np, os
from concurrent.futures import ThreadPoolExecutor
LAT0=(48.1055+48.1192)/2; LON0=(-1.6905-1.6625)/2; KX=math.cos(math.radians(LAT0))*111320; KY=110540
g=json.load(open('/home/claude/g2/global.json')); BX0,BY0,BX1,BY1=g['bounds']
M=900; RES=4.0
x0,y0,x1,y1=BX0-M,BY0-M,BX1+M,BY1+M
W=int(round((x1-x0)/RES)); H=int(round((y1-y0)/RES)); x1=x0+W*RES; y1=y0+H*RES
print(W,H)
CH=1000
jobs=[]
for j in range(0,H,CH):
    for i in range(0,W,CH):
        w=min(CH,W-i); h=min(CH,H-j)
        # rows go north->south in WMS image: top = y1 - j*RES
        top=y1-j*RES; bot=top-h*RES; left=x0+i*RES; right=left+w*RES
        jobs.append((i,j,w,h,LAT0+bot/KY,LON0+left/KX,LAT0+top/KY,LON0+right/KX))
def get(job):
    i,j,w,h,la0,lo0,la1,lo1=job; f=f'c_{i}_{j}.bil'
    if not os.path.exists(f) or os.path.getsize(f)!=w*h*4:
        url=f"https://data.geopf.fr/wms-r?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES&STYLES=&CRS=EPSG:4326&BBOX={la0},{lo0},{la1},{lo1}&WIDTH={w}&HEIGHT={h}&FORMAT=image/x-bil;bits=32"
        subprocess.run(['curl','-s','--retry','4','-o',f,url])
    return job
with ThreadPoolExecutor(6) as ex: list(ex.map(get,jobs))
A=np.zeros((H,W),np.float32)
for (i,j,w,h,*_) in jobs:
    A[j:j+h,i:i+w]=np.fromfile(f'c_{i}_{j}.bil',dtype='<f4').reshape(h,w)
print('raw',np.percentile(A,[0,1,50,99,100]))
np.save('dem_raw.npy',A); json.dump({'x0':x0,'y0':y0,'res':RES,'W':W,'H':H},open('meta.json','w'))
