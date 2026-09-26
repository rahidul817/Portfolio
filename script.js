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
const projects = [...document.querySelectorAll('#projects .project')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{
 const category=button.textContent.trim();
 filterButtons.forEach(other=>{other.classList.toggle('selected',other===button);other.setAttribute('aria-pressed',String(other===button));});
 projects.forEach(project=>project.hidden=category!=='All'&&project.dataset.category!==category);
}));

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
function prepareMessage() {
 if (!contactForm.reportValidity()) return null;
 const values = new FormData(contactForm);
 const name=String(values.get('name')).trim();
 const email=String(values.get('email')).trim();
 const topic=String(values.get('topic') || 'Question');
 const subject=topic+' — Portfolio enquiry from '+name;
 const message=String(values.get('message')).trim();
 if(!name || message.length<5){formStatus.textContent='Please add your name and a short message (at least 5 characters).';return null;}
 return {subject,body:`Name: ${name}\nEmail: ${email}\n\n${message}`};
}
contactForm.addEventListener('submit',event=>{
 event.preventDefault();const draft=prepareMessage();if(!draft)return;
 const href='mailto:rahidul817@gmail.com?subject='+encodeURIComponent(draft.subject)+'&body='+encodeURIComponent(draft.body);
 window.location.href=href;
 formStatus.textContent='Your email app should open with a draft. Review it and press Send there. If it does not open, use Copy message and email rahidul817@gmail.com.';
});
document.getElementById('copy-message').addEventListener('click',async()=>{
 const draft=prepareMessage();if(!draft)return;
 try{await navigator.clipboard.writeText('Subject: '+draft.subject+'\n\n'+draft.body);formStatus.textContent='Message copied. Paste it into an email to rahidul817@gmail.com.';}
 catch{formStatus.textContent='Clipboard access is unavailable. Please select and copy your message, then email rahidul817@gmail.com.';}
});

document.getElementById('gmail-message').addEventListener('click',()=>{const draft=prepareMessage();if(!draft)return;const url='https://mail.google.com/mail/?view=cm&fs=1&to=rahidul817%40gmail.com&su='+encodeURIComponent(draft.subject)+'&body='+encodeURIComponent(draft.body);window.open(url,'_blank','noopener,noreferrer');formStatus.textContent='Gmail will open with your message. Review it and press Send. If no tab opens, use Copy message.';});

// Keep the preview local; no draft is saved or sent by this website.
const messageInput = document.getElementById('contact-message');
function updateContactPreview() {
 const values = new FormData(contactForm);
 document.getElementById('message-count').textContent = messageInput.value.length.toLocaleString() + ' / 3,000';
 document.getElementById('preview-subject').textContent = String(values.get('topic') || 'Question') + ' — Portfolio enquiry from ' + (String(values.get('name') || '').trim() || 'Your name');
 document.getElementById('preview-body').textContent = 'Name: ' + (values.get('name') || 'Your name') + '\nEmail: ' + (values.get('email') || 'Your email') + '\n\n' + (values.get('message') || 'Your message will appear here as you type.');
}
contactForm.addEventListener('input', () => { formStatus.textContent = ''; updateContactPreview(); });
contactForm.addEventListener('change', updateContactPreview);
updateContactPreview();
