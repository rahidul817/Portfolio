(() => {
 'use strict';
 const eligible=window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
 const host=document.querySelector('.portfolio');
 const cursor=document.createElement('div');cursor.className='cursor-follower';cursor.setAttribute('aria-hidden','true');host.append(cursor);
 let targetX=0,targetY=0,x=0,y=0,frame=0,visible=false;
 function stop(){visible=false;cursor.classList.remove('is-visible','is-interactive');if(frame)cancelAnimationFrame(frame);frame=0;}
 function tick(){frame=0;if(!visible)return;x+=(targetX-x)*.22;y+=(targetY-y)*.22;cursor.style.transform=`translate3d(${x}px,${y}px,0)`;if(Math.abs(targetX-x)+Math.abs(targetY-y)>.15)frame=requestAnimationFrame(tick);}
 document.addEventListener('pointermove',event=>{
  if(!eligible.matches||event.pointerType!=='mouse'||event.target.closest('input,textarea,select,dialog')){stop();return;}
  targetX=event.clientX;targetY=event.clientY;
  if(!visible){x=targetX;y=targetY;visible=true;cursor.classList.add('is-visible');}
  cursor.classList.toggle('is-interactive',Boolean(event.target.closest('a,button,.project')));
  if(!frame)frame=requestAnimationFrame(tick);
 },{passive:true});
 document.documentElement.addEventListener('pointerleave',stop);
 window.addEventListener('blur',stop);window.addEventListener('scroll',stop,{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
 document.addEventListener('keydown',event=>{if(event.key==='Tab'||event.key==='Escape')stop()});
 eligible.addEventListener('change',stop);
 document.querySelectorAll('#projects .project,#research .project').forEach(card=>{
  let pending=0,px=0,py=0;
  const clear=()=>{card.classList.remove('pointer-over');if(pending)cancelAnimationFrame(pending);pending=0;};
  card.addEventListener('pointermove',event=>{
   if(!eligible.matches||event.pointerType!=='mouse')return;
   const rect=card.getBoundingClientRect();px=event.clientX-rect.left;py=event.clientY-rect.top;
   if(!pending)pending=requestAnimationFrame(()=>{pending=0;card.style.setProperty('--spot-x',px+'px');card.style.setProperty('--spot-y',py+'px');card.classList.add('pointer-over');});
  },{passive:true});
  card.addEventListener('pointerleave',clear);eligible.addEventListener('change',clear);window.addEventListener('blur',clear);
 });
})();
