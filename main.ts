import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',E=new TextEncoder;
function run(p,q){
 const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 let s=0,c=0,l=0,i=0,x=0,t=0;
 const end=v=>[o.slice(0,l),v];
 for(;;){
  if(t===1e6)return end(10);
  if(x<0||x>=n)return end(9);
  const b=p[x];
  if(!(b<8||b>15&&b<35||b>47&&b<53||b==64||b==65||b>79&&b<84))return end(5);
  const m=b==1?1:b==2?4:b>47&&b<52?2:0;
  if(x+m>=n)return end(9);
  t++;const y=x+1+m;x=y;
  switch(b){
   case 0:return end(0);
   case 1:if(s>255)return end(3);D[s++]=(p[y-1]<<24)>>24;break;
   case 2:if(s>255)return end(3);D[s++]=p[y-4]|p[y-3]<<8|p[y-2]<<16|p[y-1]<<24;break;
   case 3:if(s<1)return end(2);s--;break;
   case 4:if(s<1)return end(2);if(s>255)return end(3);D[s]=D[s-1];s++;break;
   case 5:if(s<2)return end(2);{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;}break;
   case 6:if(s<2)return end(2);if(s>255)return end(3);D[s]=D[s-2];s++;break;
   case 7:if(s<3)return end(2);{const v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;}break;
   case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
    if(s<2)return end(2);
    const v=D[s-1],a=D[s-2];let r;
    if(b==16)r=(a+v)|0;
    else if(b==17)r=(a-v)|0;
    else if(b==18)r=Math.imul(a,v);
    else if(b==19){if(!v)return end(4);r=(a/v)|0;}
    else if(b==20){if(!v)return end(4);r=a%v|0;}
    else if(b==21){if(!v)return end(4);r=Math.floor((a>>>0)/(v>>>0))|0;}
    else if(b==22){if(!v)return end(4);r=(a>>>0)%(v>>>0)|0;}
    else if(b==24)r=a&v;
    else if(b==25)r=a|v;
    else if(b==26)r=a^v;
    else if(b==28)r=a<<(v&31);
    else if(b==29)r=a>>(v&31);
    else if(b==30)r=(a>>>(v&31))|0;
    else if(b==32)r=a===v?1:0;
    else if(b==33)r=a<v?1:0;
    else r=(a>>>0)<(v>>>0)?1:0;
    s-=2;D[s++]=r;break;}
   case 23:if(s<1)return end(2);D[s-1]=-D[s-1]|0;break;
   case 27:if(s<1)return end(2);D[s-1]=~D[s-1];break;
   case 48:case 49:case 50:{
    const r=((p[y-2]|p[y-1]<<8)<<16)>>16;
    if(b!==48){if(s<1)return end(2);const v=D[--s];if((b===49)!==(v===0))break;}
    x=y+r;break;}
   case 51:if(c>63)return end(7);C[c++]=y;x=p[y-2]|p[y-1]<<8;break;
   case 52:if(!c)return end(8);x=C[--c];break;
   case 64:if(s<1)return end(2);{const a=D[s-1];if(a<0||a>255)return end(6);D[s-1]=M[a];}break;
   case 65:if(s<2)return end(2);{const a=D[s-1];if(a<0||a>255)return end(6);M[a]=D[s-2];s-=2;}break;
   case 80:if(s<1)return end(2);{const d=E.encode(String(D[s-1]));if(l+d.length>65536)return end(11);s--;o.set(d,l);l+=d.length;}break;
   case 81:if(s<1)return end(2);if(l>65535)return end(11);o[l++]=D[--s]&255;break;
   case 82:if(s>255)return end(3);D[s++]=i<q.length?q[i++]:-1;break;
   case 83:if(s<1)return end(2);return end(D[--s]&255);
   default:return end(5);
  }
 }
}
for(const d of readdirSync(I).sort()){
 const r=run(readFileSync(join(I,d,'program.bin')),readFileSync(join(I,d,'input.bin')));
 mkdirSync(join(O,d),{recursive:true});
 writeFileSync(join(O,d,'stdout.bin'),r[0]);
 writeFileSync(join(O,d,'exit.txt'),r[1]+'\n');
}
