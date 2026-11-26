import json, numpy as np, cv2
from PIL import Image, ImageDraw
m=json.load(open('meta.json')); A=np.load('dem_raw.npy'); x0,y0,R,W,H=m['x0'],m['y0'],m['res'],m['W'],m['H']; y1=y0+H*R
g=json.load(open('/home/claude/g2/global.json'))
mask=Image.new('L',(W,H),0); d=ImageDraw.Draw(mask)
for w in g['water']:
    pts=[((w[k]-x0)/R,(y1-w[k+1])/R) for k in range(0,len(w),2)]
    if len(pts)>=3: d.polygon(pts,fill=255)
mk=np.array(mask); mk=cv2.dilate(mk,np.ones((5,5),np.uint8))
lo,hi=A.min(),A.max(); A16=((A-lo)/(hi-lo)*65535).astype(np.uint16)
F=cv2.inpaint(A16,mk,6,cv2.INPAINT_NS).astype(np.float32)/65535*(hi-lo)+lo
F=cv2.GaussianBlur(F,(0,0),1.6)
# base: elevation at the spawn (Place des Lices)
sx,sy=-582.3,23.1; base=float(F[int((y1-sy)/R),int((sx-x0)/R)])
Hm=F-base; print('base',base,'range',Hm.min(),Hm.max())
v=np.clip(np.round(Hm*10)+32768,0,65535).astype(np.uint16)
img=np.zeros((H,W,3),np.uint8); img[...,0]=v>>8; img[...,1]=v&255
Image.fromarray(img).save('/home/claude/g2/terrain.png',optimize=True)
json.dump({'x0':x0,'y0':y0,'res':R,'W':W,'H':H,'base':base},open('/home/claude/g2/terrain.json','w'))
prev=((Hm-Hm.min())/(Hm.max()-Hm.min())*255).astype(np.uint8); Image.fromarray(prev).resize((W//3,H//3)).save('/home/claude/tools/v/dem.png')
