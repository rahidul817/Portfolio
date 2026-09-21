'use strict';
const featureSearch=document.getElementById('project-search');
const featureCards=[...document.querySelectorAll('#projects .project')];
const featureFilters=[...document.querySelectorAll('.filters button')];
function updateProjectResults(){
 const query=featureSearch.value.trim().toLowerCase();
 const category=featureFilters.find(b=>b.getAttribute('aria-pressed')==='true')?.textContent.trim()||'All';
 let count=0;
 featureCards.forEach(card=>{const match=(!query||card.textContent.toLowerCase().includes(query))&&(category==='All'||card.dataset.category===category);card.hidden=!match;if(match)count++});
 document.getElementById('project-count').textContent=`${count} ${count===1?'project':'projects'}`;
 document.getElementById('search-empty').hidden=count!==0;
}
featureSearch.addEventListener('input',updateProjectResults);
featureFilters.forEach(button=>button.addEventListener('click',updateProjectResults));
const menuToggle=document.querySelector('.menu-toggle'),mainNavigation=document.getElementById('main-navigation');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');mainNavigation.classList.remove('menu-open')}
menuToggle.addEventListener('click',()=>{const expanded=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(expanded));mainNavigation.classList.toggle('menu-open',expanded)});
mainNavigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const detailDialog=document.getElementById('project-dialog');let detailTrigger=null;
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
 detailTrigger=button;const content=document.getElementById('dialog-content');content.replaceChildren(document.getElementById(button.dataset.detail).content.cloneNode(true));content.querySelector('h2').id='dialog-title';
 const links=button.closest('article').querySelector('.project-links');if(links&&links.children.length)content.append(links.cloneNode(true));
 detailDialog.showModal();document.body.classList.add('dialog-open');
}));
detailDialog.querySelector('.dialog-close').addEventListener('click',()=>detailDialog.close());
detailDialog.addEventListener('click',e=>{if(e.target===detailDialog){const r=detailDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)detailDialog.close()}});
detailDialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');detailTrigger?.focus()});
document.getElementById('copy-email').addEventListener('click',async()=>{const s=document.getElementById('copy-email-status');try{await navigator.clipboard.writeText('rahidul817@gmail.com');s.textContent='Email copied.'}catch{s.textContent='Email: rahidul817@gmail.com'}});
const topButton=document.querySelector('.back-top');
window.addEventListener('scroll',()=>{topButton.hidden=window.scrollY<600},{passive:true});
topButton.addEventListener('click',()=>{window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.querySelector('.brand').focus({preventScroll:true})});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){mainNavigation.querySelectorAll('a[href^="#"]').forEach(a=>{if(a.getAttribute('href')==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}},{rootMargin:'-15% 0px -65% 0px',threshold:0});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));}
