'use strict';
const portfolio = document.querySelector('.portfolio');
const themeButton = document.querySelector('.theme');
function setTheme(light) {
 portfolio.classList.toggle('light',light);
 themeButton.setAttribute('aria-label',light?'Use dark theme':'Use light theme');
 themeButton.setAttribute('aria-pressed',String(light));
}
try { setTheme(localStorage.getItem('portfolio-theme')==='light'); } catch {}
themeButton.addEventListener('click',()=>{const light=!portfolio.classList.contains('light');setTheme(light);try{localStorage.setItem('portfolio-theme',light?'light':'dark')}catch{}});
const filterButtons = [...document.querySelectorAll('.filters button')];
const projects = [...document.querySelectorAll('.project')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{
 const category=button.textContent.trim();
 filterButtons.forEach(other=>{other.classList.toggle('selected',other===button);other.setAttribute('aria-pressed',String(other===button));});
 projects.forEach(project=>project.hidden=category!=='All'&&project.dataset.category!==category);
}));
