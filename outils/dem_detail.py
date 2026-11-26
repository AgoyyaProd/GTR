import math, json, subprocess, numpy as np, os
from concurrent.futures import ThreadPoolExecutor
LAT0=(48.1055+48.1192)/2; LON0=(-1.6905-1.6625)/2; KX=math.cos(math.radians(LAT0))*111320; KY=110540
RES=1.0; W=H=2048; x0=-1224.0; y0=-1024.0; x1=x0+W*RES; y1=y0+H*RES
CH=1024; jobs=[]
for j in range(0,H,CH):
    for i in range(0,W,CH):
        top=y1-j*RES; bot=top-CH*RES; left=x0+i*RES; right=left+CH*RES
        jobs.append((i,j,LAT0+bot/KY,LON0+left/KX,LAT0+top/KY,LON0+right/KX))
def get(job):
    i,j,la0,lo0,la1,lo1=job; f=f'/home/claude/dem1/d_{i}_{j}.bil'
    if not os.path.exists(f) or os.path.getsize(f)!=CH*CH*4:
        url=f"https://data.geopf.fr/wms-r?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES&STYLES=&CRS=EPSG:4326&BBOX={la0},{lo0},{la1},{lo1}&WIDTH={CH}&HEIGHT={CH}&FORMAT=image/x-bil;bits=32"
        subprocess.run(['curl','-s','--retry','4','-m','300','-o',f,url])
    return job
with ThreadPoolExecutor(4) as ex: list(ex.map(get,jobs))
A=np.zeros((H,W),np.float32)
for (i,j,*_) in jobs: A[j:j+CH,i:i+CH]=np.fromfile(f'/home/claude/dem1/d_{i}_{j}.bil',dtype='<f4').reshape(CH,CH)
print('raw',np.percentile(A,[0,1,50,99,100]))
np.save('/home/claude/dem1/detail_raw.npy',A); json.dump({'x0':x0,'y0':y0,'res':RES,'W':W,'H':H},open('/home/claude/dem1/meta.json','w'))
