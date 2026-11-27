(()=>{var dy=0,Zd=1,fy=2;var vp=1,py=2,an=3,pi=0,Xt=1,ni=2,Ln=0,Hs=1,$d=2,Kd=3,Jd=4,Wh=5,us=100,my=101,gy=102,yy=103,_y=104,Xh=200,qh=201,xy=202,vy=203,Ic=204,Lc=205,by=206,Sy=207,My=208,Ty=209,wy=210,Ay=211,Ey=212,Cy=213,Ry=214,Dc=0,Uc=1,Nc=2,qs=3,Oc=4,Bc=5,bo=6,Fc=7,bp=0,Py=1,Iy=2,Dn=0,Ly=1,Dy=2,Uy=3,Ny=4,Oy=5,By=6,Fy=7,Qd="attached",zy="detached",Sp=300,Ys=301,js=302,zc=303,kc=304,Yo=306,fs=1e3,on=1001,jr=1002,Nt=1003,Yh=1004;var ks=1005;var Wt=1006,Wr=1007;var Wi=1008;var Bi=1009,Mp=1010,Tp=1011,Zr=1012,jh=1013,Un=1014,si=1015,aa=1016,Zh=1017,$h=1018,Zs=1020,wp=35902,Ap=1021,Ep=1022,ri=1023,Cp=1024,Rp=1025,Gs=1026,$s=1027,jo=1028,Zo=1029,$o=1030,Kh=1031;var Ko=1033,go=33776,yo=33777,_o=33778,xo=33779,Vc=35840,Hc=35841,Gc=35842,Wc=35843,Xc=36196,qc=37492,Yc=37496,jc=37808,Zc=37809,$c=37810,Kc=37811,Jc=37812,Qc=37813,eh=37814,th=37815,ih=37816,nh=37817,sh=37818,rh=37819,ah=37820,oh=37821,vo=36492,lh=36494,ch=36495,Pp=36283,hh=36284,uh=36285,dh=36286;var Ks=2300,Js=2301,$l=2302,ef=2400,tf=2401,nf=2402,ky=2500;var Ip=0,Jo=1,oa=2,Vy=3200,Hy=3201;var Lp=0,Gy=1,Pn="",gt="srgb",Lt="srgb-linear",Qo="linear",rt="srgb";var ws=7680;var sf=519,Wy=512,Xy=513,qy=514,Dp=515,Yy=516,jy=517,Zy=518,$y=519,fh=35044;var rf="300 es",ln=2e3,So=2001,ai=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],af=1234567,Xr=Math.PI/180,Qs=180/Math.PI;function Oi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function Pt(i,e,t){return Math.max(e,Math.min(t,i))}function Jh(i,e){return(i%e+e)%e}function Ky(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Jy(i,e,t){return i!==e?(t-i)/(e-i):0}function qr(i,e,t){return(1-t)*i+t*e}function Qy(i,e,t,n){return qr(i,e,1-Math.exp(-t*n))}function e_(i,e=1){return e-Math.abs(Jh(i,e*2)-e)}function t_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function i_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function n_(i,e){return i+Math.floor(Math.random()*(e-i+1))}function s_(i,e){return i+Math.random()*(e-i)}function r_(i){return i*(.5-Math.random())}function a_(i){i!==void 0&&(af=i);let e=af+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function o_(i){return i*Xr}function l_(i){return i*Qs}function c_(i){return(i&i-1)===0&&i!==0}function h_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function u_(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function d_(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*m,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*m,o*c);break;case"ZYZ":i.set(l*m,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ni(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Vn={DEG2RAD:Xr,RAD2DEG:Qs,generateUUID:Oi,clamp:Pt,euclideanModulo:Jh,mapLinear:Ky,inverseLerp:Jy,lerp:qr,damp:Qy,pingpong:e_,smoothstep:t_,smootherstep:i_,randInt:n_,randFloat:s_,randFloatSpread:r_,seededRandom:a_,degToRad:o_,radToDeg:l_,isPowerOfTwo:c_,ceilPowerOfTwo:h_,floorPowerOfTwo:u_,setQuaternionFromProperEuler:d_,normalize:st,denormalize:Ni},ue=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Re=class i{constructor(e,t,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],y=s[0],g=s[3],p=s[6],v=s[1],x=s[4],_=s[7],w=s[2],M=s[5],T=s[8];return r[0]=a*y+o*v+l*w,r[3]=a*g+o*x+l*M,r[6]=a*p+o*_+l*T,r[1]=c*y+u*v+h*w,r[4]=c*g+u*x+h*M,r[7]=c*p+u*_+h*T,r[2]=d*y+f*v+m*w,r[5]=d*g+f*x+m*M,r[8]=d*p+f*_+m*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*r,f=c*r-a*l,m=t*h+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=h*y,e[1]=(s*c-u*n)*y,e[2]=(o*n-s*a)*y,e[3]=d*y,e[4]=(u*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Kl.makeScale(e,t)),this}rotate(e){return this.premultiply(Kl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Kl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Kl=new Re;function Up(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function $r(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function f_(){let i=$r("canvas");return i.style.display="block",i}var of={};function Hr(i){i in of||(of[i]=!0,console.warn(i))}function p_(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function m_(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function g_(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var ze={enabled:!0,workingColorSpace:Lt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===rt&&(i.r=cn(i.r),i.g=cn(i.g),i.b=cn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===rt&&(i.r=Ws(i.r),i.g=Ws(i.g),i.b=Ws(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Pn?Qo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function cn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ws(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var lf=[.64,.33,.3,.6,.15,.06],cf=[.2126,.7152,.0722],hf=[.3127,.329],uf=new Re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),df=new Re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ze.define({[Lt]:{primaries:lf,whitePoint:hf,transfer:Qo,toXYZ:uf,fromXYZ:df,luminanceCoefficients:cf,workingColorSpaceConfig:{unpackColorSpace:gt},outputColorSpaceConfig:{drawingBufferColorSpace:gt}},[gt]:{primaries:lf,whitePoint:hf,transfer:rt,toXYZ:uf,fromXYZ:df,luminanceCoefficients:cf,outputColorSpaceConfig:{drawingBufferColorSpace:gt}}});var As,ph=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{As===void 0&&(As=$r("canvas")),As.width=e.width,As.height=e.height;let n=As.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=As}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=$r("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=cn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(cn(t[n]/255)*255):t[n]=cn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},y_=0,Kr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:y_++}),this.uuid=Oi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Jl(s[a].image)):r.push(Jl(s[a]))}else r=Jl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Jl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ph.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var __=0,It=class i extends ai{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=on,s=on,r=Wt,a=Wi,o=ri,l=Bi,c=i.DEFAULT_ANISOTROPY,u=Pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:__++}),this.uuid=Oi(),this.name="",this.source=new Kr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fs:e.x=e.x-Math.floor(e.x);break;case on:e.x=e.x<0?0:1;break;case jr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fs:e.y=e.y-Math.floor(e.y);break;case on:e.y=e.y<0?0:1;break;case jr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=Sp;It.DEFAULT_ANISOTROPY=1;var Ze=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],y=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+y)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,_=(f+1)/2,w=(p+1)/2,M=(u+d)/4,T=(h+y)/4,C=(m+g)/4;return x>_&&x>w?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=M/n,r=T/n):_>w?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=M/s,r=C/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=T/r,s=C/r),this.set(n,s,r,t),this}let v=Math.sqrt((g-m)*(g-m)+(h-y)*(h-y)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(h-y)/v,this.z=(d-u)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},mh=class extends ai{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new It(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Kr(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ti=class extends mh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Mo=class extends It{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=on,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var gh=class extends It{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=on,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ot=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],d=r[a+0],f=r[a+1],m=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=y;return}if(h!==y||l!==d||c!==f||u!==m){let g=1-o,p=l*d+c*f+u*m+h*y,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let w=Math.sqrt(x),M=Math.atan2(w,p*v);g=Math.sin(g*M)/w,o=Math.sin(o*M)/w}let _=o*v;if(l=l*g+d*_,c=c*g+f*_,u=u*g+m*_,h=h*g+y*_,g===1-o){let w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-o*f,e[t+2]=c*m+u*f+o*d-l*h,e[t+3]=u*m-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>h){let f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>h){let f=2*Math.sqrt(1+o-n-h);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ff.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ff.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ql.copy(this).projectOnVector(e),this.sub(Ql)}reflect(e){return this.sub(Ql.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ql=new R,ff=new Ot,Ge=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Li):Li.fromBufferAttribute(r,a),Li.applyMatrix4(e.matrixWorld),this.expandByPoint(Li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),za.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),za.copy(n.boundingBox)),za.applyMatrix4(e.matrixWorld),this.union(za)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Li),Li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Dr),ka.subVectors(this.max,Dr),Es.subVectors(e.a,Dr),Cs.subVectors(e.b,Dr),Rs.subVectors(e.c,Dr),Tn.subVectors(Cs,Es),wn.subVectors(Rs,Cs),is.subVectors(Es,Rs);let t=[0,-Tn.z,Tn.y,0,-wn.z,wn.y,0,-is.z,is.y,Tn.z,0,-Tn.x,wn.z,0,-wn.x,is.z,0,-is.x,-Tn.y,Tn.x,0,-wn.y,wn.x,0,-is.y,is.x,0];return!ec(t,Es,Cs,Rs,ka)||(t=[1,0,0,0,1,0,0,0,1],!ec(t,Es,Cs,Rs,ka))?!1:(Va.crossVectors(Tn,wn),t=[Va.x,Va.y,Va.z],ec(t,Es,Cs,Rs,ka))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Qi=[new R,new R,new R,new R,new R,new R,new R,new R],Li=new R,za=new Ge,Es=new R,Cs=new R,Rs=new R,Tn=new R,wn=new R,is=new R,Dr=new R,ka=new R,Va=new R,ns=new R;function ec(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ns.fromArray(i,r);let o=s.x*Math.abs(ns.x)+s.y*Math.abs(ns.y)+s.z*Math.abs(ns.z),l=e.dot(ns),c=t.dot(ns),u=n.dot(ns);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var x_=new Ge,Ur=new R,tc=new R,_t=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):x_.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ur.subVectors(e,this.center);let t=Ur.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ur,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ur.copy(e.center).add(tc)),this.expandByPoint(Ur.copy(e.center).sub(tc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},en=new R,ic=new R,Ha=new R,An=new R,nc=new R,Ga=new R,sc=new R,oi=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,en)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=en.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(en.copy(this.origin).addScaledVector(this.direction,t),en.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ic.copy(e).add(t).multiplyScalar(.5),Ha.copy(t).sub(e).normalize(),An.copy(this.origin).sub(ic);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ha),o=An.dot(this.direction),l=-An.dot(Ha),c=An.lengthSq(),u=Math.abs(1-a*a),h,d,f,m;if(u>0)if(h=a*l-o,d=a*o-l,m=r*u,h>=0)if(d>=-m)if(d<=m){let y=1/u;h*=y,d*=y,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ic).addScaledVector(Ha,d),f}intersectSphere(e,t){en.subVectors(e.center,this.origin);let n=en.dot(this.direction),s=en.dot(en)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,en)!==null}intersectTriangle(e,t,n,s,r){nc.subVectors(t,e),Ga.subVectors(n,e),sc.crossVectors(nc,Ga);let a=this.direction.dot(sc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;An.subVectors(this.origin,e);let l=o*this.direction.dot(Ga.crossVectors(An,Ga));if(l<0)return null;let c=o*this.direction.dot(nc.cross(An));if(c<0||l+c>a)return null;let u=-o*An.dot(sc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},te=class i{constructor(e,t,n,s,r,a,o,l,c,u,h,d,f,m,y,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,h,d,f,m,y,g)}set(e,t,n,s,r,a,o,l,c,u,h,d,f,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Ps.setFromMatrixColumn(e,0).length(),r=1/Ps.setFromMatrixColumn(e,1).length(),a=1/Ps.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=a*u,f=a*h,m=o*u,y=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-y*c,t[9]=-o*l,t[2]=y-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*u,f=l*h,m=c*u,y=c*h;t[0]=d+y*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=y+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*u,f=l*h,m=c*u,y=c*h;t[0]=d-y*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=y-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*u,f=a*h,m=o*u,y=o*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+y,t[1]=l*h,t[5]=y*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*u,t[4]=y-d*h,t[8]=m*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-y*h}else if(e.order==="XZY"){let d=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+y,t[5]=a*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=y*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(v_,e,b_)}lookAt(e,t,n){let s=this.elements;return di.subVectors(e,t),di.lengthSq()===0&&(di.z=1),di.normalize(),En.crossVectors(n,di),En.lengthSq()===0&&(Math.abs(n.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),En.crossVectors(n,di)),En.normalize(),Wa.crossVectors(di,En),s[0]=En.x,s[4]=Wa.x,s[8]=di.x,s[1]=En.y,s[5]=Wa.y,s[9]=di.y,s[2]=En.z,s[6]=Wa.z,s[10]=di.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],v=n[3],x=n[7],_=n[11],w=n[15],M=s[0],T=s[4],C=s[8],S=s[12],b=s[1],P=s[5],D=s[9],L=s[13],N=s[2],V=s[6],z=s[10],K=s[14],W=s[3],ie=s[7],he=s[11],xe=s[15];return r[0]=a*M+o*b+l*N+c*W,r[4]=a*T+o*P+l*V+c*ie,r[8]=a*C+o*D+l*z+c*he,r[12]=a*S+o*L+l*K+c*xe,r[1]=u*M+h*b+d*N+f*W,r[5]=u*T+h*P+d*V+f*ie,r[9]=u*C+h*D+d*z+f*he,r[13]=u*S+h*L+d*K+f*xe,r[2]=m*M+y*b+g*N+p*W,r[6]=m*T+y*P+g*V+p*ie,r[10]=m*C+y*D+g*z+p*he,r[14]=m*S+y*L+g*K+p*xe,r[3]=v*M+x*b+_*N+w*W,r[7]=v*T+x*P+_*V+w*ie,r[11]=v*C+x*D+_*z+w*he,r[15]=v*S+x*L+_*K+w*xe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],y=e[7],g=e[11],p=e[15];return m*(+r*l*h-s*c*h-r*o*d+n*c*d+s*o*f-n*l*f)+y*(+t*l*f-t*c*d+r*a*d-s*a*f+s*c*u-r*l*u)+g*(+t*c*h-t*o*f-r*a*h+n*a*f+r*o*u-n*c*u)+p*(-s*o*u-t*l*h+t*o*d+s*a*h-n*a*d+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],y=e[13],g=e[14],p=e[15],v=h*g*c-y*d*c+y*l*f-o*g*f-h*l*p+o*d*p,x=m*d*c-u*g*c-m*l*f+a*g*f+u*l*p-a*d*p,_=u*y*c-m*h*c+m*o*f-a*y*f-u*o*p+a*h*p,w=m*h*l-u*y*l-m*o*d+a*y*d+u*o*g-a*h*g,M=t*v+n*x+s*_+r*w;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/M;return e[0]=v*T,e[1]=(y*d*r-h*g*r-y*s*f+n*g*f+h*s*p-n*d*p)*T,e[2]=(o*g*r-y*l*r+y*s*c-n*g*c-o*s*p+n*l*p)*T,e[3]=(h*l*r-o*d*r-h*s*c+n*d*c+o*s*f-n*l*f)*T,e[4]=x*T,e[5]=(u*g*r-m*d*r+m*s*f-t*g*f-u*s*p+t*d*p)*T,e[6]=(m*l*r-a*g*r-m*s*c+t*g*c+a*s*p-t*l*p)*T,e[7]=(a*d*r-u*l*r+u*s*c-t*d*c-a*s*f+t*l*f)*T,e[8]=_*T,e[9]=(m*h*r-u*y*r-m*n*f+t*y*f+u*n*p-t*h*p)*T,e[10]=(a*y*r-m*o*r+m*n*c-t*y*c-a*n*p+t*o*p)*T,e[11]=(u*o*r-a*h*r-u*n*c+t*h*c+a*n*f-t*o*f)*T,e[12]=w*T,e[13]=(u*y*s-m*h*s+m*n*d-t*y*d-u*n*g+t*h*g)*T,e[14]=(m*o*s-a*y*s-m*n*l+t*y*l+a*n*g-t*o*g)*T,e[15]=(a*h*s-u*o*s+u*n*l-t*h*l-a*n*d+t*o*d)*T,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,d=r*c,f=r*u,m=r*h,y=a*u,g=a*h,p=o*h,v=l*c,x=l*u,_=l*h,w=n.x,M=n.y,T=n.z;return s[0]=(1-(y+p))*w,s[1]=(f+_)*w,s[2]=(m-x)*w,s[3]=0,s[4]=(f-_)*M,s[5]=(1-(d+p))*M,s[6]=(g+v)*M,s[7]=0,s[8]=(m+x)*T,s[9]=(g-v)*T,s[10]=(1-(d+y))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Ps.set(s[0],s[1],s[2]).length(),a=Ps.set(s[4],s[5],s[6]).length(),o=Ps.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Di.copy(this);let c=1/r,u=1/a,h=1/o;return Di.elements[0]*=c,Di.elements[1]*=c,Di.elements[2]*=c,Di.elements[4]*=u,Di.elements[5]*=u,Di.elements[6]*=u,Di.elements[8]*=h,Di.elements[9]*=h,Di.elements[10]*=h,t.setFromRotationMatrix(Di),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=ln){let l=this.elements,c=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s),f,m;if(o===ln)f=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===So)f=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ln){let l=this.elements,c=1/(t-e),u=1/(n-s),h=1/(a-r),d=(t+e)*c,f=(n+s)*u,m,y;if(o===ln)m=(a+r)*h,y=-2*h;else if(o===So)m=r*h,y=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=y,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ps=new R,Di=new te,v_=new R(0,0,0),b_=new R(1,1,1),En=new R,Wa=new R,di=new R,pf=new te,mf=new Ot,wi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Pt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return pf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mf.setFromEuler(this),this.setFromQuaternion(mf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};wi.DEFAULT_ORDER="XYZ";var Jr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},S_=0,gf=new R,Is=new Ot,tn=new te,Xa=new R,Nr=new R,M_=new R,T_=new Ot,yf=new R(1,0,0),_f=new R(0,1,0),xf=new R(0,0,1),vf={type:"added"},w_={type:"removed"},Ls={type:"childadded",child:null},rc={type:"childremoved",child:null},vt=class i extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:S_++}),this.uuid=Oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new R,t=new wi,n=new Ot,s=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new te},normalMatrix:{value:new Re}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Is.setFromAxisAngle(e,t),this.quaternion.multiply(Is),this}rotateOnWorldAxis(e,t){return Is.setFromAxisAngle(e,t),this.quaternion.premultiply(Is),this}rotateX(e){return this.rotateOnAxis(yf,e)}rotateY(e){return this.rotateOnAxis(_f,e)}rotateZ(e){return this.rotateOnAxis(xf,e)}translateOnAxis(e,t){return gf.copy(e).applyQuaternion(this.quaternion),this.position.add(gf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yf,e)}translateY(e){return this.translateOnAxis(_f,e)}translateZ(e){return this.translateOnAxis(xf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xa.copy(e):Xa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tn.lookAt(Nr,Xa,this.up):tn.lookAt(Xa,Nr,this.up),this.quaternion.setFromRotationMatrix(tn),s&&(tn.extractRotation(s.matrixWorld),Is.setFromRotationMatrix(tn),this.quaternion.premultiply(Is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vf),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(w_),rc.child=e,this.dispatchEvent(rc),rc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vf),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,e,M_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,T_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};vt.DEFAULT_UP=new R(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ui=new R,nn=new R,ac=new R,sn=new R,Ds=new R,Us=new R,bf=new R,oc=new R,lc=new R,cc=new R,hc=new Ze,uc=new Ze,dc=new Ze,Gt=class i{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Ui.subVectors(e,t),s.cross(Ui);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Ui.subVectors(s,t),nn.subVectors(n,t),ac.subVectors(e,t);let a=Ui.dot(Ui),o=Ui.dot(nn),l=Ui.dot(ac),c=nn.dot(nn),u=nn.dot(ac),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let d=1/h,f=(c*l-o*u)*d,m=(a*u-o*l)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,sn)===null?!1:sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,sn.x),l.addScaledVector(a,sn.y),l.addScaledVector(o,sn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return hc.setScalar(0),uc.setScalar(0),dc.setScalar(0),hc.fromBufferAttribute(e,t),uc.fromBufferAttribute(e,n),dc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(hc,r.x),a.addScaledVector(uc,r.y),a.addScaledVector(dc,r.z),a}static isFrontFacing(e,t,n,s){return Ui.subVectors(n,t),nn.subVectors(e,t),Ui.cross(nn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ui.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),Ui.cross(nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ds.subVectors(s,n),Us.subVectors(r,n),oc.subVectors(e,n);let l=Ds.dot(oc),c=Us.dot(oc);if(l<=0&&c<=0)return t.copy(n);lc.subVectors(e,s);let u=Ds.dot(lc),h=Us.dot(lc);if(u>=0&&h<=u)return t.copy(s);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ds,a);cc.subVectors(e,r);let f=Ds.dot(cc),m=Us.dot(cc);if(m>=0&&f<=m)return t.copy(r);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Us,o);let g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return bf.subVectors(r,s),o=(h-u)/(h-u+(f-m)),t.copy(s).addScaledVector(bf,o);let p=1/(g+y+d);return a=y*p,o=d*p,t.copy(n).addScaledVector(Ds,a).addScaledVector(Us,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Np={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cn={h:0,s:0,l:0},qa={h:0,s:0,l:0};function fc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Se=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,ze.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=ze.workingColorSpace){if(e=Jh(e,1),t=Pt(t,0,1),n=Pt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=fc(a,r,e+1/3),this.g=fc(a,r,e),this.b=fc(a,r,e-1/3)}return ze.toWorkingColorSpace(this,s),this}setStyle(e,t=gt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gt){let n=Np[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=cn(e.r),this.g=cn(e.g),this.b=cn(e.b),this}copyLinearToSRGB(e){return this.r=Ws(e.r),this.g=Ws(e.g),this.b=Ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gt){return ze.fromWorkingColorSpace(Vt.copy(this),e),Math.round(Pt(Vt.r*255,0,255))*65536+Math.round(Pt(Vt.g*255,0,255))*256+Math.round(Pt(Vt.b*255,0,255))}getHexString(e=gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.fromWorkingColorSpace(Vt.copy(this),t);let n=Vt.r,s=Vt.g,r=Vt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ze.workingColorSpace){return ze.fromWorkingColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=gt){ze.fromWorkingColorSpace(Vt.copy(this),e);let t=Vt.r,n=Vt.g,s=Vt.b;return e!==gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Cn),this.setHSL(Cn.h+e,Cn.s+t,Cn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Cn),e.getHSL(qa);let n=qr(Cn.h,qa.h,t),s=qr(Cn.s,qa.s,t),r=qr(Cn.l,qa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Vt=new Se;Se.NAMES=Np;var A_=0,mi=class extends ai{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:A_++}),this.uuid=Oi(),this.name="",this.blending=Hs,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ic,this.blendDst=Lc,this.blendEquation=us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Se(0,0,0),this.blendAlpha=0,this.depthFunc=qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Hs&&(n.blending=this.blending),this.side!==pi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ic&&(n.blendSrc=this.blendSrc),this.blendDst!==Lc&&(n.blendDst=this.blendDst),this.blendEquation!==us&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ws&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ws&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ws&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},gi=class extends mi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=bp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var wt=new R,Ya=new ue,Be=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=fh,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ya.fromBufferAttribute(this,t),Ya.applyMatrix3(e),this.setXY(t,Ya.x,Ya.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==fh&&(e.usage=this.usage),e}};var To=class extends Be{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var wo=class extends Be{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Kt=class extends Be{constructor(e,t,n){super(new Float32Array(e),t,n)}},E_=0,Mi=new te,pc=new vt,Ns=new R,fi=new Ge,Or=new Ge,Rt=new R,xt=class i extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:E_++}),this.uuid=Oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Up(e)?wo:To)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Re().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mi.makeRotationFromQuaternion(e),this.applyMatrix4(Mi),this}rotateX(e){return Mi.makeRotationX(e),this.applyMatrix4(Mi),this}rotateY(e){return Mi.makeRotationY(e),this.applyMatrix4(Mi),this}rotateZ(e){return Mi.makeRotationZ(e),this.applyMatrix4(Mi),this}translate(e,t,n){return Mi.makeTranslation(e,t,n),this.applyMatrix4(Mi),this}scale(e,t,n){return Mi.makeScale(e,t,n),this.applyMatrix4(Mi),this}lookAt(e){return pc.lookAt(e),pc.updateMatrix(),this.applyMatrix4(pc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kt(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ge);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];fi.setFromBufferAttribute(r),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _t);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(fi.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Or.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(fi.min,Or.min),fi.expandByPoint(Rt),Rt.addVectors(fi.max,Or.max),fi.expandByPoint(Rt)):(fi.expandByPoint(Or.min),fi.expandByPoint(Or.max))}fi.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Rt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Rt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Rt.fromBufferAttribute(o,c),l&&(Ns.fromBufferAttribute(e,c),Rt.add(Ns)),s=Math.max(s,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Be(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new R,l[C]=new R;let c=new R,u=new R,h=new R,d=new ue,f=new ue,m=new ue,y=new R,g=new R;function p(C,S,b){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,b),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,b),u.sub(c),h.sub(c),f.sub(d),m.sub(d);let P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(y.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(P),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(P),o[C].add(y),o[S].add(y),o[b].add(y),l[C].add(g),l[S].add(g),l[b].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let C=0,S=v.length;C<S;++C){let b=v[C],P=b.start,D=b.count;for(let L=P,N=P+D;L<N;L+=3)p(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let x=new R,_=new R,w=new R,M=new R;function T(C){w.fromBufferAttribute(s,C),M.copy(w);let S=o[C];x.copy(S),x.sub(w.multiplyScalar(w.dot(S))).normalize(),_.crossVectors(M,S);let P=_.dot(l[C])<0?-1:1;a.setXYZW(C,x.x,x.y,x.z,P)}for(let C=0,S=v.length;C<S;++C){let b=v[C],P=b.start,D=b.count;for(let L=P,N=P+D;L<N;L+=3)T(e.getX(L+0)),T(e.getX(L+1)),T(e.getX(L+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Be(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new R,r=new R,a=new R,o=new R,l=new R,c=new R,u=new R,h=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),y=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u),f=0,m=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new Be(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Sf=new te,ss=new oi,ja=new _t,Mf=new R,Za=new R,$a=new R,Ka=new R,mc=new R,Ja=new R,Tf=new R,Qa=new R,at=class extends vt{constructor(e=new xt,t=new gi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ja.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],h=r[l];u!==0&&(mc.fromBufferAttribute(h,e),a?Ja.addScaledVector(mc,u):Ja.addScaledVector(mc.sub(t),u))}t.add(Ja)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ja.copy(n.boundingSphere),ja.applyMatrix4(r),ss.copy(e.ray).recast(e.near),!(ja.containsPoint(ss.origin)===!1&&(ss.intersectSphere(ja,Mf)===null||ss.origin.distanceToSquared(Mf)>(e.far-e.near)**2))&&(Sf.copy(r).invert(),ss.copy(e.ray).applyMatrix4(Sf),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ss)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let _=v,w=x;_<w;_+=3){let M=o.getX(_),T=o.getX(_+1),C=o.getX(_+2);s=eo(this,p,e,n,c,u,h,M,T,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let v=o.getX(g),x=o.getX(g+1),_=o.getX(g+2);s=eo(this,a,e,n,c,u,h,v,x,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=v,w=x;_<w;_+=3){let M=_,T=_+1,C=_+2;s=eo(this,p,e,n,c,u,h,M,T,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let v=g,x=g+1,_=g+2;s=eo(this,a,e,n,c,u,h,v,x,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function C_(i,e,t,n,s,r,a,o){let l;if(e.side===Xt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===pi,o),l===null)return null;Qa.copy(o),Qa.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Qa);return c<t.near||c>t.far?null:{distance:c,point:Qa.clone(),object:i}}function eo(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Za),i.getVertexPosition(l,$a),i.getVertexPosition(c,Ka);let u=C_(i,e,t,n,Za,$a,Ka,Tf);if(u){let h=new R;Gt.getBarycoord(Tf,Za,$a,Ka,h),s&&(u.uv=Gt.getInterpolatedAttribute(s,o,l,c,h,new ue)),r&&(u.uv1=Gt.getInterpolatedAttribute(r,o,l,c,h,new ue)),a&&(u.normal=Gt.getInterpolatedAttribute(a,o,l,c,h,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new R,materialIndex:0};Gt.getNormal(Za,$a,Ka,d.normal),u.face=d,u.barycoord=h}return u}var er=class i extends xt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],h=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(h,2));function m(y,g,p,v,x,_,w,M,T,C,S){let b=_/T,P=w/C,D=_/2,L=w/2,N=M/2,V=T+1,z=C+1,K=0,W=0,ie=new R;for(let he=0;he<z;he++){let xe=he*P-L;for(let Le=0;Le<V;Le++){let Qe=Le*b-D;ie[y]=Qe*v,ie[g]=xe*x,ie[p]=N,c.push(ie.x,ie.y,ie.z),ie[y]=0,ie[g]=0,ie[p]=M>0?1:-1,u.push(ie.x,ie.y,ie.z),h.push(Le/T),h.push(1-he/C),K+=1}}for(let he=0;he<C;he++)for(let xe=0;xe<T;xe++){let Le=d+xe+V*he,Qe=d+xe+V*(he+1),q=d+(xe+1)+V*(he+1),J=d+(xe+1)+V*he;l.push(Le,Qe,J),l.push(Qe,q,J),W+=6}o.addGroup(f,W,S),f+=W,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function tr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function jt(i){let e={};for(let t=0;t<i.length;t++){let n=tr(i[t]);for(let s in n)e[s]=n[s]}return e}function R_(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Op(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ze.workingColorSpace}var P_={clone:tr,merge:jt},I_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,L_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,yi=class extends mi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=I_,this.fragmentShader=L_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=tr(e.uniforms),this.uniformsGroups=R_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ao=class extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=ln}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Rn=new R,wf=new ue,Af=new ue,At=class extends Ao{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Qs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qs*2*Math.atan(Math.tan(Xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Rn.x,Rn.y).multiplyScalar(-e/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rn.x,Rn.y).multiplyScalar(-e/Rn.z)}getViewSize(e,t){return this.getViewBounds(e,wf,Af),t.subVectors(Af,wf)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Xr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Os=-90,Bs=1,yh=class extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new At(Os,Bs,e,t);s.layers=this.layers,this.add(s);let r=new At(Os,Bs,e,t);r.layers=this.layers,this.add(r);let a=new At(Os,Bs,e,t);a.layers=this.layers,this.add(a);let o=new At(Os,Bs,e,t);o.layers=this.layers,this.add(o);let l=new At(Os,Bs,e,t);l.layers=this.layers,this.add(l);let c=new At(Os,Bs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===So)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Eo=class extends It{constructor(e,t,n,s,r,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Ys,super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},_h=class extends Ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Eo(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Wt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new er(5,5,5),r=new yi({name:"CubemapFromEquirect",uniforms:tr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:Ln});r.uniforms.tEquirect.value=t;let a=new at(s,r),o=t.minFilter;return t.minFilter===Wi&&(t.minFilter=Wt),new yh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},gc=new R,D_=new R,U_=new Re,Zt=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=gc.subVectors(n,t).cross(D_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(gc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||U_.getNormalMatrix(e),s=this.coplanarPoint(gc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},rs=new _t,to=new R,hn=class{constructor(e=new Zt,t=new Zt,n=new Zt,s=new Zt,r=new Zt,a=new Zt){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ln){let n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],h=s[6],d=s[7],f=s[8],m=s[9],y=s[10],g=s[11],p=s[12],v=s[13],x=s[14],_=s[15];if(n[0].setComponents(l-r,d-c,g-f,_-p).normalize(),n[1].setComponents(l+r,d+c,g+f,_+p).normalize(),n[2].setComponents(l+a,d+u,g+m,_+v).normalize(),n[3].setComponents(l-a,d-u,g-m,_-v).normalize(),n[4].setComponents(l-o,d-h,g-y,_-x).normalize(),t===ln)n[5].setComponents(l+o,d+h,g+y,_+x).normalize();else if(t===So)n[5].setComponents(o,h,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(e){return rs.center.set(0,0,0),rs.radius=.7071067811865476,rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(to.x=s.normal.x>0?e.max.x:e.min.x,to.y=s.normal.y>0?e.max.y:e.min.y,to.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(to)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Bp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function N_(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){let m=h[d],y=h[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++d,h[d]=y)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){let y=h[f];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var ir=class i extends xt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=e/o,d=t/l,f=[],m=[],y=[],g=[];for(let p=0;p<u;p++){let v=p*d-a;for(let x=0;x<c;x++){let _=x*h-r;m.push(_,-v,0),y.push(0,0,1),g.push(x/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){let x=v+c*p,_=v+c*(p+1),w=v+1+c*(p+1),M=v+1+c*p;f.push(x,_,M),f.push(_,w,M)}this.setIndex(f),this.setAttribute("position",new Kt(m,3)),this.setAttribute("normal",new Kt(y,3)),this.setAttribute("uv",new Kt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},O_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,B_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,F_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,z_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,k_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,V_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,H_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,G_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,W_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,X_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,q_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Y_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,j_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Z_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,$_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,K_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,J_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Q_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,t0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,r0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,a0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,o0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,l0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,c0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,h0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,u0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,d0="gl_FragColor = linearToOutputTexel( gl_FragColor );",f0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,p0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,m0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,g0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,x0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,v0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,b0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,S0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,M0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,T0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,w0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,A0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,E0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,C0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,R0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,P0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,I0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,L0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,D0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,U0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,N0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,O0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,B0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,F0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,z0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,H0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,G0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,W0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,X0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,q0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Y0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,j0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Z0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,J0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ex=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ax=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ox=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ux=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,px=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,_x=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,xx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Mx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,wx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ax=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ex=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Px=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ux=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Nx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ox=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Gx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$x=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ev=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,nv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,av=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ov=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:O_,alphahash_pars_fragment:B_,alphamap_fragment:F_,alphamap_pars_fragment:z_,alphatest_fragment:k_,alphatest_pars_fragment:V_,aomap_fragment:H_,aomap_pars_fragment:G_,batching_pars_vertex:W_,batching_vertex:X_,begin_vertex:q_,beginnormal_vertex:Y_,bsdfs:j_,iridescence_fragment:Z_,bumpmap_pars_fragment:$_,clipping_planes_fragment:K_,clipping_planes_pars_fragment:J_,clipping_planes_pars_vertex:Q_,clipping_planes_vertex:e0,color_fragment:t0,color_pars_fragment:i0,color_pars_vertex:n0,color_vertex:s0,common:r0,cube_uv_reflection_fragment:a0,defaultnormal_vertex:o0,displacementmap_pars_vertex:l0,displacementmap_vertex:c0,emissivemap_fragment:h0,emissivemap_pars_fragment:u0,colorspace_fragment:d0,colorspace_pars_fragment:f0,envmap_fragment:p0,envmap_common_pars_fragment:m0,envmap_pars_fragment:g0,envmap_pars_vertex:y0,envmap_physical_pars_fragment:C0,envmap_vertex:_0,fog_vertex:x0,fog_pars_vertex:v0,fog_fragment:b0,fog_pars_fragment:S0,gradientmap_pars_fragment:M0,lightmap_pars_fragment:T0,lights_lambert_fragment:w0,lights_lambert_pars_fragment:A0,lights_pars_begin:E0,lights_toon_fragment:R0,lights_toon_pars_fragment:P0,lights_phong_fragment:I0,lights_phong_pars_fragment:L0,lights_physical_fragment:D0,lights_physical_pars_fragment:U0,lights_fragment_begin:N0,lights_fragment_maps:O0,lights_fragment_end:B0,logdepthbuf_fragment:F0,logdepthbuf_pars_fragment:z0,logdepthbuf_pars_vertex:k0,logdepthbuf_vertex:V0,map_fragment:H0,map_pars_fragment:G0,map_particle_fragment:W0,map_particle_pars_fragment:X0,metalnessmap_fragment:q0,metalnessmap_pars_fragment:Y0,morphinstance_vertex:j0,morphcolor_vertex:Z0,morphnormal_vertex:$0,morphtarget_pars_vertex:K0,morphtarget_vertex:J0,normal_fragment_begin:Q0,normal_fragment_maps:ex,normal_pars_fragment:tx,normal_pars_vertex:ix,normal_vertex:nx,normalmap_pars_fragment:sx,clearcoat_normal_fragment_begin:rx,clearcoat_normal_fragment_maps:ax,clearcoat_pars_fragment:ox,iridescence_pars_fragment:lx,opaque_fragment:cx,packing:hx,premultiplied_alpha_fragment:ux,project_vertex:dx,dithering_fragment:fx,dithering_pars_fragment:px,roughnessmap_fragment:mx,roughnessmap_pars_fragment:gx,shadowmap_pars_fragment:yx,shadowmap_pars_vertex:_x,shadowmap_vertex:xx,shadowmask_pars_fragment:vx,skinbase_vertex:bx,skinning_pars_vertex:Sx,skinning_vertex:Mx,skinnormal_vertex:Tx,specularmap_fragment:wx,specularmap_pars_fragment:Ax,tonemapping_fragment:Ex,tonemapping_pars_fragment:Cx,transmission_fragment:Rx,transmission_pars_fragment:Px,uv_pars_fragment:Ix,uv_pars_vertex:Lx,uv_vertex:Dx,worldpos_vertex:Ux,background_vert:Nx,background_frag:Ox,backgroundCube_vert:Bx,backgroundCube_frag:Fx,cube_vert:zx,cube_frag:kx,depth_vert:Vx,depth_frag:Hx,distanceRGBA_vert:Gx,distanceRGBA_frag:Wx,equirect_vert:Xx,equirect_frag:qx,linedashed_vert:Yx,linedashed_frag:jx,meshbasic_vert:Zx,meshbasic_frag:$x,meshlambert_vert:Kx,meshlambert_frag:Jx,meshmatcap_vert:Qx,meshmatcap_frag:ev,meshnormal_vert:tv,meshnormal_frag:iv,meshphong_vert:nv,meshphong_frag:sv,meshphysical_vert:rv,meshphysical_frag:av,meshtoon_vert:ov,meshtoon_frag:lv,points_vert:cv,points_frag:hv,shadow_vert:uv,shadow_frag:dv,sprite_vert:fv,sprite_frag:pv},ne={common:{diffuse:{value:new Se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Re},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Re}},envmap:{envMap:{value:null},envMapRotation:{value:new Re},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Re},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0},uvTransform:{value:new Re}},sprite:{diffuse:{value:new Se(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Re},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0}}},Gi={basic:{uniforms:jt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:jt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Se(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:jt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Se(0)},specular:{value:new Se(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:jt([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new Se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:jt([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new Se(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:jt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:jt([ne.points,ne.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:jt([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:jt([ne.common,ne.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:jt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:jt([ne.sprite,ne.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Re}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:jt([ne.common,ne.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:jt([ne.lights,ne.fog,{color:{value:new Se(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};Gi.physical={uniforms:jt([Gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Re},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Re},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Re},sheen:{value:0},sheenColor:{value:new Se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Re},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Re},attenuationDistance:{value:0},attenuationColor:{value:new Se(0)},specularColor:{value:new Se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Re},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Re}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};var io={r:0,b:0,g:0},as=new wi,mv=new te;function gv(i,e,t,n,s,r,a){let o=new Se(0),l=r===!0?0:1,c,u,h=null,d=0,f=null;function m(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function y(v){let x=!1,_=m(v);_===null?p(o,l):_&&_.isColor&&(p(_,1),x=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(v,x){let _=m(x);_&&(_.isCubeTexture||_.mapping===Yo)?(u===void 0&&(u=new at(new er(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:tr(Gi.backgroundCube.uniforms),vertexShader:Gi.backgroundCube.vertexShader,fragmentShader:Gi.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,M,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),as.copy(x.backgroundRotation),as.x*=-1,as.y*=-1,as.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(mv.makeRotationFromEuler(as)),u.material.toneMapped=ze.getTransfer(_.colorSpace)!==rt,(h!==_||d!==_.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new at(new ir(2,2),new yi({name:"BackgroundMaterial",uniforms:tr(Gi.background.uniforms),vertexShader:Gi.background.vertexShader,fragmentShader:Gi.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=ze.getTransfer(_.colorSpace)!==rt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,x){v.getRGB(io,Op(i)),n.buffers.color.setClear(io.r,io.g,io.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(v,x=1){o.set(v),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(o,l)},render:y,addToRenderList:g}}function yv(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(b,P,D,L,N){let V=!1,z=h(L,D,P);r!==z&&(r=z,c(r.object)),V=f(b,L,D,N),V&&m(b,L,D,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,_(b,P,D,L),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function u(b){return i.deleteVertexArray(b)}function h(b,P,D){let L=D.wireframe===!0,N=n[b.id];N===void 0&&(N={},n[b.id]=N);let V=N[P.id];V===void 0&&(V={},N[P.id]=V);let z=V[L];return z===void 0&&(z=d(l()),V[L]=z),z}function d(b){let P=[],D=[],L=[];for(let N=0;N<t;N++)P[N]=0,D[N]=0,L[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:L,object:b,attributes:{},index:null}}function f(b,P,D,L){let N=r.attributes,V=P.attributes,z=0,K=D.getAttributes();for(let W in K)if(K[W].location>=0){let he=N[W],xe=V[W];if(xe===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(xe=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(xe=b.instanceColor)),he===void 0||he.attribute!==xe||xe&&he.data!==xe.data)return!0;z++}return r.attributesNum!==z||r.index!==L}function m(b,P,D,L){let N={},V=P.attributes,z=0,K=D.getAttributes();for(let W in K)if(K[W].location>=0){let he=V[W];he===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(he=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(he=b.instanceColor));let xe={};xe.attribute=he,he&&he.data&&(xe.data=he.data),N[W]=xe,z++}r.attributes=N,r.attributesNum=z,r.index=L}function y(){let b=r.newAttributes;for(let P=0,D=b.length;P<D;P++)b[P]=0}function g(b){p(b,0)}function p(b,P){let D=r.newAttributes,L=r.enabledAttributes,N=r.attributeDivisors;D[b]=1,L[b]===0&&(i.enableVertexAttribArray(b),L[b]=1),N[b]!==P&&(i.vertexAttribDivisor(b,P),N[b]=P)}function v(){let b=r.newAttributes,P=r.enabledAttributes;for(let D=0,L=P.length;D<L;D++)P[D]!==b[D]&&(i.disableVertexAttribArray(D),P[D]=0)}function x(b,P,D,L,N,V,z){z===!0?i.vertexAttribIPointer(b,P,D,N,V):i.vertexAttribPointer(b,P,D,L,N,V)}function _(b,P,D,L){y();let N=L.attributes,V=D.getAttributes(),z=P.defaultAttributeValues;for(let K in V){let W=V[K];if(W.location>=0){let ie=N[K];if(ie===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(ie=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(ie=b.instanceColor)),ie!==void 0){let he=ie.normalized,xe=ie.itemSize,Le=e.get(ie);if(Le===void 0)continue;let Qe=Le.buffer,q=Le.type,J=Le.bytesPerElement,me=q===i.INT||q===i.UNSIGNED_INT||ie.gpuType===jh;if(ie.isInterleavedBufferAttribute){let se=ie.data,Te=se.stride,Pe=ie.offset;if(se.isInstancedInterleavedBuffer){for(let Fe=0;Fe<W.locationSize;Fe++)p(W.location+Fe,se.meshPerAttribute);b.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Fe=0;Fe<W.locationSize;Fe++)g(W.location+Fe);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let Fe=0;Fe<W.locationSize;Fe++)x(W.location+Fe,xe/W.locationSize,q,he,Te*J,(Pe+xe/W.locationSize*Fe)*J,me)}else{if(ie.isInstancedBufferAttribute){for(let se=0;se<W.locationSize;se++)p(W.location+se,ie.meshPerAttribute);b.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let se=0;se<W.locationSize;se++)g(W.location+se);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let se=0;se<W.locationSize;se++)x(W.location+se,xe/W.locationSize,q,he,xe*J,xe/W.locationSize*se*J,me)}}else if(z!==void 0){let he=z[K];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(W.location,he);break;case 3:i.vertexAttrib3fv(W.location,he);break;case 4:i.vertexAttrib4fv(W.location,he);break;default:i.vertexAttrib1fv(W.location,he)}}}}v()}function w(){C();for(let b in n){let P=n[b];for(let D in P){let L=P[D];for(let N in L)u(L[N].object),delete L[N];delete P[D]}delete n[b]}}function M(b){if(n[b.id]===void 0)return;let P=n[b.id];for(let D in P){let L=P[D];for(let N in L)u(L[N].object),delete L[N];delete P[D]}delete n[b.id]}function T(b){for(let P in n){let D=n[P];if(D[b.id]===void 0)continue;let L=D[b.id];for(let N in L)u(L[N].object),delete L[N];delete D[b.id]}}function C(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:S,dispose:w,releaseStatesOfGeometry:M,releaseStatesOfProgram:T,initAttributes:y,enableAttribute:g,disableUnusedAttributes:v}}function _v(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let m=0;for(let y=0;y<h;y++)m+=u[y]*d[y];t.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function xv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==ri&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let C=T===aa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Bi&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==si&&!C)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=m>0,M=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:w,maxSamples:M}}function vv(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Zt,o=new Re,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let m=h.clippingPlanes,y=h.clipIntersection,g=h.clipShadows,p=i.get(h);if(!s||m===null||m.length===0||r&&!g)r?u(null):c();else{let v=r?0:n,x=v*4,_=p.clippingState||null;l.value=_,_=u(m,d,x,f);for(let w=0;w!==x;++w)_[w]=t[w];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,m){let y=h!==null?h.length:0,g=null;if(y!==0){if(g=l.value,m!==!0||g===null){let p=f+y*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,_=f;x!==y;++x,_+=4)a.copy(h[x]).applyMatrix4(v,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function bv(i){let e=new WeakMap;function t(a,o){return o===zc?a.mapping=Ys:o===kc&&(a.mapping=js),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===zc||o===kc)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new _h(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var un=class extends Ao{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vs=4,Ef=[.125,.215,.35,.446,.526,.582],ds=20,yc=new un,Cf=new Se,_c=null,xc=0,vc=0,bc=!1,hs=(1+Math.sqrt(5))/2,Fs=1/hs,Rf=[new R(-hs,Fs,0),new R(hs,Fs,0),new R(-Fs,0,hs),new R(Fs,0,hs),new R(0,hs,-Fs),new R(0,hs,Fs),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],Co=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){_c=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),bc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=If(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_c,xc,vc),this._renderer.xr.enabled=bc,e.scissorTest=!1,no(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ys||e.mapping===js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_c=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),bc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:aa,format:ri,colorSpace:Lt,depthBuffer:!1},s=Pf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pf(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sv(r)),this._blurMaterial=Mv(r,e,t)}return s}_compileMaterial(e){let t=new at(this._lodPlanes[0],e);this._renderer.compile(t,yc)}_sceneToCubeUV(e,t,n,s){let o=new At(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Cf),u.toneMapping=Dn,u.autoClear=!1;let f=new gi({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),m=new at(new er,f),y=!1,g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,y=!0):(f.color.copy(Cf),y=!0);for(let p=0;p<6;p++){let v=p%3;v===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):v===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let x=this._cubeSize;no(s,v*x,p>2?x:0,x,x),u.setRenderTarget(s),y&&u.render(m,o),u.render(e,o)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=g}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ys||e.mapping===js;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=If());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new at(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;no(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,yc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Rf[(s-r-1)%Rf.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new at(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ds-1),y=r/m,g=isFinite(r)?1+Math.floor(u*y):ds;g>ds&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ds}`);let p=[],v=0;for(let T=0;T<ds;++T){let C=T/y,S=Math.exp(-C*C/2);p.push(S),T===0?v+=S:T<g&&(v+=2*S)}for(let T=0;T<p.length;T++)p[T]=p[T]/v;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:x}=this;d.dTheta.value=m,d.mipInt.value=x-n;let _=this._sizeLods[s],w=3*_*(s>x-Vs?s-x+Vs:0),M=4*(this._cubeSize-_);no(t,w,M,3*_,2*_),l.setRenderTarget(t),l.render(h,yc)}};function Sv(i){let e=[],t=[],n=[],s=i,r=i-Vs+1+Ef.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Vs?l=Ef[a-i+Vs-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,y=3,g=2,p=1,v=new Float32Array(y*m*f),x=new Float32Array(g*m*f),_=new Float32Array(p*m*f);for(let M=0;M<f;M++){let T=M%3*2/3-1,C=M>2?0:-1,S=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];v.set(S,y*m*M),x.set(d,g*m*M);let b=[M,M,M,M,M,M];_.set(b,p*m*M)}let w=new xt;w.setAttribute("position",new Be(v,y)),w.setAttribute("uv",new Be(x,g)),w.setAttribute("faceIndex",new Be(_,p)),e.push(w),s>Vs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Pf(i,e,t){let n=new Ti(i,e,t);return n.texture.mapping=Yo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function no(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Mv(i,e,t){let n=new Float32Array(ds),s=new R(0,1,0);return new yi({name:"SphericalGaussianBlur",defines:{n:ds,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Qh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function If(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Lf(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Qh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Tv(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===zc||l===kc,u=l===Ys||l===js;if(c||u){let h=e.get(o),d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Co(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{let f=o.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new Co(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function wv(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Hr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Av(i,e,t,n){let s={},r=new WeakMap;function a(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);for(let m in d.morphAttributes){let y=d.morphAttributes[m];for(let g=0,p=y.length;g<p;g++)e.remove(y[g])}d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let m in d)e.update(d[m],i.ARRAY_BUFFER);let f=h.morphAttributes;for(let m in f){let y=f[m];for(let g=0,p=y.length;g<p;g++)e.update(y[g],i.ARRAY_BUFFER)}}function c(h){let d=[],f=h.index,m=h.attributes.position,y=0;if(f!==null){let v=f.array;y=f.version;for(let x=0,_=v.length;x<_;x+=3){let w=v[x+0],M=v[x+1],T=v[x+2];d.push(w,M,M,T,T,w)}}else if(m!==void 0){let v=m.array;y=m.version;for(let x=0,_=v.length/3-1;x<_;x+=3){let w=x+0,M=x+1,T=x+2;d.push(w,M,M,T,T,w)}}else return;let g=new(Up(d)?wo:To)(d,1);g.version=y;let p=r.get(h);p&&e.remove(p),r.set(h,g)}function u(h){let d=r.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Ev(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*a,m),t.update(f,n,m))}function u(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function h(d,f,m,y){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],y[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,y,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v]*y[v];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Cv(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Rv(i,e,t){let n=new WeakMap,s=new Ze;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(o);if(d===void 0||d.count!==h){let S=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],x=0;f===!0&&(x=1),m===!0&&(x=2),y===!0&&(x=3);let _=o.attributes.position.count*x,w=1;_>e.maxTextureSize&&(w=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let M=new Float32Array(_*w*4*h),T=new Mo(M,_,w,h);T.type=si,T.needsUpdate=!0;let C=x*4;for(let b=0;b<h;b++){let P=g[b],D=p[b],L=v[b],N=_*w*4*b;for(let V=0;V<P.count;V++){let z=V*C;f===!0&&(s.fromBufferAttribute(P,V),M[N+z+0]=s.x,M[N+z+1]=s.y,M[N+z+2]=s.z,M[N+z+3]=0),m===!0&&(s.fromBufferAttribute(D,V),M[N+z+4]=s.x,M[N+z+5]=s.y,M[N+z+6]=s.z,M[N+z+7]=0),y===!0&&(s.fromBufferAttribute(L,V),M[N+z+8]=s.x,M[N+z+9]=s.y,M[N+z+10]=s.z,M[N+z+11]=L.itemSize===4?s.w:1)}}d={count:h,texture:T,size:new ue(_,w)},n.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Pv(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return h}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var Ro=class extends It{constructor(e,t,n,s,r,a,o,l,c,u=Gs){if(u!==Gs&&u!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Gs&&(n=Un),n===void 0&&u===$s&&(n=Zs),super(null,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Nt,this.minFilter=l!==void 0?l:Nt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Fp=new It,Df=new Ro(1,1),zp=new Mo,kp=new gh,Vp=new Eo,Uf=[],Nf=[],Of=new Float32Array(16),Bf=new Float32Array(9),Ff=new Float32Array(4);function lr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Uf[s];if(r===void 0&&(r=new Float32Array(s),Uf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ct(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function el(i,e){let t=Nf[e];t===void 0&&(t=new Int32Array(e),Nf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Iv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Lv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),Ct(t,e)}}function Dv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),Ct(t,e)}}function Uv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),Ct(t,e)}}function Nv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Et(t,n))return;Ff.set(n),i.uniformMatrix2fv(this.addr,!1,Ff),Ct(t,n)}}function Ov(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Et(t,n))return;Bf.set(n),i.uniformMatrix3fv(this.addr,!1,Bf),Ct(t,n)}}function Bv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Et(t,n))return;Of.set(n),i.uniformMatrix4fv(this.addr,!1,Of),Ct(t,n)}}function Fv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function zv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),Ct(t,e)}}function kv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),Ct(t,e)}}function Vv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),Ct(t,e)}}function Hv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Gv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),Ct(t,e)}}function Wv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),Ct(t,e)}}function Xv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),Ct(t,e)}}function qv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Df.compareFunction=Dp,r=Df):r=Fp,t.setTexture2D(e||r,s)}function Yv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||kp,s)}function jv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Vp,s)}function Zv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||zp,s)}function $v(i){switch(i){case 5126:return Iv;case 35664:return Lv;case 35665:return Dv;case 35666:return Uv;case 35674:return Nv;case 35675:return Ov;case 35676:return Bv;case 5124:case 35670:return Fv;case 35667:case 35671:return zv;case 35668:case 35672:return kv;case 35669:case 35673:return Vv;case 5125:return Hv;case 36294:return Gv;case 36295:return Wv;case 36296:return Xv;case 35678:case 36198:case 36298:case 36306:case 35682:return qv;case 35679:case 36299:case 36307:return Yv;case 35680:case 36300:case 36308:case 36293:return jv;case 36289:case 36303:case 36311:case 36292:return Zv}}function Kv(i,e){i.uniform1fv(this.addr,e)}function Jv(i,e){let t=lr(e,this.size,2);i.uniform2fv(this.addr,t)}function Qv(i,e){let t=lr(e,this.size,3);i.uniform3fv(this.addr,t)}function eb(i,e){let t=lr(e,this.size,4);i.uniform4fv(this.addr,t)}function tb(i,e){let t=lr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ib(i,e){let t=lr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function nb(i,e){let t=lr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function sb(i,e){i.uniform1iv(this.addr,e)}function rb(i,e){i.uniform2iv(this.addr,e)}function ab(i,e){i.uniform3iv(this.addr,e)}function ob(i,e){i.uniform4iv(this.addr,e)}function lb(i,e){i.uniform1uiv(this.addr,e)}function cb(i,e){i.uniform2uiv(this.addr,e)}function hb(i,e){i.uniform3uiv(this.addr,e)}function ub(i,e){i.uniform4uiv(this.addr,e)}function db(i,e,t){let n=this.cache,s=e.length,r=el(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Fp,r[a])}function fb(i,e,t){let n=this.cache,s=e.length,r=el(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||kp,r[a])}function pb(i,e,t){let n=this.cache,s=e.length,r=el(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Vp,r[a])}function mb(i,e,t){let n=this.cache,s=e.length,r=el(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||zp,r[a])}function gb(i){switch(i){case 5126:return Kv;case 35664:return Jv;case 35665:return Qv;case 35666:return eb;case 35674:return tb;case 35675:return ib;case 35676:return nb;case 5124:case 35670:return sb;case 35667:case 35671:return rb;case 35668:case 35672:return ab;case 35669:case 35673:return ob;case 5125:return lb;case 36294:return cb;case 36295:return hb;case 36296:return ub;case 35678:case 36198:case 36298:case 36306:case 35682:return db;case 35679:case 36299:case 36307:return fb;case 35680:case 36300:case 36308:case 36293:return pb;case 36289:case 36303:case 36311:case 36292:return mb}}var xh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$v(t.type)}},vh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gb(t.type)}},bh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Sc=/(\w+)(\])?(\[|\.)?/g;function zf(i,e){i.seq.push(e),i.map[e.id]=e}function yb(i,e,t){let n=i.name,s=n.length;for(Sc.lastIndex=0;;){let r=Sc.exec(n),a=Sc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){zf(t,c===void 0?new xh(o,i,e):new vh(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new bh(o),zf(t,h)),t=h}}}var Xs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);yb(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function kf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var _b=37297,xb=0;function vb(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Vf=new Re;function bb(i){ze._getMatrix(Vf,ze.workingColorSpace,i);let e=`mat3( ${Vf.elements.map(t=>t.toFixed(4))} )`;switch(ze.getTransfer(i)){case Qo:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Hf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+vb(i.getShaderSource(e),a)}else return s}function Sb(i,e){let t=bb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Mb(i,e){let t;switch(e){case Ly:t="Linear";break;case Dy:t="Reinhard";break;case Uy:t="Cineon";break;case Ny:t="ACESFilmic";break;case By:t="AgX";break;case Fy:t="Neutral";break;case Oy:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var so=new R;function Tb(){ze.getLuminanceCoefficients(so);let i=so.x.toFixed(4),e=so.y.toFixed(4),t=so.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gr).join(`
`)}function Ab(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Eb(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Gr(i){return i!==""}function Gf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Cb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sh(i){return i.replace(Cb,Pb)}var Rb=new Map;function Pb(i,e){let t=Oe[e];if(t===void 0){let n=Rb.get(e);if(n!==void 0)t=Oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Sh(t)}var Ib=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xf(i){return i.replace(Ib,Lb)}function Lb(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function qf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Db(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===vp?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===py?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===an&&(e="SHADOWMAP_TYPE_VSM"),e}function Ub(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ys:case js:e="ENVMAP_TYPE_CUBE";break;case Yo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Nb(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===js&&(e="ENVMAP_MODE_REFRACTION"),e}function Ob(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case bp:e="ENVMAP_BLENDING_MULTIPLY";break;case Py:e="ENVMAP_BLENDING_MIX";break;case Iy:e="ENVMAP_BLENDING_ADD";break}return e}function Bb(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Fb(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Db(t),c=Ub(t),u=Nb(t),h=Ob(t),d=Bb(t),f=wb(t),m=Ab(r),y=s.createProgram(),g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Gr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Gr).join(`
`),p.length>0&&(p+=`
`)):(g=[qf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gr).join(`
`),p=[qf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dn?"#define TONE_MAPPING":"",t.toneMapping!==Dn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Dn?Mb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,Sb("linearToOutputTexel",t.outputColorSpace),Tb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gr).join(`
`)),a=Sh(a),a=Gf(a,t),a=Wf(a,t),o=Sh(o),o=Gf(o,t),o=Wf(o,t),a=Xf(a),o=Xf(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===rf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let x=v+g+a,_=v+p+o,w=kf(s,s.VERTEX_SHADER,x),M=kf(s,s.FRAGMENT_SHADER,_);s.attachShader(y,w),s.attachShader(y,M),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function T(P){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(y).trim(),L=s.getShaderInfoLog(w).trim(),N=s.getShaderInfoLog(M).trim(),V=!0,z=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,w,M);else{let K=Hf(s,w,"vertex"),W=Hf(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+D+`
`+K+`
`+W)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(L===""||N==="")&&(z=!1);z&&(P.diagnostics={runnable:V,programLog:D,vertexShader:{log:L,prefix:g},fragmentShader:{log:N,prefix:p}})}s.deleteShader(w),s.deleteShader(M),C=new Xs(s,y),S=Eb(s,y)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(y,_b)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xb++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=w,this.fragmentShader=M,this}var zb=0,Mh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Th(e),t.set(e,n)),n}},Th=class{constructor(e){this.id=zb++,this.code=e,this.usedTimes=0}};function kb(i,e,t,n,s,r,a){let o=new Jr,l=new Mh,c=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,b,P,D,L){let N=D.fog,V=L.geometry,z=S.isMeshStandardMaterial?D.environment:null,K=(S.isMeshStandardMaterial?t:e).get(S.envMap||z),W=K&&K.mapping===Yo?K.image.height:null,ie=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let he=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,xe=he!==void 0?he.length:0,Le=0;V.morphAttributes.position!==void 0&&(Le=1),V.morphAttributes.normal!==void 0&&(Le=2),V.morphAttributes.color!==void 0&&(Le=3);let Qe,q,J,me;if(ie){let nt=Gi[ie];Qe=nt.vertexShader,q=nt.fragmentShader}else Qe=S.vertexShader,q=S.fragmentShader,l.update(S),J=l.getVertexShaderID(S),me=l.getFragmentShaderID(S);let se=i.getRenderTarget(),Te=i.state.buffers.depth.getReversed(),Pe=L.isInstancedMesh===!0,Fe=L.isBatchedMesh===!0,dt=!!S.map,ke=!!S.matcap,Mt=!!K,F=!!S.aoMap,bi=!!S.lightMap,We=!!S.bumpMap,Xe=!!S.normalMap,we=!!S.displacementMap,ft=!!S.emissiveMap,Me=!!S.metalnessMap,I=!!S.roughnessMap,A=S.anisotropy>0,k=S.clearcoat>0,j=S.dispersion>0,$=S.iridescence>0,Y=S.sheen>0,ve=S.transmission>0,ae=A&&!!S.anisotropyMap,de=k&&!!S.clearcoatMap,je=k&&!!S.clearcoatNormalMap,Q=k&&!!S.clearcoatRoughnessMap,fe=$&&!!S.iridescenceMap,Ae=$&&!!S.iridescenceThicknessMap,Ce=Y&&!!S.sheenColorMap,pe=Y&&!!S.sheenRoughnessMap,qe=!!S.specularMap,Ne=!!S.specularColorMap,ct=!!S.specularIntensityMap,U=ve&&!!S.transmissionMap,re=ve&&!!S.thicknessMap,X=!!S.gradientMap,Z=!!S.alphaMap,ce=S.alphaTest>0,oe=!!S.alphaHash,De=!!S.extensions,bt=Dn;S.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(bt=i.toneMapping);let zt={shaderID:ie,shaderType:S.type,shaderName:S.name,vertexShader:Qe,fragmentShader:q,defines:S.defines,customVertexShaderID:J,customFragmentShaderID:me,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Fe,batchingColor:Fe&&L._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&L.instanceColor!==null,instancingMorph:Pe&&L.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Lt,alphaToCoverage:!!S.alphaToCoverage,map:dt,matcap:ke,envMap:Mt,envMapMode:Mt&&K.mapping,envMapCubeUVHeight:W,aoMap:F,lightMap:bi,bumpMap:We,normalMap:Xe,displacementMap:d&&we,emissiveMap:ft,normalMapObjectSpace:Xe&&S.normalMapType===Gy,normalMapTangentSpace:Xe&&S.normalMapType===Lp,metalnessMap:Me,roughnessMap:I,anisotropy:A,anisotropyMap:ae,clearcoat:k,clearcoatMap:de,clearcoatNormalMap:je,clearcoatRoughnessMap:Q,dispersion:j,iridescence:$,iridescenceMap:fe,iridescenceThicknessMap:Ae,sheen:Y,sheenColorMap:Ce,sheenRoughnessMap:pe,specularMap:qe,specularColorMap:Ne,specularIntensityMap:ct,transmission:ve,transmissionMap:U,thicknessMap:re,gradientMap:X,opaque:S.transparent===!1&&S.blending===Hs&&S.alphaToCoverage===!1,alphaMap:Z,alphaTest:ce,alphaHash:oe,combine:S.combine,mapUv:dt&&y(S.map.channel),aoMapUv:F&&y(S.aoMap.channel),lightMapUv:bi&&y(S.lightMap.channel),bumpMapUv:We&&y(S.bumpMap.channel),normalMapUv:Xe&&y(S.normalMap.channel),displacementMapUv:we&&y(S.displacementMap.channel),emissiveMapUv:ft&&y(S.emissiveMap.channel),metalnessMapUv:Me&&y(S.metalnessMap.channel),roughnessMapUv:I&&y(S.roughnessMap.channel),anisotropyMapUv:ae&&y(S.anisotropyMap.channel),clearcoatMapUv:de&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:je&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ae&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:pe&&y(S.sheenRoughnessMap.channel),specularMapUv:qe&&y(S.specularMap.channel),specularColorMapUv:Ne&&y(S.specularColorMap.channel),specularIntensityMapUv:ct&&y(S.specularIntensityMap.channel),transmissionMapUv:U&&y(S.transmissionMap.channel),thicknessMapUv:re&&y(S.thicknessMap.channel),alphaMapUv:Z&&y(S.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Xe||A),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!V.attributes.uv&&(dt||Z),fog:!!N,useFog:S.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Te,skinning:L.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Le,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:bt,decodeVideoTexture:dt&&S.map.isVideoTexture===!0&&ze.getTransfer(S.map.colorSpace)===rt,decodeVideoTextureEmissive:ft&&S.emissiveMap.isVideoTexture===!0&&ze.getTransfer(S.emissiveMap.colorSpace)===rt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ni,flipSided:S.side===Xt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:De&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&S.extensions.multiDraw===!0||Fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return zt.vertexUv1s=c.has(1),zt.vertexUv2s=c.has(2),zt.vertexUv3s=c.has(3),c.clear(),zt}function p(S){let b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)b.push(P),b.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(v(b,S),x(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function v(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function x(S,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),S.push(o.mask)}function _(S){let b=m[S.type],P;if(b){let D=Gi[b];P=P_.clone(D.uniforms)}else P=S.uniforms;return P}function w(S,b){let P;for(let D=0,L=u.length;D<L;D++){let N=u[D];if(N.cacheKey===b){P=N,++P.usedTimes;break}}return P===void 0&&(P=new Fb(i,b,S,r),u.push(P)),P}function M(S){if(--S.usedTimes===0){let b=u.indexOf(S);u[b]=u[u.length-1],u.pop(),S.destroy()}}function T(S){l.remove(S)}function C(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:w,releaseProgram:M,releaseShaderCache:T,programs:u,dispose:C}}function Vb(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Hb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Yf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function jf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,f,m,y,g){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:y,group:g},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=y,p.group=g),e++,p}function o(h,d,f,m,y,g){let p=a(h,d,f,m,y,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(h,d,f,m,y,g){let p=a(h,d,f,m,y,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||Hb),n.length>1&&n.sort(d||Yf),s.length>1&&s.sort(d||Yf)}function u(){for(let h=e,d=i.length;h<d;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function Gb(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new jf,i.set(n,[a])):s>=r.length?(a=new jf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Wb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Se};break;case"SpotLight":t={position:new R,direction:new R,color:new Se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Se,groundColor:new Se};break;case"RectAreaLight":t={color:new Se,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function Xb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var qb=0;function Yb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function jb(i){let e=new Wb,t=Xb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);let s=new R,r=new te,a=new te;function o(c){let u=0,h=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,v=0,x=0,_=0,w=0,M=0,T=0;c.sort(Yb);for(let S=0,b=c.length;S<b;S++){let P=c[S],D=P.color,L=P.intensity,N=P.distance,V=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=D.r*L,h+=D.g*L,d+=D.b*L;else if(P.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(P.sh.coefficients[z],L);T++}else if(P.isDirectionalLight){let z=e.get(P);if(z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let K=P.shadow,W=t.get(P);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=V,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=z,f++}else if(P.isSpotLight){let z=e.get(P);z.position.setFromMatrixPosition(P.matrixWorld),z.color.copy(D).multiplyScalar(L),z.distance=N,z.coneCos=Math.cos(P.angle),z.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),z.decay=P.decay,n.spot[y]=z;let K=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,K.updateMatrices(P),P.castShadow&&M++),n.spotLightMatrix[y]=K.matrix,P.castShadow){let W=t.get(P);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,n.spotShadow[y]=W,n.spotShadowMap[y]=V,_++}y++}else if(P.isRectAreaLight){let z=e.get(P);z.color.copy(D).multiplyScalar(L),z.halfWidth.set(P.width*.5,0,0),z.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=z,g++}else if(P.isPointLight){let z=e.get(P);if(z.color.copy(P.color).multiplyScalar(P.intensity),z.distance=P.distance,z.decay=P.decay,P.castShadow){let K=P.shadow,W=t.get(P);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,W.shadowCameraNear=K.camera.near,W.shadowCameraFar=K.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=V,n.pointShadowMatrix[m]=P.shadow.matrix,x++}n.point[m]=z,m++}else if(P.isHemisphereLight){let z=e.get(P);z.skyColor.copy(P.color).multiplyScalar(L),z.groundColor.copy(P.groundColor).multiplyScalar(L),n.hemi[p]=z,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ne.LTC_FLOAT_1,n.rectAreaLTC2=ne.LTC_FLOAT_2):(n.rectAreaLTC1=ne.LTC_HALF_1,n.rectAreaLTC2=ne.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let C=n.hash;(C.directionalLength!==f||C.pointLength!==m||C.spotLength!==y||C.rectAreaLength!==g||C.hemiLength!==p||C.numDirectionalShadows!==v||C.numPointShadows!==x||C.numSpotShadows!==_||C.numSpotMaps!==w||C.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=_+w-M,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=T,C.directionalLength=f,C.pointLength=m,C.spotLength=y,C.rectAreaLength=g,C.hemiLength=p,C.numDirectionalShadows=v,C.numPointShadows=x,C.numSpotShadows=_,C.numSpotMaps=w,C.numLightProbes=T,n.version=qb++)}function l(c,u){let h=0,d=0,f=0,m=0,y=0,g=u.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){let x=c[p];if(x.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),h++}else if(x.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(x.isRectAreaLight){let _=n.rectArea[m];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(g),a.identity(),r.copy(x.matrixWorld),r.premultiply(g),a.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(x.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:n}}function Zf(i){let e=new jb(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Zb(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Zf(i),e.set(s,[o])):r>=a.length?(o=new Zf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var wh=class extends mi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Vy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ah=class extends mi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},$b=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Jb(i,e,t){let n=new hn,s=new ue,r=new ue,a=new Ze,o=new wh({depthPacking:Hy}),l=new Ah,c={},u=t.maxTextureSize,h={[pi]:Xt,[Xt]:pi,[ni]:ni},d=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:$b,fragmentShader:Kb}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new xt;m.setAttribute("position",new Be(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new at(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vp;let p=this.type;this.render=function(M,T,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;let S=i.getRenderTarget(),b=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Ln),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let L=p!==an&&this.type===an,N=p===an&&this.type!==an;for(let V=0,z=M.length;V<z;V++){let K=M[V],W=K.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let ie=W.getFrameExtents();if(s.multiply(ie),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ie.x),s.x=r.x*ie.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ie.y),s.y=r.y*ie.y,W.mapSize.y=r.y)),W.map===null||L===!0||N===!0){let xe=this.type!==an?{minFilter:Nt,magFilter:Nt}:{};W.map!==null&&W.map.dispose(),W.map=new Ti(s.x,s.y,xe),W.map.texture.name=K.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();let he=W.getViewportCount();for(let xe=0;xe<he;xe++){let Le=W.getViewport(xe);a.set(r.x*Le.x,r.y*Le.y,r.x*Le.z,r.y*Le.w),D.viewport(a),W.updateMatrices(K,xe),n=W.getFrustum(),_(T,C,W.camera,K,this.type)}W.isPointLightShadow!==!0&&this.type===an&&v(W,C),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,b,P)};function v(M,T){let C=e.update(y);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Ti(s.x,s.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(T,null,C,d,y,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(T,null,C,f,y,null)}function x(M,T,C,S){let b=null,P=C.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)b=P;else if(b=C.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){let D=b.uuid,L=T.uuid,N=c[D];N===void 0&&(N={},c[D]=N);let V=N[L];V===void 0&&(V=b.clone(),N[L]=V,T.addEventListener("dispose",w)),b=V}if(b.visible=T.visible,b.wireframe=T.wireframe,S===an?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:h[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,C.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let D=i.properties.get(b);D.light=C}return b}function _(M,T,C,S,b){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&b===an)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,M.matrixWorld);let L=e.update(M),N=M.material;if(Array.isArray(N)){let V=L.groups;for(let z=0,K=V.length;z<K;z++){let W=V[z],ie=N[W.materialIndex];if(ie&&ie.visible){let he=x(M,ie,S,b);M.onBeforeShadow(i,M,T,C,L,he,W),i.renderBufferDirect(C,null,L,he,M,W),M.onAfterShadow(i,M,T,C,L,he,W)}}}else if(N.visible){let V=x(M,N,S,b);M.onBeforeShadow(i,M,T,C,L,V,null),i.renderBufferDirect(C,null,L,V,M,null),M.onAfterShadow(i,M,T,C,L,V,null)}}let D=M.children;for(let L=0,N=D.length;L<N;L++)_(D[L],T,C,S,b)}function w(M){M.target.removeEventListener("dispose",w);for(let C in c){let S=c[C],b=M.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}var Qb={[Dc]:Uc,[Nc]:bo,[Oc]:Fc,[qs]:Bc,[Uc]:Dc,[bo]:Nc,[Fc]:Oc,[Bc]:qs};function eS(i,e){function t(){let U=!1,re=new Ze,X=null,Z=new Ze(0,0,0,0);return{setMask:function(ce){X!==ce&&!U&&(i.colorMask(ce,ce,ce,ce),X=ce)},setLocked:function(ce){U=ce},setClear:function(ce,oe,De,bt,zt){zt===!0&&(ce*=bt,oe*=bt,De*=bt),re.set(ce,oe,De,bt),Z.equals(re)===!1&&(i.clearColor(ce,oe,De,bt),Z.copy(re))},reset:function(){U=!1,X=null,Z.set(-1,0,0,0)}}}function n(){let U=!1,re=!1,X=null,Z=null,ce=null;return{setReversed:function(oe){if(re!==oe){let De=e.get("EXT_clip_control");re?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);let bt=ce;ce=null,this.setClear(bt)}re=oe},getReversed:function(){return re},setTest:function(oe){oe?se(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(oe){X!==oe&&!U&&(i.depthMask(oe),X=oe)},setFunc:function(oe){if(re&&(oe=Qb[oe]),Z!==oe){switch(oe){case Dc:i.depthFunc(i.NEVER);break;case Uc:i.depthFunc(i.ALWAYS);break;case Nc:i.depthFunc(i.LESS);break;case qs:i.depthFunc(i.LEQUAL);break;case Oc:i.depthFunc(i.EQUAL);break;case Bc:i.depthFunc(i.GEQUAL);break;case bo:i.depthFunc(i.GREATER);break;case Fc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=oe}},setLocked:function(oe){U=oe},setClear:function(oe){ce!==oe&&(re&&(oe=1-oe),i.clearDepth(oe),ce=oe)},reset:function(){U=!1,X=null,Z=null,ce=null,re=!1}}}function s(){let U=!1,re=null,X=null,Z=null,ce=null,oe=null,De=null,bt=null,zt=null;return{setTest:function(nt){U||(nt?se(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(nt){re!==nt&&!U&&(i.stencilMask(nt),re=nt)},setFunc:function(nt,Pi,Ki){(X!==nt||Z!==Pi||ce!==Ki)&&(i.stencilFunc(nt,Pi,Ki),X=nt,Z=Pi,ce=Ki)},setOp:function(nt,Pi,Ki){(oe!==nt||De!==Pi||bt!==Ki)&&(i.stencilOp(nt,Pi,Ki),oe=nt,De=Pi,bt=Ki)},setLocked:function(nt){U=nt},setClear:function(nt){zt!==nt&&(i.clearStencil(nt),zt=nt)},reset:function(){U=!1,re=null,X=null,Z=null,ce=null,oe=null,De=null,bt=null,zt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},h={},d=new WeakMap,f=[],m=null,y=!1,g=null,p=null,v=null,x=null,_=null,w=null,M=null,T=new Se(0,0,0),C=0,S=!1,b=null,P=null,D=null,L=null,N=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,K=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(W)[1]),z=K>=1):W.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),z=K>=2);let ie=null,he={},xe=i.getParameter(i.SCISSOR_BOX),Le=i.getParameter(i.VIEWPORT),Qe=new Ze().fromArray(xe),q=new Ze().fromArray(Le);function J(U,re,X,Z){let ce=new Uint8Array(4),oe=i.createTexture();i.bindTexture(U,oe),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<X;De++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,ce):i.texImage2D(re+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ce);return oe}let me={};me[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),me[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),me[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(i.DEPTH_TEST),a.setFunc(qs),We(!1),Xe(Zd),se(i.CULL_FACE),F(Ln);function se(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function Te(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Pe(U,re){return h[U]!==re?(i.bindFramebuffer(U,re),h[U]=re,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=re),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=re),!0):!1}function Fe(U,re){let X=f,Z=!1;if(U){X=d.get(re),X===void 0&&(X=[],d.set(re,X));let ce=U.textures;if(X.length!==ce.length||X[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,De=ce.length;oe<De;oe++)X[oe]=i.COLOR_ATTACHMENT0+oe;X.length=ce.length,Z=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,Z=!0);Z&&i.drawBuffers(X)}function dt(U){return m!==U?(i.useProgram(U),m=U,!0):!1}let ke={[us]:i.FUNC_ADD,[my]:i.FUNC_SUBTRACT,[gy]:i.FUNC_REVERSE_SUBTRACT};ke[yy]=i.MIN,ke[_y]=i.MAX;let Mt={[Xh]:i.ZERO,[qh]:i.ONE,[xy]:i.SRC_COLOR,[Ic]:i.SRC_ALPHA,[wy]:i.SRC_ALPHA_SATURATE,[My]:i.DST_COLOR,[by]:i.DST_ALPHA,[vy]:i.ONE_MINUS_SRC_COLOR,[Lc]:i.ONE_MINUS_SRC_ALPHA,[Ty]:i.ONE_MINUS_DST_COLOR,[Sy]:i.ONE_MINUS_DST_ALPHA,[Ay]:i.CONSTANT_COLOR,[Ey]:i.ONE_MINUS_CONSTANT_COLOR,[Cy]:i.CONSTANT_ALPHA,[Ry]:i.ONE_MINUS_CONSTANT_ALPHA};function F(U,re,X,Z,ce,oe,De,bt,zt,nt){if(U===Ln){y===!0&&(Te(i.BLEND),y=!1);return}if(y===!1&&(se(i.BLEND),y=!0),U!==Wh){if(U!==g||nt!==S){if((p!==us||_!==us)&&(i.blendEquation(i.FUNC_ADD),p=us,_=us),nt)switch(U){case Hs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $d:i.blendFunc(i.ONE,i.ONE);break;case Kd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jd:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Hs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $d:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Kd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jd:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}v=null,x=null,w=null,M=null,T.set(0,0,0),C=0,g=U,S=nt}return}ce=ce||re,oe=oe||X,De=De||Z,(re!==p||ce!==_)&&(i.blendEquationSeparate(ke[re],ke[ce]),p=re,_=ce),(X!==v||Z!==x||oe!==w||De!==M)&&(i.blendFuncSeparate(Mt[X],Mt[Z],Mt[oe],Mt[De]),v=X,x=Z,w=oe,M=De),(bt.equals(T)===!1||zt!==C)&&(i.blendColor(bt.r,bt.g,bt.b,zt),T.copy(bt),C=zt),g=U,S=!1}function bi(U,re){U.side===ni?Te(i.CULL_FACE):se(i.CULL_FACE);let X=U.side===Xt;re&&(X=!X),We(X),U.blending===Hs&&U.transparent===!1?F(Ln):F(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let Z=U.stencilWrite;o.setTest(Z),Z&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ft(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function We(U){b!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),b=U)}function Xe(U){U!==dy?(se(i.CULL_FACE),U!==P&&(U===Zd?i.cullFace(i.BACK):U===fy?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),P=U}function we(U){U!==D&&(z&&i.lineWidth(U),D=U)}function ft(U,re,X){U?(se(i.POLYGON_OFFSET_FILL),(L!==re||N!==X)&&(i.polygonOffset(re,X),L=re,N=X)):Te(i.POLYGON_OFFSET_FILL)}function Me(U){U?se(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function I(U){U===void 0&&(U=i.TEXTURE0+V-1),ie!==U&&(i.activeTexture(U),ie=U)}function A(U,re,X){X===void 0&&(ie===null?X=i.TEXTURE0+V-1:X=ie);let Z=he[X];Z===void 0&&(Z={type:void 0,texture:void 0},he[X]=Z),(Z.type!==U||Z.texture!==re)&&(ie!==X&&(i.activeTexture(X),ie=X),i.bindTexture(U,re||me[U]),Z.type=U,Z.texture=re)}function k(){let U=he[ie];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ve(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ae(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function de(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function je(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function fe(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(U){Qe.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Qe.copy(U))}function pe(U){q.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),q.copy(U))}function qe(U,re){let X=c.get(re);X===void 0&&(X=new WeakMap,c.set(re,X));let Z=X.get(U);Z===void 0&&(Z=i.getUniformBlockIndex(re,U.name),X.set(U,Z))}function Ne(U,re){let Z=c.get(re).get(U);l.get(re)!==Z&&(i.uniformBlockBinding(re,Z,U.__bindingPointIndex),l.set(re,Z))}function ct(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ie=null,he={},h={},d=new WeakMap,f=[],m=null,y=!1,g=null,p=null,v=null,x=null,_=null,w=null,M=null,T=new Se(0,0,0),C=0,S=!1,b=null,P=null,D=null,L=null,N=null,Qe.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:se,disable:Te,bindFramebuffer:Pe,drawBuffers:Fe,useProgram:dt,setBlending:F,setMaterial:bi,setFlipSided:We,setCullFace:Xe,setLineWidth:we,setPolygonOffset:ft,setScissorTest:Me,activeTexture:I,bindTexture:A,unbindTexture:k,compressedTexImage2D:j,compressedTexImage3D:$,texImage2D:fe,texImage3D:Ae,updateUBOMapping:qe,uniformBlockBinding:Ne,texStorage2D:je,texStorage3D:Q,texSubImage2D:Y,texSubImage3D:ve,compressedTexSubImage2D:ae,compressedTexSubImage3D:de,scissor:Ce,viewport:pe,reset:ct}}function tS(i,e){let t=i.image&&i.image.width?i.image.width/i.image.height:1;return t>e?(i.repeat.x=1,i.repeat.y=t/e,i.offset.x=0,i.offset.y=(1-i.repeat.y)/2):(i.repeat.x=e/t,i.repeat.y=1,i.offset.x=(1-i.repeat.x)/2,i.offset.y=0),i}function iS(i,e){let t=i.image&&i.image.width?i.image.width/i.image.height:1;return t>e?(i.repeat.x=e/t,i.repeat.y=1,i.offset.x=(1-i.repeat.x)/2,i.offset.y=0):(i.repeat.x=1,i.repeat.y=t/e,i.offset.x=0,i.offset.y=(1-i.repeat.y)/2),i}function nS(i){return i.repeat.x=1,i.repeat.y=1,i.offset.x=0,i.offset.y=0,i}function Eh(i,e,t,n){let s=sS(n);switch(t){case Ap:return i*e;case Cp:return i*e;case Rp:return i*e*2;case jo:return i*e/s.components*s.byteLength;case Zo:return i*e/s.components*s.byteLength;case $o:return i*e*2/s.components*s.byteLength;case Kh:return i*e*2/s.components*s.byteLength;case Ep:return i*e*3/s.components*s.byteLength;case ri:return i*e*4/s.components*s.byteLength;case Ko:return i*e*4/s.components*s.byteLength;case go:case yo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case _o:case xo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Hc:case Wc:return Math.max(i,16)*Math.max(e,8)/4;case Vc:case Gc:return Math.max(i,8)*Math.max(e,8)/2;case Xc:case qc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Yc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case $c:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Kc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Jc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Qc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case eh:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case th:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ih:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case nh:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case sh:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case rh:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ah:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case oh:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case vo:case lh:case ch:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Pp:case hh:return Math.ceil(i/4)*Math.ceil(e/4)*8;case uh:case dh:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sS(i){switch(i){case Bi:case Mp:return{byteLength:1,components:1};case Zr:case Tp:case aa:return{byteLength:2,components:1};case Zh:case $h:return{byteLength:2,components:4};case Un:case jh:case si:return{byteLength:4,components:1};case wp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}var eu={contain:tS,cover:iS,fill:nS,getByteLength:Eh};function rS(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ue,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,A){return f?new OffscreenCanvas(I,A):$r("canvas")}function y(I,A,k){let j=1,$=Me(I);if(($.width>k||$.height>k)&&(j=k/Math.max($.width,$.height)),j<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let Y=Math.floor(j*$.width),ve=Math.floor(j*$.height);h===void 0&&(h=m(Y,ve));let ae=A?m(Y,ve):h;return ae.width=Y,ae.height=ve,ae.getContext("2d").drawImage(I,0,0,Y,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Y+"x"+ve+")."),ae}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function v(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(I,A,k,j,$=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Y=A;if(A===i.RED&&(k===i.FLOAT&&(Y=i.R32F),k===i.HALF_FLOAT&&(Y=i.R16F),k===i.UNSIGNED_BYTE&&(Y=i.R8)),A===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Y=i.R8UI),k===i.UNSIGNED_SHORT&&(Y=i.R16UI),k===i.UNSIGNED_INT&&(Y=i.R32UI),k===i.BYTE&&(Y=i.R8I),k===i.SHORT&&(Y=i.R16I),k===i.INT&&(Y=i.R32I)),A===i.RG&&(k===i.FLOAT&&(Y=i.RG32F),k===i.HALF_FLOAT&&(Y=i.RG16F),k===i.UNSIGNED_BYTE&&(Y=i.RG8)),A===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(Y=i.RG8UI),k===i.UNSIGNED_SHORT&&(Y=i.RG16UI),k===i.UNSIGNED_INT&&(Y=i.RG32UI),k===i.BYTE&&(Y=i.RG8I),k===i.SHORT&&(Y=i.RG16I),k===i.INT&&(Y=i.RG32I)),A===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),k===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),k===i.UNSIGNED_INT&&(Y=i.RGB32UI),k===i.BYTE&&(Y=i.RGB8I),k===i.SHORT&&(Y=i.RGB16I),k===i.INT&&(Y=i.RGB32I)),A===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),k===i.UNSIGNED_INT&&(Y=i.RGBA32UI),k===i.BYTE&&(Y=i.RGBA8I),k===i.SHORT&&(Y=i.RGBA16I),k===i.INT&&(Y=i.RGBA32I)),A===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),A===i.RGBA){let ve=$?Qo:ze.getTransfer(j);k===i.FLOAT&&(Y=i.RGBA32F),k===i.HALF_FLOAT&&(Y=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Y=ve===rt?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function _(I,A){let k;return I?A===null||A===Un||A===Zs?k=i.DEPTH24_STENCIL8:A===si?k=i.DEPTH32F_STENCIL8:A===Zr&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Un||A===Zs?k=i.DEPTH_COMPONENT24:A===si?k=i.DEPTH_COMPONENT32F:A===Zr&&(k=i.DEPTH_COMPONENT16),k}function w(I,A){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==Nt&&I.minFilter!==Wt?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function M(I){let A=I.target;A.removeEventListener("dispose",M),C(A),A.isVideoTexture&&u.delete(A)}function T(I){let A=I.target;A.removeEventListener("dispose",T),b(A)}function C(I){let A=n.get(I);if(A.__webglInit===void 0)return;let k=I.source,j=d.get(k);if(j){let $=j[A.__cacheKey];$.usedTimes--,$.usedTimes===0&&S(I),Object.keys(j).length===0&&d.delete(k)}n.remove(I)}function S(I){let A=n.get(I);i.deleteTexture(A.__webglTexture);let k=I.source,j=d.get(k);delete j[A.__cacheKey],a.memory.textures--}function b(I){let A=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(A.__webglFramebuffer[j]))for(let $=0;$<A.__webglFramebuffer[j].length;$++)i.deleteFramebuffer(A.__webglFramebuffer[j][$]);else i.deleteFramebuffer(A.__webglFramebuffer[j]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[j])}else{if(Array.isArray(A.__webglFramebuffer))for(let j=0;j<A.__webglFramebuffer.length;j++)i.deleteFramebuffer(A.__webglFramebuffer[j]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let j=0;j<A.__webglColorRenderbuffer.length;j++)A.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[j]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}let k=I.textures;for(let j=0,$=k.length;j<$;j++){let Y=n.get(k[j]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(k[j])}n.remove(I)}let P=0;function D(){P=0}function L(){let I=P;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),P+=1,I}function N(I){let A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.colorSpace),A.join()}function V(I,A){let k=n.get(I);if(I.isVideoTexture&&we(I),I.isRenderTargetTexture===!1&&I.version>0&&k.__version!==I.version){let j=I.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(k,I,A);return}}t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+A)}function z(I,A){let k=n.get(I);if(I.version>0&&k.__version!==I.version){q(k,I,A);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+A)}function K(I,A){let k=n.get(I);if(I.version>0&&k.__version!==I.version){q(k,I,A);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+A)}function W(I,A){let k=n.get(I);if(I.version>0&&k.__version!==I.version){J(k,I,A);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+A)}let ie={[fs]:i.REPEAT,[on]:i.CLAMP_TO_EDGE,[jr]:i.MIRRORED_REPEAT},he={[Nt]:i.NEAREST,[Yh]:i.NEAREST_MIPMAP_NEAREST,[ks]:i.NEAREST_MIPMAP_LINEAR,[Wt]:i.LINEAR,[Wr]:i.LINEAR_MIPMAP_NEAREST,[Wi]:i.LINEAR_MIPMAP_LINEAR},xe={[Wy]:i.NEVER,[$y]:i.ALWAYS,[Xy]:i.LESS,[Dp]:i.LEQUAL,[qy]:i.EQUAL,[Zy]:i.GEQUAL,[Yy]:i.GREATER,[jy]:i.NOTEQUAL};function Le(I,A){if(A.type===si&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Wt||A.magFilter===Wr||A.magFilter===ks||A.magFilter===Wi||A.minFilter===Wt||A.minFilter===Wr||A.minFilter===ks||A.minFilter===Wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,ie[A.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,ie[A.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,ie[A.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,he[A.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,he[A.minFilter]),A.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,xe[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Nt||A.minFilter!==ks&&A.minFilter!==Wi||A.type===si&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function Qe(I,A){let k=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",M));let j=A.source,$=d.get(j);$===void 0&&($={},d.set(j,$));let Y=N(A);if(Y!==I.__cacheKey){$[Y]===void 0&&($[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),$[Y].usedTimes++;let ve=$[I.__cacheKey];ve!==void 0&&($[I.__cacheKey].usedTimes--,ve.usedTimes===0&&S(A)),I.__cacheKey=Y,I.__webglTexture=$[Y].texture}return k}function q(I,A,k){let j=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(j=i.TEXTURE_3D);let $=Qe(I,A),Y=A.source;t.bindTexture(j,I.__webglTexture,i.TEXTURE0+k);let ve=n.get(Y);if(Y.version!==ve.__version||$===!0){t.activeTexture(i.TEXTURE0+k);let ae=ze.getPrimaries(ze.workingColorSpace),de=A.colorSpace===Pn?null:ze.getPrimaries(A.colorSpace),je=A.colorSpace===Pn||ae===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,je);let Q=y(A.image,!1,s.maxTextureSize);Q=ft(A,Q);let fe=r.convert(A.format,A.colorSpace),Ae=r.convert(A.type),Ce=x(A.internalFormat,fe,Ae,A.colorSpace,A.isVideoTexture);Le(j,A);let pe,qe=A.mipmaps,Ne=A.isVideoTexture!==!0,ct=ve.__version===void 0||$===!0,U=Y.dataReady,re=w(A,Q);if(A.isDepthTexture)Ce=_(A.format===$s,A.type),ct&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,Ce,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,Ce,Q.width,Q.height,0,fe,Ae,null));else if(A.isDataTexture)if(qe.length>0){Ne&&ct&&t.texStorage2D(i.TEXTURE_2D,re,Ce,qe[0].width,qe[0].height);for(let X=0,Z=qe.length;X<Z;X++)pe=qe[X],Ne?U&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,pe.width,pe.height,fe,Ae,pe.data):t.texImage2D(i.TEXTURE_2D,X,Ce,pe.width,pe.height,0,fe,Ae,pe.data);A.generateMipmaps=!1}else Ne?(ct&&t.texStorage2D(i.TEXTURE_2D,re,Ce,Q.width,Q.height),U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,fe,Ae,Q.data)):t.texImage2D(i.TEXTURE_2D,0,Ce,Q.width,Q.height,0,fe,Ae,Q.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Ne&&ct&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,Ce,qe[0].width,qe[0].height,Q.depth);for(let X=0,Z=qe.length;X<Z;X++)if(pe=qe[X],A.format!==ri)if(fe!==null)if(Ne){if(U)if(A.layerUpdates.size>0){let ce=Eh(pe.width,pe.height,A.format,A.type);for(let oe of A.layerUpdates){let De=pe.data.subarray(oe*ce/pe.data.BYTES_PER_ELEMENT,(oe+1)*ce/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,oe,pe.width,pe.height,1,fe,De)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,pe.width,pe.height,Q.depth,fe,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,Ce,pe.width,pe.height,Q.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,pe.width,pe.height,Q.depth,fe,Ae,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,X,Ce,pe.width,pe.height,Q.depth,0,fe,Ae,pe.data)}else{Ne&&ct&&t.texStorage2D(i.TEXTURE_2D,re,Ce,qe[0].width,qe[0].height);for(let X=0,Z=qe.length;X<Z;X++)pe=qe[X],A.format!==ri?fe!==null?Ne?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,pe.width,pe.height,fe,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,X,Ce,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?U&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,pe.width,pe.height,fe,Ae,pe.data):t.texImage2D(i.TEXTURE_2D,X,Ce,pe.width,pe.height,0,fe,Ae,pe.data)}else if(A.isDataArrayTexture)if(Ne){if(ct&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,Ce,Q.width,Q.height,Q.depth),U)if(A.layerUpdates.size>0){let X=Eh(Q.width,Q.height,A.format,A.type);for(let Z of A.layerUpdates){let ce=Q.data.subarray(Z*X/Q.data.BYTES_PER_ELEMENT,(Z+1)*X/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,Q.width,Q.height,1,fe,Ae,ce)}A.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,fe,Ae,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ce,Q.width,Q.height,Q.depth,0,fe,Ae,Q.data);else if(A.isData3DTexture)Ne?(ct&&t.texStorage3D(i.TEXTURE_3D,re,Ce,Q.width,Q.height,Q.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,fe,Ae,Q.data)):t.texImage3D(i.TEXTURE_3D,0,Ce,Q.width,Q.height,Q.depth,0,fe,Ae,Q.data);else if(A.isFramebufferTexture){if(ct)if(Ne)t.texStorage2D(i.TEXTURE_2D,re,Ce,Q.width,Q.height);else{let X=Q.width,Z=Q.height;for(let ce=0;ce<re;ce++)t.texImage2D(i.TEXTURE_2D,ce,Ce,X,Z,0,fe,Ae,null),X>>=1,Z>>=1}}else if(qe.length>0){if(Ne&&ct){let X=Me(qe[0]);t.texStorage2D(i.TEXTURE_2D,re,Ce,X.width,X.height)}for(let X=0,Z=qe.length;X<Z;X++)pe=qe[X],Ne?U&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,fe,Ae,pe):t.texImage2D(i.TEXTURE_2D,X,Ce,fe,Ae,pe);A.generateMipmaps=!1}else if(Ne){if(ct){let X=Me(Q);t.texStorage2D(i.TEXTURE_2D,re,Ce,X.width,X.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Ae,Q)}else t.texImage2D(i.TEXTURE_2D,0,Ce,fe,Ae,Q);g(A)&&p(j),ve.__version=Y.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function J(I,A,k){if(A.image.length!==6)return;let j=Qe(I,A),$=A.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+k);let Y=n.get($);if($.version!==Y.__version||j===!0){t.activeTexture(i.TEXTURE0+k);let ve=ze.getPrimaries(ze.workingColorSpace),ae=A.colorSpace===Pn?null:ze.getPrimaries(A.colorSpace),de=A.colorSpace===Pn||ve===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);let je=A.isCompressedTexture||A.image[0].isCompressedTexture,Q=A.image[0]&&A.image[0].isDataTexture,fe=[];for(let Z=0;Z<6;Z++)!je&&!Q?fe[Z]=y(A.image[Z],!0,s.maxCubemapSize):fe[Z]=Q?A.image[Z].image:A.image[Z],fe[Z]=ft(A,fe[Z]);let Ae=fe[0],Ce=r.convert(A.format,A.colorSpace),pe=r.convert(A.type),qe=x(A.internalFormat,Ce,pe,A.colorSpace),Ne=A.isVideoTexture!==!0,ct=Y.__version===void 0||j===!0,U=$.dataReady,re=w(A,Ae);Le(i.TEXTURE_CUBE_MAP,A);let X;if(je){Ne&&ct&&t.texStorage2D(i.TEXTURE_CUBE_MAP,re,qe,Ae.width,Ae.height);for(let Z=0;Z<6;Z++){X=fe[Z].mipmaps;for(let ce=0;ce<X.length;ce++){let oe=X[ce];A.format!==ri?Ce!==null?Ne?U&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,0,0,oe.width,oe.height,Ce,oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,qe,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,0,0,oe.width,oe.height,Ce,pe,oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,qe,oe.width,oe.height,0,Ce,pe,oe.data)}}}else{if(X=A.mipmaps,Ne&&ct){X.length>0&&re++;let Z=Me(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,re,qe,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Q){Ne?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,fe[Z].width,fe[Z].height,Ce,pe,fe[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,qe,fe[Z].width,fe[Z].height,0,Ce,pe,fe[Z].data);for(let ce=0;ce<X.length;ce++){let De=X[ce].image[Z].image;Ne?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,0,0,De.width,De.height,Ce,pe,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,qe,De.width,De.height,0,Ce,pe,De.data)}}else{Ne?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ce,pe,fe[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,qe,Ce,pe,fe[Z]);for(let ce=0;ce<X.length;ce++){let oe=X[ce];Ne?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,0,0,Ce,pe,oe.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,qe,Ce,pe,oe.image[Z])}}}g(A)&&p(i.TEXTURE_CUBE_MAP),Y.__version=$.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function me(I,A,k,j,$,Y){let ve=r.convert(k.format,k.colorSpace),ae=r.convert(k.type),de=x(k.internalFormat,ve,ae,k.colorSpace),je=n.get(A),Q=n.get(k);if(Q.__renderTarget=A,!je.__hasExternalTextures){let fe=Math.max(1,A.width>>Y),Ae=Math.max(1,A.height>>Y);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,Y,de,fe,Ae,A.depth,0,ve,ae,null):t.texImage2D($,Y,de,fe,Ae,0,ve,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),Xe(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,$,Q.__webglTexture,0,We(A)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,$,Q.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function se(I,A,k){if(i.bindRenderbuffer(i.RENDERBUFFER,I),A.depthBuffer){let j=A.depthTexture,$=j&&j.isDepthTexture?j.type:null,Y=_(A.stencilBuffer,$),ve=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=We(A);Xe(A)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,Y,A.width,A.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,Y,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,Y,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,I)}else{let j=A.textures;for(let $=0;$<j.length;$++){let Y=j[$],ve=r.convert(Y.format,Y.colorSpace),ae=r.convert(Y.type),de=x(Y.internalFormat,ve,ae,Y.colorSpace),je=We(A);k&&Xe(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,je,de,A.width,A.height):Xe(A)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,je,de,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,de,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Te(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=n.get(A.depthTexture);j.__renderTarget=A,(!j.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),V(A.depthTexture,0);let $=j.__webglTexture,Y=We(A);if(A.depthTexture.format===Gs)Xe(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(A.depthTexture.format===$s)Xe(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Pe(I){let A=n.get(I),k=I.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==I.depthTexture){let j=I.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),j){let $=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,j.removeEventListener("dispose",$)};j.addEventListener("dispose",$),A.__depthDisposeCallback=$}A.__boundDepthTexture=j}if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Te(A.__webglFramebuffer,I)}else if(k){A.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[j]),A.__webglDepthbuffer[j]===void 0)A.__webglDepthbuffer[j]=i.createRenderbuffer(),se(A.__webglDepthbuffer[j],I,!1);else{let $=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=A.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),se(A.__webglDepthbuffer,I,!1);else{let j=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,$)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(I,A,k){let j=n.get(I);A!==void 0&&me(j.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Pe(I)}function dt(I){let A=I.texture,k=n.get(I),j=n.get(A);I.addEventListener("dispose",T);let $=I.textures,Y=I.isWebGLCubeRenderTarget===!0,ve=$.length>1;if(ve||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=A.version,a.memory.textures++),Y){k.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(A.mipmaps&&A.mipmaps.length>0){k.__webglFramebuffer[ae]=[];for(let de=0;de<A.mipmaps.length;de++)k.__webglFramebuffer[ae][de]=i.createFramebuffer()}else k.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){k.__webglFramebuffer=[];for(let ae=0;ae<A.mipmaps.length;ae++)k.__webglFramebuffer[ae]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(ve)for(let ae=0,de=$.length;ae<de;ae++){let je=n.get($[ae]);je.__webglTexture===void 0&&(je.__webglTexture=i.createTexture(),a.memory.textures++)}if(I.samples>0&&Xe(I)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ae=0;ae<$.length;ae++){let de=$[ae];k.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[ae]);let je=r.convert(de.format,de.colorSpace),Q=r.convert(de.type),fe=x(de.internalFormat,je,Q,de.colorSpace,I.isXRRenderTarget===!0),Ae=We(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,fe,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,k.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),se(k.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Le(i.TEXTURE_CUBE_MAP,A);for(let ae=0;ae<6;ae++)if(A.mipmaps&&A.mipmaps.length>0)for(let de=0;de<A.mipmaps.length;de++)me(k.__webglFramebuffer[ae][de],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,de);else me(k.__webglFramebuffer[ae],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);g(A)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let ae=0,de=$.length;ae<de;ae++){let je=$[ae],Q=n.get(je);t.bindTexture(i.TEXTURE_2D,Q.__webglTexture),Le(i.TEXTURE_2D,je),me(k.__webglFramebuffer,I,je,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,0),g(je)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ae=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,j.__webglTexture),Le(ae,A),A.mipmaps&&A.mipmaps.length>0)for(let de=0;de<A.mipmaps.length;de++)me(k.__webglFramebuffer[de],I,A,i.COLOR_ATTACHMENT0,ae,de);else me(k.__webglFramebuffer,I,A,i.COLOR_ATTACHMENT0,ae,0);g(A)&&p(ae),t.unbindTexture()}I.depthBuffer&&Pe(I)}function ke(I){let A=I.textures;for(let k=0,j=A.length;k<j;k++){let $=A[k];if(g($)){let Y=v(I),ve=n.get($).__webglTexture;t.bindTexture(Y,ve),p(Y),t.unbindTexture()}}}let Mt=[],F=[];function bi(I){if(I.samples>0){if(Xe(I)===!1){let A=I.textures,k=I.width,j=I.height,$=i.COLOR_BUFFER_BIT,Y=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(I),ae=A.length>1;if(ae)for(let de=0;de<A.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let de=0;de<A.length;de++){if(I.resolveDepthBuffer&&(I.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[de]);let je=n.get(A[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,je,0)}i.blitFramebuffer(0,0,k,j,0,0,k,j,$,i.NEAREST),l===!0&&(Mt.length=0,F.length=0,Mt.push(i.COLOR_ATTACHMENT0+de),I.depthBuffer&&I.resolveDepthBuffer===!1&&(Mt.push(Y),F.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Mt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let de=0;de<A.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,ve.__webglColorRenderbuffer[de]);let je=n.get(A[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){let A=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function We(I){return Math.min(s.maxSamples,I.samples)}function Xe(I){let A=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function we(I){let A=a.render.frame;u.get(I)!==A&&(u.set(I,A),I.update())}function ft(I,A){let k=I.colorSpace,j=I.format,$=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||k!==Lt&&k!==Pn&&(ze.getTransfer(k)===rt?(j!==ri||$!==Bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),A}function Me(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=D,this.setTexture2D=V,this.setTexture2DArray=z,this.setTexture3D=K,this.setTextureCube=W,this.rebindTextures=Fe,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=bi,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Xe}function aS(i,e){function t(n,s=Pn){let r,a=ze.getTransfer(s);if(n===Bi)return i.UNSIGNED_BYTE;if(n===Zh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$h)return i.UNSIGNED_SHORT_5_5_5_1;if(n===wp)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Mp)return i.BYTE;if(n===Tp)return i.SHORT;if(n===Zr)return i.UNSIGNED_SHORT;if(n===jh)return i.INT;if(n===Un)return i.UNSIGNED_INT;if(n===si)return i.FLOAT;if(n===aa)return i.HALF_FLOAT;if(n===Ap)return i.ALPHA;if(n===Ep)return i.RGB;if(n===ri)return i.RGBA;if(n===Cp)return i.LUMINANCE;if(n===Rp)return i.LUMINANCE_ALPHA;if(n===Gs)return i.DEPTH_COMPONENT;if(n===$s)return i.DEPTH_STENCIL;if(n===jo)return i.RED;if(n===Zo)return i.RED_INTEGER;if(n===$o)return i.RG;if(n===Kh)return i.RG_INTEGER;if(n===Ko)return i.RGBA_INTEGER;if(n===go||n===yo||n===_o||n===xo)if(a===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===go)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===_o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===go)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===_o)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vc||n===Hc||n===Gc||n===Wc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Vc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Hc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Gc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xc||n===qc||n===Yc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Xc||n===qc)return a===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Yc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===jc||n===Zc||n===$c||n===Kc||n===Jc||n===Qc||n===eh||n===th||n===ih||n===nh||n===sh||n===rh||n===ah||n===oh)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===jc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Zc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$c)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Kc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Jc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Qc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===eh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===th)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ih)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===nh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===sh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===rh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ah)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===oh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vo||n===lh||n===ch)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===vo)return a===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===lh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ch)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Pp||n===hh||n===uh||n===dh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===hh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===uh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===dh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Ch=class extends At{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},$t=class extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}},oS={type:"move"},Yr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(c,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(oS)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new $t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},lS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Rh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new It,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new yi({vertexShader:lS,fragmentShader:cS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new at(new ir(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ph=class extends ai{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null,y=new Rh,g=t.getContextAttributes(),p=null,v=null,x=[],_=[],w=new ue,M=null,T=new At;T.viewport=new Ze;let C=new At;C.viewport=new Ze;let S=[T,C],b=new Ch,P=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let J=x[q];return J===void 0&&(J=new Yr,x[q]=J),J.getTargetRaySpace()},this.getControllerGrip=function(q){let J=x[q];return J===void 0&&(J=new Yr,x[q]=J),J.getGripSpace()},this.getHand=function(q){let J=x[q];return J===void 0&&(J=new Yr,x[q]=J),J.getHandSpace()};function L(q){let J=_.indexOf(q.inputSource);if(J===-1)return;let me=x[J];me!==void 0&&(me.update(q.inputSource,q.frame,c||a),me.dispatchEvent({type:q.type,data:q.inputSource}))}function N(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",N),s.removeEventListener("inputsourceschange",V);for(let q=0;q<x.length;q++){let J=_[q];J!==null&&(_[q]=null,x[q].disconnect(J))}P=null,D=null,y.reset(),e.setRenderTarget(p),f=null,d=null,h=null,s=null,v=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",N),s.addEventListener("inputsourceschange",V),g.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(w),s.renderState.layers===void 0){let J={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,J),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Ti(f.framebufferWidth,f.framebufferHeight,{format:ri,type:Bi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let J=null,me=null,se=null;g.depth&&(se=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=g.stencil?$s:Gs,me=g.stencil?Zs:Un);let Te={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(Te),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Ti(d.textureWidth,d.textureHeight,{format:ri,type:Bi,depthTexture:new Ro(d.textureWidth,d.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Qe.setContext(s),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function V(q){for(let J=0;J<q.removed.length;J++){let me=q.removed[J],se=_.indexOf(me);se>=0&&(_[se]=null,x[se].disconnect(me))}for(let J=0;J<q.added.length;J++){let me=q.added[J],se=_.indexOf(me);if(se===-1){for(let Pe=0;Pe<x.length;Pe++)if(Pe>=_.length){_.push(me),se=Pe;break}else if(_[Pe]===null){_[Pe]=me,se=Pe;break}if(se===-1)break}let Te=x[se];Te&&Te.connect(me)}}let z=new R,K=new R;function W(q,J,me){z.setFromMatrixPosition(J.matrixWorld),K.setFromMatrixPosition(me.matrixWorld);let se=z.distanceTo(K),Te=J.projectionMatrix.elements,Pe=me.projectionMatrix.elements,Fe=Te[14]/(Te[10]-1),dt=Te[14]/(Te[10]+1),ke=(Te[9]+1)/Te[5],Mt=(Te[9]-1)/Te[5],F=(Te[8]-1)/Te[0],bi=(Pe[8]+1)/Pe[0],We=Fe*F,Xe=Fe*bi,we=se/(-F+bi),ft=we*-F;if(J.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ft),q.translateZ(we),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Te[10]===-1)q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let Me=Fe+we,I=dt+we,A=We-ft,k=Xe+(se-ft),j=ke*dt/I*Me,$=Mt*dt/I*Me;q.projectionMatrix.makePerspective(A,k,j,$,Me,I),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ie(q,J){J===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(J.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let J=q.near,me=q.far;y.texture!==null&&(y.depthNear>0&&(J=y.depthNear),y.depthFar>0&&(me=y.depthFar)),b.near=C.near=T.near=J,b.far=C.far=T.far=me,(P!==b.near||D!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),P=b.near,D=b.far),T.layers.mask=q.layers.mask|2,C.layers.mask=q.layers.mask|4,b.layers.mask=T.layers.mask|C.layers.mask;let se=q.parent,Te=b.cameras;ie(b,se);for(let Pe=0;Pe<Te.length;Pe++)ie(Te[Pe],se);Te.length===2?W(b,T,C):b.projectionMatrix.copy(T.projectionMatrix),he(q,b,se)};function he(q,J,me){me===null?q.matrix.copy(J.matrixWorld):(q.matrix.copy(me.matrixWorld),q.matrix.invert(),q.matrix.multiply(J.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Qs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(b)};let xe=null;function Le(q,J){if(u=J.getViewerPose(c||a),m=J,u!==null){let me=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let se=!1;me.length!==b.cameras.length&&(b.cameras.length=0,se=!0);for(let Pe=0;Pe<me.length;Pe++){let Fe=me[Pe],dt=null;if(f!==null)dt=f.getViewport(Fe);else{let Mt=h.getViewSubImage(d,Fe);dt=Mt.viewport,Pe===0&&(e.setRenderTargetTextures(v,Mt.colorTexture,d.ignoreDepthValues?void 0:Mt.depthStencilTexture),e.setRenderTarget(v))}let ke=S[Pe];ke===void 0&&(ke=new At,ke.layers.enable(Pe),ke.viewport=new Ze,S[Pe]=ke),ke.matrix.fromArray(Fe.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(Fe.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(dt.x,dt.y,dt.width,dt.height),Pe===0&&(b.matrix.copy(ke.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),se===!0&&b.cameras.push(ke)}let Te=s.enabledFeatures;if(Te&&Te.includes("depth-sensing")){let Pe=h.getDepthInformation(me[0]);Pe&&Pe.isValid&&Pe.texture&&y.init(e,Pe,s.renderState)}}for(let me=0;me<x.length;me++){let se=_[me],Te=x[me];se!==null&&Te!==void 0&&Te.update(se,J,c||a)}xe&&xe(q,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),m=null}let Qe=new Bp;Qe.setAnimationLoop(Le),this.setAnimationLoop=function(q){xe=q},this.dispose=function(){}}},os=new wi,hS=new te;function uS(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Op(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,v,x,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),h(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,v,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Xt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Xt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let v=e.get(p),x=v.envMap,_=v.envMapRotation;x&&(g.envMap.value=x,os.copy(_),os.x*=-1,os.y*=-1,os.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),g.envMapRotation.value.setFromMatrix4(hS.makeRotationFromEuler(os)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=x*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function dS(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){let _=x.program;n.uniformBlockBinding(v,_)}function c(v,x){let _=s[v.id];_===void 0&&(m(v),_=u(v),s[v.id]=_,v.addEventListener("dispose",g));let w=x.program;n.updateUBOMapping(v,w);let M=e.render.frame;r[v.id]!==M&&(d(v),r[v.id]=M)}function u(v){let x=h();v.__bindingPointIndex=x;let _=i.createBuffer(),w=v.__size,M=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,w,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,_),_}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let x=s[v.id],_=v.uniforms,w=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let M=0,T=_.length;M<T;M++){let C=Array.isArray(_[M])?_[M]:[_[M]];for(let S=0,b=C.length;S<b;S++){let P=C[S];if(f(P,M,S,w)===!0){let D=P.__offset,L=Array.isArray(P.value)?P.value:[P.value],N=0;for(let V=0;V<L.length;V++){let z=L[V],K=y(z);typeof z=="number"||typeof z=="boolean"?(P.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,D+N,P.__data)):z.isMatrix3?(P.__data[0]=z.elements[0],P.__data[1]=z.elements[1],P.__data[2]=z.elements[2],P.__data[3]=0,P.__data[4]=z.elements[3],P.__data[5]=z.elements[4],P.__data[6]=z.elements[5],P.__data[7]=0,P.__data[8]=z.elements[6],P.__data[9]=z.elements[7],P.__data[10]=z.elements[8],P.__data[11]=0):(z.toArray(P.__data,N),N+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,x,_,w){let M=v.value,T=x+"_"+_;if(w[T]===void 0)return typeof M=="number"||typeof M=="boolean"?w[T]=M:w[T]=M.clone(),!0;{let C=w[T];if(typeof M=="number"||typeof M=="boolean"){if(C!==M)return w[T]=M,!0}else if(C.equals(M)===!1)return C.copy(M),!0}return!1}function m(v){let x=v.uniforms,_=0,w=16;for(let T=0,C=x.length;T<C;T++){let S=Array.isArray(x[T])?x[T]:[x[T]];for(let b=0,P=S.length;b<P;b++){let D=S[b],L=Array.isArray(D.value)?D.value:[D.value];for(let N=0,V=L.length;N<V;N++){let z=L[N],K=y(z),W=_%w,ie=W%K.boundary,he=W+ie;_+=ie,he!==0&&w-he<K.storage&&(_+=w-he),D.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=_,_+=K.storage}}}let M=_%w;return M>0&&(_+=w-M),v.__size=_,v.__cache={},this}function y(v){let x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function g(v){let x=v.target;x.removeEventListener("dispose",g);let _=a.indexOf(x.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}var nr=class{constructor(e={}){let{canvas:t=f_(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let m=new Uint32Array(4),y=new Int32Array(4),g=null,p=null,v=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=gt,this.toneMapping=Dn,this.toneMappingExposure=1;let _=this,w=!1,M=0,T=0,C=null,S=-1,b=null,P=new Ze,D=new Ze,L=null,N=new Se(0),V=0,z=t.width,K=t.height,W=1,ie=null,he=null,xe=new Ze(0,0,z,K),Le=new Ze(0,0,z,K),Qe=!1,q=new hn,J=!1,me=!1,se=new te,Te=new te,Pe=new R,Fe=new Ze,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function Mt(){return C===null?W:1}let F=n;function bi(E,O){return t.getContext(E,O)}try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",oe,!1),F===null){let O="webgl2";if(F=bi(O,E),F===null)throw bi(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let We,Xe,we,ft,Me,I,A,k,j,$,Y,ve,ae,de,je,Q,fe,Ae,Ce,pe,qe,Ne,ct,U;function re(){We=new wv(F),We.init(),Ne=new aS(F,We),Xe=new xv(F,We,e,Ne),we=new eS(F,We),Xe.reverseDepthBuffer&&d&&we.buffers.depth.setReversed(!0),ft=new Cv(F),Me=new Vb,I=new rS(F,We,we,Me,Xe,Ne,ft),A=new bv(_),k=new Tv(_),j=new N_(F),ct=new yv(F,j),$=new Av(F,j,ft,ct),Y=new Pv(F,$,j,ft),Ce=new Rv(F,Xe,I),Q=new vv(Me),ve=new kb(_,A,k,We,Xe,ct,Q),ae=new uS(_,Me),de=new Gb,je=new Zb(We),Ae=new gv(_,A,k,we,Y,f,l),fe=new Jb(_,Y,Xe),U=new dS(F,ft,Xe,we),pe=new _v(F,We,ft),qe=new Ev(F,We,ft),ft.programs=ve.programs,_.capabilities=Xe,_.extensions=We,_.properties=Me,_.renderLists=de,_.shadowMap=fe,_.state=we,_.info=ft}re();let X=new Ph(_,F);this.xr=X,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let E=We.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=We.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(E){E!==void 0&&(W=E,this.setSize(z,K,!1))},this.getSize=function(E){return E.set(z,K)},this.setSize=function(E,O,H=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,K=O,t.width=Math.floor(E*W),t.height=Math.floor(O*W),H===!0&&(t.style.width=E+"px",t.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(z*W,K*W).floor()},this.setDrawingBufferSize=function(E,O,H){z=E,K=O,W=H,t.width=Math.floor(E*H),t.height=Math.floor(O*H),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(P)},this.getViewport=function(E){return E.copy(xe)},this.setViewport=function(E,O,H,G){E.isVector4?xe.set(E.x,E.y,E.z,E.w):xe.set(E,O,H,G),we.viewport(P.copy(xe).multiplyScalar(W).round())},this.getScissor=function(E){return E.copy(Le)},this.setScissor=function(E,O,H,G){E.isVector4?Le.set(E.x,E.y,E.z,E.w):Le.set(E,O,H,G),we.scissor(D.copy(Le).multiplyScalar(W).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(E){we.setScissorTest(Qe=E)},this.setOpaqueSort=function(E){ie=E},this.setTransparentSort=function(E){he=E},this.getClearColor=function(E){return E.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor.apply(Ae,arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha.apply(Ae,arguments)},this.clear=function(E=!0,O=!0,H=!0){let G=0;if(E){let B=!1;if(C!==null){let ee=C.texture.format;B=ee===Ko||ee===Kh||ee===Zo}if(B){let ee=C.texture.type,le=ee===Bi||ee===Un||ee===Zr||ee===Zs||ee===Zh||ee===$h,ge=Ae.getClearColor(),ye=Ae.getClearAlpha(),Ie=ge.r,Ue=ge.g,_e=ge.b;le?(m[0]=Ie,m[1]=Ue,m[2]=_e,m[3]=ye,F.clearBufferuiv(F.COLOR,0,m)):(y[0]=Ie,y[1]=Ue,y[2]=_e,y[3]=ye,F.clearBufferiv(F.COLOR,0,y))}else G|=F.COLOR_BUFFER_BIT}O&&(G|=F.DEPTH_BUFFER_BIT),H&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),de.dispose(),je.dispose(),Me.dispose(),A.dispose(),k.dispose(),Y.dispose(),ct.dispose(),U.dispose(),ve.dispose(),X.dispose(),X.removeEventListener("sessionstart",Vd),X.removeEventListener("sessionend",Hd),ts.stop()};function Z(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let E=ft.autoReset,O=fe.enabled,H=fe.autoUpdate,G=fe.needsUpdate,B=fe.type;re(),ft.autoReset=E,fe.enabled=O,fe.autoUpdate=H,fe.needsUpdate=G,fe.type=B}function oe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function De(E){let O=E.target;O.removeEventListener("dispose",De),bt(O)}function bt(E){zt(E),Me.remove(E)}function zt(E){let O=Me.get(E).programs;O!==void 0&&(O.forEach(function(H){ve.releaseProgram(H)}),E.isShaderMaterial&&ve.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,H,G,B,ee){O===null&&(O=dt);let le=B.isMesh&&B.matrixWorld.determinant()<0,ge=cy(E,O,H,G,B);we.setMaterial(G,le);let ye=H.index,Ie=1;if(G.wireframe===!0){if(ye=$.getWireframeAttribute(H),ye===void 0)return;Ie=2}let Ue=H.drawRange,_e=H.attributes.position,$e=Ue.start*Ie,ht=(Ue.start+Ue.count)*Ie;ee!==null&&($e=Math.max($e,ee.start*Ie),ht=Math.min(ht,(ee.start+ee.count)*Ie)),ye!==null?($e=Math.max($e,0),ht=Math.min(ht,ye.count)):_e!=null&&($e=Math.max($e,0),ht=Math.min(ht,_e.count));let pt=ht-$e;if(pt<0||pt===1/0)return;ct.setup(B,G,ge,H,ye);let ti,et=pe;if(ye!==null&&(ti=j.get(ye),et=qe,et.setIndex(ti)),B.isMesh)G.wireframe===!0?(we.setLineWidth(G.wireframeLinewidth*Mt()),et.setMode(F.LINES)):et.setMode(F.TRIANGLES);else if(B.isLine){let be=G.linewidth;be===void 0&&(be=1),we.setLineWidth(be*Mt()),B.isLineSegments?et.setMode(F.LINES):B.isLineLoop?et.setMode(F.LINE_LOOP):et.setMode(F.LINE_STRIP)}else B.isPoints?et.setMode(F.POINTS):B.isSprite&&et.setMode(F.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)et.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(We.get("WEBGL_multi_draw"))et.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let be=B._multiDrawStarts,Ji=B._multiDrawCounts,tt=B._multiDrawCount,Ii=ye?j.get(ye).bytesPerElement:1,Ts=Me.get(G).currentProgram.getUniforms();for(let ui=0;ui<tt;ui++)Ts.setValue(F,"_gl_DrawID",ui),et.render(be[ui]/Ii,Ji[ui])}else if(B.isInstancedMesh)et.renderInstances($e,pt,B.count);else if(H.isInstancedBufferGeometry){let be=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Ji=Math.min(H.instanceCount,be);et.renderInstances($e,pt,Ji)}else et.render($e,pt)};function nt(E,O,H){E.transparent===!0&&E.side===ni&&E.forceSinglePass===!1?(E.side=Xt,E.needsUpdate=!0,Fa(E,O,H),E.side=pi,E.needsUpdate=!0,Fa(E,O,H),E.side=ni):Fa(E,O,H)}this.compile=function(E,O,H=null){H===null&&(H=E),p=je.get(H),p.init(O),x.push(p),H.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),E!==H&&E.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let G=new Set;return E.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let ee=B.material;if(ee)if(Array.isArray(ee))for(let le=0;le<ee.length;le++){let ge=ee[le];nt(ge,H,B),G.add(ge)}else nt(ee,H,B),G.add(ee)}),x.pop(),p=null,G},this.compileAsync=function(E,O,H=null){let G=this.compile(E,O,H);return new Promise(B=>{function ee(){if(G.forEach(function(le){Me.get(le).currentProgram.isReady()&&G.delete(le)}),G.size===0){B(E);return}setTimeout(ee,10)}We.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let Pi=null;function Ki(E){Pi&&Pi(E)}function Vd(){ts.stop()}function Hd(){ts.start()}let ts=new Bp;ts.setAnimationLoop(Ki),typeof self<"u"&&ts.setContext(self),this.setAnimationLoop=function(E){Pi=E,X.setAnimationLoop(E),E===null?ts.stop():ts.start()},X.addEventListener("sessionstart",Vd),X.addEventListener("sessionend",Hd),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(O),O=X.getCamera()),E.isScene===!0&&E.onBeforeRender(_,E,O,C),p=je.get(E,x.length),p.init(O),x.push(p),Te.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),q.setFromProjectionMatrix(Te),me=this.localClippingEnabled,J=Q.init(this.clippingPlanes,me),g=de.get(E,v.length),g.init(),v.push(g),X.enabled===!0&&X.isPresenting===!0){let ee=_.xr.getDepthSensingMesh();ee!==null&&Zl(ee,O,-1/0,_.sortObjects)}Zl(E,O,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(ie,he),ke=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,ke&&Ae.addToRenderList(g,E),this.info.render.frame++,J===!0&&Q.beginShadows();let H=p.state.shadowsArray;fe.render(H,E,O),J===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=g.opaque,B=g.transmissive;if(p.setupLights(),O.isArrayCamera){let ee=O.cameras;if(B.length>0)for(let le=0,ge=ee.length;le<ge;le++){let ye=ee[le];Wd(G,B,E,ye)}ke&&Ae.render(E);for(let le=0,ge=ee.length;le<ge;le++){let ye=ee[le];Gd(g,E,ye,ye.viewport)}}else B.length>0&&Wd(G,B,E,O),ke&&Ae.render(E),Gd(g,E,O);C!==null&&(I.updateMultisampleRenderTarget(C),I.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(_,E,O),ct.resetDefaultState(),S=-1,b=null,x.pop(),x.length>0?(p=x[x.length-1],J===!0&&Q.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function Zl(E,O,H,G){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)H=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||q.intersectsSprite(E)){G&&Fe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Te);let le=Y.update(E),ge=E.material;ge.visible&&g.push(E,le,ge,H,Fe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||q.intersectsObject(E))){let le=Y.update(E),ge=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Fe.copy(E.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Fe.copy(le.boundingSphere.center)),Fe.applyMatrix4(E.matrixWorld).applyMatrix4(Te)),Array.isArray(ge)){let ye=le.groups;for(let Ie=0,Ue=ye.length;Ie<Ue;Ie++){let _e=ye[Ie],$e=ge[_e.materialIndex];$e&&$e.visible&&g.push(E,le,$e,H,Fe.z,_e)}}else ge.visible&&g.push(E,le,ge,H,Fe.z,null)}}let ee=E.children;for(let le=0,ge=ee.length;le<ge;le++)Zl(ee[le],O,H,G)}function Gd(E,O,H,G){let B=E.opaque,ee=E.transmissive,le=E.transparent;p.setupLightsView(H),J===!0&&Q.setGlobalState(_.clippingPlanes,H),G&&we.viewport(P.copy(G)),B.length>0&&Ba(B,O,H),ee.length>0&&Ba(ee,O,H),le.length>0&&Ba(le,O,H),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function Wd(E,O,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Ti(1,1,{generateMipmaps:!0,type:We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float")?aa:Bi,minFilter:Wi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace}));let ee=p.state.transmissionRenderTarget[G.id],le=G.viewport||P;ee.setSize(le.z,le.w);let ge=_.getRenderTarget();_.setRenderTarget(ee),_.getClearColor(N),V=_.getClearAlpha(),V<1&&_.setClearColor(16777215,.5),_.clear(),ke&&Ae.render(H);let ye=_.toneMapping;_.toneMapping=Dn;let Ie=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),J===!0&&Q.setGlobalState(_.clippingPlanes,G),Ba(E,H,G),I.updateMultisampleRenderTarget(ee),I.updateRenderTargetMipmap(ee),We.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let _e=0,$e=O.length;_e<$e;_e++){let ht=O[_e],pt=ht.object,ti=ht.geometry,et=ht.material,be=ht.group;if(et.side===ni&&pt.layers.test(G.layers)){let Ji=et.side;et.side=Xt,et.needsUpdate=!0,Xd(pt,H,G,ti,et,be),et.side=Ji,et.needsUpdate=!0,Ue=!0}}Ue===!0&&(I.updateMultisampleRenderTarget(ee),I.updateRenderTargetMipmap(ee))}_.setRenderTarget(ge),_.setClearColor(N,V),Ie!==void 0&&(G.viewport=Ie),_.toneMapping=ye}function Ba(E,O,H){let G=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ee=E.length;B<ee;B++){let le=E[B],ge=le.object,ye=le.geometry,Ie=G===null?le.material:G,Ue=le.group;ge.layers.test(H.layers)&&Xd(ge,O,H,ye,Ie,Ue)}}function Xd(E,O,H,G,B,ee){E.onBeforeRender(_,O,H,G,B,ee),E.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),B.onBeforeRender(_,O,H,G,E,ee),B.transparent===!0&&B.side===ni&&B.forceSinglePass===!1?(B.side=Xt,B.needsUpdate=!0,_.renderBufferDirect(H,O,G,B,E,ee),B.side=pi,B.needsUpdate=!0,_.renderBufferDirect(H,O,G,B,E,ee),B.side=ni):_.renderBufferDirect(H,O,G,B,E,ee),E.onAfterRender(_,O,H,G,B,ee)}function Fa(E,O,H){O.isScene!==!0&&(O=dt);let G=Me.get(E),B=p.state.lights,ee=p.state.shadowsArray,le=B.state.version,ge=ve.getParameters(E,B.state,ee,O,H),ye=ve.getProgramCacheKey(ge),Ie=G.programs;G.environment=E.isMeshStandardMaterial?O.environment:null,G.fog=O.fog,G.envMap=(E.isMeshStandardMaterial?k:A).get(E.envMap||G.environment),G.envMapRotation=G.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Ie===void 0&&(E.addEventListener("dispose",De),Ie=new Map,G.programs=Ie);let Ue=Ie.get(ye);if(Ue!==void 0){if(G.currentProgram===Ue&&G.lightsStateVersion===le)return Yd(E,ge),Ue}else ge.uniforms=ve.getUniforms(E),E.onBeforeCompile(ge,_),Ue=ve.acquireProgram(ge,ye),Ie.set(ye,Ue),G.uniforms=ge.uniforms;let _e=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(_e.clippingPlanes=Q.uniform),Yd(E,ge),G.needsLights=uy(E),G.lightsStateVersion=le,G.needsLights&&(_e.ambientLightColor.value=B.state.ambient,_e.lightProbe.value=B.state.probe,_e.directionalLights.value=B.state.directional,_e.directionalLightShadows.value=B.state.directionalShadow,_e.spotLights.value=B.state.spot,_e.spotLightShadows.value=B.state.spotShadow,_e.rectAreaLights.value=B.state.rectArea,_e.ltc_1.value=B.state.rectAreaLTC1,_e.ltc_2.value=B.state.rectAreaLTC2,_e.pointLights.value=B.state.point,_e.pointLightShadows.value=B.state.pointShadow,_e.hemisphereLights.value=B.state.hemi,_e.directionalShadowMap.value=B.state.directionalShadowMap,_e.directionalShadowMatrix.value=B.state.directionalShadowMatrix,_e.spotShadowMap.value=B.state.spotShadowMap,_e.spotLightMatrix.value=B.state.spotLightMatrix,_e.spotLightMap.value=B.state.spotLightMap,_e.pointShadowMap.value=B.state.pointShadowMap,_e.pointShadowMatrix.value=B.state.pointShadowMatrix),G.currentProgram=Ue,G.uniformsList=null,Ue}function qd(E){if(E.uniformsList===null){let O=E.currentProgram.getUniforms();E.uniformsList=Xs.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function Yd(E,O){let H=Me.get(E);H.outputColorSpace=O.outputColorSpace,H.batching=O.batching,H.batchingColor=O.batchingColor,H.instancing=O.instancing,H.instancingColor=O.instancingColor,H.instancingMorph=O.instancingMorph,H.skinning=O.skinning,H.morphTargets=O.morphTargets,H.morphNormals=O.morphNormals,H.morphColors=O.morphColors,H.morphTargetsCount=O.morphTargetsCount,H.numClippingPlanes=O.numClippingPlanes,H.numIntersection=O.numClipIntersection,H.vertexAlphas=O.vertexAlphas,H.vertexTangents=O.vertexTangents,H.toneMapping=O.toneMapping}function cy(E,O,H,G,B){O.isScene!==!0&&(O=dt),I.resetTextureUnits();let ee=O.fog,le=G.isMeshStandardMaterial?O.environment:null,ge=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Lt,ye=(G.isMeshStandardMaterial?k:A).get(G.envMap||le),Ie=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ue=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),_e=!!H.morphAttributes.position,$e=!!H.morphAttributes.normal,ht=!!H.morphAttributes.color,pt=Dn;G.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(pt=_.toneMapping);let ti=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,et=ti!==void 0?ti.length:0,be=Me.get(G),Ji=p.state.lights;if(J===!0&&(me===!0||E!==b)){let Si=E===b&&G.id===S;Q.setState(G,E,Si)}let tt=!1;G.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Ji.state.version||be.outputColorSpace!==ge||B.isBatchedMesh&&be.batching===!1||!B.isBatchedMesh&&be.batching===!0||B.isBatchedMesh&&be.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&be.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&be.instancing===!1||!B.isInstancedMesh&&be.instancing===!0||B.isSkinnedMesh&&be.skinning===!1||!B.isSkinnedMesh&&be.skinning===!0||B.isInstancedMesh&&be.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&be.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&be.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&be.instancingMorph===!1&&B.morphTexture!==null||be.envMap!==ye||G.fog===!0&&be.fog!==ee||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==Q.numPlanes||be.numIntersection!==Q.numIntersection)||be.vertexAlphas!==Ie||be.vertexTangents!==Ue||be.morphTargets!==_e||be.morphNormals!==$e||be.morphColors!==ht||be.toneMapping!==pt||be.morphTargetsCount!==et)&&(tt=!0):(tt=!0,be.__version=G.version);let Ii=be.currentProgram;tt===!0&&(Ii=Fa(G,O,B));let Ts=!1,ui=!1,Ir=!1,mt=Ii.getUniforms(),Hi=be.uniforms;if(we.useProgram(Ii.program)&&(Ts=!0,ui=!0,Ir=!0),G.id!==S&&(S=G.id,ui=!0),Ts||b!==E){we.buffers.depth.getReversed()?(se.copy(E.projectionMatrix),m_(se),g_(se),mt.setValue(F,"projectionMatrix",se)):mt.setValue(F,"projectionMatrix",E.projectionMatrix),mt.setValue(F,"viewMatrix",E.matrixWorldInverse);let Sn=mt.map.cameraPosition;Sn!==void 0&&Sn.setValue(F,Pe.setFromMatrixPosition(E.matrixWorld)),Xe.logarithmicDepthBuffer&&mt.setValue(F,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&mt.setValue(F,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,ui=!0,Ir=!0)}if(B.isSkinnedMesh){mt.setOptional(F,B,"bindMatrix"),mt.setOptional(F,B,"bindMatrixInverse");let Si=B.skeleton;Si&&(Si.boneTexture===null&&Si.computeBoneTexture(),mt.setValue(F,"boneTexture",Si.boneTexture,I))}B.isBatchedMesh&&(mt.setOptional(F,B,"batchingTexture"),mt.setValue(F,"batchingTexture",B._matricesTexture,I),mt.setOptional(F,B,"batchingIdTexture"),mt.setValue(F,"batchingIdTexture",B._indirectTexture,I),mt.setOptional(F,B,"batchingColorTexture"),B._colorsTexture!==null&&mt.setValue(F,"batchingColorTexture",B._colorsTexture,I));let Lr=H.morphAttributes;if((Lr.position!==void 0||Lr.normal!==void 0||Lr.color!==void 0)&&Ce.update(B,H,Ii),(ui||be.receiveShadow!==B.receiveShadow)&&(be.receiveShadow=B.receiveShadow,mt.setValue(F,"receiveShadow",B.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Hi.envMap.value=ye,Hi.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&O.environment!==null&&(Hi.envMapIntensity.value=O.environmentIntensity),ui&&(mt.setValue(F,"toneMappingExposure",_.toneMappingExposure),be.needsLights&&hy(Hi,Ir),ee&&G.fog===!0&&ae.refreshFogUniforms(Hi,ee),ae.refreshMaterialUniforms(Hi,G,W,K,p.state.transmissionRenderTarget[E.id]),Xs.upload(F,qd(be),Hi,I)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Xs.upload(F,qd(be),Hi,I),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&mt.setValue(F,"center",B.center),mt.setValue(F,"modelViewMatrix",B.modelViewMatrix),mt.setValue(F,"normalMatrix",B.normalMatrix),mt.setValue(F,"modelMatrix",B.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Si=G.uniformsGroups;for(let Sn=0,Mn=Si.length;Sn<Mn;Sn++){let jd=Si[Sn];U.update(jd,Ii),U.bind(jd,Ii)}}return Ii}function hy(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function uy(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,O,H){Me.get(E.texture).__webglTexture=O,Me.get(E.depthTexture).__webglTexture=H;let G=Me.get(E);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||We.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){let H=Me.get(E);H.__webglFramebuffer=O,H.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,H=0){C=E,M=O,T=H;let G=!0,B=null,ee=!1,le=!1;if(E){let ye=Me.get(E);if(ye.__useDefaultFramebuffer!==void 0)we.bindFramebuffer(F.FRAMEBUFFER,null),G=!1;else if(ye.__webglFramebuffer===void 0)I.setupRenderTarget(E);else if(ye.__hasExternalTextures)I.rebindTextures(E,Me.get(E.texture).__webglTexture,Me.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let _e=E.depthTexture;if(ye.__boundDepthTexture!==_e){if(_e!==null&&Me.has(_e)&&(E.width!==_e.image.width||E.height!==_e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(E)}}let Ie=E.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(le=!0);let Ue=Me.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ue[O])?B=Ue[O][H]:B=Ue[O],ee=!0):E.samples>0&&I.useMultisampledRTT(E)===!1?B=Me.get(E).__webglMultisampledFramebuffer:Array.isArray(Ue)?B=Ue[H]:B=Ue,P.copy(E.viewport),D.copy(E.scissor),L=E.scissorTest}else P.copy(xe).multiplyScalar(W).floor(),D.copy(Le).multiplyScalar(W).floor(),L=Qe;if(we.bindFramebuffer(F.FRAMEBUFFER,B)&&G&&we.drawBuffers(E,B),we.viewport(P),we.scissor(D),we.setScissorTest(L),ee){let ye=Me.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,ye.__webglTexture,H)}else if(le){let ye=Me.get(E.texture),Ie=O||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,ye.__webglTexture,H||0,Ie)}S=-1},this.readRenderTargetPixels=function(E,O,H,G,B,ee,le){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ge=Me.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&le!==void 0&&(ge=ge[le]),ge){we.bindFramebuffer(F.FRAMEBUFFER,ge);try{let ye=E.texture,Ie=ye.format,Ue=ye.type;if(!Xe.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-G&&H>=0&&H<=E.height-B&&F.readPixels(O,H,G,B,Ne.convert(Ie),Ne.convert(Ue),ee)}finally{let ye=C!==null?Me.get(C).__webglFramebuffer:null;we.bindFramebuffer(F.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(E,O,H,G,B,ee,le){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=Me.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&le!==void 0&&(ge=ge[le]),ge){let ye=E.texture,Ie=ye.format,Ue=ye.type;if(!Xe.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-G&&H>=0&&H<=E.height-B){we.bindFramebuffer(F.FRAMEBUFFER,ge);let _e=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,_e),F.bufferData(F.PIXEL_PACK_BUFFER,ee.byteLength,F.STREAM_READ),F.readPixels(O,H,G,B,Ne.convert(Ie),Ne.convert(Ue),0);let $e=C!==null?Me.get(C).__webglFramebuffer:null;we.bindFramebuffer(F.FRAMEBUFFER,$e);let ht=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await p_(F,ht,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,_e),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ee),F.deleteBuffer(_e),F.deleteSync(ht),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,O=null,H=0){E.isTexture!==!0&&(Hr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);let G=Math.pow(2,-H),B=Math.floor(E.image.width*G),ee=Math.floor(E.image.height*G),le=O!==null?O.x:0,ge=O!==null?O.y:0;I.setTexture2D(E,0),F.copyTexSubImage2D(F.TEXTURE_2D,H,0,0,le,ge,B,ee),we.unbindTexture()},this.copyTextureToTexture=function(E,O,H=null,G=null,B=0){E.isTexture!==!0&&(Hr("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,E=arguments[1],O=arguments[2],B=arguments[3]||0,H=null);let ee,le,ge,ye,Ie,Ue,_e,$e,ht,pt=E.isCompressedTexture?E.mipmaps[B]:E.image;H!==null?(ee=H.max.x-H.min.x,le=H.max.y-H.min.y,ge=H.isBox3?H.max.z-H.min.z:1,ye=H.min.x,Ie=H.min.y,Ue=H.isBox3?H.min.z:0):(ee=pt.width,le=pt.height,ge=pt.depth||1,ye=0,Ie=0,Ue=0),G!==null?(_e=G.x,$e=G.y,ht=G.z):(_e=0,$e=0,ht=0);let ti=Ne.convert(O.format),et=Ne.convert(O.type),be;O.isData3DTexture?(I.setTexture3D(O,0),be=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(I.setTexture2DArray(O,0),be=F.TEXTURE_2D_ARRAY):(I.setTexture2D(O,0),be=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);let Ji=F.getParameter(F.UNPACK_ROW_LENGTH),tt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Ii=F.getParameter(F.UNPACK_SKIP_PIXELS),Ts=F.getParameter(F.UNPACK_SKIP_ROWS),ui=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,pt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,pt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,ye),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ie),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ue);let Ir=E.isDataArrayTexture||E.isData3DTexture,mt=O.isDataArrayTexture||O.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){let Hi=Me.get(E),Lr=Me.get(O),Si=Me.get(Hi.__renderTarget),Sn=Me.get(Lr.__renderTarget);we.bindFramebuffer(F.READ_FRAMEBUFFER,Si.__webglFramebuffer),we.bindFramebuffer(F.DRAW_FRAMEBUFFER,Sn.__webglFramebuffer);for(let Mn=0;Mn<ge;Mn++)Ir&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Me.get(E).__webglTexture,B,Ue+Mn),E.isDepthTexture?(mt&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Me.get(O).__webglTexture,B,ht+Mn),F.blitFramebuffer(ye,Ie,ee,le,_e,$e,ee,le,F.DEPTH_BUFFER_BIT,F.NEAREST)):mt?F.copyTexSubImage3D(be,B,_e,$e,ht+Mn,ye,Ie,ee,le):F.copyTexSubImage2D(be,B,_e,$e,ht+Mn,ye,Ie,ee,le);we.bindFramebuffer(F.READ_FRAMEBUFFER,null),we.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else mt?E.isDataTexture||E.isData3DTexture?F.texSubImage3D(be,B,_e,$e,ht,ee,le,ge,ti,et,pt.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(be,B,_e,$e,ht,ee,le,ge,ti,pt.data):F.texSubImage3D(be,B,_e,$e,ht,ee,le,ge,ti,et,pt):E.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,B,_e,$e,ee,le,ti,et,pt.data):E.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,B,_e,$e,pt.width,pt.height,ti,pt.data):F.texSubImage2D(F.TEXTURE_2D,B,_e,$e,ee,le,ti,et,pt);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ji),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,tt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ii),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ts),F.pixelStorei(F.UNPACK_SKIP_IMAGES,ui),B===0&&O.generateMipmaps&&F.generateMipmap(be),we.unbindTexture()},this.copyTextureToTexture3D=function(E,O,H=null,G=null,B=0){return E.isTexture!==!0&&(Hr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,G=arguments[1]||null,E=arguments[2],O=arguments[3],B=arguments[4]||0),Hr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,O,H,G,B)},this.initRenderTarget=function(E){Me.get(E).__webglFramebuffer===void 0&&I.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?I.setTextureCube(E,0):E.isData3DTexture?I.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?I.setTexture2DArray(E,0):I.setTexture2D(E,0),we.unbindTexture()},this.resetState=function(){M=0,T=0,C=null,we.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}};var Po=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Se(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Io=class extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Qr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=fh,this.updateRanges=[],this.version=0,this.uuid=Oi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Yt=new R,ea=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ni(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ni(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ni(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ni(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Be(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var $f=new R,Kf=new Ze,Jf=new Ze,fS=new R,Qf=new te,ro=new R,Mc=new _t,ep=new te,Tc=new oi,Lo=class extends at{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Qd,this.bindMatrix=new te,this.bindMatrixInverse=new te,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ge),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingBox.expandByPoint(ro)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new _t),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingSphere.expandByPoint(ro)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mc.copy(this.boundingSphere),Mc.applyMatrix4(s),e.ray.intersectsSphere(Mc)!==!1&&(ep.copy(s).invert(),Tc.copy(e.ray).applyMatrix4(ep),!(this.boundingBox!==null&&Tc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Tc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ze,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Qd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zy?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Kf.fromBufferAttribute(s.attributes.skinIndex,e),Jf.fromBufferAttribute(s.attributes.skinWeight,e),$f.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=Jf.getComponent(r);if(a!==0){let o=Kf.getComponent(r);Qf.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(fS.copy($f).applyMatrix4(Qf),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},ta=class extends vt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Xi=class extends It{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Nt,u=Nt,h,d){super(null,a,o,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},tp=new te,pS=new te,Do=class i{constructor(e=[],t=[]){this.uuid=Oi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new te)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new te;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:pS;tp.multiplyMatrices(o,t[r]),tp.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Xi(t,e,e,ri,si);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new ta),this.bones.push(a),this.boneInverses.push(new te().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},ps=class extends Be{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},zs=new te,ip=new te,ao=[],np=new Ge,mS=new te,Br=new at,Fr=new _t,sr=class extends at{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ps(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,mS)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ge),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zs),np.copy(e.boundingBox).applyMatrix4(zs),this.boundingBox.union(np)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _t),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zs),Fr.copy(e.boundingSphere).applyMatrix4(zs),this.boundingSphere.union(Fr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Br.geometry=this.geometry,Br.material=this.material,Br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fr.copy(this.boundingSphere),Fr.applyMatrix4(n),e.ray.intersectsSphere(Fr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,zs),ip.multiplyMatrices(n,zs),Br.matrixWorld=ip,Br.raycast(e,ao);for(let a=0,o=ao.length;a<o;a++){let l=ao[a];l.instanceId=r,l.object=this,t.push(l)}ao.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ps(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Xi(new Float32Array(s*this.count),s,this.count,jo,si));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};function wc(i,e){return i-e}function gS(i,e){return i.z-e.z}function yS(i,e){return e.z-i.z}var Ih=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,s){let r=this.pool,a=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let o=r[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=s}reset(){this.list.length=0,this.index=0}},ii=new te,_S=new Se(1,1,1),Ac=new hn,oo=new Ge,ls=new _t,zr=new R,sp=new R,xS=new R,Ec=new Ih,Ht=new at,lo=[];function vS(i,e,t=0){let n=e.itemSize;if(i.isInterleavedBufferAttribute||i.array.constructor!==e.array.constructor){let s=i.count;for(let r=0;r<s;r++)for(let a=0;a<n;a++)e.setComponent(r+t,a,i.getComponent(r,a))}else e.array.set(i.array,t*n);e.needsUpdate=!0}function cs(i,e){if(i.constructor!==e.constructor){let t=Math.min(i.length,e.length);for(let n=0;n<t;n++)e[n]=i[n]}else{let t=Math.min(i.length,e.length);e.set(new i.constructor(i.buffer,0,t))}}var ia=class extends at{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(e,t,n=t*2,s){super(new xt,s),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new Xi(t,e,e,ri,si);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new Xi(t,e,e,Zo,Un);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new Xi(t,e,e,ri,si);n.colorSpace=ze.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,s=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in e.attributes){let a=e.getAttribute(r),{array:o,itemSize:l,normalized:c}=a,u=new o.constructor(n*l),h=new Be(u,l,c);t.setAttribute(r,h)}if(e.getIndex()!==null){let r=n>65535?new Uint32Array(s):new Uint16Array(s);t.setIndex(new Be(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let s=e.getAttribute(n),r=t.getAttribute(n);if(s.itemSize!==r.itemSize||s.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ge);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,s=t.length;n<s;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,ii),this.getBoundingBoxAt(r,oo).applyMatrix4(ii),e.union(oo)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _t);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,s=t.length;n<s;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,ii),this.getBoundingSphereAt(r,ls).applyMatrix4(ii),e.union(ls)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},s=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(wc),s=this._availableInstanceIds.shift(),this._instanceInfo[s]=n):(s=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;ii.identity().toArray(r.image.data,s*16),r.needsUpdate=!0;let a=this._colorsTexture;return a&&(_S.toArray(a.image.data,s*4),a.needsUpdate=!0),this._visibilityChanged=!0,s}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let s={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;s.vertexStart=this._nextVertexStart,s.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let a=e.getIndex();if(a!==null&&(s.indexStart=this._nextIndexStart,s.reservedIndexCount=n===-1?a.count:n),s.indexStart!==-1&&s.indexStart+s.reservedIndexCount>this._maxIndexCount||s.vertexStart+s.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(wc),l=this._availableGeometryIds.shift(),r[l]=s):(l=this._geometryCount,this._geometryCount++,r.push(s)),this.setGeometryAt(l,e),this._nextIndexStart=s.indexStart+s.reservedIndexCount,this._nextVertexStart=s.vertexStart+s.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,s=n.getIndex()!==null,r=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(s&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");let l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(let u in n.attributes){let h=t.getAttribute(u),d=n.getAttribute(u);vS(h,d,l);let f=h.itemSize;for(let m=h.count,y=c;m<y;m++){let g=l+m;for(let p=0;p<f;p++)d.setComponent(g,p,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(s){let u=o.indexStart,h=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let d=0;d<a.count;d++)r.setX(u+d,l+a.getX(d));for(let d=a.count,f=h;d<f;d++)r.setX(u+d,l);r.needsUpdate=!0,r.addUpdateRange(u,o.reservedIndexCount)}return o.start=s?o.indexStart:o.vertexStart,o.count=s?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let s=0,r=n.length;s<r;s++)n[s].geometryIndex===e&&this.deleteInstance(s);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){let t=this._instanceInfo;return e>=t.length||t[e].active===!1?this:(t[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this)}optimize(){let e=0,t=0,n=this._geometryInfo,s=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),r=this.geometry;for(let a=0,o=n.length;a<o;a++){let l=s[a],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){let{indexStart:u,vertexStart:h,reservedIndexCount:d}=c,f=r.index,m=f.array,y=e-h;for(let g=u;g<u+d;g++)m[g]=m[g]+y;f.array.copyWithin(t,u,u+d),f.addUpdateRange(t,d),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){let{vertexStart:u,reservedVertexCount:h}=c,d=r.attributes;for(let f in d){let m=d[f],{array:y,itemSize:g}=m;y.copyWithin(e*g,u*g,(u+h)*g),m.addUpdateRange(e*g,h*g)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart,this._nextIndexStart=r.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,s=this._geometryInfo[e];if(s.boundingBox===null){let r=new Ge,a=n.index,o=n.attributes.position;for(let l=s.start,c=s.start+s.count;l<c;l++){let u=l;a&&(u=a.getX(u)),r.expandByPoint(zr.fromBufferAttribute(o,u))}s.boundingBox=r}return t.copy(s.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,s=this._geometryInfo[e];if(s.boundingSphere===null){let r=new _t;this.getBoundingBoxAt(e,oo),oo.getCenter(r.center);let a=n.index,o=n.attributes.position,l=0;for(let c=s.start,u=s.start+s.count;c<u;c++){let h=c;a&&(h=a.getX(h)),zr.fromBufferAttribute(o,h),l=Math.max(l,r.center.distanceToSquared(zr))}r.radius=Math.sqrt(l),s.boundingSphere=r}return t.copy(s.boundingSphere),t}setMatrixAt(e,t){let n=this._instanceInfo,s=this._matricesTexture,r=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?this:(t.toArray(r,e*16),s.needsUpdate=!0,this)}getMatrixAt(e,t){let n=this._instanceInfo,s=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?null:t.fromArray(s,e*16)}setColorAt(e,t){this._colorsTexture===null&&this._initColorsTexture();let n=this._colorsTexture,s=this._colorsTexture.image.data,r=this._instanceInfo;return e>=r.length||r[e].active===!1?this:(t.toArray(s,e*4),n.needsUpdate=!0,this)}getColorAt(e,t){let n=this._colorsTexture.image.data,s=this._instanceInfo;return e>=s.length||s[e].active===!1?null:t.fromArray(n,e*4)}setVisibleAt(e,t){let n=this._instanceInfo;return e>=n.length||n[e].active===!1||n[e].visible===t?this:(n[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){let t=this._instanceInfo;return e>=t.length||t[e].active===!1?!1:t[e].visible}setGeometryIdAt(e,t){let n=this._instanceInfo,s=this._geometryInfo;return e>=n.length||n[e].active===!1||t>=s.length||s[t].active===!1?null:(n[e].geometryIndex=t,this)}getGeometryIdAt(e){let t=this._instanceInfo;return e>=t.length||t[e].active===!1?-1:t[e].geometryIndex}getGeometryRangeAt(e,t={}){if(e<0||e>=this._geometryCount)return null;let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(wc);t[t.length-1]===n.length;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let s=new Int32Array(e),r=new Int32Array(e);cs(this._multiDrawCounts,s),cs(this._multiDrawStarts,r),this._multiDrawCounts=s,this._multiDrawStarts=r,this._maxInstanceCount=e;let a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),cs(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),cs(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),cs(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new xt,this._initializeGeometry(r));let a=this.geometry;r.index&&cs(r.index.array,a.index.array);for(let o in r.attributes)cs(r.attributes[o].array,a.attributes[o].array)}raycast(e,t){let n=this._instanceInfo,s=this._geometryInfo,r=this.matrixWorld,a=this.geometry;Ht.material=this.material,Ht.geometry.index=a.index,Ht.geometry.attributes=a.attributes,Ht.geometry.boundingBox===null&&(Ht.geometry.boundingBox=new Ge),Ht.geometry.boundingSphere===null&&(Ht.geometry.boundingSphere=new _t);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;let c=n[o].geometryIndex,u=s[c];Ht.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,Ht.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,Ht.geometry.boundingBox),this.getBoundingSphereAt(c,Ht.geometry.boundingSphere),Ht.raycast(e,lo);for(let h=0,d=lo.length;h<d;h++){let f=lo[h];f.object=this,f.batchId=o,t.push(f)}lo.length=0}Ht.material=null,Ht.geometry.index=null,Ht.geometry.attributes={},Ht.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(e,t,n,s,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let a=s.getIndex(),o=a===null?1:a.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,u=this._multiDrawCounts,h=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,m=f.image.data;d&&(ii.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Ac.setFromProjectionMatrix(ii,e.coordinateSystem));let y=0;if(this.sortObjects){ii.copy(this.matrixWorld).invert(),zr.setFromMatrixPosition(n.matrixWorld).applyMatrix4(ii),sp.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(ii);for(let v=0,x=l.length;v<x;v++)if(l[v].visible&&l[v].active){let _=l[v].geometryIndex;this.getMatrixAt(v,ii),this.getBoundingSphereAt(_,ls).applyMatrix4(ii);let w=!1;if(d&&(w=!Ac.intersectsSphere(ls)),!w){let M=h[_],T=xS.subVectors(ls.center,zr).dot(sp);Ec.push(M.start,M.count,T,v)}}let g=Ec.list,p=this.customSort;p===null?g.sort(r.transparent?yS:gS):p.call(this,g,n);for(let v=0,x=g.length;v<x;v++){let _=g[v];c[y]=_.start*o,u[y]=_.count,m[y]=_.index,y++}Ec.reset()}else for(let g=0,p=l.length;g<p;g++)if(l[g].visible&&l[g].active){let v=l[g].geometryIndex,x=!1;if(d&&(this.getMatrixAt(g,ii),this.getBoundingSphereAt(v,ls).applyMatrix4(ii),x=!Ac.intersectsSphere(ls)),!x){let _=h[v];c[y]=_.start*o,u[y]=_.count,m[y]=g,y++}}f.needsUpdate=!0,this._multiDrawCount=y,this._visibilityChanged=!1}onBeforeShadow(e,t,n,s,r,a){this.onBeforeRender(e,null,s,r,a)}},rr=class extends mi{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Uo=new R,No=new R,rp=new te,kr=new oi,co=new _t,Cc=new R,ap=new R,dn=class extends vt{constructor(e=new xt,t=new rr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Uo.fromBufferAttribute(t,s-1),No.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Uo.distanceTo(No);e.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),co.copy(n.boundingSphere),co.applyMatrix4(s),co.radius+=r,e.ray.intersectsSphere(co)===!1)return;rp.copy(s).invert(),kr.copy(e.ray).applyMatrix4(rp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let y=f,g=m-1;y<g;y+=c){let p=u.getX(y),v=u.getX(y+1),x=ho(this,e,kr,l,p,v);x&&t.push(x)}if(this.isLineLoop){let y=u.getX(m-1),g=u.getX(f),p=ho(this,e,kr,l,y,g);p&&t.push(p)}}else{let f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let y=f,g=m-1;y<g;y+=c){let p=ho(this,e,kr,l,y,y+1);p&&t.push(p)}if(this.isLineLoop){let y=ho(this,e,kr,l,m-1,f);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ho(i,e,t,n,s,r){let a=i.geometry.attributes.position;if(Uo.fromBufferAttribute(a,s),No.fromBufferAttribute(a,r),t.distanceSqToSegment(Uo,No,Cc,ap)>n)return;Cc.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Cc);if(!(l<e.near||l>e.far))return{distance:l,point:ap.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var op=new R,lp=new R,Nn=class extends dn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)op.fromBufferAttribute(t,s),lp.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+op.distanceTo(lp);e.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ms=class extends dn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},On=class extends mi{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},cp=new te,Lh=new oi,uo=new _t,fo=new R,qi=class extends vt{constructor(e=new xt,t=new On){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(s),uo.radius+=r,e.ray.intersectsSphere(uo)===!1)return;cp.copy(s).invert(),Lh.copy(e.ray).applyMatrix4(cp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,y=f;m<y;m++){let g=c.getX(m);fo.fromBufferAttribute(h,g),hp(fo,g,l,s,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,y=f;m<y;m++)fo.fromBufferAttribute(h,m),hp(fo,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function hp(i,e,t,n,s,r,a){let o=Lh.distanceSqToPoint(i);if(o<t){let l=new R;Lh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var gs=class extends mi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lp,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},_i=class extends gs{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function po(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function bS(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function SS(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function up(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function Hp(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var Bn=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];i:{e:{let a;t:{n:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break n;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break i}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Dh=class extends Bn{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ef,endingEnd:ef}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case tf:r=e,o=2*t-n;break;case nf:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case tf:a=e,l=2*n-t;break;case nf:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),y=m*m,g=y*m,p=-d*g+2*d*y-d*m,v=(1+d)*g+(-1.5-2*d)*y+(-.5+d)*m+1,x=(-1-f)*g+(1.5+f)*y+.5*m,_=f*g-f*y;for(let w=0;w!==o;++w)r[w]=p*a[u+w]+v*a[c+w]+x*a[l+w]+_*a[h+w];return r}},Uh=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[c+d]*h+a[l+d]*u;return r}},Nh=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Ai=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=po(t,this.TimeBufferType),this.values=po(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:po(e.times,Array),values:po(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Nh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Uh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Dh(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ks:t=this.InterpolantFactoryMethodDiscrete;break;case Js:t=this.InterpolantFactoryMethodLinear;break;case $l:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ks;case this.InterpolantFactoryMethodLinear:return Js;case this.InterpolantFactoryMethodSmooth:return $l}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&bS(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===$l,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let h=o*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){let y=t[h+m];if(y!==t[d+m]||y!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Ai.prototype.TimeBufferType=Float32Array;Ai.prototype.ValueBufferType=Float32Array;Ai.prototype.DefaultInterpolation=Js;var Fn=class extends Ai{constructor(e,t,n){super(e,t,n)}};Fn.prototype.ValueTypeName="bool";Fn.prototype.ValueBufferType=Array;Fn.prototype.DefaultInterpolation=Ks;Fn.prototype.InterpolantFactoryMethodLinear=void 0;Fn.prototype.InterpolantFactoryMethodSmooth=void 0;var Oo=class extends Ai{};Oo.prototype.ValueTypeName="color";var fn=class extends Ai{};fn.prototype.ValueTypeName="number";var Oh=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)Ot.slerpFlat(r,0,a,c-o,a,c,l);return r}},pn=class extends Ai{InterpolantFactoryMethodLinear(e){return new Oh(this.times,this.values,this.getValueSize(),e)}};pn.prototype.ValueTypeName="quaternion";pn.prototype.InterpolantFactoryMethodSmooth=void 0;var zn=class extends Ai{constructor(e,t,n){super(e,t,n)}};zn.prototype.ValueTypeName="string";zn.prototype.ValueBufferType=Array;zn.prototype.DefaultInterpolation=Ks;zn.prototype.InterpolantFactoryMethodLinear=void 0;zn.prototype.InterpolantFactoryMethodSmooth=void 0;var mn=class extends Ai{};mn.prototype.ValueTypeName="vector";var Bo=class{constructor(e="",t=-1,n=[],s=ky){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Oi(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(TS(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Ai.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let u=SS(l);l=up(l,1,u),c=up(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new fn(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(r);if(u&&u.length>1){let h=u[1],d=s[h];d||(s[h]=d=[]),d.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,f,m,y){if(f.length!==0){let g=[],p=[];Hp(f,g,p,m),g.length!==0&&y.push(new h(d,g,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let y=0;y<d[m].morphTargets.length;y++)f[d[m].morphTargets[y]]=-1;for(let y in f){let g=[],p=[];for(let v=0;v!==d[m].morphTargets.length;++v){let x=d[m];g.push(x.time),p.push(x.morphTarget===y?1:0)}s.push(new fn(".morphTargetInfluence["+y+"]",g,p))}l=f.length*a}else{let f=".bones["+t[h].name+"]";n(mn,f+".position",d,"pos",s),n(pn,f+".quaternion",d,"rot",s),n(mn,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function MS(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return fn;case"vector":case"vector2":case"vector3":case"vector4":return mn;case"color":return Oo;case"quaternion":return pn;case"bool":case"boolean":return Fn;case"string":return zn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function TS(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=MS(i.type);if(i.times===void 0){let t=[],n=[];Hp(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var In={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},na=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null}}},ys=new na,Fi=class{constructor(e){this.manager=e!==void 0?e:ys,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Fi.DEFAULT_MATERIAL_NAME="__DEFAULT";var rn={},Bh=class extends Error{constructor(e,t){super(e),this.response=t}},Yi=class extends Fi{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=In.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(rn[e]!==void 0){rn[e].push({onLoad:t,onProgress:n,onError:s});return}rn[e]=[],rn[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=rn[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0,y=0,g=new ReadableStream({start(p){v();function v(){h.read().then(({done:x,value:_})=>{if(x)p.close();else{y+=_.byteLength;let w=new ProgressEvent("progress",{lengthComputable:m,loaded:y,total:f});for(let M=0,T=u.length;M<T;M++){let C=u[M];C.onProgress&&C.onProgress(w)}p.enqueue(_),v()}},x=>{p.error(x)})}}});return new Response(g)}else throw new Bh(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o===void 0)return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{In.add(e,c);let u=rn[e];delete rn[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=rn[e];if(u===void 0)throw this.manager.itemError(e),c;delete rn[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Fh=class extends Fi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=In.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;let o=$r("img");function l(){u(),In.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}};var Fo=class extends Fi{constructor(e){super(e)}load(e,t,n,s){let r=new It,a=new Fh(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},ar=class extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Se(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},zo=class extends ar{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Rc=new te,dp=new R,fp=new R,sa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hn,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;dp.setFromMatrixPosition(e.matrixWorld),t.position.copy(dp),fp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fp),t.updateMatrixWorld(),Rc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Rc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},zh=class extends sa{constructor(){super(new At(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Qs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ko=class extends ar{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new zh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},pp=new te,Vr=new R,Pc=new R,kh=class extends sa{constructor(){super(new At(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new Ze(2,1,1,1),new Ze(0,1,1,1),new Ze(3,1,1,1),new Ze(1,1,1,1),new Ze(3,0,1,1),new Ze(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Vr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Vr),Pc.copy(n.position),Pc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Pc),n.updateMatrixWorld(),s.makeTranslation(-Vr.x,-Vr.y,-Vr.z),pp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pp)}},Vo=class extends ar{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new kh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Vh=class extends sa{constructor(){super(new un(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ho=class extends ar{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new Vh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var kn=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Go=class extends Fi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=In.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return In.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),In.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});In.add(e,l),r.manager.itemStart(e)}};var ra=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=mp(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=mp();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function mp(){return performance.now()}var tu="\\[\\]\\.:\\/",wS=new RegExp("["+tu+"]","g"),iu="[^"+tu+"]",AS="[^"+tu.replace("\\.","")+"]",ES=/((?:WC+[\/:])*)/.source.replace("WC",iu),CS=/(WCOD+)?/.source.replace("WCOD",AS),RS=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",iu),PS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",iu),IS=new RegExp("^"+ES+CS+RS+PS+"$"),LS=["material","materials","bones","map"],Hh=class{constructor(e,t,n){let s=n||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ut=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wS,"")}static parseTrackName(e){let t=IS.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);LS.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ut.Composite=Hh;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zT=new Float32Array(1);var gp=new te,or=class{constructor(e,t,n=0,s=1/0){this.ray=new oi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Jr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return gp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gp),this}intersectObject(e,t=!0,n=[]){return Gh(e,this,n,t),n.sort(yp),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Gh(e[s],this,n,t);return n.sort(yp),n}};function yp(i,e){return i.distance-e.distance}function Gh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Gh(r[a],e,t,!0)}}var Wo=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Pt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Xo=class i{constructor(e,t,n,s){i.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}},_p=new ue,qo=class{constructor(e=new ue(1/0,1/0),t=new ue(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_p.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_p).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},xp=new R,mo=new R,li=class{constructor(e=new R,t=new R){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){xp.subVectors(e,this.start),mo.subVectors(this.end,this.start);let n=mo.dot(mo),r=mo.dot(xp)/n;return t&&(r=Pt(r,0,1)),r}closestPointToPoint(e,t,n){let s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");function US(i){try{let e=typeof location<"u"?location.href:void 0;return new URL(i,e).origin}catch{return null}}function Gp(i){if(!i)return null;let e=i.length,t=i.indexOf("?"),n=i.indexOf("#");t!==-1&&(e=Math.min(e,t)),n!==-1&&(e=Math.min(e,n));let s=i.lastIndexOf(".",e),r=i.lastIndexOf("/",e),a=i.indexOf("://");return a!==-1&&a+2===r||s===-1||s<r?null:i.substring(s+1,e)||null}var il=class{static pending=new Map;static session=null;static setXRSession(i){i!==this.session&&(this.flushPending(),this.session=i)}static requestAnimationFrame(i){let{session:e,pending:t}=this,n,s=()=>{t.delete(n),i()};return n=e?e.requestAnimationFrame(s):requestAnimationFrame(s),t.set(n,i),n}static cancelAnimationFrame(i){let{pending:e,session:t}=this;e.delete(i),t?t.cancelAnimationFrame(i):cancelAnimationFrame(i)}static flushPending(){this.pending.forEach((i,e)=>{i(),this.cancelAnimationFrame(e)})}},Wp=2**30,au=class{get unloadPriorityCallback(){return this._unloadPriorityCallback}set unloadPriorityCallback(i){i.length===1?(console.warn('LRUCache: "unloadPriorityCallback" function has been changed to take two arguments.'),this._unloadPriorityCallback=(e,t)=>{let n=i(e),s=i(t);return n<s?-1:+(n>s)}):this._unloadPriorityCallback=i}constructor(){this.minSize=6e3,this.maxSize=8e3,this.minBytesSize=.3*Wp,this.maxBytesSize=.4*Wp,this.unloadPercent=.05,this.autoMarkUnused=!0,this.cachedBytes=0,this.itemSet=new Map,this.itemList=[],this.usedSet=new Set,this.callbacks=new Map,this.unloadingHandle=-1,this.bytesMap=new Map,this.loadedSet=new Set,this._unloadPriorityCallback=null;let i=this.itemSet;this.defaultPriorityCallback=e=>i.get(e)}isFull(){return this.itemSet.size>=this.maxSize||this.cachedBytes>=this.maxBytesSize}getMemoryUsage(i){return this.bytesMap.get(i)||0}setMemoryUsage(i,e){let{bytesMap:t,itemSet:n}=this;n.has(i)&&(e=Math.round(e),this.cachedBytes-=t.get(i)||0,t.set(i,e),this.cachedBytes+=e)}add(i,e){let t=this.itemSet;if(t.has(i)||this.isFull())return!1;let n=this.usedSet,s=this.itemList,r=this.callbacks;return s.push(i),n.add(i),t.set(i,Date.now()),r.set(i,e),!0}has(i){return this.itemSet.has(i)}remove(i){let e=this.usedSet,t=this.itemSet,n=this.itemList,s=this.bytesMap,r=this.callbacks,a=this.loadedSet;if(t.has(i)){this.cachedBytes-=s.get(i)||0,s.delete(i),r.get(i)(i);let o=n.indexOf(i);return n.splice(o,1),e.delete(i),t.delete(i),r.delete(i),a.delete(i),!0}return!1}setLoaded(i,e){let{itemSet:t,loadedSet:n}=this;t.has(i)&&(e===!0?n.add(i):n.delete(i))}markUsed(i){let e=this.itemSet,t=this.usedSet;e.has(i)&&!t.has(i)&&(e.set(i,Date.now()),t.add(i))}markUnused(i){this.usedSet.delete(i)}markAllUnused(){this.usedSet.clear()}isUsed(i){return this.usedSet.has(i)}unloadUnusedContent(){let{unloadPercent:i,minSize:e,maxSize:t,itemList:n,itemSet:s,usedSet:r,loadedSet:a,callbacks:o,bytesMap:l,minBytesSize:c,maxBytesSize:u}=this,h=n.length-r.size,d=n.length-a.size,f=Math.max(Math.min(n.length-e,h),0),m=this.cachedBytes-c,y=this.unloadPriorityCallback||this.defaultPriorityCallback,g=!1,p=f>0&&h>0||d&&n.length>t;if(h&&this.cachedBytes>c||d&&this.cachedBytes>u||p){n.sort((C,S)=>{let b=r.has(C);if(b===r.has(S)){let P=a.has(C);return P===a.has(S)?-y(C,S):P?1:-1}return b?1:-1});let v=Math.max(e*i,f*i),x=Math.ceil(Math.min(v,h,f)),_=Math.max(i*m,i*c),w=Math.min(_,m),M=0,T=0;for(;M<n.length&&(this.cachedBytes-T>u||n.length-M>t);){let C=n[M],S=l.get(C)||0;if(r.has(C)&&a.has(C)||this.cachedBytes-T-S<u&&n.length-M<=t)break;T+=S,M++}for(;M<n.length&&(T<w||M<x);){let C=n[M],S=l.get(C)||0;if(r.has(C)||this.cachedBytes-T-S<c&&M>=x)break;T+=S,M++}n.splice(0,M).forEach(C=>{this.cachedBytes-=l.get(C)||0,o.get(C)(C),l.delete(C),s.delete(C),o.delete(C),a.delete(C),r.delete(C)}),g=M<f||T<m&&M<h,g&&=M>0}g&&(this.unloadingHandle=il.requestAnimationFrame(()=>this.scheduleUnload()))}scheduleUnload(){il.cancelAnimationFrame(this.unloadingHandle),this.scheduled||(this.scheduled=!0,queueMicrotask(()=>{this.scheduled=!1,this.unloadUnusedContent()}))}},NS=class extends DOMException{constructor(){super("PriorityQueue: Item removed","AbortError")}},cr=class{get running(){return this.items.length!==0||this.currJobs!==0}constructor(){this.maxJobs=6,this.items=[],this.callbacks=new Map,this.currJobs=0,this.scheduled=!1,this.autoUpdate=!0,this.priorityCallback=null,this._schedulingCallback=i=>{il.requestAnimationFrame(i)},this._runjobs=()=>{this.scheduled=!1,this.tryRunJobs()}}sort(){let i=this.priorityCallback,e=this.items;i!==null&&e.sort(i)}has(i){return this.callbacks.has(i)}add(i,e){let t={callback:e,reject:null,resolve:null,promise:null};return t.promise=new Promise((n,s)=>{let r=this.items,a=this.callbacks;t.resolve=n,t.reject=s,r.unshift(i),a.set(i,t),this.autoUpdate&&this.scheduleJobRun()}),t.promise}remove(i){let e=this.items,t=this.callbacks,n=e.indexOf(i);if(n!==-1){let s=t.get(i);s.promise.catch(r=>{if(r.name!=="AbortError")throw r}),s.reject(new NS),e.splice(n,1),t.delete(i)}}removeByFilter(i){let{items:e}=this;for(let t=0;t<e.length;t++){let n=e[t];i(n)&&(this.remove(n),t--)}}tryRunJobs(){this.sort();let i=this.items,e=this.callbacks,t=this.maxJobs,n=0,s=()=>{this.currJobs--,this.autoUpdate&&this.scheduleJobRun()};for(;t>this.currJobs&&i.length>0&&n<t;){this.currJobs++,n++;let r=i.pop(),{callback:a,resolve:o,reject:l}=e.get(r);e.delete(r);let c;try{c=a(r)}catch(u){l(u),s();continue}c instanceof Promise?c.then(o).catch(l).finally(s):(o(c),s())}}flush(i){let{items:e,callbacks:t}=this,n=e.indexOf(i);if(!t.has(i))return;let{callback:s,resolve:r,reject:a}=t.get(i);t.delete(i),e.splice(n,1);let o;try{o=s(i)}catch(l){a(l);return}return o instanceof Promise?o.then(r).catch(a):r(o),o}scheduleJobRun(){this.scheduled||=(this._schedulingCallback(this._runjobs),!0)}},OS=class{get running(){for(let i of this.originQueues.values())if(i.running)return!0;return!1}get maxJobsPerOrigin(){return this._maxJobsPerOrigin}set maxJobsPerOrigin(i){this._maxJobsPerOrigin=i,this.originQueues.forEach(e=>e.maxJobs=i)}get maxJobs(){return this.maxJobsPerOrigin}set maxJobs(i){console.warn('DownloadPriorityQueue: "maxJobs" is no longer valid and limits jobs per server origin. Use "maxJobsPerOrigin", instead.'),this.maxJobsPerOrigin=i}get priorityCallback(){return this._priorityCallback}set priorityCallback(i){this._priorityCallback=i,this.originQueues.forEach(e=>e.priorityCallback=i)}constructor(){this.originQueues=new Map,this._itemQueues=new WeakMap,this._maxJobsPerOrigin=6,this._priorityCallback=null}add(i,e,t,n=null){this.originQueues.forEach((l,c)=>{l.running||this.originQueues.delete(c)});let s=i===null?null:US(i),r=this.originQueues.get(s);r||(r=new cr,r.maxJobs=this._maxJobsPerOrigin,r.priorityCallback=this._priorityCallback,this.originQueues.set(s,r));let a=this._itemQueues.get(e);if(a&&a!==r&&a.has(e))throw Error("DownloadPriorityQueue: Item is already queued with a different url origin.");this._itemQueues.set(e,r);let o=r.add(e,t);return n!==null&&(n.aborted?this.remove(e):n.addEventListener("abort",()=>this.remove(e),{once:!0})),o}remove(i){let e=this._itemQueues.get(i);e&&(e.remove(i),this._itemQueues.delete(i))}has(i){let e=this._itemQueues.get(i);return!!(e&&e.has(i))}};var hr=6378137,kT=1/298.257223563,Yp=6356752314245179e-9,tl={inView:!1,error:1/0,distanceFromCamera:1/0};function rl(i){return i===4||i===-1}function gn(i,e){return al(i)&&i.traversal.lastFrameVisited===e&&i.traversal.used}function al(i){return!!i.traversal}function ca(i){let{children:e}=i,t=e.length===0||al(e[e.length-1]),n=!i.internal.hasUnrenderableContent||rl(i.internal.loadingState);return t&&n}function _s(i){return i.traversal.unconditionallyRefine}function la(i,e,t=!0){if(al(i)&&(e.ensureChildrenArePreprocessed(i),i.traversal.lastFrameVisited!==e.frameCount&&(i.traversal.wasInFrustum=i.traversal.inFrustum,i.traversal.wasSetActive=i.traversal.active,i.traversal.wasSetVisible=i.traversal.visible,i.traversal.usedLastFrame=i.traversal.used,i.traversal.lastFrameVisited=e.frameCount,i.traversal.used=!1,i.traversal.inFrustum=!1,i.traversal.isLeaf=!1,i.traversal.visible=!1,i.traversal.active=!1,i.traversal.error=1/0,i.traversal.distanceFromCamera=1/0,i.traversal.allChildrenReady=!1,i.traversal.allChildrenLoaded=!1,i.traversal.kicked=!1,i.traversal.allUsedChildrenProcessed=!1,t&&(e.calculateTileViewErrorWithPlugin(i,tl),i.traversal.inFrustum=tl.inView,i.traversal.error=tl.error,i.traversal.distanceFromCamera=tl.distanceFromCamera),i.traversal.unconditionallyRefine=i.internal.hasUnrenderableContent,!i.traversal.unconditionallyRefine))){let n=i.parent;for(;n&&n.traversal.unconditionallyRefine;)n=n.parent;n&&n.geometricError<=i.geometricError&&(i.traversal.unconditionallyRefine=!0)}}function nu(i,e,t=!1){if(la(i,e),t?e.markTileUsed(i):nl(i),_s(i)&&ca(i)){let n=i.children;for(let s=0,r=n.length;s<r;s++)nu(n[s],e,t)}}function jp(i,e){if(la(i,e),i.traversal.usedLastFrame&&(nl(i),i.traversal.wasSetActive&&(i.traversal.active=!0),(!i.traversal.active||_s(i))&&ca(i))){let t=i.children;for(let n=0,s=t.length;n<s;n++)jp(t[n],e)}}function nl(i){i.traversal.used=!0}function BS(i,e){return!(i.traversal.error<=e.errorTarget&&!_s(i)||e.maxDepth>0&&i.internal.depth+1>=e.maxDepth||!ca(i))}function Zp(i,e){let{frameCount:t}=e,{children:n}=i;for(let s=0,r=n.length;s<r;s++){let a=n[s];gn(a,t)&&(a.traversal.active&&(a.traversal.kicked=!0,a.traversal.active=!1),Zp(a,e))}}function Xp(i){return!_s(i)&&(!i.internal.hasContent||rl(i.internal.loadingState))}function $p(i,e){if(la(i,e),!i.traversal.inFrustum)return;let t=i.parent;if(t&&t.refine==="ADD"&&!t.internal.hasUnrenderableContent&&i.geometricError>0&&i.traversal.error*(t.geometricError/i.geometricError)<=e.errorTarget)return;if(!BS(i,e)){nl(i);return}let n=!1,s=!1,r=i.children;for(let a=0,o=r.length;a<o;a++){let l=r[a];$p(l,e),n||=gn(l,e.frameCount),s||=l.traversal.inFrustum}if(i.refine==="REPLACE"&&!s&&r.length!==0){i.traversal.inFrustum=!1,e.markTileUsed(i);for(let a=0,o=r.length;a<o;a++)nu(r[a],e,!0)}else if(nl(i),i.refine==="REPLACE"&&n&&(e.loadSiblings||e.loadAncestors))for(let a=0,o=r.length;a<o;a++)nu(r[a],e)}function Kp(i,e){let t=e.frameCount;if(!gn(i,t))return;let n=i.children,s=!1;for(let a=0,o=n.length;a<o;a++){let l=n[a];s||=gn(l,t)}if(!s)i.traversal.isLeaf=!0;else{for(let o=0,l=n.length;o<l;o++)Kp(n[o],e);let a=!0;for(let o=0,l=n.length;o<l;o++){let c=n[o];if(gn(c,t)){let u=!_s(c),h=!c.internal.hasContent||rl(c.internal.loadingState);u&&h||c.traversal.allChildrenLoaded||(a=!1)}}i.traversal.allChildrenLoaded=a}let r=!0;for(let a=0,o=n.length;a<o;a++){let l=n[a];gn(l,e.frameCount)&&!l.traversal.allUsedChildrenProcessed&&(r=!1)}i.traversal.allUsedChildrenProcessed=r&&ca(i)}function Jp(i,e){if(!gn(i,e.frameCount))return;let t=i.children;if(i.refine==="REPLACE"&&e.loadAncestors&&!i.traversal.allChildrenLoaded&&!_s(i)&&(i.traversal.isLeaf=!0),i.traversal.isLeaf){if(!_s(i)&&(i.traversal.active=!0,ca(i)&&i.internal.hasContent&&!rl(i.internal.loadingState)))for(let s=0,r=t.length;s<r;s++)jp(t[s],e);return}let n=t.length>0;for(let s=0,r=t.length;s<r;s++){let a=t[s];Jp(a,e),gn(a,e.frameCount)&&!(a.traversal.active&&Xp(a))&&!a.traversal.allChildrenReady&&(n=!1)}i.traversal.allChildrenReady=n,i.refine==="REPLACE"&&!n&&i.traversal.wasSetActive&&Xp(i)&&(i.traversal.active=!0,Zp(i,e))}function Qp(i,e){la(i,e,!1);let t=gn(i,e.frameCount);if(t&&(i.internal.hasUnrenderableContent&&(e.markTileUsed(i),e.queueTileForDownload(i)),i.refine==="ADD"&&(i.traversal.active=!0),(i.traversal.active||i.traversal.kicked)&&i.internal.hasContent&&(e.markTileUsed(i),i.traversal.allUsedChildrenProcessed&&e.queueTileForDownload(i),i.internal.loadingState!==4&&(i.traversal.active=!1)),e.loadAncestors&&i.internal.hasContent&&(e.markTileUsed(i),e.queueTileForDownload(i)),i.internal.virtualChildCount>0&&i.internal.hasContent&&e.markTileUsed(i),i.traversal.visible=i.internal.hasRenderableContent&&i.traversal.active&&i.traversal.inFrustum&&i.internal.loadingState===4,e.stats.used++,i.traversal.inFrustum&&e.stats.inFrustum++),t||al(i)&&i.traversal.usedLastFrame){let n=!1,s=!1;t?(n=i.traversal.active,s=e.displayActiveTiles&&i.traversal.active||i.traversal.visible):la(i,e,!1),i.internal.hasRenderableContent&&i.internal.loadingState===4?(n&&e.stats.active++,s&&e.stats.visible++,i.traversal.wasSetActive!==n&&e.invokeOnePlugin(a=>a.setTileActive&&a.setTileActive(i,n)),i.traversal.wasSetVisible!==s&&e.invokeOnePlugin(a=>a.setTileVisible&&a.setTileVisible(i,s))):i.internal.hasRenderableContent||(s=i.traversal.active&&i.traversal.inFrustum,i.traversal.wasSetVisible!==s&&e.invokeOnePlugin(a=>a.setEmptyTileVisible&&a.setEmptyTileVisible(i,s))),i.traversal.visible=s,i.traversal.active=n;let r=i.children;for(let a=0,o=r.length;a<o;a++){let l=r[a];Qp(l,e)}}}function FS(i,e){$p(i,e),Kp(i,e),Jp(i,e),Qp(i,e)}function zS(i){let e=null;return()=>{e===null&&(e=il.requestAnimationFrame(()=>{e=null,i()}))}}function ou(i,e=null,t=null){let n=[];for(n.push(i),n.push(null),n.push(0);n.length>0;){let s=n.pop(),r=n.pop(),a=n.pop();if(e&&e(a,r,s)){t&&t(a,r,s);return}let o=a.children;if(o)for(let l=o.length-1;l>=0;l--)n.push(o[l]),n.push(a),n.push(s+1);t&&t(a,r,s)}}var qp=Symbol("PLUGIN_REGISTERED"),Hn={inView:!0,error:0,distance:1/0},kS=(i,e)=>{let t=i.priority||0,n=e.priority||0;return t===n?!i.traversal||!e.traversal?0:i.traversal.used===e.traversal.used?i.traversal.error===e.traversal.error?i.traversal.distanceFromCamera===e.traversal.distanceFromCamera?i.internal.depthFromRenderedParent===e.internal.depthFromRenderedParent?0:i.internal.depthFromRenderedParent>e.internal.depthFromRenderedParent?-1:1:i.traversal.distanceFromCamera>e.traversal.distanceFromCamera?-1:1:i.traversal.error>e.traversal.error?1:-1:i.traversal.used?1:-1:t>n?1:-1},VS=(i,e)=>i.traversal.used===e.traversal.used?i.traversal.inFrustum===e.traversal.inFrustum?i.internal.hasUnrenderableContent===e.internal.hasUnrenderableContent?i.traversal.distanceFromCamera===e.traversal.distanceFromCamera?i.internal.depthFromRenderedParent===e.internal.depthFromRenderedParent?0:i.internal.depthFromRenderedParent>e.internal.depthFromRenderedParent?-1:1:i.traversal.distanceFromCamera>e.traversal.distanceFromCamera?-1:1:i.internal.hasUnrenderableContent?1:-1:i.traversal.inFrustum?1:-1:i.traversal.used?1:-1,HS=(i,e)=>i.traversal.lastFrameVisited===e.traversal.lastFrameVisited?i.internal.depthFromRenderedParent===e.internal.depthFromRenderedParent?i.internal.loadingState===e.internal.loadingState?i.internal.hasUnrenderableContent===e.internal.hasUnrenderableContent?i.traversal.error===e.traversal.error?0:i.traversal.error>e.traversal.error?-1:1:i.internal.hasUnrenderableContent?-1:1:i.internal.loadingState>e.internal.loadingState?-1:1:i.internal.depthFromRenderedParent>e.internal.depthFromRenderedParent?1:-1:i.traversal.lastFrameVisited>e.traversal.lastFrameVisited?-1:1,ha=(i,e)=>{let t=i.priority??1/0,n=e.priority??1/0;if(t!==n)return t>n?1:-1;if(!i.internal||!e.internal)return 0;let s=i.internal.renderer,r=e.internal.renderer,a=!s.loadAncestors,o=!r.loadAncestors;return a&&o?VS(i,e):kS(i,e)},em=new au;em.unloadPriorityCallback=HS;var sl=new OS;sl.maxJobsPerOrigin=25,sl.priorityCallback=ha;var su=new cr;su.maxJobs=5,su.priorityCallback=ha;var ru=new cr;ru.maxJobs=25,ru.priorityCallback=(i,e)=>{let t=i.parent,n=e.parent;return t===n?0:t?n?ha(t,n):-1:1};var tm=class{get root(){let i=this.rootTileset;return i?i.root:null}get loadProgress(){let{stats:i,isLoading:e}=this,t=i.queued+i.downloading+i.parsing,n=i.inCacheSinceLoad+ +!!e;return n===0?1:1-t/n}get downloadQueue(){return this._downloadQueue}set downloadQueue(i){i instanceof cr?console.warn('TilesRenderer: "downloadQueue" is no longer valid as a PriorityQueue. Use a DownloadPriorityQueue, instead.'):this._downloadQueue=i}constructor(i=null){this.rootLoadingState=0,this.rootTileset=null,this.rootURL=i,this.fetchOptions={},this.plugins=[],this.queuedTiles=[],this.queuedTileSet=new Set,this.cachedSinceLoadComplete=new Set,this.isLoading=!1,this.processedTiles=new WeakSet,this.visibleTiles=new Set,this.activeTiles=new Set,this.usedSet=new Set,this.loadingTiles=new Set,this.lruCache=em,this.downloadQueue=sl,this.parseQueue=su,this.processNodeQueue=ru,this.stats={inCacheSinceLoad:0,inCache:0,queued:0,downloading:0,parsing:0,loaded:0,failed:0,inFrustum:0,used:0,active:0,visible:0,refused:0,tilesProcessed:0},this.frameCount=0,this._dispatchNeedsUpdateEvent=zS(()=>{this.dispatchEvent({type:"needs-update"})}),this.errorTarget=16,this.errorFalloff=0,this.errorFalloffDensity=2e-4,this.displayActiveTiles=!1,this.maxDepth=1/0,this.loadSiblings=!0,this.loadAncestors=!0,this.maxTilesProcessed=250}registerPlugin(i){if(i[qp]===!0)throw Error("TilesRendererBase: A plugin can only be registered to a single tileset");let e=this.plugins,t=i.priority||0,n=e.length;for(let s=0;s<e.length;s++)if((e[s].priority||0)>t){n=s;break}e.splice(n,0,i),i[qp]=!0,i.init&&i.init(this)}unregisterPlugin(i){let e=this.plugins;if(typeof i=="string"&&(i=this.getPluginByName(i)),e.includes(i)){let t=e.indexOf(i);return e.splice(t,1),i.dispose&&i.dispose(),!0}return!1}getPluginByName(i){return this.plugins.find(e=>e.name===i)||null}invokeOnePlugin(i){let e=[...this.plugins,this];for(let t=0;t<e.length;t++){let n=i(e[t]);if(n)return n}return null}invokeAllPlugins(i){let e=[...this.plugins,this],t=[];for(let n=0;n<e.length;n++){let s=i(e[n]);s&&t.push(s)}return t.length===0?null:Promise.all(t)}traverse(i,e,t=!0){this.root&&ou(this.root,(n,...s)=>(t&&this.ensureChildrenArePreprocessed(n,!0),i?i(n,...s):!1),e)}getAttributions(i=[]){return this.invokeAllPlugins(e=>e!==this&&e.getAttributions&&e.getAttributions(i)),i}update(){let{lruCache:i,usedSet:e,stats:t,root:n,downloadQueue:s,parseQueue:r,processNodeQueue:a,queuedTiles:o,queuedTileSet:l}=this;if(this.rootLoadingState===0&&(this.rootLoadingState=2,this.invokeOnePlugin(d=>d.loadRootTileset&&d.loadRootTileset()).then(d=>{let f=this.rootURL;f!==null&&this.invokeAllPlugins(m=>f=m.preprocessURL?m.preprocessURL(f,null):f),this.rootLoadingState=4,this.rootTileset=d,this.dispatchEvent({type:"needs-update"}),this.dispatchEvent({type:"load-tileset",tileset:d,url:f}),this.dispatchEvent({type:"load-root-tileset",tileset:d,url:f})}).catch(d=>{this.rootLoadingState=-1,console.error(d),this.rootTileset=null,this.dispatchEvent({type:"load-error",tile:null,error:d,url:this.rootURL})})),!n)return;let c=null;if(this.invokeAllPlugins(d=>{if(d.doTilesNeedUpdate){let f=d.doTilesNeedUpdate();c=c===null?f:!!(c||f)}}),c===!1){this.dispatchEvent({type:"update-before"}),this.dispatchEvent({type:"update-after"});return}this.dispatchEvent({type:"update-before"}),t.inFrustum=0,t.used=0,t.active=0,t.visible=0,t.refused=0,t.tilesProcessed=0,this.frameCount++,e.forEach(d=>i.markUnused(d)),e.clear(),this.prepareForTraversal(),FS(n,this),this.removeUnusedPendingTiles(),o.sort(i.unloadPriorityCallback);let u=0,h=o.length;for(;u<h&&!i.isFull();u++)this.requestTileContents(o[u]);t.refused+=o.length-u,o.length=0,l.clear(),i.scheduleUnload(),(s.running||r.running||a.running)===!1&&this.isLoading===!0&&(this.cachedSinceLoadComplete.clear(),t.inCacheSinceLoad=0,this.dispatchEvent({type:"tiles-load-end"}),this.isLoading=!1),this.dispatchEvent({type:"update-after"})}resetFailedTiles(){this.rootLoadingState===-1&&(this.rootLoadingState=0);let i=this.stats;i.failed!==0&&(this.traverse(e=>{e.internal.loadingState===-1&&(e.internal.loadingState=0)},null,!1),i.failed=0)}calculateTileViewErrorWithPlugin(i,e){this.calculateTileViewError(i,e);let{errorFalloff:t,errorFalloffDensity:n}=this;if(t>0&&Number.isFinite(e.distanceFromCamera)){let o=e.distanceFromCamera*n;e.error-=t*(1-Math.exp(-o*o))}let s=null,r=0,a=1/0;this.invokeAllPlugins(o=>{o!==this&&o.calculateTileViewError&&(Hn.inView=!0,Hn.error=0,Hn.distance=1/0,o.calculateTileViewError(i,Hn)&&(s===null&&(s=!0),s&&=Hn.inView,Hn.inView&&(a=Math.min(a,Hn.distance),r=Math.max(r,Hn.error))))}),e.inView&&s!==!1?(e.error=Math.max(e.error,r),e.distanceFromCamera=Math.min(e.distanceFromCamera,a)):s?(e.inView=!0,e.error=r,e.distanceFromCamera=a):e.inView=!1}dispose(){[...this.plugins].forEach(t=>{this.unregisterPlugin(t)});let i=this.lruCache,e=[];this.traverse(t=>(e.push(t),!1),null,!1);for(let t=0,n=e.length;t<n;t++)i.remove(e[t]);this.stats={queued:0,parsing:0,downloading:0,failed:0,inFrustum:0,traversed:0,used:0,active:0,visible:0},this.frameCount=0,this.loadingTiles.clear()}calculateBytesUsed(i,e){return 0}dispatchEvent(i){}addEventListener(i,e){}removeEventListener(i,e){}parseTile(i,e,t){return null}prepareForTraversal(){}disposeTile(i){i.traversal.visible&&(i.internal.hasRenderableContent?this.invokeOnePlugin(t=>t.setTileVisible&&t.setTileVisible(i,!1)):this.invokeOnePlugin(t=>t.setEmptyTileVisible&&t.setEmptyTileVisible(i,!1)),i.traversal.visible=!1),i.traversal.active&&i.internal.hasRenderableContent&&this.invokeOnePlugin(t=>t.setTileActive&&t.setTileActive(i,!1)),i.traversal.active=!1;let{scene:e}=i.engineData;e&&this.dispatchEvent({type:"dispose-model",scene:e,tile:i})}preprocessNode(i,e,t=null){if(this.processedTiles.add(i),this.stats.tilesProcessed++,i.content&&(!("uri"in i.content)&&"url"in i.content&&(i.content.uri=i.content.url,delete i.content.url),i.content.boundingVolume&&!("box"in i.content.boundingVolume||"sphere"in i.content.boundingVolume||"region"in i.content.boundingVolume)&&delete i.content.boundingVolume),i.parent=t,i.children=i.children||[],i.internal={hasContent:!1,hasRenderableContent:!1,hasUnrenderableContent:!1,loadingState:0,basePath:e,depth:-1,depthFromRenderedParent:-1,isVirtual:!1,virtualChildCount:0,renderer:this,...i.internal},i.content?.uri){let n=Gp(i.content.uri),s=!!(n&&/json$/.test(n));i.internal.hasContent=!0,i.internal.hasUnrenderableContent=s,i.internal.hasRenderableContent=!s}else i.internal.hasContent=!1,i.internal.hasUnrenderableContent=!1,i.internal.hasRenderableContent=!1;t?(i.internal.depth=t.internal.depth+1,i.internal.depthFromRenderedParent=t.internal.depthFromRenderedParent+ +!!i.internal.hasRenderableContent):(i.internal.depth=0,i.internal.depthFromRenderedParent=+!!i.internal.hasRenderableContent),i.traversal={distanceFromCamera:1/0,error:1/0,inFrustum:!1,wasInFrustum:!1,isLeaf:!1,used:!1,usedLastFrame:!1,visible:!1,wasSetVisible:!1,active:!1,wasSetActive:!1,allChildrenReady:!1,allChildrenLoaded:!1,kicked:!1,allUsedChildrenProcessed:!1,lastFrameVisited:-1},i.refine=t===null?i.refine||"REPLACE":i.refine||t.refine,i.engineData={scene:null,metadata:null,boundingVolume:null},Object.defineProperty(i,"cached",{get(){return console.warn('TilesRenderer: "tile.cached" field has been renamed to "tile.engineData".'),this.engineData},enumerable:!1,configurable:!0}),this.invokeAllPlugins(n=>{n!==this&&n.preprocessNode&&n.preprocessNode(i,e,t)})}setTileActive(i,e){e?this.activeTiles.add(i):this.activeTiles.delete(i)}setTileVisible(i,e){e?this.visibleTiles.add(i):this.visibleTiles.delete(i),this.dispatchEvent({type:"tile-visibility-change",scene:i.engineData.scene,tile:i,visible:e})}calculateTileViewError(i,e){}removeUnusedPendingTiles(){let{lruCache:i,loadingTiles:e}=this,t=[];for(let n of e)!i.isUsed(n)&&n.internal.loadingState===1&&t.push(n);for(let n=0;n<t.length;n++)i.remove(t[n])}queueTileForDownload(i){let{queuedTileSet:e}=this;i.internal.loadingState!==0||e.has(i)||(e.add(i),this.lruCache.isFull()?this.stats.refused++:this.queuedTiles.push(i))}markTileUsed(i){this.usedSet.add(i),this.lruCache.markUsed(i)}fetchData(i,e){return fetch(i,e)}ensureChildrenArePreprocessed(i,e=this.stats.tilesProcessed<this.maxTilesProcessed){let t=i.children;if(t.length===0||t[t.length-1].traversal)return;let n=s=>{for(let r=0,a=s.length;r<a;r++){let o=s[r];o&&!o.traversal&&this.preprocessNode(o,i.internal.basePath,i)}};e?(this.processNodeQueue.remove(i),n(t)):this.processNodeQueue.has(i)||this.processNodeQueue.add(i,s=>{n(s.children),this._dispatchNeedsUpdateEvent()})}getBytesUsed(i){let e=0;return this.invokeAllPlugins(t=>{t.calculateBytesUsed&&(e+=t.calculateBytesUsed(i,i.engineData.scene)||0)}),e}recalculateBytesUsed(i=null){let{lruCache:e,processedTiles:t}=this;i===null?e.itemSet.forEach(n=>{t.has(n)&&e.setMemoryUsage(n,this.getBytesUsed(n))}):e.setMemoryUsage(i,this.getBytesUsed(i))}preprocessTileset(i,e,t=null){let[n,s]=i.asset.version.split(".").map(a=>parseInt(a));console.assert(n<=1,"TilesRenderer: asset.version is expected to be a 1.x or a compatible version."),n===1&&s>0&&console.warn("TilesRenderer: tiles versions at 1.1 or higher have limited support. Some new extensions and features may not be supported.");let r=e.replace(/\/[^/]*$/,"");r=new URL(r,window.location.href).toString(),this.preprocessNode(i.root,r,t)}loadRootTileset(){let i=this.rootURL;return this.invokeAllPlugins(e=>i=e.preprocessURL?e.preprocessURL(i,null):i),this.invokeOnePlugin(e=>e.fetchData&&e.fetchData(i,this.fetchOptions)).then(e=>{if(!(e instanceof Response))return e;if(e.ok)return e.json();throw Error(`TilesRenderer: Failed to load tileset "${i}" with status ${e.status} : ${e.statusText}`)}).then(e=>(this.preprocessTileset(e,i),e))}requestTileContents(i){if(i.internal.loadingState!==0)return;let e=!1,t=null,n=new URL(i.content.uri,i.internal.basePath+"/").toString();this.invokeAllPlugins(d=>n=d.preprocessURL?d.preprocessURL(n,i):n);let s=this.stats,r=this.lruCache,a=this.downloadQueue,o=this.parseQueue,l=this.loadingTiles,c=Gp(n),u=new AbortController,h=u.signal;if(r.add(i,d=>{u.abort(),e?d.children.length=0:this.invokeAllPlugins(f=>{f.disposeTile&&f.disposeTile(d)}),s.inCache--,this.cachedSinceLoadComplete.has(i)&&(this.cachedSinceLoadComplete.delete(i),s.inCacheSinceLoad--),d.internal.loadingState===1?s.queued--:d.internal.loadingState===2?s.downloading--:d.internal.loadingState===3?s.parsing--:d.internal.loadingState===4&&s.loaded--,d.internal.loadingState=0,o.remove(d),a.remove(d),l.delete(d)}))return this.isLoading||(this.isLoading=!0,this.dispatchEvent({type:"tiles-load-start"})),r.setMemoryUsage(i,this.getBytesUsed(i)),this.cachedSinceLoadComplete.add(i),s.inCacheSinceLoad++,s.inCache++,s.queued++,i.internal.loadingState=1,l.add(i),a.add(n,i,d=>{if(h.aborted)return Promise.resolve();i.internal.loadingState=2,s.downloading++,s.queued--;let f=this.invokeOnePlugin(m=>m.fetchData&&m.fetchData(n,{...this.fetchOptions,signal:h}));return this.dispatchEvent({type:"tile-download-start",tile:i,url:n,get uri(){return console.warn('tile-download-start event: "uri" has been renamed to "url".'),this.url}}),f}).then(d=>{if(!h.aborted){if(!(d instanceof Response))return d;if(d.ok)return c==="json"?d.json():d.arrayBuffer();throw Error(`Failed to load model with error code ${d.status}`)}}).then(d=>{if(!h.aborted)return s.downloading--,s.parsing++,i.internal.loadingState=3,o.add(i,f=>h.aborted?Promise.resolve():c==="json"&&d.root?(this.preprocessTileset(d,n,i),i.children.push(d.root),t=d,e=!0,Promise.resolve()):this.invokeOnePlugin(m=>m.parseTile&&m.parseTile(d,f,c,n,h)))}).then(()=>{if(h.aborted)return;s.parsing--,s.loaded++,i.internal.loadingState=4,l.delete(i),r.setLoaded(i,!0);let d=this.getBytesUsed(i);r.getMemoryUsage(i)===0&&d>0&&r.isFull()?r.remove(i):(r.setMemoryUsage(i,d),this.dispatchEvent({type:"needs-update"}),e&&this.dispatchEvent({type:"load-tileset",tileset:t,url:n}),i.engineData.scene&&this.dispatchEvent({type:"load-model",scene:i.engineData.scene,tile:i,url:n}))}).catch(d=>{h.aborted||(d.name==="AbortError"?r.remove(i):(o.remove(i),a.remove(i),i.internal.loadingState===1?s.queued--:i.internal.loadingState===2?s.downloading--:i.internal.loadingState===3?s.parsing--:i.internal.loadingState===4&&s.loaded--,s.failed++,console.error(`TilesRenderer : Failed to load tile at url "${i.content.uri}".`),console.error(d),i.internal.loadingState=-1,l.delete(i),r.setLoaded(i,!0),this.dispatchEvent({type:"load-error",tile:i,error:d,url:n})))})}};function Gn(i){if(i===null||i.byteLength<4)return"";let e;if(e=i instanceof DataView?i:new DataView(i),String.fromCharCode(e.getUint8(0))==="{")return null;let t="";for(let n=0;n<4;n++)t+=String.fromCharCode(e.getUint8(n));return t}var GS=new TextDecoder;function lu(i){return GS.decode(i)}function ol(i){return i.replace(/[\\/][^\\/]+$/,"")+"/"}var ur=class{constructor(){this.fetchOptions={},this.workingPath=""}loadAsync(i){return fetch(i,this.fetchOptions).then(e=>{if(!e.ok)throw Error(`Failed to load file "${i}" with status ${e.status} : ${e.statusText}`);return e.arrayBuffer()}).then(e=>(this.workingPath===""&&(this.workingPath=ol(i)),this.parse(e)))}resolveExternalURL(i){return new URL(i,this.workingPath).href}parse(i){throw Error("LoaderBase: Parse not implemented.")}};function im(i,e,t,n,s,r){let a;switch(n){case"SCALAR":a=1;break;case"VEC2":a=2;break;case"VEC3":a=3;break;case"VEC4":a=4;break;default:throw Error(`FeatureTable : Feature type not provided for "${r}".`)}let o,l=t*a;switch(s){case"BYTE":o=new Int8Array(i,e,l);break;case"UNSIGNED_BYTE":o=new Uint8Array(i,e,l);break;case"SHORT":o=new Int16Array(i,e,l);break;case"UNSIGNED_SHORT":o=new Uint16Array(i,e,l);break;case"INT":o=new Int32Array(i,e,l);break;case"UNSIGNED_INT":o=new Uint32Array(i,e,l);break;case"FLOAT":o=new Float32Array(i,e,l);break;case"DOUBLE":o=new Float64Array(i,e,l);break;default:throw Error(`FeatureTable : Feature component type not provided for "${r}".`)}return o}var ll=class{constructor(i,e,t,n){this.buffer=i,this.binOffset=e+t,this.binLength=n;let s=null;if(t!==0){let r=new Uint8Array(i,e,t);s=JSON.parse(lu(r))}else s={};this.header=s}getKeys(){return Object.keys(this.header).filter(i=>i!=="extensions")}getData(i,e,t=null,n=null){let s=this.header;if(!(i in s))return null;let r=s[i];if(!(r instanceof Object)||Array.isArray(r))return r;{let{buffer:a,binOffset:o,binLength:l}=this,c=r.byteOffset||0,u=r.type||n,h=r.componentType||t;if("type"in r&&n&&r.type!==n)throw Error("FeatureTable: Specified type does not match expected type.");let d=o+c,f=im(a,d,e,u,h,i);if(d+f.byteLength>o+l)throw Error("FeatureTable: Feature data read outside binary body length.");return f}}getBuffer(i,e){let{buffer:t,binOffset:n}=this;return t.slice(n+i,n+i+e)}},WS=class{constructor(i){this.batchTable=i;let e=i.header.extensions["3DTILES_batch_table_hierarchy"];this.classes=e.classes;for(let n of this.classes){let s=n.instances;for(let r in s)n.instances[r]=this._parseProperty(s[r],n.length,r)}if(this.instancesLength=e.instancesLength,this.classIds=this._parseProperty(e.classIds,this.instancesLength,"classIds"),this.parentCounts=e.parentCounts?this._parseProperty(e.parentCounts,this.instancesLength,"parentCounts"):Array(this.instancesLength).fill(1),e.parentIds){let n=this.parentCounts.reduce((s,r)=>s+r,0);this.parentIds=this._parseProperty(e.parentIds,n,"parentIds")}else this.parentIds=null;this.instancesIds=[];let t={};for(let n of this.classIds)t[n]=t[n]??0,this.instancesIds.push(t[n]),t[n]++}_parseProperty(i,e,t){if(Array.isArray(i))return i;{let{buffer:n,binOffset:s}=this.batchTable,r=i.byteOffset,a=i.componentType||"UNSIGNED_SHORT";return im(n,s+r,e,"SCALAR",a,t)}}getDataFromId(i,e={}){let t=this.parentCounts[i];if(this.parentIds&&t>0){let o=0;for(let l=0;l<i;l++)o+=this.parentCounts[l];for(let l=0;l<t;l++){let c=this.parentIds[o+l];c!==i&&this.getDataFromId(c,e)}}let n=this.classIds[i],s=this.classes[n].instances,r=this.classes[n].name,a=this.instancesIds[i];for(let o in s)e[r]=e[r]||{},e[r][o]=s[o][a];return e}},cu=class extends ll{constructor(i,e,t,n,s){super(i,t,n,s),this.count=e,this.extensions={};let r=this.header.extensions;r&&r["3DTILES_batch_table_hierarchy"]&&(this.extensions["3DTILES_batch_table_hierarchy"]=new WS(this))}getDataFromId(i,e={}){if(i<0||i>=this.count)throw Error(`BatchTable: id value "${i}" out of bounds for "${this.count}" features number.`);for(let t of this.getKeys()){let n=super.getData(t,this.count),s=ArrayBuffer.isView(n)?n.length/this.count:1;if(s===1)e[t]=n[i];else{let r=i*s;e[t]=Array.from(n.subarray(r,r+s))}}for(let t in this.extensions){let n=this.extensions[t];n.getDataFromId instanceof Function&&(e[t]=e[t]||{},n.getDataFromId(i,e[t]))}return e}getPropertyArray(i){return super.getData(i,this.count)}},nm=class extends ur{parse(i){let e=new DataView(i),t=Gn(e);console.assert(t==="b3dm");let n=e.getUint32(4,!0);console.assert(n===1);let s=e.getUint32(8,!0);console.assert(s===i.byteLength);let r=e.getUint32(12,!0),a=e.getUint32(16,!0),o=e.getUint32(20,!0),l=e.getUint32(24,!0),c=new ll(i.slice(28,28+r+a),0,r,a),u=28+r+a,h=new cu(i.slice(u,u+o+l),c.getData("BATCH_LENGTH"),0,o,l),d=u+o+l;return{version:n,featureTable:c,batchTable:h,glbBytes:new Uint8Array(i,d,s-d)}}},sm=class extends ur{parse(i){let e=new DataView(i),t=Gn(e);console.assert(t==="i3dm");let n=e.getUint32(4,!0);console.assert(n===1);let s=e.getUint32(8,!0);console.assert(s===i.byteLength);let r=e.getUint32(12,!0),a=e.getUint32(16,!0),o=e.getUint32(20,!0),l=e.getUint32(24,!0),c=e.getUint32(28,!0),u=new ll(i.slice(32,32+r+a),0,r,a),h=32+r+a,d=new cu(i.slice(h,h+o+l),u.getData("INSTANCES_LENGTH"),0,o,l),f=h+o+l,m=new Uint8Array(i,f,s-f),y=null,g=null,p=null;if(c)y=m,g=Promise.resolve();else{let v=this.resolveExternalURL(lu(m));p=ol(v),g=fetch(v,this.fetchOptions).then(x=>{if(!x.ok)throw Error(`I3DMLoaderBase : Failed to load file "${v}" with status ${x.status} : ${x.statusText}`);return x.arrayBuffer()}).then(x=>{y=new Uint8Array(x)})}return g.then(()=>({version:n,featureTable:u,batchTable:d,glbBytes:y,gltfWorkingPath:p}))}},rm=class extends ur{parse(i){let e=new DataView(i),t=Gn(e);console.assert(t==="pnts");let n=e.getUint32(4,!0);console.assert(n===1);let s=e.getUint32(8,!0);console.assert(s===i.byteLength);let r=e.getUint32(12,!0),a=e.getUint32(16,!0),o=e.getUint32(20,!0),l=e.getUint32(24,!0),c=new ll(i.slice(28,28+r+a),0,r,a),u=28+r+a,h=new cu(i.slice(u,u+o+l),c.getData("BATCH_LENGTH")||c.getData("POINTS_LENGTH"),0,o,l);return Promise.resolve({version:n,featureTable:c,batchTable:h})}},am=class extends ur{parse(i){let e=new DataView(i),t=Gn(e);console.assert(t==="cmpt",'CMPTLoader: The magic bytes equal "cmpt".');let n=e.getUint32(4,!0);console.assert(n===1,'CMPTLoader: The version listed in the header is "1".');let s=e.getUint32(8,!0);console.assert(s===i.byteLength,"CMPTLoader: The contents buffer length listed in the header matches the file.");let r=e.getUint32(12,!0),a=[],o=16;for(let l=0;l<r;l++){let c=new DataView(i,o,12),u=Gn(c),h=c.getUint32(4,!0),d=c.getUint32(8,!0),f=new Uint8Array(i,o,d);a.push({type:u,buffer:f,version:h}),o+=d}return{version:n,tiles:a}}};function om(i){let e=0;for(let n in i.attributes){let s=i.getAttribute(n);e+=s.count*s.itemSize*s.array.BYTES_PER_ELEMENT}let t=i.getIndex();return e+=t?t.count*t.itemSize*t.array.BYTES_PER_ELEMENT:0,e}function hu(i,e){if(e===Ip)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===oa||e===Jo){let t=i.getIndex();if(t===null){let a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===oa)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var Xn=class extends Fi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new yu(t)}),this.register(function(t){return new _u(t)}),this.register(function(t){return new Eu(t)}),this.register(function(t){return new Cu(t)}),this.register(function(t){return new Ru(t)}),this.register(function(t){return new vu(t)}),this.register(function(t){return new bu(t)}),this.register(function(t){return new Su(t)}),this.register(function(t){return new Mu(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new Tu(t)}),this.register(function(t){return new xu(t)}),this.register(function(t){return new Au(t)}),this.register(function(t){return new wu(t)}),this.register(function(t){return new pu(t)}),this.register(function(t){return new Pu(t)}),this.register(function(t){return new Iu(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=kn.extractUrlBase(e);a=kn.resolveURL(c,this.path)}else a=kn.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Yi(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===dm){try{a[Ve.KHR_BINARY_GLTF]=new Lu(e)}catch(h){s&&s(h);return}r=JSON.parse(a[Ve.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new zu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case Ve.KHR_MATERIALS_UNLIT:a[h]=new mu;break;case Ve.KHR_DRACO_MESH_COMPRESSION:a[h]=new Du(r,this.dracoLoader);break;case Ve.KHR_TEXTURE_TRANSFORM:a[h]=new Uu;break;case Ve.KHR_MESH_QUANTIZATION:a[h]=new Nu;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function XS(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var Ve={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},pu=class{constructor(e){this.parser=e,this.name=Ve.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new Se(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Lt);let h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ho(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Vo(u),c.distance=h;break;case"spot":c=new ko(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,yn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},mu=class{constructor(){this.name=Ve.KHR_MATERIALS_UNLIT}getMaterialType(){return gi}extendParams(e,t,n){let s=[];e.color=new Se(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Lt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,gt))}return Promise.all(s)}},gu=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},yu=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(o,o)}return Promise.all(r)}},_u=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},xu=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},vu=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Se(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Lt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,gt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},bu=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},Su=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Se().setRGB(o[0],o[1],o[2],Lt),Promise.all(r)}},Mu=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Tu=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Se().setRGB(o[0],o[1],o[2],Lt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,gt)),Promise.all(r)}},wu=class{constructor(e){this.parser=e,this.name=Ve.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},Au=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_i}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},Eu=class{constructor(e){this.parser=e,this.name=Ve.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Cu=class{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Ru=class{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Pu=class{constructor(e){this.name=Ve.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}},Iu=class{constructor(e){this.name=Ve.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==Ei.TRIANGLES&&c.mode!==Ei.TRIANGLE_STRIP&&c.mode!==Ei.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(let m of h){let y=new te,g=new R,p=new Ot,v=new R(1,1,1),x=new sr(m.geometry,m.material,d);for(let _=0;_<d;_++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,_),l.SCALE&&v.fromBufferAttribute(l.SCALE,_),x.setMatrixAt(_,y.compose(g,p,v));for(let _ in l)if(_==="_COLOR_0"){let w=l[_];x.instanceColor=new ps(w.array,w.itemSize,w.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&m.geometry.setAttribute(_,l[_]);vt.prototype.copy.call(x,m),this.parser.assignFinalMaterial(x),f.push(x)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},dm="glTF",ua=12,lm={JSON:1313821514,BIN:5130562},Lu=class{constructor(e){this.name=Ve.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ua),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==dm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-ua,r=new DataView(e,ua),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===lm.JSON){let c=new Uint8Array(e,ua+a,o);this.content=n.decode(c)}else if(l===lm.BIN){let c=ua+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Du=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ve.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let u in a){let h=Bu[u]||u.toLowerCase();o[h]=a[u]}for(let u in e.attributes){let h=Bu[u]||u.toLowerCase();if(a[u]!==void 0){let d=n.accessors[e.attributes[u]],f=dr[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(let m in f.attributes){let y=f.attributes[m],g=l[m];g!==void 0&&(y.normalized=g)}h(f)},o,c,Lt,d)})})}},Uu=class{constructor(){this.name=Ve.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Nu=class{constructor(){this.name=Ve.KHR_MESH_QUANTIZATION}},cl=class extends Bn{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=s-t,h=(n-t)/u,d=h*h,f=d*h,m=e*c,y=m-c,g=-2*f+3*d,p=f-d,v=1-g,x=p-d+h;for(let _=0;_!==o;_++){let w=a[y+_+o],M=a[y+_+l]*u,T=a[m+_+o],C=a[m+_]*u;r[_]=v*w+x*M+g*T+p*C}return r}},qS=new Ot,Ou=class extends cl{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return qS.fromArray(r).normalize().toArray(r),r}},Ei={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},dr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},cm={9728:Nt,9729:Wt,9984:Yh,9985:Wr,9986:ks,9987:Wi},hm={33071:on,33648:jr,10497:fs},uu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Bu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Wn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},YS={CUBICSPLINE:void 0,LINEAR:Js,STEP:Ks},du={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function jS(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new gs({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:pi})),i.DefaultMaterial}function xs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function yn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ZS(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function $S(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function KS(i){let e,t=i.extensions&&i.extensions[Ve.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+fu(t.attributes):e=i.indices+":"+fu(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+fu(i.targets[n]);return e}function fu(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Fu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function JS(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var QS=new te,zu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new XS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Fo(this.options.manager):this.textureLoader=new Go(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Yi(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return xs(r,o,s),yn(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,u]of a.children.entries())r(u,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ve.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(kn.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=uu[s.type],o=dr[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Be(c,a,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=uu[s.type],c=dr[s.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0,y,g;if(f&&f!==h){let p=Math.floor(d/f),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,x=t.cache.get(v);x||(y=new c(o,p*f,s.count*f/u),x=new Qr(y,f/u),t.cache.add(v,x)),g=new ea(x,l,d%f/u,m)}else o===null?y=new c(s.count*l):y=new c(o,d,s.count*l),g=new Be(y,l,m);if(s.sparse!==void 0){let p=uu.SCALAR,v=dr[s.sparse.indices.componentType],x=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,w=new v(a[1],x,s.sparse.count*p),M=new c(a[2],_,s.sparse.count*l);o!==null&&(g=new Be(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let T=0,C=w.length;T<C;T++){let S=w[T];if(g.setX(S,M[T*l]),l>=2&&g.setY(S,M[T*l+1]),l>=3&&g.setZ(S,M[T*l+2]),l>=4&&g.setW(S,M[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return u.magFilter=cm[d.magFilter]||Wt,u.minFilter=cm[d.minFilter]||Wi,u.wrapS=hm[d.wrapS]||fs,u.wrapT=hm[d.wrapT]||fs,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Nt&&u.minFilter!==Wt,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let a=s.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(y){let g=new It(y);g.needsUpdate=!0,d(g)}),t.load(kn.resolveURL(h,r.path),m,void 0,f)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),yn(h,a),h.userData.mimeType=a.mimeType||JS(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ve.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Ve.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[Ve.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new On,mi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new rr,mi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return gs}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[Ve.KHR_MATERIALS_UNLIT]){let h=s[Ve.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),c.push(h.extendParams(o,r,t))}else{let h=r.pbrMetallicRoughness||{};if(o.color=new Se(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Lt),o.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,gt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=ni);let u=r.alphaMode||du.OPAQUE;if(u===du.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===du.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==gi&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ue(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==gi&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==gi){let h=r.emissiveFactor;o.emissive=new Se().setRGB(h[0],h[1],h[2],Lt)}return r.emissiveTexture!==void 0&&a!==gi&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,gt)),Promise.all(c).then(function(){let h=new a(o);return r.name&&(h.name=r.name),yn(h,r),t.associations.set(h,{materials:e}),r.extensions&&xs(s,h,r),h})}createUniqueName(e){let t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[Ve.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return um(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],u=KS(c),h=s[u];if(h)a.push(h.promise);else{let d;c.extensions&&c.extensions[Ve.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=um(new xt,c,t),s[u]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let u=a[l].material===void 0?jS(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,m=u.length;f<m;f++){let y=u[f],g=a[f],p,v=c[f];if(g.mode===Ei.TRIANGLES||g.mode===Ei.TRIANGLE_STRIP||g.mode===Ei.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new Lo(y,v):new at(y,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===Ei.TRIANGLE_STRIP?p.geometry=hu(p.geometry,Jo):g.mode===Ei.TRIANGLE_FAN&&(p.geometry=hu(p.geometry,oa));else if(g.mode===Ei.LINES)p=new Nn(y,v);else if(g.mode===Ei.LINE_STRIP)p=new dn(y,v);else if(g.mode===Ei.LINE_LOOP)p=new ms(y,v);else if(g.mode===Ei.POINTS)p=new qi(y,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&$S(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),yn(p,r),g.extensions&&xs(s,p,g),t.assignFinalMaterial(p),h.push(p)}for(let f=0,m=h.length;f<m;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&xs(s,h[0],r),h[0];let d=new $t;r.extensions&&xs(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new At(Vn.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new un(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),yn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],l=[];for(let c=0,u=a.length;c<u;c++){let h=a[c];if(h){o.push(h);let d=new te;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Do(o,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){let f=s.channels[h],m=s.samplers[f.sampler],y=f.target,g=y.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,v=s.parameters!==void 0?s.parameters[m.output]:m.output;y.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(m),u.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],f=h[1],m=h[2],y=h[3],g=h[4],p=[];for(let v=0,x=d.length;v<x;v++){let _=d[v],w=f[v],M=m[v],T=y[v],C=g[v];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();let S=n._createAnimationTracks(_,w,M,T,C);if(S)for(let b=0;b<S.length;b++)p.push(S[b])}return new Bo(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,u=o.length;c<u;c++)a.push(n.getDependency("node",o[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,QS)});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(r.isBone===!0?u=new ta:c.length>1?u=new $t:c.length===1?u=c[0]:u=new vt,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(r.name&&(u.userData.name=r.name,u.name=a),yn(u,r),r.extensions&&xs(n,u,r),r.matrix!==void 0){let h=new te;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new $t;n.name&&(r.name=s.createUniqueName(n.name)),yn(r,n),n.extensions&&xs(t,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,h=l.length;u<h;u++)r.add(l[u]);let c=u=>{let h=new Map;for(let[d,f]of s.associations)(d instanceof mi||d instanceof It)&&h.set(d,f);return u.traverse(d=>{let f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,l=[];Wn[r.path]===Wn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Wn[r.path]){case Wn.weights:c=fn;break;case Wn.rotation:c=pn;break;case Wn.position:case Wn.scale:c=mn;break;default:n.itemSize===1?c=fn:c=mn;break}let u=s.interpolation!==void 0?YS[s.interpolation]:Js,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let m=new c(l[d]+"."+Wn[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Fu(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof pn?Ou:cl;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function eM(i,e,t){let n=e.attributes,s=new Ge;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new R(l[0],l[1],l[2]),new R(c[0],c[1],c[2])),o.normalized){let u=Fu(dr[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new R,l=new R;for(let c=0,u=r.length;c<u;c++){let h=r[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){let y=Fu(dr[d.componentType]);l.multiplyScalar(y)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new _t;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function um(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(let a in n){let o=Bu[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return ze.workingColorSpace!==Lt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ze.workingColorSpace}" not supported.`),yn(i,e),eM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?ZS(i,e.targets,t):i})}var Zu=class extends nm{constructor(i=ys){super(),this.manager=i,this.adjustmentTransform=new te}parse(i){let e=super.parse(i),t=e.glbBytes.slice().buffer;return new Promise((n,s)=>{let r=this.manager,a=this.fetchOptions,o=r.getHandler("path.gltf")||new Xn(r);a.credentials==="include"&&a.mode==="cors"&&o.setCrossOrigin("use-credentials"),"credentials"in a&&o.setWithCredentials(a.credentials==="include"),a.headers&&o.setRequestHeader(a.headers);let l=this.workingPath;!/[\\/]$/.test(l)&&l.length&&(l+="/");let c=this.adjustmentTransform;o.parse(t,l,u=>{let{batchTable:h,featureTable:d}=e,{scene:f}=u,m=d.getData("RTC_CENTER",1,"FLOAT","VEC3");m&&(f.position.x+=m[0],f.position.y+=m[1],f.position.z+=m[2]),u.scene.updateMatrix(),u.scene.matrix.multiply(c),u.scene.matrix.decompose(u.scene.position,u.scene.quaternion,u.scene.scale),u.batchTable=h,u.featureTable=d,f.batchTable=h,f.featureTable=d,n(u)},s)})}};function tM(i){let e=i>>11,t=i>>5&63,n=i&31;return[Math.round(e/31*255),Math.round(t/63*255),Math.round(n/31*255)]}var da=new ue;function iM(i,e,t=new R){da.set(i,e).divideScalar(256).multiplyScalar(2).subScalar(1),t.set(da.x,da.y,1-Math.abs(da.x)-Math.abs(da.y));let n=Vn.clamp(-t.z,0,1);return t.x>=0?t.setX(t.x-n):t.setX(t.x+n),t.y>=0?t.setY(t.y-n):t.setY(t.y+n),t.normalize(),t}var fm={RGB:"color",POSITION:"position"},$u=class extends rm{constructor(i=ys){super(),this.manager=i}parse(i){return super.parse(i).then(async e=>{let{featureTable:t,batchTable:n}=e,s=new On,r=t.header.extensions,a=new R,o;if(r&&r["3DTILES_draco_point_compression"]){let{byteOffset:u,byteLength:h,properties:d}=r["3DTILES_draco_point_compression"],f=this.manager.getHandler("draco.drc");if(f==null)throw Error("PNTSLoader: dracoLoader not available.");let m={};for(let p in d)if(p in fm&&p in d){let v=fm[p];m[v]=d[p]}let y={attributeIDs:m,attributeTypes:{position:"Float32Array",color:"Uint8Array"},useUniqueIDs:!0},g=t.getBuffer(u,h);o=await f.decodeGeometry(g,y),o.attributes.color&&(s.vertexColors=!0)}else{let u=t.getData("POINTS_LENGTH"),h=t.getData("POSITION",u,"FLOAT","VEC3"),d=t.getData("NORMAL",u,"FLOAT","VEC3"),f=t.getData("NORMAL",u,"UNSIGNED_BYTE","VEC2"),m=t.getData("RGB",u,"UNSIGNED_BYTE","VEC3"),y=t.getData("RGBA",u,"UNSIGNED_BYTE","VEC4"),g=t.getData("RGB565",u,"UNSIGNED_SHORT","SCALAR"),p=t.getData("CONSTANT_RGBA",u,"UNSIGNED_BYTE","VEC4"),v=t.getData("POSITION_QUANTIZED",u,"UNSIGNED_SHORT","VEC3"),x=t.getData("QUANTIZED_VOLUME_SCALE",u,"FLOAT","VEC3"),_=t.getData("QUANTIZED_VOLUME_OFFSET",u,"FLOAT","VEC3");if(o=new xt,v){let w=new Float32Array(u*3);for(let M=0;M<u;M++)for(let T=0;T<3;T++){let C=3*M+T;w[C]=v[C]/65535*x[T]}a.x=_[0],a.y=_[1],a.z=_[2],o.setAttribute("position",new Be(w,3,!1))}else o.setAttribute("position",new Be(h,3,!1));if(d!==null)o.setAttribute("normal",new Be(d,3,!1));else if(f!==null){let w=new Float32Array(u*3),M=new R;for(let T=0;T<u;T++){let C=f[T*2],S=f[T*2+1],b=iM(C,S,M);w[T*3]=b.x,w[T*3+1]=b.y,w[T*3+2]=b.z}o.setAttribute("normal",new Be(w,3,!1))}if(y!==null)o.setAttribute("color",new Be(y,4,!0)),s.vertexColors=!0,s.transparent=!0,s.depthWrite=!1;else if(m!==null)o.setAttribute("color",new Be(m,3,!0)),s.vertexColors=!0;else if(g!==null){let w=new Uint8Array(u*3);for(let M=0;M<u;M++){let T=tM(g[M]);for(let C=0;C<3;C++){let S=3*M+C;w[S]=T[C]}}o.setAttribute("color",new Be(w,3,!0)),s.vertexColors=!0}else if(p!==null){s.color=new Se(p[0],p[1],p[2]);let w=p[3]/255;w<1&&(s.opacity=w,s.transparent=!0,s.depthWrite=!1)}}let l=new qi(o,s);l.position.copy(a),e.scene=l,e.scene.featureTable=t,e.scene.batchTable=n;let c=t.getData("RTC_CENTER",1,"FLOAT","VEC3");return c&&(e.scene.position.x+=c[0],e.scene.position.y+=c[1],e.scene.position.z+=c[2]),e})}};function nM(i){let{x:e,y:t,z:n}=i;i.x=n,i.y=e,i.z=t}function sM(i){return-i+Math.PI/2}var pm=new Wo,qn=new R,Jt=new R,ku=new R,Ci=new te,ji=new te,Vu=new _t,ci=new wi,mm=new R,gm=new R,ym=new R,fa=new R,hl=new oi,rM=1e-12,aM=.1;var Ku=class{constructor(i=1,e=1,t=1){this.isEllipsoid=!0,this.name="",this.radius=new R(i,e,t)}intersectRay(i,e){return Ci.makeScale(...this.radius).invert(),Vu.center.set(0,0,0),Vu.radius=1,hl.copy(i).applyMatrix4(Ci),hl.intersectSphere(Vu,e)?(Ci.makeScale(...this.radius),e.applyMatrix4(Ci),e):null}getEastNorthUpFrame(i,e,t,n){return t.isMatrix4&&(n=t,t=0,console.warn('Ellipsoid: The signature for "getEastNorthUpFrame" has changed.')),this.getEastNorthUpAxes(i,e,mm,gm,ym),this.getCartographicToPosition(i,e,t,fa),n.makeBasis(mm,gm,ym).setPosition(fa)}getOrientedEastNorthUpFrame(i,e,t,n,s,r,a){return this.getObjectFrame(i,e,t,n,s,r,a,0)}getObjectFrame(i,e,t,n,s,r,a,o=2){return this.getEastNorthUpFrame(i,e,t,Ci),ci.set(s,r,-n,"ZXY"),a.makeRotationFromEuler(ci).premultiply(Ci),o===1?(ci.set(Math.PI/2,0,0,"XYZ"),ji.makeRotationFromEuler(ci),a.multiply(ji)):o===2&&(ci.set(-Math.PI/2,0,Math.PI,"XYZ"),ji.makeRotationFromEuler(ci),a.multiply(ji)),a}getCartographicFromObjectFrame(i,e,t=2){return t===1?(ci.set(-Math.PI/2,0,0,"XYZ"),ji.makeRotationFromEuler(ci).premultiply(i)):t===2?(ci.set(-Math.PI/2,0,Math.PI,"XYZ"),ji.makeRotationFromEuler(ci).premultiply(i)):ji.copy(i),fa.setFromMatrixPosition(ji),this.getPositionToCartographic(fa,e),this.getEastNorthUpFrame(e.lat,e.lon,0,Ci).invert(),ji.premultiply(Ci),ci.setFromRotationMatrix(ji,"ZXY"),e.azimuth=-ci.z,e.elevation=ci.x,e.roll=ci.y,e}getEastNorthUpAxes(i,e,t,n,s,r=fa){this.getCartographicToPosition(i,e,0,r),this.getCartographicToNormal(i,e,s),t.set(-r.y,r.x,0).normalize(),n.crossVectors(s,t).normalize()}getCartographicToPosition(i,e,t,n){this.getCartographicToNormal(i,e,qn);let s=this.radius;Jt.copy(qn),Jt.x*=s.x**2,Jt.y*=s.y**2,Jt.z*=s.z**2;let r=Math.sqrt(qn.dot(Jt));return Jt.divideScalar(r),n.copy(Jt).addScaledVector(qn,t)}getPositionToCartographic(i,e){this.getPositionToSurfacePoint(i,Jt),this.getPositionToNormal(Jt,qn);let t=ku.subVectors(i,Jt);return e.lon=Math.atan2(qn.y,qn.x),e.lat=Math.asin(qn.z),e.height=Math.sign(t.dot(i))*t.length(),e}getCartographicToNormal(i,e,t){return pm.set(1,sM(i),e),t.setFromSpherical(pm).normalize(),nM(t),t}getPositionToNormal(i,e){let t=this.radius;return e.copy(i),e.x/=t.x**2,e.y/=t.y**2,e.z/=t.z**2,e.normalize(),e}getPositionToSurfacePoint(i,e){let t=this.radius,n=1/t.x**2,s=1/t.y**2,r=1/t.z**2,a=i.x*i.x*n,o=i.y*i.y*s,l=i.z*i.z*r,c=a+o+l,u=Math.sqrt(1/c),h=Jt.copy(i).multiplyScalar(u);if(c<aM)return isFinite(u)?e.copy(h):null;let d=ku.set(h.x*n*2,h.y*s*2,h.z*r*2),f=(1-u)*i.length()/(.5*d.length()),m=0,y,g,p,v,x,_,w,M,T,C,S;do{f-=m,p=1/(1+f*n),v=1/(1+f*s),x=1/(1+f*r),_=p*p,w=v*v,M=x*x,T=_*p,C=w*v,S=M*x,y=a*_+o*w+l*M-1,g=a*T*n+o*C*s+l*S*r;let b=-2*g;m=y/b}while(Math.abs(y)>rM);return e.set(i.x*p,i.y*v,i.z*x)}calculateHorizonDistance(i,e){let t=this.calculateEffectiveRadius(i);return Math.sqrt(2*t*e+e**2)}calculateEffectiveRadius(i){let e=this.radius.x,t=1-this.radius.z**2/e**2,n=i*Vn.DEG2RAD,s=Math.sin(n)**2;return e/Math.sqrt(1-t*s)}getPositionElevation(i){this.getPositionToSurfacePoint(i,Jt);let e=ku.subVectors(i,Jt);return Math.sign(e.dot(i))*e.length()}closestPointToRayEstimate(i,e){return this.intersectRay(i,e)?e:(Ci.makeScale(...this.radius).invert(),hl.copy(i).applyMatrix4(Ci),Jt.set(0,0,0),hl.closestPointToPoint(Jt,e).normalize(),Ci.makeScale(...this.radius),e.applyMatrix4(Ci))}copy(i){return this.radius.copy(i.radius),this}clone(){return new this.constructor().copy(this)}},_a=new Ku(hr,hr,Yp);_a.name="WGS84 Earth";var ul=new R,fr=new R,pr=new R,Hu=new R,dl=new Ot,fl=new R,mr=new te,_m=new te,xm=new R,vm=new te,Gu=new Ot,Wu={};function bm(i,e,t,n){if(i=i/t*2-1,e=e/t*2-1,n.x=i,n.y=e,n.z=1-Math.abs(i)-Math.abs(e),n.z<0){let s=n.x;n.x=(1-Math.abs(n.y))*(s>=0?1:-1),n.y=(1-Math.abs(s))*(n.y>=0?1:-1)}return n.normalize(),n}var Ju=class extends sm{constructor(i=ys){super(),this.manager=i,this.adjustmentTransform=new te,this.ellipsoid=_a.clone()}resolveExternalURL(i){return this.manager.resolveURL(super.resolveExternalURL(i))}parse(i){return super.parse(i).then(e=>{let{featureTable:t,batchTable:n}=e,s=e.glbBytes.slice().buffer;return new Promise((r,a)=>{let o=this.fetchOptions,l=this.manager,c=l.getHandler("path.gltf")||new Xn(l);o.credentials==="include"&&o.mode==="cors"&&c.setCrossOrigin("use-credentials"),"credentials"in o&&c.setWithCredentials(o.credentials==="include"),o.headers&&c.setRequestHeader(o.headers);let u=e.gltfWorkingPath??this.workingPath;/[\\/]$/.test(u)||(u+="/");let h=this.adjustmentTransform;c.parse(s,u,d=>{let f=t.getData("INSTANCES_LENGTH"),m=t.getData("POSITION",f,"FLOAT","VEC3"),y=t.getData("POSITION_QUANTIZED",f,"UNSIGNED_SHORT","VEC3"),g=t.getData("QUANTIZED_VOLUME_OFFSET",1,"FLOAT","VEC3"),p=t.getData("QUANTIZED_VOLUME_SCALE",1,"FLOAT","VEC3"),v=t.getData("NORMAL_UP",f,"FLOAT","VEC3"),x=t.getData("NORMAL_RIGHT",f,"FLOAT","VEC3"),_=t.getData("NORMAL_UP_OCT32P",f,"UNSIGNED_SHORT","VEC2"),w=t.getData("NORMAL_RIGHT_OCT32P",f,"UNSIGNED_SHORT","VEC2"),M=t.getData("SCALE_NON_UNIFORM",f,"FLOAT","VEC3"),T=t.getData("SCALE",f,"FLOAT","SCALAR"),C=t.getData("RTC_CENTER",1,"FLOAT","VEC3"),S=t.getData("EAST_NORTH_UP");if(!m&&y){m=new Float32Array(f*3);for(let L=0;L<f;L++)m[L*3+0]=g[0]+y[L*3+0]/65535*p[0],m[L*3+1]=g[1]+y[L*3+1]/65535*p[1],m[L*3+2]=g[2]+y[L*3+2]/65535*p[2]}let b=new R;for(let L=0;L<f;L++)b.x+=m[L*3+0]/f,b.y+=m[L*3+1]/f,b.z+=m[L*3+2]/f;let P=[],D=[];d.scene.updateMatrixWorld(),d.scene.traverse(L=>{if(L.isMesh){D.push(L);let{geometry:N,material:V}=L,z=new sr(N,V,f);z.position.copy(b),C&&(z.position.x+=C[0],z.position.y+=C[1],z.position.z+=C[2]),P.push(z)}});for(let L=0;L<f;L++){Hu.set(m[L*3+0]-b.x,m[L*3+1]-b.y,m[L*3+2]-b.z),dl.identity(),v&&x?(fr.set(v[L*3+0],v[L*3+1],v[L*3+2]),pr.set(x[L*3+0],x[L*3+1],x[L*3+2]),ul.crossVectors(pr,fr).normalize(),mr.makeBasis(pr,fr,ul),dl.setFromRotationMatrix(mr)):_&&w&&(bm(_[L*2+0],_[L*2+1],65535,fr),bm(w[L*2+0],w[L*2+1],65535,pr),ul.crossVectors(pr,fr).normalize(),mr.makeBasis(pr,fr,ul),dl.setFromRotationMatrix(mr)),fl.set(1,1,1),M&&fl.set(M[L*3+0],M[L*3+1],M[L*3+2]),T&&fl.multiplyScalar(T[L]);for(let N=0,V=P.length;N<V;N++){let z=P[N];Gu.copy(dl),S&&(z.updateMatrixWorld(),xm.copy(Hu).applyMatrix4(z.matrixWorld),this.ellipsoid.getPositionToCartographic(xm,Wu),this.ellipsoid.getEastNorthUpFrame(Wu.lat,Wu.lon,vm),Gu.setFromRotationMatrix(vm)),mr.compose(Hu,Gu,fl).multiply(h);let K=D[N];_m.multiplyMatrices(mr,K.matrixWorld),z.setMatrixAt(L,_m)}}d.scene.clear(),d.scene.add(...P),d.batchTable=n,d.featureTable=t,d.scene.batchTable=n,d.scene.featureTable=t,r(d)},a)})})}},Cm=class extends am{constructor(i=ys){super(),this.manager=i,this.adjustmentTransform=new te,this.ellipsoid=_a.clone()}parse(i){let e=super.parse(i),{manager:t,ellipsoid:n,adjustmentTransform:s}=this,r=[];for(let a in e.tiles){let{type:o,buffer:l}=e.tiles[a];switch(o){case"b3dm":{let c=l.slice(),u=new Zu(t);u.workingPath=this.workingPath,u.fetchOptions=this.fetchOptions,u.adjustmentTransform.copy(s);let h=u.parse(c.buffer);r.push(h);break}case"pnts":{let c=l.slice(),u=new $u(t);u.workingPath=this.workingPath,u.fetchOptions=this.fetchOptions;let h=u.parse(c.buffer);r.push(h);break}case"i3dm":{let c=l.slice(),u=new Ju(t);u.workingPath=this.workingPath,u.fetchOptions=this.fetchOptions,u.ellipsoid.copy(n),u.adjustmentTransform.copy(s);let h=u.parse(c.buffer);r.push(h);break}}}return Promise.all(r).then(a=>{let o=new $t;return a.forEach(l=>{o.add(l.scene)}),{tiles:a,scene:o}})}},pa=new te,oM=class extends $t{constructor(i){super(),this.isTilesGroup=!0,this.name="TilesRenderer.TilesGroup",this.tilesRenderer=i,this.matrixWorldInverse=new te}raycast(i,e){return this.tilesRenderer.raycast(i,e),!1}updateMatrixWorld(i){if(this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldNeedsUpdate||i){this.parent===null?pa.copy(this.matrix):pa.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1;let e=pa.elements,t=this.matrixWorld.elements,n=!1;for(let s=0;s<16;s++){let r=e[s],a=t[s];if(Math.abs(r-a)>2**-52){n=!0;break}}if(n){this.matrixWorld.copy(pa),this.matrixWorldInverse.copy(pa).invert();let s=this.children;for(let l=0,c=s.length;l<c;l++)s[l].updateMatrixWorld();let{tilesRenderer:r}=this,{activeTiles:a,visibleTiles:o}=r;a.forEach(l=>{o.has(l)||l.engineData.scene.updateMatrixWorld(!0)})}}}updateWorldMatrix(i,e){this.parent&&i&&this.parent.updateWorldMatrix(i,!1),this.updateMatrixWorld(!0)}},lM=new oi;function cM(i,e,t,n){let{scene:s}=i.engineData;t.invokeOnePlugin(r=>r.raycastTile&&r.raycastTile(i,s,e,n))||e.intersectObject(s,!0,n)}function hM(i){return"traversal"in i}function Rm(i,e,t,n,s=null){if(!hM(e))return;let{group:r,activeTiles:a}=i,{boundingVolume:o}=e.engineData;if(s===null&&(s=lM,s.copy(t.ray).applyMatrix4(r.matrixWorldInverse)),!e.traversal.used||!o.intersectsRay(s))return;a.has(e)&&cM(e,t,i,n);let l=e.children;for(let c=0,u=l.length;c<u;c++)Rm(i,l[c],t,n,s)}var pl=new R,ml=new R,hi=new R,gl=new oi,Yu=class{constructor(i=new Ge,e=new te){this.box=i.clone(),this.transform=e.clone(),this.inverseTransform=new te,this.points=Array(8).fill().map(()=>new R),this.planes=[,,,,,,].fill().map(()=>new Zt)}copy(i){return this.box.copy(i.box),this.transform.copy(i.transform),this.update(),this}clone(){return new this.constructor().copy(this)}clampPoint(i,e){return e.copy(i).applyMatrix4(this.inverseTransform).clamp(this.box.min,this.box.max).applyMatrix4(this.transform)}distanceToPoint(i){return this.clampPoint(i,hi).distanceTo(i)}containsPoint(i){return hi.copy(i).applyMatrix4(this.inverseTransform),this.box.containsPoint(hi)}intersectsRay(i){return gl.copy(i).applyMatrix4(this.inverseTransform),gl.intersectsBox(this.box)}intersectRay(i,e){return gl.copy(i).applyMatrix4(this.inverseTransform),gl.intersectBox(this.box,e)?(e.applyMatrix4(this.transform),e):null}update(){let{points:i,inverseTransform:e,transform:t,box:n}=this;e.copy(t).invert();let{min:s,max:r}=n,a=0;for(let o=-1;o<=1;o+=2)for(let l=-1;l<=1;l+=2)for(let c=-1;c<=1;c+=2)i[a].set(o<0?s.x:r.x,l<0?s.y:r.y,c<0?s.z:r.z).applyMatrix4(t),a++;this.updatePlanes()}updatePlanes(){pl.copy(this.box.min).applyMatrix4(this.transform),ml.copy(this.box.max).applyMatrix4(this.transform),hi.set(0,0,1).transformDirection(this.transform),this.planes[0].setFromNormalAndCoplanarPoint(hi,pl),this.planes[1].setFromNormalAndCoplanarPoint(hi,ml).negate(),hi.set(0,1,0).transformDirection(this.transform),this.planes[2].setFromNormalAndCoplanarPoint(hi,pl),this.planes[3].setFromNormalAndCoplanarPoint(hi,ml).negate(),hi.set(1,0,0).transformDirection(this.transform),this.planes[4].setFromNormalAndCoplanarPoint(hi,pl),this.planes[5].setFromNormalAndCoplanarPoint(hi,ml).negate()}intersectsSphere(i){return this.clampPoint(i.center,hi),hi.distanceToSquared(i.center)<=i.radius*i.radius}intersectsFrustum(i){return this._intersectsPlaneShape(i.planes,i.points)}intersectsOBB(i){return this._intersectsPlaneShape(i.planes,i.points)}_intersectsPlaneShape(i,e){let t=this.points,n=this.planes;for(let s=0;s<6;s++){let r=i[s],a=-1/0;for(let o=0;o<8;o++){let l=t[o],c=r.distanceToPoint(l);a=a<c?c:a}if(a<0)return!1}for(let s=0;s<6;s++){let r=n[s],a=-1/0;for(let o=0;o<8;o++){let l=e[o],c=r.distanceToPoint(l);a=a<c?c:a}if(a<0)return!1}return!0}},ya=Math.PI,Xu=ya/2,ma=new R,vs=new R,zi=new R,Ee=new R,Qt=new te,uM=new Ge,Sm=new te;function Yn(i,e){e.radius=Math.max(e.radius,i.distanceToSquared(e.center))}function Mm(i){return i.x!==i.y}var Pm=class extends Ku{constructor(i=1,e=1,t=1,n=-Xu,s=Xu,r=0,a=2*ya,o=0,l=0){super(i,e,t),this.latStart=n,this.latEnd=s,this.lonStart=r,this.lonEnd=a,this.heightStart=o,this.heightEnd=l}getBoundingBox(i,e){Mm(this.radius)&&console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported.");let{latStart:t,latEnd:n,lonStart:s,lonEnd:r,heightStart:a,heightEnd:o}=this,l=(t+n)*.5,c=(s+r)*.5,u=t>0,h=n<0,d;d=u?t:h?n:0;let{min:f,max:m}=i;f.setScalar(1/0),m.setScalar(-1/0),r-s<=ya?(this.getCartographicToNormal(l,c,zi),vs.set(0,0,1),ma.crossVectors(vs,zi).normalize(),vs.crossVectors(zi,ma).normalize(),e.makeBasis(ma,vs,zi),Qt.copy(e).invert(),this.getCartographicToPosition(d,s,o,Ee).applyMatrix4(Qt),m.x=Math.abs(Ee.x),f.x=-m.x,this.getCartographicToPosition(n,s,o,Ee).applyMatrix4(Qt),m.y=Ee.y,this.getCartographicToPosition(n,c,o,Ee).applyMatrix4(Qt),m.y=Math.max(Ee.y,m.y),this.getCartographicToPosition(t,s,o,Ee).applyMatrix4(Qt),f.y=Ee.y,this.getCartographicToPosition(t,c,o,Ee).applyMatrix4(Qt),f.y=Math.min(Ee.y,f.y),this.getCartographicToPosition(l,c,o,Ee).applyMatrix4(Qt),m.z=Ee.z,this.getCartographicToPosition(t,s,a,Ee).applyMatrix4(Qt),f.z=Ee.z,this.getCartographicToPosition(n,s,a,Ee).applyMatrix4(Qt),f.z=Math.min(Ee.z,f.z)):(this.getCartographicToPosition(d,c,o,zi),zi.z=0,zi.length()<1e-10?zi.set(1,0,0):zi.normalize(),vs.set(0,0,1),ma.crossVectors(zi,vs).normalize(),e.makeBasis(ma,vs,zi),Qt.copy(e).invert(),this.getCartographicToPosition(d,c+Xu,o,Ee).applyMatrix4(Qt),m.x=Math.abs(Ee.x),f.x=-m.x,this.getCartographicToPosition(n,0,h?a:o,Ee).applyMatrix4(Qt),m.y=Ee.y,this.getCartographicToPosition(t,0,u?a:o,Ee).applyMatrix4(Qt),f.y=Ee.y,this.getCartographicToPosition(d,c,o,Ee).applyMatrix4(Qt),m.z=Ee.z,this.getCartographicToPosition(d,r,o,Ee).applyMatrix4(Qt),f.z=Ee.z),i.getCenter(Ee),i.min.sub(Ee).multiplyScalar(1.0000000000001),i.max.sub(Ee).multiplyScalar(1.0000000000001),Ee.applyMatrix4(e),e.setPosition(Ee)}getBoundingSphere(i){Mm(this.radius)&&console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported."),this.getBoundingBox(uM,Sm),i.center.setFromMatrixPosition(Sm),i.radius=0;let{latStart:e,latEnd:t,lonStart:n,lonEnd:s,heightStart:r,heightEnd:a}=this,o=(e+t)*.5,l=(n+s)*.5,c=e>0,u=t<0,h;h=c?e:u?t:0,this.getCartographicToPosition(h,n,a,Ee),Yn(Ee,i),this.getCartographicToPosition(t,n,a,Ee),Yn(Ee,i),this.getCartographicToPosition(t,l,a,Ee),Yn(Ee,i),this.getCartographicToPosition(e,n,a,Ee),Yn(Ee,i),this.getCartographicToPosition(e,l,a,Ee),Yn(Ee,i),this.getCartographicToPosition(o,l,a,Ee),Yn(Ee,i),this.getCartographicToPosition(e,n,r,Ee),Yn(Ee,i),s-n>ya&&(this.getCartographicToPosition(h,l+ya,a,Ee),Yn(Ee,i)),i.radius=Math.sqrt(i.radius)*1.0000000000001}},_n=new R,xn=new R,vn=new R,Tm=new R,wm=new R,dM=class{constructor(){this.sphere=null,this.obb=null,this.region=null,this.regionObb=null}intersectsRay(i){let e=this.sphere,t=this.obb||this.regionObb;return!(e&&!i.intersectsSphere(e)||t&&!t.intersectsRay(i))}intersectRay(i,e=null){let t=this.sphere,n=this.obb||this.regionObb,s=-1/0,r=-1/0;t&&i.intersectSphere(t,Tm)&&(s=t.containsPoint(i.origin)?0:i.origin.distanceToSquared(Tm)),n&&n.intersectRay(i,wm)&&(r=n.containsPoint(i.origin)?0:i.origin.distanceToSquared(wm));let a=Math.max(s,r);return a===-1/0?null:(i.at(Math.sqrt(a),e),e)}distanceToPoint(i){let e=this.sphere,t=this.obb||this.regionObb,n=-1/0,s=-1/0;return e&&(n=Math.max(e.distanceToPoint(i),0)),t&&(s=t.distanceToPoint(i)),n>s?n:s}intersectsFrustum(i){let e=this.obb||this.regionObb,t=this.sphere;return t&&!i.intersectsSphere(t)||e&&!e.intersectsFrustum(i)?!1:!!(t||e)}intersectsSphere(i){let e=this.obb||this.regionObb,t=this.sphere;return t&&!t.intersectsSphere(i)||e&&!e.intersectsSphere(i)?!1:!!(t||e)}intersectsOBB(i){let e=this.obb||this.regionObb,t=this.sphere;return t&&!i.intersectsSphere(t)||e&&!e.intersectsOBB(i)?!1:!!(t||e)}getOBB(i,e){let t=this.obb||this.regionObb;t?(i.copy(t.box),e.copy(t.transform)):(this.getAABB(i),e.identity())}getAABB(i){if(this.sphere)this.sphere.getBoundingBox(i);else{let e=this.obb||this.regionObb;i.copy(e.box).applyMatrix4(e.transform)}}getSphere(i){if(this.sphere)i.copy(this.sphere);else if(this.region)this.region.getBoundingSphere(i);else{let e=this.obb||this.regionObb;e.box.getBoundingSphere(i),i.applyMatrix4(e.transform)}}setObbData(i,e){let t=new Yu;_n.set(i[3],i[4],i[5]),xn.set(i[6],i[7],i[8]),vn.set(i[9],i[10],i[11]);let n=_n.length(),s=xn.length(),r=vn.length();_n.normalize(),xn.normalize(),vn.normalize(),n===0&&_n.crossVectors(xn,vn),s===0&&xn.crossVectors(_n,vn),r===0&&vn.crossVectors(_n,xn),t.transform.set(_n.x,xn.x,vn.x,i[0],_n.y,xn.y,vn.y,i[1],_n.z,xn.z,vn.z,i[2],0,0,0,1).premultiply(e),t.box.min.set(-n,-s,-r),t.box.max.set(n,s,r),t.update(),this.obb=t}setSphereData(i,e,t,n,s){let r=new _t;r.center.set(i,e,t),r.radius=n,r.applyMatrix4(s),this.sphere=r}setRegionData(i,e,t,n,s,r,a){let o=new Pm(...i.radius,t,s,e,n,r,a),l=new Yu;o.getBoundingBox(l.box,l.transform),l.update(),this.region=o,this.regionObb=l}},fM=new Re;function pM(i,e,t,n){let s=fM.set(i.normal.x,i.normal.y,i.normal.z,e.normal.x,e.normal.y,e.normal.z,t.normal.x,t.normal.y,t.normal.z);return n.set(-i.constant,-e.constant,-t.constant),n.applyMatrix3(s.invert()),n}var mM=class extends hn{constructor(){super(),this.points=Array(8).fill().map(()=>new R)}setFromProjectionMatrix(...i){return super.setFromProjectionMatrix(...i),this.calculateFrustumPoints(),this}calculateFrustumPoints(){let{planes:i,points:e}=this;[[i[0],i[3],i[4]],[i[1],i[3],i[4]],[i[0],i[2],i[4]],[i[1],i[2],i[4]],[i[0],i[3],i[5]],[i[1],i[3],i[5]],[i[0],i[2],i[5]],[i[1],i[2],i[5]]].forEach((t,n)=>{pM(t[0],t[1],t[2],e[n])})}};var ju=0;function Am(i,e,t,n){try{return eu.getByteLength(i,e,t,n)}catch{return ju}}function gM(i){if(!i)return 0;if(i.isExternalTexture)return i.userData?.byteLength??ju;let{format:e,type:t,image:n,mipmaps:s}=i;if(i.isCompressedTexture&&Array.isArray(s)&&s.length>0){let a=0;for(let o of s)o?.data?.byteLength?a+=o.data.byteLength:a+=Am(o.width,o.height,e,t);return a}if(!n)return ju;let r=Am(n.width,n.height,e,t);return r*=i.generateMipmaps?4/3:1,r}function yM(i){let e=new Set,t=0;return i.traverse(n=>{if(n.geometry&&!e.has(n.geometry)&&(t+=om(n.geometry),e.add(n.geometry)),n.material){let s=n.material;for(let r in s){let a=s[r];a&&a.isTexture&&!e.has(a)&&(t+=gM(a),e.add(a))}}}),t}var Im=Symbol("INITIAL_FRUSTUM_CULLED"),yl=new te,ga=new R,qu=new ue,_M=new R(1,0,0),xM=new R(0,1,0),vM=()=>null;function Em(i,e){i.traverse(t=>{t.frustumCulled=t[Im]&&e})}var Qu=class extends tm{get autoDisableRendererCulling(){return this._autoDisableRendererCulling}set autoDisableRendererCulling(i){this._autoDisableRendererCulling!==i&&(super._autoDisableRendererCulling=i,this.forEachLoadedModel(e=>{Em(e,!i)}))}constructor(...i){super(...i),this.accelerateRaycast=!0,this.group=new oM(this),this.ellipsoid=_a.clone(),this.surface=this.ellipsoid,this.cameras=[],this.cameraMap=new Map,this.cameraInfo=[],this._upRotationMatrix=new te,this._bytesUsed=new WeakMap,this._autoDisableRendererCulling=!0,this.manager=new na,this._listeners={}}addEventListener(i,e){ai.prototype.addEventListener.call(this,i,e)}hasEventListener(i,e){return ai.prototype.hasEventListener.call(this,i,e)}removeEventListener(i,e){ai.prototype.removeEventListener.call(this,i,e)}dispatchEvent(i){ai.prototype.dispatchEvent.call(this,i)}getBoundingBox(i){if(!this.root)return!1;let e=this.root.engineData.boundingVolume;return e?(e.getAABB(i),!0):!1}getOrientedBoundingBox(i,e){if(!this.root)return!1;let t=this.root.engineData.boundingVolume;return t?(t.getOBB(i,e),!0):!1}getBoundingSphere(i){if(!this.root)return!1;let e=this.root.engineData.boundingVolume;return e?(e.getSphere(i),!0):!1}forEachLoadedModel(i){this.traverse(e=>{let t=e.engineData&&e.engineData.scene;t&&i(t,e)},null,!1)}raycast(i,e){if(this.root)if(this.accelerateRaycast)Rm(this,this.root,i,e);else{let t=i.firstHitOnly?[]:e;for(let n of this.activeTiles){let{scene:s}=n.engineData;this.invokeOnePlugin(r=>r.raycastTile&&r.raycastTile(n,s,i,t))||i.intersectObject(s,!0,t)}i.firstHitOnly&&t.length>0&&(t.sort((n,s)=>n.distance-s.distance),e.push(t[0]))}}hasCamera(i){return this.cameraMap.has(i)}setCamera(i){let e=this.cameras,t=this.cameraMap;return!t.has(i)&&(t.set(i,new ue),e.push(i),this.dispatchEvent({type:"add-camera",camera:i}),!0)}setResolution(i,e,t){let n=this.cameraMap;if(!n.has(i))return!1;let s=e.isVector2?e.x:e,r=e.isVector2?e.y:t,a=n.get(i);return(a.width!==s||a.height!==r)&&(a.set(s,r),this.dispatchEvent({type:"camera-resolution-change"})),!0}getResolution(i,e){let t=this.cameraMap.get(i);return t?e.copy(t):null}setResolutionFromRenderer(i,e){return e.getSize(qu),this.setResolution(i,qu.x,qu.y)}deleteCamera(i){let e=this.cameras,t=this.cameraMap;if(t.has(i)){let n=e.indexOf(i);return e.splice(n,1),t.delete(i),this.dispatchEvent({type:"delete-camera",camera:i}),!0}return!1}loadRootTileset(...i){return super.loadRootTileset(...i).then(e=>{let{asset:t,extensions:n={}}=e;switch((t&&t.gltfUpAxis||"y").toLowerCase()){case"x":this._upRotationMatrix.makeRotationAxis(xM,-Math.PI/2);break;case"y":this._upRotationMatrix.makeRotationAxis(_M,Math.PI/2)}if("3DTILES_ellipsoid"in n){let s=n["3DTILES_ellipsoid"],{ellipsoid:r}=this;r.name=s.body,s.radii?r.radius.set(...s.radii):r.radius.set(1,1,1)}return e})}prepareForTraversal(){let i=this.group,e=this.cameras,t=this.cameraMap,n=this.cameraInfo;for(;n.length>e.length;)n.pop();for(;n.length<e.length;)n.push({frustum:new mM,isOrthographic:!1,sseDenominator:-1,position:new R,invScale:-1,pixelSize:0});ga.setFromMatrixScale(i.matrixWorldInverse),Math.abs(Math.max(ga.x-ga.y,ga.x-ga.z))>1e-6&&console.warn("ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when calculating screen space error.");for(let s=0,r=n.length;s<r;s++){let a=e[s],o=n[s],l=o.frustum,c=o.position,u=t.get(a);(u.width===0||u.height===0)&&console.warn("TilesRenderer: resolution for camera error calculation is not set.");let h=a.projectionMatrix.elements;if(o.isOrthographic=h[15]===1,o.isOrthographic){let d=2/h[0],f=2/h[5];o.pixelSize=Math.max(f/u.height,d/u.width)}else o.sseDenominator=2/h[5]/u.height;yl.copy(i.matrixWorld),yl.premultiply(a.matrixWorldInverse),yl.premultiply(a.projectionMatrix),l.setFromProjectionMatrix(yl,a.coordinateSystem,a.reversedDepth),c.set(0,0,0),c.applyMatrix4(a.matrixWorld),c.applyMatrix4(i.matrixWorldInverse)}}update(){if(super.update(),this.cameras.length===0&&this.root){let i=!1;this.invokeAllPlugins(e=>i||=!!(e!==this&&e.calculateTileViewError)),i===!1&&console.warn("TilesRenderer: no cameras defined. Cannot update 3d tiles.")}}preprocessNode(i,e,t=null){super.preprocessNode(i,e,t);let n=new te;if(i.transform){let a=i.transform;for(let o=0;o<16;o++)n.elements[o]=a[o]}t&&n.premultiply(t.engineData.transform);let s=new te().copy(n).invert(),r=new dM;"sphere"in i.boundingVolume&&r.setSphereData(...i.boundingVolume.sphere,n),"box"in i.boundingVolume&&r.setObbData(i.boundingVolume.box,n),"region"in i.boundingVolume&&r.setRegionData(this.ellipsoid,...i.boundingVolume.region),i.engineData.transform=n,i.engineData.transformInverse=s,i.engineData.boundingVolume=r,i.engineData.geometry=null,i.engineData.materials=null,i.engineData.textures=null,i.toJSON=vM}async parseTile(i,e,t,n,s){let r=e.engineData,a=ol(n),o=this.fetchOptions,l=this.manager,c=null,u=r.transform,h=this._upRotationMatrix,d=(Gn(i)||t).toLowerCase();switch(d){case"b3dm":{let x=new Zu(l);x.workingPath=a,x.fetchOptions=o,x.adjustmentTransform.copy(h),c=x.parse(i);break}case"pnts":{let x=new $u(l);x.workingPath=a,x.fetchOptions=o,c=x.parse(i);break}case"i3dm":{let x=new Ju(l);x.workingPath=a,x.fetchOptions=o,x.adjustmentTransform.copy(h),x.ellipsoid.copy(this.ellipsoid),c=x.parse(i);break}case"cmpt":{let x=new Cm(l);x.workingPath=a,x.fetchOptions=o,x.adjustmentTransform.copy(h),x.ellipsoid.copy(this.ellipsoid),c=x.parse(i).then(_=>_.scene);break}case"gltf":case"glb":{let x=l.getHandler("path.gltf")||l.getHandler("path.glb")||new Xn(l);x.setWithCredentials(o.credentials==="include"),x.setRequestHeader(o.headers||{}),o.credentials==="include"&&o.mode==="cors"&&x.setCrossOrigin("use-credentials");let _=x.resourcePath||x.path||a;!/[\\/]$/.test(_)&&_.length&&(_+="/"),c=x.parseAsync(i,_).then(w=>{w.scene=w.scene||new $t;let{scene:M}=w;return M.updateMatrix(),M.matrix.multiply(h).decompose(M.position,M.quaternion,M.scale),w});break}default:c=this.invokeOnePlugin(x=>x.parseToMesh&&x.parseToMesh(i,e,t,n,s))}let f=await c;if(f===null)throw Error(`TilesRenderer: Content type "${d}" not supported.`);let m,y;f.isObject3D?(m=f,y=null):(m=f.scene,y=f),m.updateMatrix(),m.matrix.premultiply(u),m.matrix.decompose(m.position,m.quaternion,m.scale),await this.invokeAllPlugins(x=>x.processTileModel&&x.processTileModel(m,e)),m.traverse(x=>{x[Im]=x.frustumCulled,x.userData.tile=e}),Em(m,!this.autoDisableRendererCulling);let g=[],p=[],v=[];if(m.traverse(x=>{if(x.geometry&&p.push(x.geometry),x.material){let _=x.material;g.push(x.material);for(let w in _){let M=_[w];M&&M.isTexture&&v.push(M)}}}),s.aborted)for(let x=0,_=v.length;x<_;x++){let w=v[x];w.image instanceof ImageBitmap&&w.image.close(),w.dispose()}else r.materials=g,r.geometry=p,r.textures=v,r.scene=m,r.metadata=y}disposeTile(i){super.disposeTile(i);let e=i.engineData;if(e.scene){let t=e.materials,n=e.geometry,s=e.textures,r=e.scene.parent;e.scene.traverse(a=>{a.userData.meshFeatures&&a.userData.meshFeatures.dispose(),a.userData.structuralMetadata&&a.userData.structuralMetadata.dispose()});for(let a=0,o=n.length;a<o;a++)n[a].dispose();for(let a=0,o=t.length;a<o;a++)t[a].dispose();for(let a=0,o=s.length;a<o;a++){let l=s[a];l.image instanceof ImageBitmap&&l.image.close(),l.dispose()}r&&r.remove(e.scene),e.scene=null,e.materials=null,e.textures=null,e.geometry=null,e.metadata=null}}setTileActive(i,e){super.setTileActive(i,e);let t=i.engineData.scene;t&&(e?(t.parent=this.group,t.updateMatrixWorld(!0)):this.visibleTiles.has(i)||(t.parent=null))}setTileVisible(i,e){let t=i.engineData.scene,{activeTiles:n,group:s}=this;t&&(e?s.add(t):(s.remove(t),n.has(i)&&(t.parent=s))),super.setTileVisible(i,e)}calculateBytesUsed(i,e){let t=this._bytesUsed;return!t.has(i)&&e&&t.set(i,yM(e)),t.get(i)??null}calculateTileViewError(i,e){let t=i.engineData,n=this.cameras,s=this.cameraInfo,r=t.boundingVolume,a=!1,o=0,l=1/0,c=0,u=1/0;for(let h=0,d=n.length;h<d;h++){let f=s[h],m,y;if(f.isOrthographic){let p=f.pixelSize;m=i.geometricError/p,y=1/0}else{let p=f.sseDenominator;y=r.distanceToPoint(f.position),m=y===0?1/0:i.geometricError/(y*p)}let g=s[h].frustum;r.intersectsFrustum(g)&&(a=!0,o=Math.max(o,m),l=Math.min(l,y)),c=Math.max(c,m),u=Math.min(u,y)}a?(e.inView=!0,e.error=o,e.distanceFromCamera=l):(e.inView=!1,e.error=c,e.distanceFromCamera=u)}dispose(){super.dispose(),this.group.removeFromParent()}};var Lm="https://tile.googleapis.com/v1/createSession",td=class{get isMapTilesSession(){return this.authURL===Lm}constructor(i={}){let{apiToken:e,sessionOptions:t=null,autoRefreshToken:n=!1}=i;this.apiToken=e,this.autoRefreshToken=n,this.authURL=Lm,this.sessionToken=null,this.sessionOptions=t,this._tokenRefreshPromise=null,this._authHostname=null}async fetch(i,e){this.sessionToken===null&&this.isMapTilesSession&&this.refreshToken(e),await this._tokenRefreshPromise,this._authHostname===null&&(this._authHostname=new URL(this.authURL).host);let t=new URL(i),n=t.host===this._authHostname;n&&(t.searchParams.set("key",this.apiToken),this.sessionToken&&t.searchParams.set("session",this.sessionToken));let s=await fetch(t,e);return n&&s.status>=400&&s.status<=499&&this.autoRefreshToken&&(await this.refreshToken(e),this.sessionToken&&t.searchParams.set("session",this.sessionToken),s=await fetch(t,e)),this.sessionToken===null&&!this.isMapTilesSession?s.json().then(r=>(this.sessionToken=Dm(r),r)):s}refreshToken(i){if(this._tokenRefreshPromise===null){let e=new URL(this.authURL);e.searchParams.set("key",this.apiToken);let t={...i};this.isMapTilesSession&&(t.method="POST",t.body=JSON.stringify(this.sessionOptions),t.headers=t.headers||{},t.headers={...t.headers,"Content-Type":"application/json"}),this._tokenRefreshPromise=fetch(e,t).then(n=>{if(!n.ok)throw Error(`GoogleCloudAuth: Failed to load data with error code ${n.status}`);return n.json()}).then(n=>(this.sessionToken=Dm(n),this._tokenRefreshPromise=null,n))}return this._tokenRefreshPromise}};function Dm(i){if("session"in i)return i.session;{let e=null,t=i.root;return ou(t,n=>{if(n.content&&n.content.uri){let[,s]=n.content.uri.split("?");return e=new URLSearchParams(s).get("session"),!0}return!1}),e}}var bM=class{constructor(){this.creditsCount={}}_adjustAttributions(i,e){let t=this.creditsCount,n=i.split(/;/g);for(let s=0,r=n.length;s<r;s++){let a=n[s];a in t||(t[a]=0),t[a]+=e?1:-1,t[a]<=0&&delete t[a]}}addAttributions(i){this._adjustAttributions(i,!0)}removeAttributions(i){this._adjustAttributions(i,!1)}toString(){return Object.entries(this.creditsCount).sort((i,e)=>{let t=i[1];return e[1]-t}).map(i=>i[0]).join("; ")}},SM="https://tile.googleapis.com/v1/3dtiles/root.json",id=class{constructor({apiToken:i,sessionOptions:e=null,autoRefreshToken:t=!1,logoUrl:n=null,useRecommendedSettings:s=!0}){this.name="GOOGLE_CLOUD_AUTH_PLUGIN",this.apiToken=i,this.useRecommendedSettings=s,this.logoUrl=n,this.auth=new td({apiToken:i,autoRefreshToken:t,sessionOptions:e}),this.tiles=null,this._visibilityChangeCallback=null,this._attributionsManager=new bM,this._logoAttribution={value:"",type:"image",collapsible:!1},this._attribution={value:"",type:"string",collapsible:!0}}init(i){let{useRecommendedSettings:e,auth:t}=this;i.resetFailedTiles(),i.rootURL??=SM,t.sessionOptions||(t.authURL=i.rootURL),e&&!t.isMapTilesSession&&(i.errorTarget=20),this.tiles=i,this._visibilityChangeCallback=({tile:n,visible:s})=>{let r=n.engineData.metadata?.asset?.copyright||"";s?this._attributionsManager.addAttributions(r):this._attributionsManager.removeAttributions(r)},i.addEventListener("tile-visibility-change",this._visibilityChangeCallback)}getAttributions(i){this.tiles.visibleTiles.size>0&&(this.logoUrl&&(this._logoAttribution.value=this.logoUrl,i.push(this._logoAttribution)),this._attribution.value=this._attributionsManager.toString(),i.push(this._attribution))}dispose(){this.tiles.removeEventListener("tile-visibility-change",this._visibilityChangeCallback)}async fetchData(i,e){return this.auth.fetch(i,e)}};var ed=(i,e,t)=>Math.max(e,Math.min(t,i)),MM=class{constructor(){this.duration=250,this.fadeCount=0,this._lastTick=-1,this._fadeState=new Map,this.onFadeComplete=null,this.onFadeStart=null,this.onFadeSetComplete=null,this.onFadeSetStart=null}deleteObject(i){i&&this.completeFade(i)}guaranteeState(i){let e=this._fadeState;return!e.has(i)&&(e.set(i,{fadeInTarget:0,fadeOutTarget:0,fadeIn:0,fadeOut:0}),!0)}completeFade(i){let e=this._fadeState;if(!e.has(i))return;let t=e.get(i).fadeOutTarget===0;e.delete(i),this.fadeCount--,this.onFadeComplete&&this.onFadeComplete(i,t),this.fadeCount===0&&this.onFadeSetComplete&&this.onFadeSetComplete()}completeAllFades(){this._fadeState.forEach((i,e)=>{this.completeFade(e)})}forEachObject(i){this._fadeState.forEach((e,t)=>{i(t,e)})}fadeIn(i){let e=this.guaranteeState(i),t=this._fadeState.get(i);t.fadeInTarget=1,t.fadeOutTarget=0,t.fadeOut=0,e&&(this.fadeCount++,this.fadeCount===1&&this.onFadeSetStart&&this.onFadeSetStart(),this.onFadeStart&&this.onFadeStart(i))}fadeOut(i){let e=this.guaranteeState(i),t=this._fadeState.get(i);t.fadeOutTarget=1,e&&(t.fadeInTarget=1,t.fadeIn=1,this.fadeCount++,this.fadeCount===1&&this.onFadeSetStart&&this.onFadeSetStart(),this.onFadeStart&&this.onFadeStart(i))}isFading(i){return this._fadeState.has(i)}isFadingOut(i){let e=this._fadeState.get(i);return e&&e.fadeOutTarget===1}update(){let i=globalThis.performance.now();this._lastTick===-1&&(this._lastTick=i);let e=this.duration===0?1:ed((i-this._lastTick)/this.duration,0,1);this._lastTick=i,this._fadeState.forEach((t,n)=>{let{fadeOutTarget:s,fadeInTarget:r}=t,{fadeOut:a,fadeIn:o}=t,l=Math.sign(r-o);o=ed(o+l*e,0,1);let c=Math.sign(s-a);a=ed(a+c*e,0,1),t.fadeIn=o,t.fadeOut=a,(a===s&&o===r||s===1&&a>=o)&&this.completeFade(n)})}},Um=Symbol("HAS_POPPED_IN");function TM(i){let e=i;for(;e;){if(e.traversal.wasSetActive)return e.traversal.wasInFrustum;e=e.parent}return!1}var nd=class{get fadeDuration(){return this._fadeManager.duration}set fadeDuration(i){this._fadeManager.duration=Number(i)}get fadingTiles(){return this._fadeManager.fadeCount}constructor(i){i={maximumFadeOutTiles:50,fadeRootTiles:!1,fadeDuration:250,...i},this.name="FADE_TILES_PLUGIN",this.priority=-2,this.tiles=null,this.maximumFadeOutTiles=i.maximumFadeOutTiles,this.fadeRootTiles=i.fadeRootTiles,this._quickFadeTiles=new Set,this._fadeManager=new MM,this._fadingOutCount=0,this._fadingBefore=0,this.fadeDuration=i.fadeDuration}init(i){this.tiles=i,this._onLoadModel=({scene:t,tile:n})=>{this.prepareTileScene(t,n)},this._onDisposeModel=({tile:t,scene:n})=>{i.visibleTiles.has(t)&&t.parent&&this._quickFadeTiles.add(t.parent),this._fadeManager.deleteObject(t),this.releaseTileScene(n,t)},this._onUpdateBefore=()=>{this._fadingBefore=this._fadeManager.fadeCount},this._onUpdateAfter=()=>this._updateAfter(),i.addEventListener("load-model",this._onLoadModel),i.addEventListener("dispose-model",this._onDisposeModel),i.addEventListener("update-before",this._onUpdateBefore),i.addEventListener("update-after",this._onUpdateAfter);let e=this._fadeManager;e.onFadeSetStart=()=>{i.dispatchEvent({type:"fade-start"}),i.dispatchEvent({type:"needs-render"})},e.onFadeSetComplete=()=>{i.dispatchEvent({type:"fade-end"}),i.dispatchEvent({type:"needs-render"})},e.onFadeComplete=(t,n)=>{this.resetFadeState(t,n),n||(i.invokeOnePlugin(s=>s!==this&&s.setTileVisible&&s.setTileVisible(t,!1)),this._fadingOutCount--)},this._forEachLoadedModel((t,n)=>this.prepareTileScene(t,n))}_updateAfter(){let i=this._fadeManager,e=this.tiles;i.update();let t=i.fadeCount;this._fadingBefore!==0&&t!==0&&(e.dispatchEvent({type:"fade-change"}),e.dispatchEvent({type:"needs-render"}));let n=this.maximumFadeOutTiles<this._fadingOutCount,s=this.updateCameraState(n);n&&s&&i.completeAllFades(),i.forEachObject((r,{fadeIn:a,fadeOut:o})=>{e.markTileUsed(r),this.setFadeState(r,a,o)})}setTileVisible(i,e){let t=this._fadeManager,n=t.isFading(i);return TM(i)?(t.isFadingOut(i)&&this._fadingOutCount--,e?i.internal.depthFromRenderedParent===1?((i[Um]||this.fadeRootTiles)&&t.fadeIn(i),i[Um]=!0):t.fadeIn(i):(this._fadingOutCount++,t.fadeOut(i)),this._quickFadeTiles.has(i)&&(t.completeFade(i),this._quickFadeTiles.delete(i)),n?!0:!e&&t.isFading(i)):(n&&t.completeFade(i),!1)}dispose(){let i=this.tiles;this._fadeManager.completeAllFades(),i.removeEventListener("load-model",this._onLoadModel),i.removeEventListener("dispose-model",this._onDisposeModel),i.removeEventListener("update-before",this._onUpdateBefore),i.removeEventListener("update-after",this._onUpdateAfter),this._forEachLoadedModel((e,t)=>{this._fadeManager.deleteObject(t),this.releaseTileScene(e,t)}),this._fadeManager.onFadeSetStart=null,this._fadeManager.onFadeSetComplete=null,this._fadeManager.onFadeComplete=null,this._quickFadeTiles.clear(),this.tiles=null}_forEachLoadedModel(i){this.tiles.traverse(e=>{let t=e.engineData?.scene;return t&&i(t,e),!1},null,!1)}prepareTileScene(){throw Error("TilesFadePluginBase: prepareTileScene must be implemented.")}releaseTileScene(){throw Error("TilesFadePluginBase: releaseTileScene must be implemented.")}setFadeState(){throw Error("TilesFadePluginBase: setFadeState must be implemented.")}resetFadeState(){throw Error("TilesFadePluginBase: resetFadeState must be implemented.")}updateCameraState(){throw Error("TilesFadePluginBase: updateCameraState must be implemented.")}};var CM=new un(-1,1,1,-1,0,1),sd=class extends xt{constructor(){super(),this.setAttribute("position",new Kt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Kt([0,2,0,0,2,0],2))}},RM=new sd,xa=class{constructor(e){this._mesh=new at(RM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,CM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Nm=1.340264,Om=-.081106,Bm=893e-6,Fm=.003796,zm=Math.sqrt(3)/2;function rg(i,e,t){let n=Math.asin(zm*Math.sin(e)),s=n*n,r=s*s*s;return t[0]=i*Math.cos(n)/(zm*(Nm+3*Om*s+r*(7*Bm+9*Fm*s))),t[1]=n*(Nm+Om*s+r*(Bm+Fm*s)),t}var rA=rg(Math.PI,0,[0,0])[0],aA=rg(0,Math.PI/2,[0,0])[1];var oA=Object.freeze({fill:"#cccccc",stroke:"transparent",strokeWidth:1,radius:2,order:0,visible:!0});var km=new cr;km.maxJobs=10,km.priorityCallback=(i,e)=>{let t=i.tile,n=e.tile,s=t.internal.renderer,r=n.internal.renderer,a=s.visibleTiles.has(t);return a===r.visibleTiles.has(n)?ha(t,n):a?1:-1};var Vm=new R;function va(i,e){if(i.isInterleavedBufferAttribute||i.array instanceof e)return i;let t=e===Int8Array||e===Int16Array||e===Int32Array?-1:0,n=new e(i.count*i.itemSize),s=new Be(n,i.itemSize,!0),r=i.itemSize,a=i.count;for(let o=0;o<a;o++)for(let l=0;l<r;l++){let c=Vn.clamp(i.getComponent(o,l),t,1);s.setComponent(o,l,c)}return s}function PM(i,e=Int16Array){let t=i.geometry,n=t.attributes,s=n.position;if(s.isInterleavedBufferAttribute||s.array instanceof e)return s;let r=new e(s.count*s.itemSize),a=new Be(r,s.itemSize,!1),o=s.itemSize,l=s.count;t.computeBoundingBox();let c=t.boundingBox,{min:u,max:h}=c,d=2**(8*e.BYTES_PER_ELEMENT-1)-1,f=-d;for(let m=0;m<l;m++)for(let y=0;y<o;y++){let g=y===0?"x":y===1?"y":"z",p=u[g],v=h[g],x=Vn.mapLinear(s.getComponent(m,y),p,v,f,d);a.setComponent(m,y,x)}c.getCenter(Vm).multiply(i.scale).applyQuaternion(i.quaternion),i.position.add(Vm),i.scale.x*=.5*(h.x-u.x)/d,i.scale.y*=.5*(h.y-u.y)/d,i.scale.z*=.5*(h.z-u.z)/d,n.position=a,i.geometry.boundingBox=null,i.geometry.boundingSphere=null,i.updateMatrixWorld()}var ld=class{constructor(i){this._options={generateNormals:!1,disableMipmaps:!0,compressIndex:!0,compressNormals:!1,compressUvs:!1,compressPosition:!1,uvType:Int8Array,normalType:Int8Array,positionType:Int16Array,...i},this.name="TILES_COMPRESSION_PLUGIN",this.priority=-100}processTileModel(i,e){let{generateNormals:t,disableMipmaps:n,compressIndex:s,compressUvs:r,compressNormals:a,compressPosition:o,uvType:l,normalType:c,positionType:u}=this._options;i.traverse(h=>{if(h.material&&n){let d=h.material;for(let f in d){let m=d[f];m&&m.isTexture&&m.generateMipmaps&&(m.generateMipmaps=!1,m.minFilter=Wt)}}if(h.geometry){let d=h.geometry,f=d.attributes;if(r){let{uv:m,uv1:y,uv2:g,uv3:p}=f;m&&(f.uv=va(m,l)),y&&(f.uv1=va(y,l)),g&&(f.uv2=va(g,l)),p&&(f.uv3=va(p,l))}if(t&&!f.normals&&d.computeVertexNormals(),a&&f.normals&&(f.normals=va(f.normals,c)),o&&PM(h,u),s&&d.index){let m=f.position.count,y=d.index,g=m>65535?Uint32Array:m>255?Uint16Array:Uint8Array;if(!(y.array instanceof g)){let p=new g(d.index.count);p.set(y.array);let v=new Be(p,1);d.setIndex(v)}}}})}};function Dt(i,e,t){return i&&e in i?i[e]:t}function ag(i){return i!=="BOOLEAN"&&i!=="STRING"&&i!=="ENUM"}function IM(i){return/^FLOAT/.test(i)}function wa(i){return/^VEC/.test(i)}function Aa(i){return/^MAT/.test(i)}function og(i,e,t,n=null){return Aa(t)||wa(t)?n.fromArray(i,e):i[e]}function ad(i){let{type:e,componentType:t}=i;switch(e){case"SCALAR":return t==="INT64"?0n:0;case"VEC2":return new ue;case"VEC3":return new R;case"VEC4":return new Ze;case"MAT2":return new Xo;case"MAT3":return new Re;case"MAT4":return new te;case"BOOLEAN":return!1;case"STRING":return"";case"ENUM":return 0}}function Hm(i,e){if(e==null)return!1;switch(i){case"SCALAR":return typeof e=="number"||typeof e=="bigint";case"VEC2":return e.isVector2;case"VEC3":return e.isVector3;case"VEC4":return e.isVector4;case"MAT2":return e.isMatrix2;case"MAT3":return e.isMatrix3;case"MAT4":return e.isMatrix4;case"BOOLEAN":return typeof e=="boolean";case"STRING":return typeof e=="string";case"ENUM":return typeof e=="number"||typeof e=="bigint"}throw Error("ClassProperty: invalid type.")}function Ma(i,e=null){switch(i){case"INT8":return Int8Array;case"INT16":return Int16Array;case"INT32":return Int32Array;case"INT64":return BigInt64Array;case"UINT8":return Uint8Array;case"UINT16":return Uint16Array;case"UINT32":return Uint32Array;case"UINT64":return BigUint64Array;case"FLOAT32":return Float32Array;case"FLOAT64":return Float64Array}switch(e){case"BOOLEAN":return Uint8Array;case"STRING":return Uint8Array}throw Error("ClassProperty: invalid type.")}function LM(i,e=null){if(i.array){e=e&&Array.isArray(e)?e:[],e.length=i.count;for(let t=0,n=e.length;t<n;t++)e[t]=xl(i,e[t])}else e=xl(i,e);return e}function xl(i,e=null){let t=i.default,n=i.type;if(e||=ad(i),t===null){switch(n){case"SCALAR":return 0;case"VEC2":return e.set(0,0);case"VEC3":return e.set(0,0,0);case"VEC4":return e.set(0,0,0,0);case"MAT2":return e.identity();case"MAT3":return e.identity();case"MAT4":return e.identity();case"BOOLEAN":return!1;case"STRING":return"";case"ENUM":return""}throw Error("ClassProperty: invalid type.")}if(Aa(n))e.fromArray(t);else if(wa(n))e.fromArray(t);else return t}function DM(i,e){if(i.noData===null)return e;let t=i.noData,n=i.type;if(Array.isArray(e))for(let a=0,o=e.length;a<o;a++)e[a]=s(e[a]);else e=s(e);return e;function s(a){return r(a)&&(a=xl(i,a)),a}function r(a){if(Aa(n)){let o=a.elements;for(let l=0,c=t.length;l<c;l++)if(t[l]!==o[l])return!1;return!0}if(wa(n)){for(let o=0,l=t.length;o<l;o++)if(t[o]!==a.getComponent(o))return!1;return!0}return t===a}}function UM(i,e){switch(i){case"INT8":return Math.max(e/127,-1);case"INT16":return Math.max(e,32767,-1);case"INT32":return Math.max(e/2147483647,-1);case"INT64":return Math.max(Number(e)/9223372036854776e3,-1);case"UINT8":return e/255;case"UINT16":return e/65535;case"UINT32":return e/4294967295;case"UINT64":return Number(e)/18446744073709552e3}}function NM(i,e){let{type:t,componentType:n,scale:s,offset:r,normalized:a}=i;if(Array.isArray(e))for(let h=0,d=e.length;h<d;h++)e[h]=o(e[h]);else e=o(e);return e;function o(h){return h=Aa(t)?c(h):wa(t)?l(h):u(h),h}function l(h){return h.x=u(h.x),h.y=u(h.y),"z"in h&&(h.z=u(h.z)),"w"in h&&(h.w=u(h.w)),h}function c(h){let d=h.elements;for(let f=0,m=d.length;f<m;f++)d[f]=u(d[f]);return h}function u(h){return a&&(h=UM(n,h)),(a||IM(n))&&(h=h*s+r),h}}function cd(i,e,t=null){if(i.array){Array.isArray(e)||(e=Array(i.count||0)),e.length=t===null?i.count:t;for(let n=0,s=e.length;n<s;n++)Hm(i.type,e[n])||(e[n]=ad(i))}else Hm(i.type,e)||(e=ad(i));return e}function vl(i,e){for(let t in e)t in i||delete e[t];for(let t in i){let n=i[t];e[t]=cd(n,e[t])}}function OM(i){switch(i){case"ENUM":return 1;case"SCALAR":return 1;case"VEC2":return 2;case"VEC3":return 3;case"VEC4":return 4;case"MAT2":return 4;case"MAT3":return 9;case"MAT4":return 16;case"BOOLEAN":return-1;case"STRING":return-1;default:return-1}}var Sl=class{constructor(i,e,t=null){this.name=e.name||null,this.description=e.description||null,this.type=e.type,this.componentType=e.componentType||null,this.enumType=e.enumType||null,this.array=e.array||!1,this.count=e.count||0,this.normalized=e.normalized||!1,this.offset=e.offset||0,this.scale=Dt(e,"scale",1),this.max=Dt(e,"max",1/0),this.min=Dt(e,"min",-1/0),this.required=e.required||!1,this.noData=Dt(e,"noData",null),this.default=Dt(e,"default",null),this.semantic=Dt(e,"semantic",null),this.enumSet=null,this.accessorProperty=t,t&&(this.offset=Dt(t,"offset",this.offset),this.scale=Dt(t,"scale",this.scale),this.max=Dt(t,"max",this.max),this.min=Dt(t,"min",this.min)),e.type==="ENUM"&&(this.enumSet=i[this.enumType],this.componentType===null&&(this.componentType=Dt(this.enumSet,"valueType","UINT16")))}shapeToProperty(i,e=null){return cd(this,i,e)}resolveDefaultElement(i){return xl(this,i)}resolveDefault(i){return LM(this,i)}resolveNoData(i){return DM(this,i)}resolveEnumsToStrings(i){let e=this.enumSet;if(this.type==="ENUM")if(Array.isArray(i))for(let n=0,s=i.length;n<s;n++)i[n]=t(i[n]);else i=t(i);return i;function t(n){let s=e.values.find(r=>r.value===n);return s===null?"":s.name}}adjustValueScaleOffset(i){return ag(this.type)?NM(this,i):i}},hd=class{constructor(i,e={},t={},n=null){this.definition=i,this.class=e[i.class],this.className=i.class,this.enums=t,this.data=n,this.name="name"in i?i.name:null,this.properties=null}getPropertyNames(){return Object.keys(this.class.properties)}includesData(i){return!!this.definition.properties[i]}dispose(){}_initProperties(i=Sl){let e={};for(let t in this.class.properties)e[t]=new i(this.enums,this.class.properties[t],this.definition.properties[t]);this.properties=e}},BM=class extends Sl{constructor(i,e,t=null){super(i,e,t),this.attribute=t?.attribute??null}},FM=class extends hd{constructor(...i){super(...i),this.isPropertyAttributeAccessor=!0,this._initProperties(BM)}getData(i,e,t={}){let n=this.properties;vl(n,t);for(let s in n)t[s]=this.getPropertyValue(s,i,e,t[s]);return t}getPropertyValue(i,e,t,n=null){if(e>=this.count)throw Error("PropertyAttributeAccessor: Requested index is outside the range of the buffer.");let s=this.properties[i],r=s.type;if(!s)throw Error("PropertyAttributeAccessor: Requested class property does not exist.");if(!this.definition.properties[i])return s.resolveDefault(n);n=s.shapeToProperty(n);let a=t.getAttribute(s.attribute.toLowerCase());if(Aa(r)){let o=n.elements;for(let l=o.length;0<l;)o[0]=a.getComponent(e,0)}else if(wa(r))n.fromBufferAttribute(a,e);else if(r==="SCALAR"||r==="ENUM")n=a.getX(e);else throw Error("StructuredMetadata.PropertyAttributeAccessor: BOOLEAN and STRING types are not supported by property attributes.");return n=s.adjustValueScaleOffset(n),n=s.resolveEnumsToStrings(n),n=s.resolveNoData(n),n}},zM=class extends Sl{constructor(i,e,t=null){super(i,e,t),this.values=t?.values??null,this.valueLength=OM(this.type),this.arrayOffsets=Dt(t,"arrayOffsets",null),this.stringOffsets=Dt(t,"stringOffsets",null),this.arrayOffsetType=Dt(t,"arrayOffsetType","UINT32"),this.stringOffsetType=Dt(t,"stringOffsetType","UINT32")}getArrayLengthFromId(i,e){let t=this.count;if(this.arrayOffsets!==null){let{arrayOffsets:n,arrayOffsetType:s}=this,r=new(Ma(s))(i[n]);t=r[e+1]-r[e]}return t}getIndexOffsetFromId(i,e){let t=e;if(this.arrayOffsets){let{arrayOffsets:n,arrayOffsetType:s}=this;t=new(Ma(s))(i[n])[t]}else this.array&&(t*=this.count);return t}},kM=class extends hd{constructor(...i){super(...i),this.isPropertyTableAccessor=!0,this.count=this.definition.count,this._initProperties(zM)}getData(i,e={}){let t=this.properties;vl(t,e);for(let n in t)e[n]=this.getPropertyValue(n,i,e[n]);return e}_readValueAtIndex(i,e,t,n=null){let s=this.properties[i],{componentType:r,type:a}=s,o=this.data,l=o[s.values],c=new(Ma(r,a))(l),u=s.getIndexOffsetFromId(o,e);if(ag(a)||a==="ENUM")return og(c,(u+t)*s.valueLength,a,n);if(a==="STRING"){let h=u+t,d=0;if(s.stringOffsets!==null){let{stringOffsets:m,stringOffsetType:y}=s,g=new(Ma(y))(o[m]);d=g[h+1]-g[h],h=g[h]}let f=new Uint8Array(c.buffer,h,d);n=new TextDecoder().decode(f)}else if(a==="BOOLEAN"){let h=u+t,d=Math.floor(h/8),f=h%8;n=(c[d]>>f&1)==1}return n}getPropertyValue(i,e,t=null){if(e>=this.count)throw Error("PropertyTableAccessor: Requested index is outside the range of the table.");let n=this.properties[i];if(!n)throw Error("PropertyTableAccessor: Requested property does not exist.");if(!this.definition.properties[i])return n.resolveDefault(t);let s=n.array,r=this.data,a=n.getArrayLengthFromId(r,e);if(t=n.shapeToProperty(t,a),s)for(let o=0,l=t.length;o<l;o++)t[o]=this._readValueAtIndex(i,e,o,t[o]);else t=this._readValueAtIndex(i,e,0,t);return t=n.adjustValueScaleOffset(t),t=n.resolveEnumsToStrings(t),t=n.resolveNoData(t),t}},ba=new qo,Gm=class{constructor(){this._renderer=new nr,this._target=new Ti(1,1),this._texTarget=new Ti,this._quad=new xa(new yi({blending:Wh,blendDst:Xh,blendSrc:qh,uniforms:{map:{value:null},pixel:{value:new ue}},vertexShader:`
				void main() {

					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				uniform ivec2 pixel;

				void main() {

					gl_FragColor = texelFetch( map, pixel, 0 );

				}
			`}))}increaseSizeTo(i){this._target.setSize(Math.max(this._target.width,i),1)}readDataAsync(i){let{_renderer:e,_target:t}=this;return e.readRenderTargetPixelsAsync(t,0,0,i.length/4,1,i)}readData(i){let{_renderer:e,_target:t}=this;e.readRenderTargetPixels(t,0,0,i.length/4,1,i)}renderPixelToTarget(i,e,t){let{_renderer:n,_target:s}=this;ba.min.copy(e),ba.max.copy(e),ba.max.x+=1,ba.max.y+=1,n.initRenderTarget(s),n.copyTextureToTexture(i,s.texture,ba,t,0)}},Zn=new class{constructor(){let i=null;Object.getOwnPropertyNames(Gm.prototype).forEach(e=>{e!=="constructor"&&(this[e]=(...t)=>(i||=new Gm,i[e](...t)))})}},Wm=new ue,Xm=new ue,qm=new ue;function VM(i,e){return e===0?i.getAttribute("uv"):i.getAttribute(`uv${e}`)}function lg(i,e,t=[,,,]){let n=3*e,s=3*e+1,r=3*e+2;return i.index&&(n=i.index.getX(n),s=i.index.getX(s),r=i.index.getX(r)),t[0]=n,t[1]=s,t[2]=r,t}function cg(i,e,t,n,s){let[r,a,o]=n,l=VM(i,e);Wm.fromBufferAttribute(l,r),Xm.fromBufferAttribute(l,a),qm.fromBufferAttribute(l,o),s.set(0,0,0).addScaledVector(Wm,t.x).addScaledVector(Xm,t.y).addScaledVector(qm,t.z)}function hg(i,e,t,n){let s=i.x-Math.floor(i.x),r=i.y-Math.floor(i.y),a=Math.floor(s*e%e),o=Math.floor(r*t%t);return n.set(a,o),n}var Ym=new ue,jm=new ue,Zm=new ue,HM=class extends Sl{constructor(i,e,t=null){super(i,e,t),this.channels=Dt(t,"channels",[0]),this.index=Dt(t,"index",null),this.texCoord=Dt(t,"texCoord",null),this.valueLength=parseInt(this.type.replace(/[^0-9]/g,""))||1}readDataFromBuffer(i,e,t=null){let n=this.type;if(n==="BOOLEAN"||n==="STRING")throw Error("PropertyTextureAccessor: BOOLEAN and STRING types not supported.");return og(i,e*this.valueLength,n,t)}},GM=class extends hd{constructor(...i){super(...i),this.isPropertyTextureAccessor=!0,this._asyncRead=!1,this._initProperties(HM)}getData(i,e,t,n={}){let s=this.properties;vl(s,n);let r=Object.keys(s),a=r.map(o=>n[o]);return this.getPropertyValuesAtTexel(r,i,e,t,a),r.forEach((o,l)=>n[o]=a[l]),n}async getDataAsync(i,e,t,n={}){let s=this.properties;vl(s,n);let r=Object.keys(s),a=r.map(o=>n[o]);return await this.getPropertyValuesAtTexelAsync(r,i,e,t,a),r.forEach((o,l)=>n[o]=a[l]),n}getPropertyValuesAtTexelAsync(...i){this._asyncRead=!0;let e=this.getPropertyValuesAtTexel(...i);return this._asyncRead=!1,e}getPropertyValuesAtTexel(i,e,t,n,s=[]){for(;s.length<i.length;)s.push(null);s.length=i.length,Zn.increaseSizeTo(s.length);let r=this.data,a=this.definition.properties,o=this.properties,l=lg(n,e);for(let h=0,d=i.length;h<d;h++){let f=i[h];if(!a[f])continue;let m=o[f],y=r[m.index];cg(n,m.texCoord,t,l,Ym),hg(Ym,y.image.width,y.image.height,jm),Zm.set(h,0),Zn.renderPixelToTarget(y,jm,Zm)}let c=new Uint8Array(i.length*4);return this._asyncRead?Zn.readDataAsync(c).then(()=>(u.call(this),s)):(Zn.readData(c),u.call(this),s);function u(){for(let h=0,d=i.length;h<d;h++){let f=i[h],m=o[f],y=m.type;if(s[h]=cd(m,s[h]),!m)throw Error("PropertyTextureAccessor: Requested property does not exist.");if(!a[f]){s[h]=m.resolveDefault(s);continue}let g=m.valueLength*(m.count||1),p=m.channels.map(_=>c[4*h+_]),v=m.componentType,x=new(Ma(v,y))(g);if(new Uint8Array(x.buffer).set(p),m.array){let _=s[h];for(let w=0,M=_.length;w<M;w++)_[w]=m.readDataFromBuffer(x,w,_[w])}else s[h]=m.readDataFromBuffer(x,0,s[h]);s[h]=m.adjustValueScaleOffset(s[h]),s[h]=m.resolveEnumsToStrings(s[h]),s[h]=m.resolveNoData(s[h])}}}dispose(){this.data.forEach(i=>{i&&(i.dispose(),i.image instanceof ImageBitmap&&i.image.close())})}},od=class{constructor(i,e,t,n=null,s=null){let{schema:r,propertyTables:a=[],propertyTextures:o=[],propertyAttributes:l=[]}=i,{enums:c,classes:u}=r,h=a.map(m=>new kM(m,u,c,t)),d=[],f=[];n&&(n.propertyTextures&&(d=n.propertyTextures.map(m=>new GM(o[m],u,c,e))),n.propertyAttributes&&(f=n.propertyAttributes.map(m=>new FM(l[m],u,c)))),this.schema=r,this.tableAccessors=h,this.textureAccessors=d,this.attributeAccessors=f,this.object=s,this.textures=e,this.nodeMetadata=n}getPropertyTableData(i,e,t=null){if(!Array.isArray(i))t||={},t=this.tableAccessors[i].getData(e,t);else{t||=[];let n=Math.min(i.length,e.length);t.length=n;for(let s=0;s<n;s++){let r=this.tableAccessors[i[s]];t[s]=r.getData(e[s],t[s])}}if(Array.isArray(i)!==Array.isArray(t)||Array.isArray(i)!==Array.isArray(e))throw Error("StructuralMetadata: Scalar and array inputs cannot be mixed.");return t}getPropertyTableInfo(i=null){if(i===null&&(i=this.tableAccessors.map((e,t)=>t)),Array.isArray(i))return i.map(e=>{let t=this.tableAccessors[e];return{name:t.name,className:t.definition.class}});{let e=this.tableAccessors[i];return{name:e.name,className:e.definition.class}}}getPropertyTextureData(i,e,t=[]){let n=this.textureAccessors;t.length=n.length;for(let s=0;s<n.length;s++){let r=n[s];t[s]=r.getData(i,e,this.object.geometry,t[s])}return t}async getPropertyTextureDataAsync(i,e,t=[]){let n=this.textureAccessors;t.length=n.length;let s=[];for(let r=0;r<n.length;r++){let a=n[r].getDataAsync(i,e,this.object.geometry,t[r]).then(o=>{t[r]=o});s.push(a)}return await Promise.all(s),t}getPropertyTextureInfo(){return this.textureAccessors}getPropertyAttributeData(i,e=[]){let t=this.attributeAccessors;e.length=t.length;for(let n=0;n<t.length;n++){let s=t[n];e[n]=s.getData(i,this.object.geometry,e[n])}return e}getPropertyAttributeInfo(){return this.attributeAccessors.map(i=>({name:i.name,className:i.definition.class}))}dispose(){this.textureAccessors.forEach(i=>i.dispose()),this.tableAccessors.forEach(i=>i.dispose()),this.attributeAccessors.forEach(i=>i.dispose())}},Sa="EXT_structural_metadata";function WM(i,e=[]){let t=i.json.textures?.length||0,n=Array(t).fill(null);return e.forEach(({properties:s})=>{for(let r in s){let{index:a}=s[r];n[a]===null&&(n[a]=i.loadTexture(a))}}),Promise.all(n)}function XM(i,e=[]){let t=i.json.bufferViews?.length||0,n=Array(t).fill(null);return e.forEach(({properties:s})=>{for(let r in s){let{values:a,arrayOffsets:o,stringOffsets:l}=s[r];n[a]===null&&(n[a]=i.getDependency("bufferView",a)),n[o]===null&&(n[o]=i.getDependency("bufferView",o)),n[l]===null&&(n[l]=i.getDependency("bufferView",l))}}),Promise.all(n)}var ug=class{constructor(i){this.parser=i,this.name=Sa}async afterRoot({scene:i,parser:e}){let t=e.json.extensionsUsed;if(!t||!t.includes(Sa))return;let n=null,s=e.json.extensions[Sa];if(s.schemaUri){let{manager:l,path:c,requestHeader:u,crossOrigin:h}=e.options,d=new URL(s.schemaUri,c).toString(),f=new Yi(l);f.setCrossOrigin(h),f.setResponseType("json"),f.setRequestHeader(u),n=f.loadAsync(d).then(m=>{s={...s,schema:m}})}let[r,a]=await Promise.all([WM(e,s.propertyTextures),XM(e,s.propertyTables),n]),o=new od(s,r,a);i.userData.structuralMetadata=o,i.traverse(l=>{if(e.associations.has(l)){let{meshes:c,primitives:u}=e.associations.get(l),h=e.json.meshes[c]?.primitives[u];if(h&&h.extensions&&h.extensions[Sa]){let d=h.extensions[Sa];l.userData.structuralMetadata=new od(s,r,a,d,l)}else l.userData.structuralMetadata=o}})}},$m=new ue,Km=new ue,Jm=new ue;function qM(i){return i.x>i.y&&i.x>i.z?0:i.y>i.z?1:2}var dg=class{constructor(i,e,t){this.geometry=i,this.textures=e,this.data=t,this._asyncRead=!1,this.featureIds=t.featureIds.map(n=>{let{texture:s,...r}=n,a={label:null,propertyTable:null,nullFeatureId:null,...r};return s&&(a.texture={texCoord:0,channels:[0],...s}),a})}getTextures(){return this.textures}getFeatureInfo(){return this.featureIds}getFeaturesAsync(...i){this._asyncRead=!0;let e=this.getFeatures(...i);return this._asyncRead=!1,e}getFeatures(i,e){let{geometry:t,textures:n,featureIds:s}=this,r=Array(s.length).fill(null),a=s.length;Zn.increaseSizeTo(a);let o=lg(t,i),l=o[qM(e)];for(let h=0,d=s.length;h<d;h++){let f=s[h],m="nullFeatureId"in f?f.nullFeatureId:null;if("texture"in f){let y=n[f.texture.index];cg(t,f.texture.texCoord,e,o,$m),hg($m,y.image.width,y.image.height,Km),Jm.set(h,0),Zn.renderPixelToTarget(n[f.texture.index],Km,Jm)}else if("attribute"in f){let y=t.getAttribute(`_feature_id_${f.attribute}`).getX(l);y!==m&&(r[h]=y)}else{let y=l;y!==m&&(r[h]=y)}}let c=new Uint8Array(a*4);return this._asyncRead?Zn.readDataAsync(c).then(()=>(u(),r)):(Zn.readData(c),u(),r);function u(){let h=new Uint32Array(1);for(let d=0,f=s.length;d<f;d++){let m=s[d],y="nullFeatureId"in m?m.nullFeatureId:null;if("texture"in m){let{channels:g}=m.texture,p=g.map(x=>c[4*d+x]);new Uint8Array(h.buffer).set(p);let v=h[0];v!==y&&(r[d]=v)}}}}dispose(){this.textures.forEach(i=>{i&&(i.dispose(),i.image instanceof ImageBitmap&&i.image.close())})}},bl="EXT_mesh_features";function Qm(i,e,t){i.traverse(n=>{if(e.associations.has(n)){let{meshes:s,primitives:r}=e.associations.get(n),a=e.json.meshes[s]?.primitives[r];a&&a.extensions&&a.extensions[bl]&&t(n,a.extensions[bl])}})}var fg=class{constructor(i){this.parser=i,this.name=bl}async afterRoot({scene:i,parser:e}){let t=e.json.extensionsUsed;if(!t||!t.includes(bl))return;let n=e.json.textures?.length||0,s=Array(n).fill(null);Qm(i,e,(a,{featureIds:o})=>{o.forEach(l=>{if(l.texture&&s[l.texture.index]===null){let c=l.texture.index;s[c]=e.loadTexture(c)}})});let r=await Promise.all(s);Qm(i,e,(a,o)=>{a.userData.meshFeatures=new dg(a.geometry,r,o)})}},pg=class{constructor(){this.name="CESIUM_RTC"}afterRoot(i){if(i.parser.json.extensions&&i.parser.json.extensions.CESIUM_RTC){let{center:e}=i.parser.json.extensions.CESIUM_RTC;e&&(i.scene.position.x+=e[0],i.scene.position.y+=e[1],i.scene.position.z+=e[2])}}},ud=class{constructor(i){i={metadata:!0,rtc:!0,plugins:[],dracoLoader:null,ktxLoader:null,meshoptDecoder:null,autoDispose:!0,...i},this.tiles=null,this.metadata=i.metadata,this.rtc=i.rtc,this.plugins=i.plugins,this.dracoLoader=i.dracoLoader,this.ktxLoader=i.ktxLoader,this.meshoptDecoder=i.meshoptDecoder,this._gltfRegex=/\.(gltf|glb)$/g,this._dracoRegex=/\.drc$/g,this._loader=null}init(i){let e=new Xn(i.manager);this.dracoLoader&&(e.setDRACOLoader(this.dracoLoader),i.manager.addHandler(this._dracoRegex,this.dracoLoader)),this.ktxLoader&&e.setKTX2Loader(this.ktxLoader),this.meshoptDecoder&&e.setMeshoptDecoder(this.meshoptDecoder),this.rtc&&e.register(()=>new pg),this.metadata&&(e.register(()=>new ug),e.register(()=>new fg)),this.plugins.forEach(t=>e.register(t)),i.manager.addHandler(this._gltfRegex,e),this.tiles=i,this._loader=e}dispose(){this.tiles.manager.removeHandler(this._gltfRegex),this.tiles.manager.removeHandler(this._dracoRegex),this.autoDispose&&(this.ktxLoader.dispose(),this.dracoLoader.dispose())}},_l=new _t,dd=class{constructor(i){i={up:"+z",recenter:!0,lat:null,lon:null,height:0,azimuth:0,elevation:0,roll:0,...i},this.tiles=null,this.up=i.up.toLowerCase().replace(/\s+/,""),this.lat=i.lat,this.lon=i.lon,this.height=i.height,this.azimuth=i.azimuth,this.elevation=i.elevation,this.roll=i.roll,this.recenter=i.recenter,this._callback=null}init(i){this.tiles=i,this._callback=()=>{let{up:e,lat:t,lon:n,height:s,azimuth:r,elevation:a,roll:o,recenter:l}=this;if(t!==null&&n!==null)this.transformLatLonHeightToOrigin(t,n,s,r,a,o);else{let{ellipsoid:c}=i,u=Math.min(...c.radius);if(i.getBoundingSphere(_l),_l.center.length()>u*.5){let h={};c.getPositionToCartographic(_l.center,h),this.transformLatLonHeightToOrigin(h.lat,h.lon,h.height)}else{let h=i.group;switch(h.rotation.set(0,0,0),e){case"x":case"+x":h.rotation.z=Math.PI/2;break;case"-x":h.rotation.z=-Math.PI/2;break;case"y":case"+y":break;case"-y":h.rotation.z=Math.PI;break;case"z":case"+z":h.rotation.x=-Math.PI/2;break;case"-z":h.rotation.x=Math.PI/2}i.group.position.copy(_l.center).applyEuler(h.rotation).multiplyScalar(-1)}}l||i.group.position.setScalar(0),i.removeEventListener("load-root-tileset",this._callback)},i.addEventListener("load-root-tileset",this._callback),i.root&&this._callback()}transformLatLonHeightToOrigin(i,e,t=0,n=0,s=0,r=0){let{group:a,ellipsoid:o}=this.tiles;o.getObjectFrame(i,e,t,n,s,r,a.matrix,2),a.matrix.invert().decompose(a.position,a.quaternion,a.scale),a.updateMatrixWorld()}dispose(){let{group:i}=this.tiles;i.position.setScalar(0),i.quaternion.identity(),i.scale.set(1,1,1),this.tiles.removeEventListener("load-root-tileset",this._callback)}},fd=class{set delay(i){this.deferCallbacks.delay=i}get delay(){return this.deferCallbacks.delay}set bytesTarget(i){this.lruCache.minBytesSize=i}get bytesTarget(){return this.lruCache.minBytesSize}get estimatedGpuBytes(){return this.lruCache.cachedBytes}constructor(i={}){let{delay:e=0,bytesTarget:t=0}=i;this.name="UNLOAD_TILES_PLUGIN",this.tiles=null,this.lruCache=new au,this.deferCallbacks=new YM,this.delay=e,this.bytesTarget=t}init(i){this.tiles=i;let{lruCache:e,deferCallbacks:t}=this,n=s=>{let r=s.engineData.scene;i.visibleTiles.has(s)||i.invokeOnePlugin(a=>a.unloadTileFromGPU&&a.unloadTileFromGPU(r,s))};this._onUpdateBefore=()=>{e.unloadPriorityCallback=i.lruCache.unloadPriorityCallback,e.minSize=1/0,e.maxSize=1/0,e.maxBytesSize=1/0,e.unloadPercent=1,e.autoMarkUnused=!1},this._onVisibilityChangeCallback=({tile:s,scene:r,visible:a})=>{a?(e.add(s,n),e.setMemoryUsage(s,i.calculateBytesUsed(s,r)||1),e.markUsed(s),i.markTileUsed(s),t.cancel(s)):t.run(s)},this._onDisposeModel=({tile:s})=>{e.remove(s),t.cancel(s)},t.callback=s=>{e.markUnused(s),e.scheduleUnload()},i.forEachLoadedModel((s,r)=>{let a=i.visibleTiles.has(r);this._onVisibilityChangeCallback({tile:r,visible:a})}),i.addEventListener("tile-visibility-change",this._onVisibilityChangeCallback),i.addEventListener("update-before",this._onUpdateBefore),i.addEventListener("dispose-model",this._onDisposeModel)}unloadTileFromGPU(i,e){i&&i.traverse(t=>{if(t.material){let n=t.material;n.dispose();for(let s in n){let r=n[s];r&&r.isTexture&&r.dispose()}}t.geometry&&t.geometry.dispose()})}dispose(){let{lruCache:i,tiles:e,deferCallbacks:t}=this;e.removeEventListener("tile-visibility-change",this._onVisibilityChangeCallback),e.removeEventListener("update-before",this._onUpdateBefore),e.removeEventListener("dispose-model",this._onDisposeModel),t.cancelAll(),i.minBytesSize=0,i.minSize=0,i.maxSize=0,i.markAllUnused(),i.scheduleUnload()}},YM=class{constructor(i=()=>{}){this.map=new Map,this.callback=i,this.delay=0}run(i){let{map:e,delay:t}=this;if(e.has(i))throw Error("DeferCallbackManager: Callback already initialized.");t===0?this.callback(i):e.set(i,setTimeout(()=>{this.callback(i),e.delete(i)},t))}cancel(i){let{map:e}=this;e.has(i)&&(clearTimeout(e.get(i)),e.delete(i))}cancelAll(){this.map.forEach((i,e)=>{this.cancel(e)})}},rd=Symbol("FADE_PARAMS");function mg(i,e){if(i[rd])return i[rd];let t={fadeIn:{value:0},fadeOut:{value:0},fadeTexture:{value:null}};return i[rd]=t,i.defines={...i.defines||{},FEATURE_FADE:0},i.onBeforeCompile=n=>{e&&e(n),n.uniforms={...n.uniforms,...t},n.vertexShader=n.vertexShader.replace(/void\s+main\(\)\s+{/,s=>`
					#ifdef USE_BATCHING_FRAG

					varying float vBatchId;

					#endif

					${s}

						#ifdef USE_BATCHING_FRAG

						// add 0.5 to the value to avoid floating error that may cause flickering
						vBatchId = getIndirectIndex( gl_DrawID ) + 0.5;

						#endif
				`),n.fragmentShader=n.fragmentShader.replace(/void main\(/,s=>`
				#if FEATURE_FADE

				// adapted from https://www.shadertoy.com/view/Mlt3z8
				float bayerDither2x2( vec2 v ) {

					return mod( 3.0 * v.y + 2.0 * v.x, 4.0 );

				}

				float bayerDither4x4( vec2 v ) {

					vec2 P1 = mod( v, 2.0 );
					vec2 P2 = floor( 0.5 * mod( v, 4.0 ) );
					return 4.0 * bayerDither2x2( P1 ) + bayerDither2x2( P2 );

				}

				// the USE_BATCHING define is not available in fragment shaders
				#ifdef USE_BATCHING_FRAG

				// functions for reading the fade state of a given batch id
				uniform sampler2D fadeTexture;
				varying float vBatchId;
				vec2 getFadeValues( const in float i ) {

					int size = textureSize( fadeTexture, 0 ).x;
					int j = int( i );
					int x = j % size;
					int y = j / size;
					return texelFetch( fadeTexture, ivec2( x, y ), 0 ).rg;

				}

				#else

				uniform float fadeIn;
				uniform float fadeOut;

				#endif

				#endif

				${s}
			`).replace(/#include <dithering_fragment>/,s=>`

				${s}

				#if FEATURE_FADE

				#ifdef USE_BATCHING_FRAG

				vec2 fadeValues = getFadeValues( vBatchId );
				float fadeIn = fadeValues.r;
				float fadeOut = fadeValues.g;

				#endif

				float bayerValue = bayerDither4x4( floor( mod( gl_FragCoord.xy, 4.0 ) ) );
				float bayerBins = 16.0;
				float dither = ( 0.5 + bayerValue ) / bayerBins;
				if ( dither >= fadeIn ) {

					discard;

				}

				if ( dither < fadeOut ) {

					discard;

				}

				#endif

			`)},t}var jM=class{constructor(){this._fadeParams=new WeakMap,this.fading=0}setFade(i,e,t){if(!i)return;let n=this._fadeParams;i.traverse(s=>{let r=s.material;if(r&&n.has(r)){let a=n.get(r);a.fadeIn.value=e,a.fadeOut.value=t;let o=+(e!==0&&e!==1||t!==0&&t!==1);r.defines.FEATURE_FADE!==o&&(this.fading+=o===1?1:-1,r.defines.FEATURE_FADE=o,r.needsUpdate=!0)}})}prepareScene(i){i.traverse(e=>{e.material&&this.prepareMaterial(e.material)})}deleteScene(i){if(!i)return;this.setFade(i,1,0);let e=this._fadeParams;i.traverse(t=>{let n=t.material;n&&e.delete(n)})}prepareMaterial(i){let e=this._fadeParams;e.has(i)||e.set(i,mg(i,i.onBeforeCompile))}},ZM=class{constructor(i,e=new gi){this.other=i,this.material=e,this.visible=!0,this.parent=null,this._instanceInfo=[],this._visibilityChanged=!0;let t=new Proxy(this,{get(n,s){if(s in n)return n[s];{let r=i[s];return r instanceof Function?(...a)=>(n.syncInstances(),r.call(t,...a)):i[s]}},set(n,s,r){return s in n?n[s]=r:i[s]=r,!0},deleteProperty(n,s){return s in n?delete n[s]:delete i[s]}});return t}syncInstances(){let i=this._instanceInfo,e=this.other._instanceInfo;for(;e.length>i.length;){let t=i.length;i.push(new Proxy({visible:!1},{get(n,s){return s in n?n[s]:e[t][s]},set(n,s,r){return s in n?n[s]=r:e[t][s]=r,!0}}))}}},$M=class extends ZM{constructor(...i){super(...i);let e=this.material,t=mg(e,e.onBeforeCompile);e.defines.FEATURE_FADE=1,e.defines.USE_BATCHING_FRAG=1,e.needsUpdate=!0,this.fadeTexture=null,this._fadeParams=t}setFadeAt(i,e,t){this._initFadeTexture(),this.fadeTexture.setValueAt(i,e*255,t*255)}_initFadeTexture(){let i=Math.sqrt(this._maxInstanceCount);i=Math.ceil(i);let e=i*i*2,t=this.fadeTexture;if(!t||t.image.data.length!==e){let n=new KM(new Uint8Array(e),i,i,$o,Bi);if(t){t.dispose();let s=t.image.data,r=this.fadeTexture.image.data,a=Math.min(s.length,r.length);r.set(new s.constructor(s.buffer,0,a))}this.fadeTexture=n,this._fadeParams.fadeTexture.value=n,n.needsUpdate=!0}}dispose(){this.fadeTexture&&this.fadeTexture.dispose()}},KM=class extends Xi{setValueAt(i,...e){let{data:t,width:n,height:s}=this.image,r=Math.floor(t.length/(n*s)),a=!1;for(let o=0;o<r;o++){let l=i*r+o,c=t[l],u=e[o]||0;c!==u&&(t[l]=u,a=!0)}a&&(this.needsUpdate=!0)}},eg=new R,tg=new R,ig=new Ot,ng=new Ot,sg=new R,pd=class extends nd{constructor(i){super(i),this.batchedMesh=null,this._fadeMaterialManager=new jM,this._prevCameraTransforms=null}init(i){this._prevCameraTransforms=new Map,i.cameras.forEach(e=>{this._prevCameraTransforms.set(e,new te)}),super.init(i),this._onAddCamera=({camera:e})=>{this._prevCameraTransforms.set(e,new te)},this._onDeleteCamera=({camera:e})=>{this._prevCameraTransforms.delete(e)},this._onTileVisibilityChange=({tile:e})=>{this.forEachBatchIds(e,(t,n,s)=>{n.setFadeAt(t,0,0),n.setVisibleAt(t,!1),s.batchedMesh.setVisibleAt(t,!1)})},i.addEventListener("add-camera",this._onAddCamera),i.addEventListener("delete-camera",this._onDeleteCamera),i.addEventListener("tile-visibility-change",this._onTileVisibilityChange)}prepareTileScene(i){this._fadeMaterialManager.prepareScene(i)}releaseTileScene(i){this._fadeMaterialManager.deleteScene(i)}setFadeState(i,e,t){let n=i.engineData?.scene;n&&this._fadeMaterialManager.setFade(n,e,t),this.forEachBatchIds(i,(s,r,a)=>{r.setFadeAt(s,e,t),r.setVisibleAt(s,!0),a.batchedMesh.setVisibleAt(s,!1)})}resetFadeState(i,e){this._fadeMaterialManager.setFade(i.engineData?.scene,0,0),this.forEachBatchIds(i,(t,n,s)=>{n.setFadeAt(t,0,0),n.setVisibleAt(t,!1),s.batchedMesh.setVisibleAt(t,e)})}updateCameraState(i){let{cameras:e}=this.tiles,t=this._prevCameraTransforms,n=!0;return i&&e.forEach(s=>{if(!t.has(s))return;let r=s.matrixWorld,a=t.get(s);r.decompose(tg,ng,sg),a.decompose(eg,ig,sg),n&&=ng.angleTo(ig)>.25||tg.distanceTo(eg)>.1}),e.forEach(s=>{t.get(s).copy(s.matrixWorld)}),n}_updateAfter(){if(super._updateAfter(),this.batchedMesh){let i=this.tiles.getPluginByName("BATCHED_TILES_PLUGIN").batchedMesh.material;this.batchedMesh.material.map=i.map}}initBatchedMesh(){let i=this.tiles.getPluginByName("BATCHED_TILES_PLUGIN")?.batchedMesh;if(i){if(this.batchedMesh===null){this._onBatchedMeshDispose=()=>{this.batchedMesh.dispose(),this.batchedMesh.removeFromParent(),this.batchedMesh=null,i.removeEventListener("dispose",this._onBatchedMeshDispose)};let e=i.material.clone();e.onBeforeCompile=i.material.onBeforeCompile,this.batchedMesh=new $M(i,e),this.tiles.group.add(this.batchedMesh)}}else this.batchedMesh!==null&&(this._onBatchedMeshDispose(),this._onBatchedMeshDispose=null)}dispose(){let i=this.tiles;super.dispose(),this.batchedMesh!==null&&this._onBatchedMeshDispose(),i.removeEventListener("add-camera",this._onAddCamera),i.removeEventListener("delete-camera",this._onDeleteCamera),i.removeEventListener("tile-visibility-change",this._onTileVisibilityChange),this._prevCameraTransforms=null}forEachBatchIds(i,e){if(this.initBatchedMesh(),this.batchedMesh){let t=this.tiles.getPluginByName("BATCHED_TILES_PLUGIN"),n=t.getTileBatchIds(i);n&&n.forEach(s=>e(s,this.batchedMesh,t))}}};var lA=new xa(new gi),JM=new Xi(new Uint8Array([255,255,255,255]),1,1);JM.needsUpdate=!0;var QM=0,eT=1,tT=2,iT=3,nT=4,sT=5,rT=6,aT=7,oT=8,lT=9,cT=10,hT=11,cA=Object.freeze({NONE:QM,SCREEN_ERROR:eT,GEOMETRIC_ERROR:tT,DISTANCE:iT,DEPTH:nT,RELATIVE_DEPTH:sT,IS_LEAF:rT,RANDOM_COLOR:aT,RANDOM_NODE_COLOR:oT,CUSTOM_COLOR:lT,LOAD_ORDER:cT,INDEXED_COLOR:hT});var hA=Math.PI/4,uA=3/5;var jn={NONE:0,NOT_READY:1,NO_FIT:2,DEPTH:3,OCCUPANCY:4,SPACING:5,ANGLE:6,FACING:7};var dA=new class{constructor(){this._cache={}}getColor(...i){let e=i.pop(),t=i.join("_"),{_cache:n}=this;return t in n||(e.setHSL(Math.random(),1,.5),n[t]=e.getHex()),e.set(n[t])}};var fA={[jn.NONE]:16777215,[jn.NOT_READY]:7829367,[jn.NO_FIT]:2250239,[jn.DEPTH]:4473924,[jn.OCCUPANCY]:65535,[jn.SPACING]:16776960,[jn.ANGLE]:16711680,[jn.FACING]:16711935};var pA=Math.PI/180;var mA=hr*Math.PI*2;var gA=hr*Math.PI*2;var md=new WeakMap,Ml=class extends Fi{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,s){let r=new Yi(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,a=>{this.parse(a,t,s)},n,s)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,gt,n).catch(n)}decodeDracoFile(e,t,n,s,r=Lt,a=()=>{}){let o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){let n=JSON.stringify(t);if(md.has(e)){let l=md.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let s,r=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(r,a).then(l=>(s=l,new Promise((c,u)=>{s._callbacks[r]={resolve:c,reject:u},s.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{s&&r&&this._releaseTask(s,r)}),md.set(e,{key:n,promise:o}),o}_createGeometry(e){let t=new xt;e.index&&t.setIndex(new Be(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let s=e.attributes[n],r=s.name,a=s.array,o=s.itemSize,l=new Be(a,o);r==="color"&&(this._assignVertexColorSpace(l,s.vertexColorSpace),l.normalized=!(a instanceof Float32Array)),t.setAttribute(r,l)}return t}_assignVertexColorSpace(e,t){if(t!==gt)return;let n=new Se;for(let s=0,r=e.count;s<r;s++)n.fromBufferAttribute(e,s),ze.toWorkingColorSpace(n,gt),e.setXYZ(s,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new Yi(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((s,r)=>{n.load(e,s,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let s=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let r=uT.toString(),a=["/* draco decoder */",s,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let s=new Worker(this.workerSourceURL);s._callbacks={},s._taskCosts={},s._taskLoad=0,s.postMessage({type:"init",decoderConfig:this.decoderConfig}),s.onmessage=function(r){let a=r.data;switch(a.type){case"decode":s._callbacks[a.id].resolve(a);break;case"error":s._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(s)}else this.workerPool.sort(function(s,r){return s._taskLoad>r._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function uT(){let i,e;onmessage=function(a){let o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(u){i.onModuleLoaded=function(h){u({draco:h})},DracoDecoderModule(i)});break;case"decode":let l=o.buffer,c=o.taskConfig;e.then(u=>{let h=u.draco,d=new h.Decoder;try{let f=t(h,d,new Int8Array(l),c),m=f.attributes.map(y=>y.array.buffer);f.index&&m.push(f.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:f},m)}catch(f){console.error(f),self.postMessage({type:"error",id:o.id,error:f.message})}finally{h.destroy(d)}});break}};function t(a,o,l,c){let u=c.attributeIDs,h=c.attributeTypes,d,f,m=o.GetEncodedGeometryType(l);if(m===a.TRIANGULAR_MESH)d=new a.Mesh,f=o.DecodeArrayToMesh(l,l.byteLength,d);else if(m===a.POINT_CLOUD)d=new a.PointCloud,f=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());let y={index:null,attributes:[]};for(let g in u){let p=self[h[g]],v,x;if(c.useUniqueIDs)x=u[g],v=o.GetAttributeByUniqueId(d,x);else{if(x=o.GetAttributeId(d,a[u[g]]),x===-1)continue;v=o.GetAttribute(d,x)}let _=s(a,o,d,g,p,v);g==="color"&&(_.vertexColorSpace=c.vertexColorSpace),y.attributes.push(_)}return m===a.TRIANGULAR_MESH&&(y.index=n(a,o,d)),a.destroy(d),y}function n(a,o,l){let u=l.num_faces()*3,h=u*4,d=a._malloc(h);o.GetTrianglesUInt32Array(l,h,d);let f=new Uint32Array(a.HEAPF32.buffer,d,u).slice();return a._free(d),{array:f,itemSize:1}}function s(a,o,l,c,u,h){let d=h.num_components(),m=l.num_points()*d,y=m*u.BYTES_PER_ELEMENT,g=r(a,u),p=a._malloc(y);o.GetAttributeDataArrayForAllPoints(l,h,g,y,p);let v=new u(a.HEAPF32.buffer,p,m).slice();return a._free(p),{name:c,array:v,itemSize:d}}function r(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}var gr=Math.pow(2,-24),Ea=Symbol("SKIP_GENERATION"),Tl={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[Ea]:!1};function lt(i,e,t){return t.min.x=e[i],t.min.y=e[i+1],t.min.z=e[i+2],t.max.x=e[i+3],t.max.y=e[i+4],t.max.z=e[i+5],t}function Ca(i){let e=-1,t=-1/0;for(let n=0;n<3;n++){let s=i[n+3]-i[n];s>t&&(t=s,e=n)}return e}function gd(i,e,t){for(let n=0;n<3;n++){let s=e[i+2*n],r=e[i+2*n+1],a=s-r,o=s+r;a<t[n]&&(t[n]=a),o>t[n+3]&&(t[n+3]=o)}}function wl(i){let e=i[3]-i[0],t=i[4]-i[1],n=i[5]-i[2];return 2*(e*t+t*n+n*e)}function Ye(i,e){return e[i+15]===65535}function it(i,e){return e[i+6]}function ot(i,e){return e[i+14]}function Ke(i){return i+8}function Je(i,e){let t=e[i+6];return i+t*8}function yr(i,e){return e[i+7]}function Al(i,e,t,n,s){let r=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0,h=1/0,d=1/0,f=1/0,m=-1/0,y=-1/0,g=-1/0,p=i.offset||0;for(let v=(e-p)*6,x=(e+t-p)*6;v<x;v+=6){let _=i[v+0],w=i[v+1],M=_-w,T=_+w;M<r&&(r=M),T>l&&(l=T),_<h&&(h=_),_>m&&(m=_);let C=i[v+2],S=i[v+3],b=C-S,P=C+S;b<a&&(a=b),P>c&&(c=P),C<d&&(d=C),C>y&&(y=C);let D=i[v+4],L=i[v+5],N=D-L,V=D+L;N<o&&(o=N),V>u&&(u=V),D<f&&(f=D),D>g&&(g=D)}n[0]=r,n[1]=a,n[2]=o,n[3]=l,n[4]=c,n[5]=u,s[0]=h,s[1]=d,s[2]=f,s[3]=m,s[4]=y,s[5]=g}var $i=8,_d=8,yd=new Int32Array($i),Zi=new Float32Array($i*6),_r=new Float32Array($i*6),ki=new Float32Array(6),El=new Float32Array(6),$n=new Int32Array(_d),yg=new Float32Array(_d*6);function pT(i,e,t,n){for(let s=0;s<3;s++){let r=e[i+2*s],a=e[i+2*s+1],o=r-a,l=r+a;o<t[n+s]&&(t[n+s]=o),l>t[n+s+3]&&(t[n+s+3]=l)}}function _g(i,e){let t=i[e+3]-i[e],n=i[e+4]-i[e+1],s=i[e+5]-i[e+2];return 2*(t*n+n*s+s*t)}function xg(i,e,t,n,s,r){let a=-1,o=0;if(r===0)a=Ca(e),a!==-1&&(o=(e[a]+e[a+3])/2);else if(r===1)a=Ca(i),a!==-1&&(o=mT(t,n,s,a));else if(r===2){let l=wl(i),c=1.25*s,u=t.offset||0,h=(n-u)*6,d=(n+s-u)*6;for(let f=0;f<3;f++){let m=e[f],p=(e[f+3]-m)/$i;if(s<_d){for(let v=0;v<s;v++){let x=h+v*6,_=t[x+2*f],w=v;for(;w>0&&t[$n[w-1]+2*f]>_;)$n[w]=$n[w-1],w--;$n[w]=x}for(let v=0;v<3;v++)ki[v]=1/0,ki[v+3]=-1/0,El[v]=1/0,El[v+3]=-1/0;for(let v=s-1;v>=0;v--)gd($n[v],t,El),yg.set(El,v*6);for(let v=0;v<s-1;v++){gd($n[v],t,ki);let x=t[$n[v+1]+2*f];if(t[$n[v]+2*f]===x)continue;let _=v+1,w=s-_,M=wl(ki)/l,T=_g(yg,_*6)/l,C=1+1.25*(M*_+T*w);C<c&&(a=f,c=C,o=x)}}else{for(let _=0;_<$i;_++){yd[_]=0;for(let w=0;w<3;w++)Zi[_*6+w]=1/0,Zi[_*6+w+3]=-1/0}for(let _=h;_<d;_+=6){let T=~~((t[_+2*f]-m)/p);T>=$i&&(T=$i-1),yd[T]++,pT(_,t,Zi,T*6)}let v=($i-1)*6;for(let _=0;_<6;_++)_r[v+_]=Zi[v+_];for(let _=$i-2;_>=0;_--){let w=_*6,M=w+6;for(let T=0;T<3;T++)_r[w+T]=Math.min(Zi[w+T],_r[M+T]),_r[w+T+3]=Math.max(Zi[w+T+3],_r[M+T+3])}let x=0;for(let _=0;_<$i-1;_++){let w=_*6,M=yd[_];if(M!==0)for(let P=0;P<3;P++)x===0?(ki[P]=Zi[w+P],ki[P+3]=Zi[w+P+3]):(ki[P]=Math.min(ki[P],Zi[w+P]),ki[P+3]=Math.max(ki[P+3],Zi[w+P+3]));x+=M;let T=0,C=0;x!==0&&(T=wl(ki)/l);let S=s-x;S!==0&&(C=_g(_r,w+6)/l);let b=1+1.25*(T*x+C*S);b<c&&(a=f,c=b,o=m+p+_*p)}}}}else typeof r=="function"?{axis:a,pos:o}=r(i,e,t,n,s,t.offset):console.warn(`BVH: Invalid build strategy value ${r} used.`);return{axis:a,pos:o}}function mT(i,e,t,n){let s=0,r=i.offset;for(let a=e,o=e+t;a<o;a++)s+=i[(a-r)*6+n*2];return s/t}function vg(i,e,t,n,s,r){let a=n,o=n+s-1,l=r.pos,c=r.axis*2,u=t.offset||0;for(;;){for(;a<=o&&t[(a-u)*6+c]<l;)a++;for(;a<=o&&t[(o-u)*6+c]>=l;)o--;if(a<o){for(let h=0;h<e;h++){let d=i[a*e+h];i[a*e+h]=i[o*e+h],i[o*e+h]=d}for(let h=0;h<6;h++){let d=a-u,f=o-u,m=t[d*6+h];t[d*6+h]=t[f*6+h],t[f*6+h]=m}a++,o--}else return a}}var gT=Math.pow(2,32),xr=new Float32Array(6),Cl=new Float32Array(6);function yT(i,e,t,n,s,r){let{maxDepth:a,verbose:o,targetLeafSize:l,_strictLeafSize:c=1/0,strategy:u,onProgress:h,useSharedArrayBuffer:d=!1}=s,f=i.primitiveBuffer,m=i.primitiveBufferStride,y=d?SharedArrayBuffer:ArrayBuffer,g=new y(32*Math.max(1,2*Math.ceil(n)-1)),p=new Float32Array(g),v=new Uint32Array(g),x=new Uint16Array(g),_=0,w=!1;return Al(e,t,n,xr,Cl),C(t,n,0),g.slice(0,_*32);function M(S){h&&h((S-r.offset)/r.count)}function T(S,b,P){let D=S*2;v[S+6]=b,x[D+14]=P,x[D+15]=65535,M(b+P)}function C(S,b,P){let D=_++,L=D*8;p.set(xr,L),!w&&P>=a&&(w=!0,o&&console.warn(`BVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`));let N=b>c;if(b<=l&&!N||P>=a){T(L,S,b);return}let V=xg(xr,Cl,e,S,b,u),z=V.axis===-1?-1:vg(f,m,e,S,b,V);if(V.axis===-1||z===S||z===S+b){if(!N){T(L,S,b);return}V.axis=Math.max(0,Ca(xr)),z=S+Math.max(1,Math.floor(b/2))}v[L+7]=V.axis;let K=z-S;Al(e,S,K,xr,Cl),C(S,K,P+1);let W=_-D;if(W>gT)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");v[L+6]=W;let ie=b-K;Al(e,z,ie,xr,Cl),C(z,ie,P+1)}}function bg(i,e){let t=i.getRootRanges(e.range),n=t[0],s=t[t.length-1],r={offset:n.offset,count:s.offset+s.count-n.offset},a=new Float32Array(6*r.count);a.offset=r.offset,i.computePrimitiveBounds(r.offset,r.count,a),i._roots=t.map(o=>yT(i,a,o.offset,o.count,e,r))}var Kn=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var xd=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},He=new xd;var Jn,br,vr=[],Rl=new Kn(()=>new Ge);function Sg(i,e,t,n,s,r){Jn=Rl.getPrimitive(),br=Rl.getPrimitive(),vr.push(Jn,br),He.setBuffer(i._roots[e]);let a=vd(0,i.geometry,t,n,s,r);He.clearBuffer(),Rl.releasePrimitive(Jn),Rl.releasePrimitive(br),vr.pop(),vr.pop();let o=vr.length;return o>0&&(br=vr[o-1],Jn=vr[o-2]),a}function vd(i,e,t,n,s=null,r=0,a=0){let{float32Array:o,uint16Array:l,uint32Array:c}=He,u=i*2;if(Ye(u,l)){let d=it(i,c),f=ot(u,l);return lt(i,o,Jn),n(d,f,!1,a,r+i/8,Jn)}else{let b=function(D){let{uint16Array:L,uint32Array:N}=He,V=D*2;for(;!Ye(V,L);)D=Ke(D),V=D*2;return it(D,N)},P=function(D){let{uint16Array:L,uint32Array:N}=He,V=D*2;for(;!Ye(V,L);)D=Je(D,N),V=D*2;return it(D,N)+ot(V,L)},d=Ke(i),f=Je(i,c),m=d,y=f,g,p,v,x;if(s&&(v=Jn,x=br,lt(m,o,v),lt(y,o,x),g=s(v),p=s(x),p<g)){m=f,y=d;let D=g;g=p,p=D,v=x}v||(v=Jn,lt(m,o,v));let _=Ye(m*2,l),w=t(v,_,g,a+1,r+m/8),M;if(w===2){let D=b(m),N=P(m)-D;M=n(D,N,!0,a+1,r+m/8,v)}else M=w&&vd(m,e,t,n,s,r,a+1);if(M)return!0;x=br,lt(y,o,x);let T=Ye(y*2,l),C=t(x,T,p,a+1,r+y/8),S;if(C===2){let D=b(y),N=P(y)-D;S=n(D,N,!0,a+1,r+y/8,x)}else S=C&&vd(y,e,t,n,s,r,a+1);return!!S}}var Ra=new He.constructor,Pl=new He.constructor,Qn=new Kn(()=>new Ge),Sr=new Ge,Mr=new Ge,Sd=new Ge,Md=new Ge,Td=!1;function Mg(i,e,t,n){if(Td)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Td=!0;let s=i._roots,r=e._roots,a,o=0,l=0,c=new te().copy(t).invert();for(let u=0,h=s.length;u<h;u++){Ra.setBuffer(s[u]),l=0;let d=Qn.getPrimitive();lt(0,Ra.float32Array,d),d.applyMatrix4(c);for(let f=0,m=r.length;f<m&&(Pl.setBuffer(r[f]),a=Vi(0,0,t,c,n,o,l,0,0,d),Pl.clearBuffer(),l+=r[f].byteLength/32,!a);f++);if(Qn.releasePrimitive(d),Ra.clearBuffer(),o+=s[u].byteLength/32,a)break}return Td=!1,a}function Vi(i,e,t,n,s,r=0,a=0,o=0,l=0,c=null,u=!1){let h,d;u?(h=Pl,d=Ra):(h=Ra,d=Pl);let f=h.float32Array,m=h.uint32Array,y=h.uint16Array,g=d.float32Array,p=d.uint32Array,v=d.uint16Array,x=i*2,_=e*2,w=Ye(x,y),M=Ye(_,v),T=!1;if(M&&w)u?T=s(it(e,p),ot(e*2,v),it(i,m),ot(i*2,y),l,a+e/8,o,r+i/8):T=s(it(i,m),ot(i*2,y),it(e,p),ot(e*2,v),o,r+i/8,l,a+e/8);else if(M){let C=Qn.getPrimitive();lt(e,g,C),C.applyMatrix4(t);let S=Ke(i),b=Je(i,m);lt(S,f,Sr),lt(b,f,Mr);let P=C.intersectsBox(Sr),D=C.intersectsBox(Mr);T=P&&Vi(e,S,n,t,s,a,r,l,o+1,C,!u)||D&&Vi(e,b,n,t,s,a,r,l,o+1,C,!u),Qn.releasePrimitive(C)}else{let C=Ke(e),S=Je(e,p);lt(C,g,Sd),lt(S,g,Md);let b=c.intersectsBox(Sd),P=c.intersectsBox(Md);if(b&&P)T=Vi(i,C,t,n,s,r,a,o,l+1,c,u)||Vi(i,S,t,n,s,r,a,o,l+1,c,u);else if(b)if(w)T=Vi(i,C,t,n,s,r,a,o,l+1,c,u);else{let D=Qn.getPrimitive();D.copy(Sd).applyMatrix4(t);let L=Ke(i),N=Je(i,m);lt(L,f,Sr),lt(N,f,Mr);let V=D.intersectsBox(Sr),z=D.intersectsBox(Mr);T=V&&Vi(C,L,n,t,s,a,r,l,o+1,D,!u)||z&&Vi(C,N,n,t,s,a,r,l,o+1,D,!u),Qn.releasePrimitive(D)}else if(P)if(w)T=Vi(i,S,t,n,s,r,a,o,l+1,c,u);else{let D=Qn.getPrimitive();D.copy(Md).applyMatrix4(t);let L=Ke(i),N=Je(i,m);lt(L,f,Sr),lt(N,f,Mr);let V=D.intersectsBox(Sr),z=D.intersectsBox(Mr);T=V&&Vi(S,L,n,t,s,a,r,l,o+1,D,!u)||z&&Vi(S,N,n,t,s,a,r,l,o+1,D,!u),Qn.releasePrimitive(D)}}return T}var Il=new class{constructor(){let i=null,e=null,t=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(r,a)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=a,this.buffer=i=r._roots[a],this.uint16Array=t=new Uint16Array(i),this.uint32Array=e=new Uint32Array(i)},this.reset=()=>{this.root=null,this.buffer=i=null,this.uint16Array=t=null,this.uint32Array=e=null},this.getRangeStart=r=>{let a=r*2;for(;!Ye(a,t);)r=Ke(r),a=r*2;return it(r,e)},this.getRangeEnd=r=>{let a=r*2;for(;!Ye(a,t);)r=Je(r,e),a=r*2;return it(r,e)+ot(a,t)};let s=(r,a,o)=>{let l=a*2,c=Ye(l,t);if(!r(o,c,a)&&!c){let h=Ke(a),d=Je(a,e);s(r,h,o+1),s(r,d,o+1)}};this.traverseBuffer=r=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{s(r,0,0)}finally{n=!1}},this.traverse=r=>{this.traverseBuffer((a,o,l)=>{if(o){let c=l*2,u=e[l+6],h=t[c+14];return r(a,o,new Float32Array(i,l*4,6),u,h)}else{let c=yr(l,e);return r(a,o,new Float32Array(i,l*4,6),c)}})}}};var Tg="0.10.0";var wg=new Ge,Tr=new Float32Array(6);typeof window<"u"&&(window.__THREE_MESH_BVH__?console.warn("three-mesh-bvh: Multiple instances of three-mesh-bvh being imported."):window.__THREE_MESH_BVH__=Tg);var Ll=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...Tl,...e},bg(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,t,n,s){let r=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0;for(let h=e,d=e+t;h<d;h++){this.writePrimitiveBounds(h,Tr,0);let[f,m,y,g,p,v]=Tr;f<r&&(r=f),g>l&&(l=g),m<a&&(a=m),p>c&&(c=p),y<o&&(o=y),v>u&&(u=v)}return n[s+0]=r,n[s+1]=a,n[s+2]=o,n[s+3]=l,n[s+4]=c,n[s+5]=u,n}computePrimitiveBounds(e,t,n){let s=n.offset||0;for(let r=e,a=e+t;r<a;r++){this.writePrimitiveBounds(r,Tr,0);let[o,l,c,u,h,d]=Tr,f=(o+u)/2,m=(l+h)/2,y=(c+d)/2,g=(u-o)/2,p=(h-l)/2,v=(d-c)/2,x=(r-s)*6;n[x+0]=f,n[x+1]=g+(Math.abs(f)+g)*gr,n[x+2]=m,n[x+3]=p+(Math.abs(m)+p)*gr,n[x+4]=y,n[x+5]=v+(Math.abs(y)+v)*gr}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t){if(t.BYTES_PER_ELEMENT===2&&t.some(n=>n+e>=2**16)){let n=t.buffer.constructor;t=new Uint32Array(new n(4*t.length)),t.set(this._indirectBuffer),this._indirectBuffer=t}for(let n=0,s=t.length;n<s;n++)t[n]+=e}else{let n=this._roots;for(let s=0;s<n.length;s++){let r=n[s],a=new Uint32Array(r),o=new Uint16Array(r),l=r.byteLength/32;for(let c=0;c<l;c++){let u=8*c,h=2*u;Ye(h,o)&&(a[u+6]+=e)}}}}traverse(e,t=0){Il.setBVH(this,t),Il.traverse(e),Il.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let s=e[t],r=new Uint32Array(s),a=new Uint16Array(s),o=new Float32Array(s),l=s.byteLength/32;for(let c=l-1;c>=0;c--){let u=c*8,h=u*2;if(Ye(h,a)){let f=it(u,r),m=ot(h,a);this.writePrimitiveRangeBounds(f,m,Tr,0),o.set(Tr,u)}else{let f=Ke(u),m=Je(u,r);for(let y=0;y<3;y++){let g=o[f+y],p=o[f+y+3],v=o[m+y],x=o[m+y+3];o[u+y]=g<v?g:v,o[u+y+3]=p>x?p:x}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{lt(0,new Float32Array(n),wg),e.union(wg)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:s,intersectsPrimitive:r,scratchPrimitive:a,iterate:o}=e;if(s&&r){let h=s;s=(d,f,m,y,g)=>h(d,f,m,y,g)?!0:o(d,f,this,r,m,y,a)}else s||(r?s=(h,d,f,m)=>o(h,d,this,r,f,m,a):s=(h,d,f)=>f);let l=!1,c=0,u=this._roots;for(let h=0,d=u.length;h<d;h++){let f=u[h];if(l=Sg(this,h,n,s,t,c),l)break;c+=f.byteLength/32}return l}bvhcast(e,t,n){let{intersectsRanges:s}=n;return Mg(this,e,t,s)}};function Ag(){return typeof SharedArrayBuffer<"u"}function wd(i){return i.index?i.index.count:i.attributes.position.count}function es(i){return wd(i)/3}function xT(i,e=ArrayBuffer){return i>65535?new Uint32Array(new e(4*i)):new Uint16Array(new e(2*i))}function Eg(i,e){if(!i.index){let t=i.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,s=xT(t,n);i.setIndex(new Be(s,1));for(let r=0;r<t;r++)s[r]=r}}function vT(i,e,t){let n=wd(i)/t,s=e||i.drawRange,r=s.start/t,a=(s.start+s.count)/t,o=Math.max(0,r),l=Math.min(n,a)-o;return{offset:Math.floor(o),count:Math.floor(l)}}function bT(i,e){return i.groups.map(t=>({offset:t.start/e,count:t.count/e}))}function Ad(i,e,t){let n=vT(i,e,t),s=bT(i,t);if(!s.length)return[n];let r=[],a=n.offset,o=n.offset+n.count,l=wd(i)/t,c=[];for(let d of s){let{offset:f,count:m}=d,y=f,g=isFinite(m)?m:l-f,p=f+g;y<o&&p>a&&(c.push({pos:Math.max(a,y),isStart:!0}),c.push({pos:Math.min(o,p),isStart:!1}))}c.sort((d,f)=>d.pos!==f.pos?d.pos-f.pos:d.type==="end"?-1:1);let u=0,h=null;for(let d of c){let f=d.pos;u!==0&&f!==h&&r.push({offset:h,count:f-h}),u+=d.isStart?1:-1,h=f}return r}function ST(i,e){let t=i[i.length-1],n=t.offset+t.count>2**16,s=i.reduce((c,u)=>c+u.count,0),r=n?4:2,a=e?new SharedArrayBuffer(s*r):new ArrayBuffer(s*r),o=n?new Uint32Array(a):new Uint16Array(a),l=0;for(let c=0;c<i.length;c++){let{offset:u,count:h}=i[c];for(let d=0;d<h;d++)o[l+d]=u+d;l+=h}return o}var Dl=class extends Ll{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(t.useSharedArrayBuffer&&!Ag())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...Tl,...t},t[Ea]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let s=Ad(t,e.range,n),r=ST(s,e.useSharedArrayBuffer);this._indirectBuffer=r}else Eg(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new Ge))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Ad(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}};var vi=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,s=-1/0;for(let r=0,a=e.length;r<a;r++){let l=e[r][t];n=l<n?l:n,s=l>s?l:s}this.min=n,this.max=s}setFromPoints(e,t){let n=1/0,s=-1/0;for(let r=0,a=t.length;r<a;r++){let o=t[r],l=e.dot(o);n=l<n?l:n,s=l>s?l:s}this.min=n,this.max=s}isSeparated(e){return this.min>e.max||e.min>this.max}};vi.prototype.setFromBox=(function(){let i=new R;return function(t,n){let s=n.min,r=n.max,a=1/0,o=-1/0;for(let l=0;l<=1;l++)for(let c=0;c<=1;c++)for(let u=0;u<=1;u++){i.x=s.x*l+r.x*(1-l),i.y=s.y*c+r.y*(1-c),i.z=s.z*u+r.z*(1-u);let h=t.dot(i);a=Math.min(h,a),o=Math.max(h,o)}this.min=a,this.max=o}})();var MT=(function(){let i=new R,e=new R,t=new R;return function(s,r,a){let o=s.start,l=i,c=r.start,u=e;t.subVectors(o,c),i.subVectors(s.end,s.start),e.subVectors(r.end,r.start);let h=t.dot(u),d=u.dot(l),f=u.dot(u),m=t.dot(l),g=l.dot(l)*f-d*d,p,v;g!==0?p=(h*d-m*f)/g:p=0,v=(h+p*d)/f,a.x=p,a.y=v}})(),Pa=(function(){let i=new ue,e=new R,t=new R;return function(s,r,a,o){MT(s,r,i);let l=i.x,c=i.y;if(l>=0&&l<=1&&c>=0&&c<=1){s.at(l,a),r.at(c,o);return}else if(l>=0&&l<=1){c<0?r.at(0,o):r.at(1,o),s.closestPointToPoint(o,!0,a);return}else if(c>=0&&c<=1){l<0?s.at(0,a):s.at(1,a),r.closestPointToPoint(a,!0,o);return}else{let u;l<0?u=s.start:u=s.end;let h;c<0?h=r.start:h=r.end;let d=e,f=t;if(s.closestPointToPoint(h,!0,e),r.closestPointToPoint(u,!0,t),d.distanceToSquared(h)<=f.distanceToSquared(u)){a.copy(d),o.copy(h);return}else{a.copy(u),o.copy(f);return}}}})(),Cg=(function(){let i=new R,e=new R,t=new Zt,n=new li;return function(r,a){let{radius:o,center:l}=r,{a:c,b:u,c:h}=a;if(n.start=c,n.end=u,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o||(n.start=c,n.end=h,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o)||(n.start=u,n.end=h,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o))return!0;let y=a.getPlane(t);if(Math.abs(y.distanceToPoint(l))<=o){let p=y.projectPoint(l,e);if(a.containsPoint(p))return!0}return!1}})();var TT=["x","y","z"],bn=1e-15,Rg=bn*bn;function Ri(i){return Math.abs(i)<bn}var Bt=class extends Gt{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new R),this.satBounds=new Array(4).fill().map(()=>new vi),this.points=[this.a,this.b,this.c],this.plane=new Zt,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new li,this.needsUpdate=!0}intersectsSphere(e){return Cg(e,this)}update(){let e=this.a,t=this.b,n=this.c,s=this.points,r=this.satAxes,a=this.satBounds,o=r[0],l=a[0];this.getNormal(o),l.setFromPoints(o,s);let c=r[1],u=a[1];c.subVectors(e,t),u.setFromPoints(c,s);let h=r[2],d=a[2];h.subVectors(t,n),d.setFromPoints(h,s);let f=r[3],m=a[3];f.subVectors(n,e),m.setFromPoints(f,s);let y=c.length(),g=h.length(),p=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,y<bn?g<bn||p<bn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):g<bn?p<bn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):p<bn&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};Bt.prototype.closestPointToSegment=(function(){let i=new R,e=new R,t=new li;return function(s,r=null,a=null){this.needsUpdate&&this.update();let{start:o,end:l}=s,c=this.points,u,h=1/0,d=this.plane.distanceToPoint(o),f=this.plane.distanceToPoint(l);if(d*f<0&&this.plane.intersectLine(s,i)!==null&&this.containsPoint(i))return r&&r.copy(i),a&&a.copy(i),0;for(let m=0;m<3;m++){let y=(m+1)%3;t.start.copy(c[m]),t.end.copy(c[y]),Pa(t,s,i,e),u=i.distanceToSquared(e),u<h&&(h=u,r&&r.copy(i),a&&a.copy(e))}return this.closestPointToPoint(o,i),u=o.distanceToSquared(i),u<h&&(h=u,r&&r.copy(i),a&&a.copy(o)),this.closestPointToPoint(l,i),u=l.distanceToSquared(i),u<h&&(h=u,r&&r.copy(i),a&&a.copy(l)),Math.sqrt(h)}})();Bt.prototype.intersectsTriangle=(function(){let i=new Bt,e=new vi,t=new vi,n=new R,s=new R,r=new R,a=new R,o=new li,l=new li,c=new R,u=new ue,h=new ue;function d(x,_,w,M){let T=n;!x.isDegenerateIntoPoint&&!x.isDegenerateIntoSegment?T.copy(x.plane.normal):T.copy(_.plane.normal);let C=x.satBounds,S=x.satAxes;for(let D=1;D<4;D++){let L=C[D],N=S[D];if(e.setFromPoints(N,_.points),L.isSeparated(e)||(a.copy(T).cross(N),e.setFromPoints(a,x.points),t.setFromPoints(a,_.points),e.isSeparated(t)))return!1}let b=_.satBounds,P=_.satAxes;for(let D=1;D<4;D++){let L=b[D],N=P[D];if(e.setFromPoints(N,x.points),L.isSeparated(e)||(a.crossVectors(T,N),e.setFromPoints(a,x.points),t.setFromPoints(a,_.points),e.isSeparated(t)))return!1}return w&&(M||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),w.start.set(0,0,0),w.end.set(0,0,0)),!0}function f(x,_,w,M,T,C,S,b,P,D,L){let N=S/(S-b);D.x=M+(T-M)*N,L.start.subVectors(_,x).multiplyScalar(N).add(x),N=S/(S-P),D.y=M+(C-M)*N,L.end.subVectors(w,x).multiplyScalar(N).add(x)}function m(x,_,w,M,T,C,S,b,P,D,L){if(T>0)f(x.c,x.a,x.b,M,_,w,P,S,b,D,L);else if(C>0)f(x.b,x.a,x.c,w,_,M,b,S,P,D,L);else if(b*P>0||S!=0)f(x.a,x.b,x.c,_,w,M,S,b,P,D,L);else if(b!=0)f(x.b,x.a,x.c,w,_,M,b,S,P,D,L);else if(P!=0)f(x.c,x.a,x.b,M,_,w,P,S,b,D,L);else return!0;return!1}function y(x,_,w,M){let T=_.degenerateSegment,C=x.plane.distanceToPoint(T.start),S=x.plane.distanceToPoint(T.end);return Ri(C)?Ri(S)?d(x,_,w,M):(w&&(w.start.copy(T.start),w.end.copy(T.start)),x.containsPoint(T.start)):Ri(S)?(w&&(w.start.copy(T.end),w.end.copy(T.end)),x.containsPoint(T.end)):x.plane.intersectLine(T,n)!=null?(w&&(w.start.copy(n),w.end.copy(n)),x.containsPoint(n)):!1}function g(x,_,w){let M=_.a;return Ri(x.plane.distanceToPoint(M))&&x.containsPoint(M)?(w&&(w.start.copy(M),w.end.copy(M)),!0):!1}function p(x,_,w){let M=x.degenerateSegment,T=_.a;return M.closestPointToPoint(T,!0,n),T.distanceToSquared(n)<Rg?(w&&(w.start.copy(T),w.end.copy(T)),!0):!1}function v(x,_,w,M){if(x.isDegenerateIntoSegment)if(_.isDegenerateIntoSegment){let T=x.degenerateSegment,C=_.degenerateSegment,S=s,b=r;T.delta(S),C.delta(b);let P=n.subVectors(C.start,T.start),D=S.x*b.y-S.y*b.x;if(Ri(D))return!1;let L=(P.x*b.y-P.y*b.x)/D,N=-(S.x*P.y-S.y*P.x)/D;if(L<0||L>1||N<0||N>1)return!1;let V=T.start.z+S.z*L,z=C.start.z+b.z*N;return Ri(V-z)?(w&&(w.start.copy(T.start).addScaledVector(S,L),w.end.copy(T.start).addScaledVector(S,L)),!0):!1}else return _.isDegenerateIntoPoint?p(x,_,w):y(_,x,w,M);else{if(x.isDegenerateIntoPoint)return _.isDegenerateIntoPoint?_.a.distanceToSquared(x.a)<Rg?(w&&(w.start.copy(x.a),w.end.copy(x.a)),!0):!1:_.isDegenerateIntoSegment?p(_,x,w):g(_,x,w);if(_.isDegenerateIntoPoint)return g(x,_,w);if(_.isDegenerateIntoSegment)return y(x,_,w,M)}}return function(_,w=null,M=!1){this.needsUpdate&&this.update(),_.isExtendedTriangle?_.needsUpdate&&_.update():(i.copy(_),i.update(),_=i);let T=v(this,_,w,M);if(T!==void 0)return T;let C=this.plane,S=_.plane,b=S.distanceToPoint(this.a),P=S.distanceToPoint(this.b),D=S.distanceToPoint(this.c);Ri(b)&&(b=0),Ri(P)&&(P=0),Ri(D)&&(D=0);let L=b*P,N=b*D;if(L>0&&N>0)return!1;let V=C.distanceToPoint(_.a),z=C.distanceToPoint(_.b),K=C.distanceToPoint(_.c);Ri(V)&&(V=0),Ri(z)&&(z=0),Ri(K)&&(K=0);let W=V*z,ie=V*K;if(W>0&&ie>0)return!1;s.copy(C.normal),r.copy(S.normal);let he=s.cross(r),xe=0,Le=Math.abs(he.x),Qe=Math.abs(he.y);Qe>Le&&(Le=Qe,xe=1),Math.abs(he.z)>Le&&(xe=2);let J=TT[xe],me=this.a[J],se=this.b[J],Te=this.c[J],Pe=_.a[J],Fe=_.b[J],dt=_.c[J];if(m(this,me,se,Te,L,N,b,P,D,u,o))return d(this,_,w,M);if(m(_,Pe,Fe,dt,W,ie,V,z,K,h,l))return d(this,_,w,M);if(u.y<u.x){let ke=u.y;u.y=u.x,u.x=ke,c.copy(o.start),o.start.copy(o.end),o.end.copy(c)}if(h.y<h.x){let ke=h.y;h.y=h.x,h.x=ke,c.copy(l.start),l.start.copy(l.end),l.end.copy(c)}return u.y<h.x||h.y<u.x?!1:(w&&(h.x>u.x?w.start.copy(l.start):w.start.copy(o.start),h.y<u.y?w.end.copy(l.end):w.end.copy(o.end)),!0)}})();Bt.prototype.distanceToPoint=(function(){let i=new R;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}})();Bt.prototype.distanceToTriangle=(function(){let i=new R,e=new R,t=["a","b","c"],n=new li,s=new li;return function(a,o=null,l=null){let c=o||l?n:null;if(this.intersectsTriangle(a,c,!0))return(o||l)&&(o&&c.getCenter(o),l&&c.getCenter(l)),0;let u=1/0;for(let h=0;h<3;h++){let d,f=t[h],m=a[f];this.closestPointToPoint(m,i),d=m.distanceToSquared(i),d<u&&(u=d,o&&o.copy(i),l&&l.copy(m));let y=this[f];a.closestPointToPoint(y,i),d=y.distanceToSquared(i),d<u&&(u=d,o&&o.copy(y),l&&l.copy(i))}for(let h=0;h<3;h++){let d=t[h],f=t[(h+1)%3];n.set(this[d],this[f]);for(let m=0;m<3;m++){let y=t[m],g=t[(m+1)%3];s.set(a[y],a[g]),Pa(n,s,i,e);let p=i.distanceToSquared(e);p<u&&(u=p,o&&o.copy(i),l&&l.copy(e))}}return Math.sqrt(u)}})();var St=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new R,this.max=new R,this.matrix=new te,this.invMatrix=new te,this.points=new Array(8).fill().map(()=>new R),this.satAxes=new Array(3).fill().map(()=>new R),this.satBounds=new Array(3).fill().map(()=>new vi),this.alignedSatBounds=new Array(3).fill().map(()=>new vi),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};St.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,s=this.points;for(let c=0;c<=1;c++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){let d=1*c|2*u|4*h,f=s[d];f.x=c?n.x:t.x,f.y=u?n.y:t.y,f.z=h?n.z:t.z,f.applyMatrix4(e)}let r=this.satBounds,a=this.satAxes,o=s[0];for(let c=0;c<3;c++){let u=a[c],h=r[c],d=1<<c,f=s[d];u.subVectors(o,f),h.setFromPoints(u,s)}let l=this.alignedSatBounds;l[0].setFromPointsField(s,"x"),l[1].setFromPointsField(s,"y"),l[2].setFromPointsField(s,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();St.prototype.intersectsBox=(function(){let i=new vi;return function(t){this.needsUpdate&&this.update();let n=t.min,s=t.max,r=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(i.min=n.x,i.max=s.x,o[0].isSeparated(i)||(i.min=n.y,i.max=s.y,o[1].isSeparated(i))||(i.min=n.z,i.max=s.z,o[2].isSeparated(i)))return!1;for(let l=0;l<3;l++){let c=a[l],u=r[l];if(i.setFromBox(c,t),u.isSeparated(i))return!1}return!0}})();St.prototype.intersectsTriangle=(function(){let i=new Bt,e=new Array(3),t=new vi,n=new vi,s=new R;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(i.copy(a),i.update(),a=i);let o=this.satBounds,l=this.satAxes;e[0]=a.a,e[1]=a.b,e[2]=a.c;for(let d=0;d<3;d++){let f=o[d],m=l[d];if(t.setFromPoints(m,e),f.isSeparated(t))return!1}let c=a.satBounds,u=a.satAxes,h=this.points;for(let d=0;d<3;d++){let f=c[d],m=u[d];if(t.setFromPoints(m,h),f.isSeparated(t))return!1}for(let d=0;d<3;d++){let f=l[d];for(let m=0;m<4;m++){let y=u[m];if(s.crossVectors(f,y),t.setFromPoints(s,e),n.setFromPoints(s,h),t.isSeparated(n))return!1}}return!0}})();St.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();St.prototype.distanceToPoint=(function(){let i=new R;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}})();St.prototype.distanceToBox=(function(){let i=["x","y","z"],e=new Array(12).fill().map(()=>new li),t=new Array(12).fill().map(()=>new li),n=new R,s=new R;return function(a,o=0,l=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(l||c)&&(a.getCenter(s),this.closestPointToPoint(s,n),a.clampPoint(n,s),l&&l.copy(n),c&&c.copy(s)),0;let u=o*o,h=a.min,d=a.max,f=this.points,m=1/0;for(let g=0;g<8;g++){let p=f[g];s.copy(p).clamp(h,d);let v=p.distanceToSquared(s);if(v<m&&(m=v,l&&l.copy(p),c&&c.copy(s),v<u))return Math.sqrt(v)}let y=0;for(let g=0;g<3;g++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){let x=(g+1)%3,_=(g+2)%3,w=p<<x|v<<_,M=1<<g|p<<x|v<<_,T=f[w],C=f[M];e[y].set(T,C);let b=i[g],P=i[x],D=i[_],L=t[y],N=L.start,V=L.end;N[b]=h[b],N[P]=p?h[P]:d[P],N[D]=v?h[D]:d[D],V[b]=d[b],V[P]=p?h[P]:d[P],V[D]=v?h[D]:d[D],y++}for(let g=0;g<=1;g++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){s.x=g?d.x:h.x,s.y=p?d.y:h.y,s.z=v?d.z:h.z,this.closestPointToPoint(s,n);let x=s.distanceToSquared(n);if(x<m&&(m=x,l&&l.copy(n),c&&c.copy(s),x<u))return Math.sqrt(x)}for(let g=0;g<12;g++){let p=e[g];for(let v=0;v<12;v++){let x=t[v];Pa(p,x,n,s);let _=n.distanceToSquared(s);if(_<m&&(m=_,l&&l.copy(n),c&&c.copy(s),_<u))return Math.sqrt(_)}}return Math.sqrt(m)}})();var Ed=class extends Kn{constructor(){super(()=>new Bt)}},ei=new Ed;var Ia=new R,Cd=new R;function Pg(i,e,t={},n=0,s=1/0){let r=n*n,a=s*s,o=1/0,l=null;if(i.shapecast({boundsTraverseOrder:u=>(Ia.copy(e).clamp(u.min,u.max),Ia.distanceToSquared(e)),intersectsBounds:(u,h,d)=>d<o&&d<a,intersectsTriangle:(u,h)=>{u.closestPointToPoint(e,Ia);let d=e.distanceToSquared(Ia);return d<o&&(Cd.copy(Ia),o=d,l=h),d<r}}),o===1/0)return null;let c=Math.sqrt(o);return t.point?t.point.copy(Cd):t.point=Cd.clone(),t.distance=c,t.faceIndex=l,t}var Ul=parseInt("170")>=169,wT=parseInt("170")<=161,bs=new R,Ss=new R,Ms=new R,Nl=new ue,Ol=new ue,Bl=new ue,Ig=new R,Lg=new R,Dg=new R,La=new R;function AT(i,e,t,n,s,r,a,o){let l;if(r===Xt?l=i.intersectTriangle(n,t,e,!0,s):l=i.intersectTriangle(e,t,n,r!==ni,s),l===null)return null;let c=i.origin.distanceTo(s);return c<a||c>o?null:{distance:c,point:s.clone()}}function Ug(i,e,t,n,s,r,a,o,l,c,u){bs.fromBufferAttribute(e,r),Ss.fromBufferAttribute(e,a),Ms.fromBufferAttribute(e,o);let h=AT(i,bs,Ss,Ms,La,l,c,u);if(h){if(n){Nl.fromBufferAttribute(n,r),Ol.fromBufferAttribute(n,a),Bl.fromBufferAttribute(n,o),h.uv=new ue;let f=Gt.getInterpolation(La,bs,Ss,Ms,Nl,Ol,Bl,h.uv);Ul||(h.uv=f)}if(s){Nl.fromBufferAttribute(s,r),Ol.fromBufferAttribute(s,a),Bl.fromBufferAttribute(s,o),h.uv1=new ue;let f=Gt.getInterpolation(La,bs,Ss,Ms,Nl,Ol,Bl,h.uv1);Ul||(h.uv1=f),wT&&(h.uv2=h.uv1)}if(t){Ig.fromBufferAttribute(t,r),Lg.fromBufferAttribute(t,a),Dg.fromBufferAttribute(t,o),h.normal=new R;let f=Gt.getInterpolation(La,bs,Ss,Ms,Ig,Lg,Dg,h.normal);h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1),Ul||(h.normal=f)}let d={a:r,b:a,c:o,normal:new R,materialIndex:0};if(Gt.getNormal(bs,Ss,Ms,d.normal),h.face=d,h.faceIndex=r,Ul){let f=new R;Gt.getBarycoord(La,bs,Ss,Ms,f),h.barycoord=f}}return h}function Ng(i){return i&&i.isMaterial?i.side:i}function wr(i,e,t,n,s,r,a){let o=n*3,l=o+0,c=o+1,u=o+2,{index:h,groups:d}=i;i.index&&(l=h.getX(l),c=h.getX(c),u=h.getX(u));let{position:f,normal:m,uv:y,uv1:g}=i.attributes;if(Array.isArray(e)){let p=n*3;for(let v=0,x=d.length;v<x;v++){let{start:_,count:w,materialIndex:M}=d[v];if(p>=_&&p<_+w){let T=Ng(e[M]),C=Ug(t,f,m,y,g,l,c,u,T,r,a);if(C)if(C.faceIndex=n,C.face.materialIndex=M,s)s.push(C);else return C}}}else{let p=Ng(e),v=Ug(t,f,m,y,g,l,c,u,p,r,a);if(v)if(v.faceIndex=n,v.face.materialIndex=0,s)s.push(v);else return v}return null}function yt(i,e,t,n){let s=i.a,r=i.b,a=i.c,o=e,l=e+1,c=e+2;t&&(o=t.getX(o),l=t.getX(l),c=t.getX(c)),s.x=n.getX(o),s.y=n.getY(o),s.z=n.getZ(o),r.x=n.getX(l),r.y=n.getY(l),r.z=n.getZ(l),a.x=n.getX(c),a.y=n.getY(c),a.z=n.getZ(c)}function Og(i,e,t,n,s,r,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,h=n+s;u<h;u++)wr(l,e,t,u,r,a,o)}function Bg(i,e,t,n,s,r,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let h=n,d=n+s;h<d;h++){let f;f=wr(o,e,t,h,null,r,a),f&&f.distance<c&&(u=f,c=f.distance)}return u}function Fg(i,e,t,n,s,r,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,h=e+i;u<h;u++){let d;if(d=u,yt(a,d*3,l,c),a.needsUpdate=!0,n(a,d,s,r))return!0}return!1}function zg(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,s=t.attributes.position,r,a,o,l,c=0,u=i._roots;for(let d=0,f=u.length;d<f;d++)r=u[d],a=new Uint32Array(r),o=new Uint16Array(r),l=new Float32Array(r),h(0,c),c+=r.byteLength;function h(d,f,m=!1){let y=d*2;if(Ye(y,o)){let g=it(d,a),p=ot(y,o),v=1/0,x=1/0,_=1/0,w=-1/0,M=-1/0,T=-1/0;for(let C=3*g,S=3*(g+p);C<S;C++){let b=n[C],P=s.getX(b),D=s.getY(b),L=s.getZ(b);P<v&&(v=P),P>w&&(w=P),D<x&&(x=D),D>M&&(M=D),L<_&&(_=L),L>T&&(T=L)}return l[d+0]!==v||l[d+1]!==x||l[d+2]!==_||l[d+3]!==w||l[d+4]!==M||l[d+5]!==T?(l[d+0]=v,l[d+1]=x,l[d+2]=_,l[d+3]=w,l[d+4]=M,l[d+5]=T,!0):!1}else{let g=Ke(d),p=Je(d,a),v=m,x=!1,_=!1;if(e){if(!v){let b=g/8+f/32,P=p/8+f/32;x=e.has(b),_=e.has(P),v=!x&&!_}}else x=!0,_=!0;let w=v||x,M=v||_,T=!1;w&&(T=h(g,f,v));let C=!1;M&&(C=h(p,f,v));let S=T||C;if(S)for(let b=0;b<3;b++){let P=g+b,D=p+b,L=l[P],N=l[P+3],V=l[D],z=l[D+3];l[d+b]=L<V?L:V,l[d+b+3]=N>z?N:z}return S}}}function qt(i,e,t,n,s){let r,a,o,l,c,u,h=1/t.direction.x,d=1/t.direction.y,f=1/t.direction.z,m=t.origin.x,y=t.origin.y,g=t.origin.z,p=e[i],v=e[i+3],x=e[i+1],_=e[i+3+1],w=e[i+2],M=e[i+3+2];return h>=0?(r=(p-m)*h,a=(v-m)*h):(r=(v-m)*h,a=(p-m)*h),d>=0?(o=(x-y)*d,l=(_-y)*d):(o=(_-y)*d,l=(x-y)*d),r>l||o>a||((o>r||isNaN(r))&&(r=o),(l<a||isNaN(a))&&(a=l),f>=0?(c=(w-g)*f,u=(M-g)*f):(c=(M-g)*f,u=(w-g)*f),r>u||c>a)?!1:((c>r||r!==r)&&(r=c),(u<a||a!==a)&&(a=u),r<=s&&a>=n)}function kg(i,e,t,n,s,r,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,h=n+s;u<h;u++){let d=c?c[u]:u;wr(l,e,t,d,r,a,o)}}function Vg(i,e,t,n,s,r,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let h=n,d=n+s;h<d;h++){let f;f=wr(o,e,t,l?l[h]:h,null,r,a),f&&f.distance<c&&(u=f,c=f.distance)}return u}function Hg(i,e,t,n,s,r,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,h=e+i;u<h;u++){let d;if(d=t.resolveTriangleIndex(u),yt(a,d*3,l,c),a.needsUpdate=!0,n(a,d,s,r))return!0}return!1}function Gg(i,e,t,n,s,r,a){He.setBuffer(i._roots[e]),qt(0,He.float32Array,n,r,a)&&Rd(0,i,t,n,s,r,a),He.clearBuffer()}function Rd(i,e,t,n,s,r,a){let{float32Array:o,uint16Array:l,uint32Array:c}=He,u=i*2;if(Ye(u,l)){let d=it(i,c),f=ot(u,l);Og(e,t,n,d,f,s,r,a)}else{let d=Ke(i);qt(d,o,n,r,a)&&Rd(d,e,t,n,s,r,a);let f=Je(i,c);qt(f,o,n,r,a)&&Rd(f,e,t,n,s,r,a)}}var ET=["x","y","z"];function Wg(i,e,t,n,s,r){He.setBuffer(i._roots[e]);let a=null;return qt(0,He.float32Array,n,s,r)&&(a=Pd(0,i,t,n,s,r)),He.clearBuffer(),a}function Pd(i,e,t,n,s,r){let{float32Array:a,uint16Array:o,uint32Array:l}=He,c=i*2;if(Ye(c,o)){let h=it(i,l),d=ot(c,o);return Bg(e,t,n,h,d,s,r)}else{let h=yr(i,l),d=ET[h],m=n.direction[d]>=0,y,g;m?(y=Ke(i),g=Je(i,l)):(y=Je(i,l),g=Ke(i));let v=qt(y,a,n,s,r)?Pd(y,e,t,n,s,r):null;if(v){let w=v.point[d];if(m?w<=a[g+h]:w>=a[g+h+3])return v}let _=qt(g,a,n,s,r)?Pd(g,e,t,n,s,r):null;return v&&_?v.distance<=_.distance?v:_:v||_||null}}var Fl=new Ge,Ar=new Bt,Er=new Bt,Da=new te,Xg=new St,zl=new St;function qg(i,e,t,n){He.setBuffer(i._roots[e]);let s=Id(0,i,t,n);return He.clearBuffer(),s}function Id(i,e,t,n,s=null){let{float32Array:r,uint16Array:a,uint32Array:o}=He,l=i*2;if(s===null&&(t.boundingBox||t.computeBoundingBox(),Xg.set(t.boundingBox.min,t.boundingBox.max,n),s=Xg),Ye(l,a)){let u=e.geometry,h=u.index,d=u.attributes.position,f=t.index,m=t.attributes.position,y=it(i,o),g=ot(l,a);if(Da.copy(n).invert(),t.boundsTree)return lt(i,r,zl),zl.matrix.copy(Da),zl.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>zl.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let x=y*3,_=(g+y)*3;x<_;x+=3)if(yt(Er,x,h,d),Er.needsUpdate=!0,v.intersectsTriangle(Er))return!0;return!1}});{let p=es(t);for(let v=y*3,x=(g+y)*3;v<x;v+=3){yt(Ar,v,h,d),Ar.a.applyMatrix4(Da),Ar.b.applyMatrix4(Da),Ar.c.applyMatrix4(Da),Ar.needsUpdate=!0;for(let _=0,w=p*3;_<w;_+=3)if(yt(Er,_,f,m),Er.needsUpdate=!0,Ar.intersectsTriangle(Er))return!0}}}else{let u=Ke(i),h=Je(i,o);return lt(u,r,Fl),!!(s.intersectsBox(Fl)&&Id(u,e,t,n,s)||(lt(h,r,Fl),s.intersectsBox(Fl)&&Id(h,e,t,n,s)))}}var kl=new te,Ld=new St,Ua=new St,CT=new R,RT=new R,PT=new R,IT=new R;function Yg(i,e,t,n={},s={},r=0,a=1/0){e.boundingBox||e.computeBoundingBox(),Ld.set(e.boundingBox.min,e.boundingBox.max,t),Ld.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,h=e.index,d=ei.getPrimitive(),f=ei.getPrimitive(),m=CT,y=RT,g=null,p=null;s&&(g=PT,p=IT);let v=1/0,x=null,_=null;return kl.copy(t).invert(),Ua.matrix.copy(kl),i.shapecast({boundsTraverseOrder:w=>Ld.distanceToBox(w),intersectsBounds:(w,M,T)=>T<v&&T<a?(M&&(Ua.min.copy(w.min),Ua.max.copy(w.max),Ua.needsUpdate=!0),!0):!1,intersectsRange:(w,M)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:C=>Ua.distanceToBox(C),intersectsBounds:(C,S,b)=>b<v&&b<a,intersectsRange:(C,S)=>{for(let b=C,P=C+S;b<P;b++){yt(f,3*b,h,u),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let D=w,L=w+M;D<L;D++){yt(d,3*D,c,l),d.needsUpdate=!0;let N=d.distanceToTriangle(f,m,g);if(N<v&&(y.copy(m),p&&p.copy(g),v=N,x=D,_=b),N<r)return!0}}}});{let T=es(e);for(let C=0,S=T;C<S;C++){yt(f,3*C,h,u),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let b=w,P=w+M;b<P;b++){yt(d,3*b,c,l),d.needsUpdate=!0;let D=d.distanceToTriangle(f,m,g);if(D<v&&(y.copy(m),p&&p.copy(g),v=D,x=b,_=C),D<r)return!0}}}}}),ei.releasePrimitive(d),ei.releasePrimitive(f),v===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=v,n.faceIndex=x,s&&(s.point?s.point.copy(p):s.point=p.clone(),s.point.applyMatrix4(kl),y.applyMatrix4(kl),s.distance=y.sub(s.point).length(),s.faceIndex=_),n)}function jg(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,s=t.attributes.position,r,a,o,l,c=0,u=i._roots;for(let d=0,f=u.length;d<f;d++)r=u[d],a=new Uint32Array(r),o=new Uint16Array(r),l=new Float32Array(r),h(0,c),c+=r.byteLength;function h(d,f,m=!1){let y=d*2;if(Ye(y,o)){let g=it(d,a),p=ot(y,o),v=1/0,x=1/0,_=1/0,w=-1/0,M=-1/0,T=-1/0;for(let C=g,S=g+p;C<S;C++){let b=3*i.resolveTriangleIndex(C);for(let P=0;P<3;P++){let D=b+P;D=n?n[D]:D;let L=s.getX(D),N=s.getY(D),V=s.getZ(D);L<v&&(v=L),L>w&&(w=L),N<x&&(x=N),N>M&&(M=N),V<_&&(_=V),V>T&&(T=V)}}return l[d+0]!==v||l[d+1]!==x||l[d+2]!==_||l[d+3]!==w||l[d+4]!==M||l[d+5]!==T?(l[d+0]=v,l[d+1]=x,l[d+2]=_,l[d+3]=w,l[d+4]=M,l[d+5]=T,!0):!1}else{let g=Ke(d),p=Je(d,a),v=m,x=!1,_=!1;if(e){if(!v){let b=g/8+f/32,P=p/8+f/32;x=e.has(b),_=e.has(P),v=!x&&!_}}else x=!0,_=!0;let w=v||x,M=v||_,T=!1;w&&(T=h(g,f,v));let C=!1;M&&(C=h(p,f,v));let S=T||C;if(S)for(let b=0;b<3;b++){let P=g+b,D=p+b,L=l[P],N=l[P+3],V=l[D],z=l[D+3];l[d+b]=L<V?L:V,l[d+b+3]=N>z?N:z}return S}}}function Zg(i,e,t,n,s,r,a){He.setBuffer(i._roots[e]),qt(0,He.float32Array,n,r,a)&&Dd(0,i,t,n,s,r,a),He.clearBuffer()}function Dd(i,e,t,n,s,r,a){let{float32Array:o,uint16Array:l,uint32Array:c}=He,u=i*2;if(Ye(u,l)){let d=it(i,c),f=ot(u,l);kg(e,t,n,d,f,s,r,a)}else{let d=Ke(i);qt(d,o,n,r,a)&&Dd(d,e,t,n,s,r,a);let f=Je(i,c);qt(f,o,n,r,a)&&Dd(f,e,t,n,s,r,a)}}var LT=["x","y","z"];function $g(i,e,t,n,s,r){He.setBuffer(i._roots[e]);let a=null;return qt(0,He.float32Array,n,s,r)&&(a=Ud(0,i,t,n,s,r)),He.clearBuffer(),a}function Ud(i,e,t,n,s,r){let{float32Array:a,uint16Array:o,uint32Array:l}=He,c=i*2;if(Ye(c,o)){let h=it(i,l),d=ot(c,o);return Vg(e,t,n,h,d,s,r)}else{let h=yr(i,l),d=LT[h],m=n.direction[d]>=0,y,g;m?(y=Ke(i),g=Je(i,l)):(y=Je(i,l),g=Ke(i));let v=qt(y,a,n,s,r)?Ud(y,e,t,n,s,r):null;if(v){let w=v.point[d];if(m?w<=a[g+h]:w>=a[g+h+3])return v}let _=qt(g,a,n,s,r)?Ud(g,e,t,n,s,r):null;return v&&_?v.distance<=_.distance?v:_:v||_||null}}var Vl=new Ge,Cr=new Bt,Rr=new Bt,Na=new te,Kg=new St,Hl=new St;function Jg(i,e,t,n){He.setBuffer(i._roots[e]);let s=Nd(0,i,t,n);return He.clearBuffer(),s}function Nd(i,e,t,n,s=null){let{float32Array:r,uint16Array:a,uint32Array:o}=He,l=i*2;if(s===null&&(t.boundingBox||t.computeBoundingBox(),Kg.set(t.boundingBox.min,t.boundingBox.max,n),s=Kg),Ye(l,a)){let u=e.geometry,h=u.index,d=u.attributes.position,f=t.index,m=t.attributes.position,y=it(i,o),g=ot(l,a);if(Na.copy(n).invert(),t.boundsTree)return lt(i,r,Hl),Hl.matrix.copy(Na),Hl.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>Hl.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let x=y,_=g+y;x<_;x++)if(yt(Rr,3*e.resolveTriangleIndex(x),h,d),Rr.needsUpdate=!0,v.intersectsTriangle(Rr))return!0;return!1}});{let p=es(t);for(let v=y,x=g+y;v<x;v++){let _=e.resolveTriangleIndex(v);yt(Cr,3*_,h,d),Cr.a.applyMatrix4(Na),Cr.b.applyMatrix4(Na),Cr.c.applyMatrix4(Na),Cr.needsUpdate=!0;for(let w=0,M=p*3;w<M;w+=3)if(yt(Rr,w,f,m),Rr.needsUpdate=!0,Cr.intersectsTriangle(Rr))return!0}}}else{let u=Ke(i),h=Je(i,o);return lt(u,r,Vl),!!(s.intersectsBox(Vl)&&Nd(u,e,t,n,s)||(lt(h,r,Vl),s.intersectsBox(Vl)&&Nd(h,e,t,n,s)))}}var Gl=new te,Od=new St,Oa=new St,DT=new R,UT=new R,NT=new R,OT=new R;function Qg(i,e,t,n={},s={},r=0,a=1/0){e.boundingBox||e.computeBoundingBox(),Od.set(e.boundingBox.min,e.boundingBox.max,t),Od.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,h=e.index,d=ei.getPrimitive(),f=ei.getPrimitive(),m=DT,y=UT,g=null,p=null;s&&(g=NT,p=OT);let v=1/0,x=null,_=null;return Gl.copy(t).invert(),Oa.matrix.copy(Gl),i.shapecast({boundsTraverseOrder:w=>Od.distanceToBox(w),intersectsBounds:(w,M,T)=>T<v&&T<a?(M&&(Oa.min.copy(w.min),Oa.max.copy(w.max),Oa.needsUpdate=!0),!0):!1,intersectsRange:(w,M)=>{if(e.boundsTree){let T=e.boundsTree;return T.shapecast({boundsTraverseOrder:C=>Oa.distanceToBox(C),intersectsBounds:(C,S,b)=>b<v&&b<a,intersectsRange:(C,S)=>{for(let b=C,P=C+S;b<P;b++){let D=T.resolveTriangleIndex(b);yt(f,3*D,h,u),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let L=w,N=w+M;L<N;L++){let V=i.resolveTriangleIndex(L);yt(d,3*V,c,l),d.needsUpdate=!0;let z=d.distanceToTriangle(f,m,g);if(z<v&&(y.copy(m),p&&p.copy(g),v=z,x=L,_=b),z<r)return!0}}}})}else{let T=es(e);for(let C=0,S=T;C<S;C++){yt(f,3*C,h,u),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let b=w,P=w+M;b<P;b++){let D=i.resolveTriangleIndex(b);yt(d,3*D,c,l),d.needsUpdate=!0;let L=d.distanceToTriangle(f,m,g);if(L<v&&(y.copy(m),p&&p.copy(g),v=L,x=b,_=C),L<r)return!0}}}}}),ei.releasePrimitive(d),ei.releasePrimitive(f),v===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=v,n.faceIndex=x,s&&(s.point?s.point.copy(p):s.point=p.clone(),s.point.applyMatrix4(Gl),y.applyMatrix4(Gl),s.distance=y.sub(s.point).length(),s.faceIndex=_),n)}function Bd(i,e,t){return i===null?null:(i.point.applyMatrix4(e.matrixWorld),i.distance=i.point.distanceTo(t.ray.origin),i.object=e,i)}var Wl=new St,Xl=new oi,ey=new R,ty=new te,iy=new R,Fd=["getX","getY","getZ"],ql=class i extends Dl{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,s=e._roots,r=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=s.map(l=>l.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=r?r.slice():null):(o.roots=s,o.index=a?a.array:null,o.indirectBuffer=r),o}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:s,roots:r,indirectBuffer:a}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),l(r));let o=new i(t,{...n,[Ea]:!0});if(o._roots=r,o._indirectBuffer=a||null,n.setIndex){let c=t.getIndex();if(c===null){let u=new Be(e.index,1,!1);t.setIndex(u)}else c.array!==s&&(c.array.set(s),c.needsUpdate=!0)}return o;function l(c){for(let u=0;u<c.length;u++){let h=c[u],d=new Uint32Array(h),f=new Uint16Array(h);for(let m=0,y=h.byteLength/32;m<y;m++){let g=8*m,p=2*g;Ye(p,f)||(d[g+6]=d[g+6]/8-m)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let s=this.geometry,r=this._indirectBuffer,a=s.attributes.position,o=s.index?s.index.array:null,c=(r?r[e]:e)*3,u=c+0,h=c+1,d=c+2;o&&(u=o[u],h=o[h],d=o[d]);for(let f=0;f<3;f++){let m=a[Fd[f]](u),y=a[Fd[f]](h),g=a[Fd[f]](d),p=m;y<p&&(p=y),g<p&&(p=g);let v=m;y>v&&(v=y),g>v&&(v=g),t[n+f]=p,t[n+f+3]=v}return t}computePrimitiveBounds(e,t,n){let s=this.geometry,r=this._indirectBuffer,a=s.attributes.position,o=s.index?s.index.array:null,l=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");let c=a.array,u=a.offset||0,h=3;a.isInterleavedBufferAttribute&&(h=a.data.stride);let d=["getX","getY","getZ"],f=n.offset;for(let m=e,y=e+t;m<y;m++){let p=(r?r[m]:m)*3,v=(m-f)*6,x=p+0,_=p+1,w=p+2;o&&(x=o[x],_=o[_],w=o[w]),l||(x=x*h+u,_=_*h+u,w=w*h+u);for(let M=0;M<3;M++){let T,C,S;l?(T=a[d[M]](x),C=a[d[M]](_),S=a[d[M]](w)):(T=c[x+M],C=c[_+M],S=c[w+M]);let b=T;C<b&&(b=C),S<b&&(b=S);let P=T;C>P&&(P=C),S>P&&(P=S);let D=(P-b)/2,L=M*2;n[v+L+0]=b+D,n[v+L+1]=D+(Math.abs(b)+D)*gr}}return n}raycastObject3D(e,t,n=[]){let{material:s}=e;if(s===void 0)return;ty.copy(e.matrixWorld).invert(),Xl.copy(t.ray).applyMatrix4(ty),iy.setFromMatrixScale(e.matrixWorld),ey.copy(Xl.direction).multiply(iy);let r=ey.length(),a=t.near/r,o=t.far/r;if(t.firstHitOnly===!0){let l=this.raycastFirst(Xl,s,a,o);l=Bd(l,e,t),l&&n.push(l)}else{let l=this.raycast(Xl,s,a,o);for(let c=0,u=l.length;c<u;c++){let h=Bd(l[c],e,t);h&&n.push(h)}}return n}refit(e=null){return(this.indirect?jg:zg)(this,e)}raycast(e,t=pi,n=0,s=1/0){let r=this._roots,a=[],o=this.indirect?Zg:Gg;for(let l=0,c=r.length;l<c;l++)o(this,l,t,e,a,n,s);return a}raycastFirst(e,t=pi,n=0,s=1/0){let r=this._roots,a=null,o=this.indirect?$g:Wg;for(let l=0,c=r.length;l<c;l++){let u=o(this,l,t,e,n,s);u!=null&&(a==null||u.distance<a.distance)&&(a=u)}return a}intersectsGeometry(e,t){let n=!1,s=this._roots,r=this.indirect?Jg:qg;for(let a=0,o=s.length;a<o&&(n=r(this,a,e,t),!n);a++);return n}shapecast(e){let t=ei.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?Hg:Fg});return ei.releasePrimitive(t),n}bvhcast(e,t,n){let{intersectsRanges:s,intersectsTriangles:r}=n,a=ei.getPrimitive(),o=this.geometry.index,l=this.geometry.attributes.position,c=ei.getPrimitive(),u=e.geometry.index,h=e.geometry.attributes.position;if(r){if(!(e instanceof i))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');let d=(f,m,y,g,p,v,x,_)=>{for(let w=y,M=y+g;w<M;w++){let T=e.resolveTriangleIndex(w);yt(c,T*3,u,h),c.a.applyMatrix4(t),c.b.applyMatrix4(t),c.c.applyMatrix4(t),c.needsUpdate=!0;for(let C=f,S=f+m;C<S;C++){let b=this.resolveTriangleIndex(C);if(yt(a,b*3,o,l),a.needsUpdate=!0,r(a,c,b,T,p,v,x,_))return!0}}return!1};if(s){let f=s;s=function(m,y,g,p,v,x,_,w){return f(m,y,g,p,v,x,_,w)?!0:d(m,y,g,p,v,x,_,w)}}else s=d}return super.bvhcast(e,t,{intersectsRanges:s})}intersectsBox(e,t){return Wl.set(e.min,e.max,t),Wl.needsUpdate=!0,this.shapecast({intersectsBounds:n=>Wl.intersectsBox(n),intersectsTriangle:n=>Wl.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},s={},r=0,a=1/0){return(this.indirect?Qg:Yg)(this,e,t,n,s,r,a)}closestPointToPoint(e,t={},n=0,s=1/0){return Pg(this,e,t,n,s)}};var DR=parseInt("170")>=166,Pr={Mesh:at.prototype.raycast,Line:dn.prototype.raycast,LineSegments:Nn.prototype.raycast,LineLoop:ms.prototype.raycast,Points:qi.prototype.raycast,BatchedMesh:ia.prototype.raycast},Ft=new at,Yl=[];function ny(i,e){if(this.isBatchedMesh)BT.call(this,i,e);else{let{geometry:t}=this;if(t.boundsTree)t.boundsTree.raycastObject3D(this,i,e);else{let n;if(this instanceof at)n=Pr.Mesh;else if(this instanceof Nn)n=Pr.LineSegments;else if(this instanceof ms)n=Pr.LineLoop;else if(this instanceof dn)n=Pr.Line;else if(this instanceof qi)n=Pr.Points;else throw new Error("BVH: Fallback raycast function not found.");n.call(this,i,e)}}}function BT(i,e){if(this.boundsTrees){let t=this.boundsTrees,n=this._drawInfo||this._instanceInfo,s=this._drawRanges||this._geometryInfo,r=this.matrixWorld;Ft.material=this.material,Ft.geometry=this.geometry;let a=Ft.geometry.boundsTree,o=Ft.geometry.drawRange;Ft.geometry.boundingSphere===null&&(Ft.geometry.boundingSphere=new _t);for(let l=0,c=n.length;l<c;l++){if(!this.getVisibleAt(l))continue;let u=n[l].geometryIndex;if(Ft.geometry.boundsTree=t[u],this.getMatrixAt(l,Ft.matrixWorld).premultiply(r),!Ft.geometry.boundsTree){this.getBoundingBoxAt(u,Ft.geometry.boundingBox),this.getBoundingSphereAt(u,Ft.geometry.boundingSphere);let h=s[u];Ft.geometry.setDrawRange(h.start,h.count)}Ft.raycast(i,Yl);for(let h=0,d=Yl.length;h<d;h++){let f=Yl[h];f.object=this,f.batchId=l,e.push(f)}Yl.length=0}Ft.geometry.boundsTree=a,Ft.geometry.drawRange=o,Ft.material=null,Ft.geometry=null}else Pr.BatchedMesh.call(this,i,e)}function sy(i={}){let{type:e=ql}=i;return this.boundsTree=new e(this,i),this.boundsTree}function ry(){this.boundsTree=null}xt.prototype.computeBoundsTree=sy;xt.prototype.disposeBoundsTree=ry;at.prototype.raycast=ny;var jl=Math.PI/180,zd={"Place Sainte-Anne":[48.11466,-1.68033],"Rue Saint-Michel":[48.1138,-1.6811],"Place des Lices":[48.11288,-1.68428],"Place de la Mairie":[48.1114,-1.6795],"Parlement de Bretagne":[48.1122,-1.67631],R\u00E9publique:[48.10999,-1.67904],"Parc du Thabor":[48.1142,-1.67],Gare:[48.1035,-1.6723]},ay=zd["Place Sainte-Anne"],Ut=i=>document.getElementById(i),FT=new URLSearchParams(location.search),kd=FT.get("key")||localStorage.getItem("gtr_google_key")||"";function oy(){let i=Ut("cle").value.trim();i&&(localStorage.setItem("gtr_google_key",i),kd=i,Ut("ecranCle").style.display="none",ly())}Ut("valider").onclick=oy;Ut("cle").addEventListener("keydown",i=>{i.key==="Enter"&&oy()});Ut("oublier").onclick=()=>{localStorage.removeItem("gtr_google_key"),location.reload()};kd&&(Ut("ecranCle").style.display="none",ly());function ly(){let i=new nr({canvas:Ut("vue"),antialias:!0,logarithmicDepthBuffer:!0});i.setPixelRatio(Math.min(devicePixelRatio,1.5)),i.setSize(innerWidth,innerHeight),i.outputColorSpace=gt;let e=new Io;e.background=new Se(11125980),e.fog=new Po(11125980,600,4e3);let t=new At(70,innerWidth/innerHeight,.1,2e4);e.add(new zo(16777215,6710869,1));let n=new Qu;n.registerPlugin(new id({apiToken:kd,autoRefreshToken:!0}));let s=new Ml().setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");n.registerPlugin(new ud({dracoLoader:s})),n.registerPlugin(new ld),n.registerPlugin(new pd),n.registerPlugin(new fd),n.registerPlugin(new dd({lat:ay[0]*jl,lon:ay[1]*jl,height:0,recenter:!0})),n.errorTarget=6,n.setCamera(t),n.setResolutionFromRenderer(t,i),e.add(n.group),n.addEventListener("load-model",({scene:M})=>{M.traverse(T=>{T.isMesh&&T.geometry&&!T.geometry.boundsTree&&T.geometry.computeBoundsTree()})}),n.addEventListener("dispose-model",({scene:M})=>{M.traverse(T=>{T.isMesh&&T.geometry&&T.geometry.boundsTree&&T.geometry.disposeBoundsTree()})}),n.addEventListener("load-error",M=>{Ut("etat").textContent="Erreur de chargement des tuiles : v\xE9rifie la cl\xE9 API et que \xAB Map Tiles API \xBB est activ\xE9e.",console.error(M)});let r={pos:new R(0,400,0),vy:0,yaw:0,pitch:-.05,auSol:!1,vol:!1,pose:!1},a=1.7,o=.35,l={};addEventListener("keydown",M=>{l[M.code]=!0,M.code==="KeyF"&&(r.vol=!r.vol,r.vy=0,g()),M.code==="Space"&&r.auSol&&!r.vol&&(r.vy=4.5,r.auSol=!1)}),addEventListener("keyup",M=>{l[M.code]=!1}),Ut("vue").addEventListener("click",()=>Ut("vue").requestPointerLock()),addEventListener("mousemove",M=>{document.pointerLockElement===Ut("vue")&&(r.yaw-=M.movementX*.0022,r.pitch=Math.max(-1.45,Math.min(1.45,r.pitch-M.movementY*.0022)))}),addEventListener("resize",()=>{t.aspect=innerWidth/innerHeight,t.updateProjectionMatrix(),i.setSize(innerWidth,innerHeight),n.setResolutionFromRenderer(t,i)});function c(M,T,C){let S=new R;return n.ellipsoid.getCartographicToPosition(M*jl,T*jl,C,S),n.group.updateMatrixWorld(!0),S.applyMatrix4(n.group.matrixWorld)}function u(M){let[T,C]=zd[M],S=c(T,C,0);r.pos.set(S.x,S.y+300,S.z),r.vy=0,r.pose=!1,r.auSol=!1,Ut("etat").textContent="Chargement de "+M+"\u2026"}let h=Ut("lieux");for(let M of Object.keys(zd)){let T=document.createElement("option");T.textContent=M,h.appendChild(T)}h.onchange=()=>{u(h.value),h.blur()};let d=new or;d.firstHitOnly=!0;let f=new R(0,-1,0);function m(M,T,C,S=2.5){d.set(new R(M,T+S,C),f),d.far=S+600;let b=d.intersectObject(n.group,!0)[0];return b?b.point.y:null}function y(M,T,C){return d.set(M,T),d.far=C+o,d.intersectObject(n.group,!0).length>0}function g(){Ut("aide").innerHTML="Clic : prendre la souris \xB7 ZQSD/WASD : marcher \xB7 Maj : courir \xB7 Espace : sauter \xB7 F : "+(r.vol?"<b>vol (actif)</b>":"vol")+" \xB7 \xC9chap : lib\xE9rer la souris"}g();let p=new ra,v=new R,x=new R,_=new R;function w(){let M=Math.min(p.getDelta(),.05);v.set(-Math.sin(r.yaw),0,-Math.cos(r.yaw)),x.set(-v.z,0,v.x),_.set(0,0,0),(l.KeyW||l.KeyZ||l.ArrowUp)&&_.add(v),(l.KeyS||l.ArrowDown)&&_.sub(v),(l.KeyD||l.ArrowRight)&&_.add(x),(l.KeyA||l.KeyQ||l.ArrowLeft)&&_.sub(x);let T=r.vol?l.ShiftLeft?60:18:l.ShiftLeft?6.5:1.6;if(_.lengthSq()>0){if(_.normalize().multiplyScalar(T*M),r.vol)r.pos.add(_);else if(r.pose){let S=r.pos.clone();S.y+=1;let b=_.clone().normalize();if(!y(S,b,_.length())){let P=r.pos.x+_.x,D=r.pos.z+_.z,L=m(P,r.pos.y,D,.45);(L===null||L<=r.pos.y+.45)&&(r.pos.x=P,r.pos.z=D)}}}if(r.vol)l.Space&&(r.pos.y+=T*M),(l.ControlLeft||l.KeyC)&&(r.pos.y-=T*M);else{let S=m(r.pos.x,r.pos.y,r.pos.z,r.pose?.6:600);S!==null?(r.pose||(r.pos.y=S,r.pose=!0,Ut("etat").textContent=""),r.vy-=9.8*M,r.pos.y+=r.vy*M,r.pos.y<=S&&(r.pos.y=S,r.vy=0,r.auSol=!0)):r.pose||(Ut("etat").textContent=Ut("etat").textContent||"Chargement de la ville\u2026")}t.position.set(r.pos.x,r.pos.y+(r.vol?0:a),r.pos.z),t.rotation.set(r.pitch,r.yaw,0,"YXZ"),t.updateMatrixWorld(),n.update(),i.render(e,t);let C=n.getAttributions().filter(S=>S.type==="string").map(S=>S.value).join(" \xB7 ");Ut("credits").textContent=C?"Google \xB7 "+C:"Google",requestAnimationFrame(w)}w()}})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
