'use strict';
const sortControl=document.getElementById('project-sort');
const projectGrid=document.querySelector('#projects .projects');
const originalProjectOrder=[...projectGrid.querySelectorAll('.project')];
function applyProjectSort(){const sorted=[...originalProjectOrder];if(sortControl.value==='az')sorted.sort((a,b)=>a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent));else if(sortControl.value==='category')sorted.sort((a,b)=>a.dataset.category.localeCompare(b.dataset.category));sorted.forEach(card=>projectGrid.append(card));}
sortControl.addEventListener('change',applyProjectSort);
document.getElementById('reset-projects').addEventListener('click',()=>{document.getElementById('project-search').value='';sortControl.value='featured';applyProjectSort();const all=[...document.querySelectorAll('.filters button')].find(b=>b.textContent.trim()==='All');all.click();document.getElementById('project-search').focus();});
document.getElementById('project-search').addEventListener('keydown',e=>{if(e.key==='Escape'){e.currentTarget.value='';e.currentTarget.dispatchEvent(new Event('input',{bubbles:true}));}});
try{if(localStorage.getItem('portfolio-theme')===null){const systemLight=window.matchMedia('(prefers-color-scheme: light)').matches;document.querySelector('.portfolio').classList.toggle('light',systemLight);document.querySelector('.theme').setAttribute('aria-label',systemLight?'Use dark theme':'Use light theme');document.querySelector('.theme').setAttribute('aria-pressed',String(systemLight));}}catch{}
