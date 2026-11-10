'use strict';
const profile = window.portfolioProfile || {};
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Saved theme is optional: all interactions continue to work if storage is blocked.
const themeButton = $('.theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  $('use', themeButton).setAttribute('href', theme === 'dark' ? '#sun' : '#moon');
  $('meta[name="theme-color"]').content = theme === 'dark' ? '#050505' : '#f7f8fc';
}
try { if (localStorage.getItem('portfolio-theme') === 'light') setTheme('light'); } catch {}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch {}
});
$('#year').textContent = new Date().getFullYear();

const menuButton = $('.menu-toggle');
const mobileMenu = $('#mobile-nav');
function closeMenu() { mobileMenu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); }
menuButton.addEventListener('click', () => {
  const open = mobileMenu.hidden;
  mobileMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
$$('a', mobileMenu).forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!mobileMenu.hidden && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
window.matchMedia('(min-width: 1151px)').addEventListener('change', event => { if(event.matches) closeMenu(); });

const navLinks = $$('.desktop-nav a, .floating-dock a, #mobile-nav a');
const sections = $$('main section[id]');
function markSection(id) {
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
}
let scrollQueued = false;
function updateScroll() {
  let current = 'home';
  for (const section of sections) if (section.getBoundingClientRect().top <= window.innerHeight * .35) current = section.id;
  markSection(current);
  $('.back-top').classList.toggle('visible', window.scrollY > 650);
  scrollQueued = false;
}
window.addEventListener('scroll', () => { if(!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }, {passive:true});
updateScroll();

// Content remains visible without JavaScript or IntersectionObserver support.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
  }, {threshold: .06, rootMargin: '0px 0px 30px 0px'});
  $$('.reveal').forEach(element => revealObserver.observe(element));
}
reducedMotion.addEventListener('change', event => { if(event.matches) document.documentElement.classList.remove('motion-ready'); });

// Fade between real focus areas; never advertise unprovided credentials.
const roles = ['AI Agent Developer', 'Python Agent Developer', 'Automation Engineer', 'AI-Assisted Developer'];
let roleIndex = 0;
setInterval(() => {
  if(reducedMotion.matches || document.hidden) return;
  const element = $('#rotating-role');
  element.classList.add('role-exit');
  setTimeout(() => { roleIndex = (roleIndex + 1) % roles.length; element.textContent = roles[roleIndex]; $('#role-article').textContent = /^[aeiou]/i.test(roles[roleIndex]) ? 'an' : 'a'; element.classList.remove('role-exit'); }, 240);
}, 3400);

const card = $('#profile-card');
let pointerStart = null, hasDragged = false, suppressClick = false;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
function resetCard() {
  card.style.setProperty('--rx','0deg'); card.style.setProperty('--ry','0deg');
  card.style.setProperty('--drag-x','0px'); card.style.setProperty('--drag-y','0px');
}
card.addEventListener('pointermove', event => {
  if(reducedMotion.matches || event.pointerType !== 'mouse') return;
  const bounds = card.getBoundingClientRect();
  const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
  const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
  card.style.setProperty('--shine-x',`${x*100}%`); card.style.setProperty('--shine-y',`${y*100}%`);
  card.style.setProperty('--rx',`${(0.5-y)*12}deg`); card.style.setProperty('--ry',`${(x-0.5)*16}deg`);
  if(pointerStart) {
    const dx = event.clientX - pointerStart.x, dy = event.clientY - pointerStart.y;
    if(Math.hypot(dx,dy)>5) { hasDragged = true; card.classList.add('dragging'); }
    card.style.setProperty('--drag-x',`${clamp(dx*.3,-38,38)}px`); card.style.setProperty('--drag-y',`${clamp(dy*.2,-26,26)}px`);
  }
});
card.addEventListener('pointerdown', event => {
  if(event.pointerType !== 'mouse' || event.button !== 0 || reducedMotion.matches) return;
  pointerStart = {x:event.clientX,y:event.clientY}; hasDragged = false; card.setPointerCapture(event.pointerId);
});
function finishDrag() {
  suppressClick = hasDragged; pointerStart = null; hasDragged = false; card.classList.remove('dragging'); resetCard();
}
card.addEventListener('pointerup', finishDrag);
card.addEventListener('pointercancel', finishDrag);
card.addEventListener('lostpointercapture', () => { pointerStart=null; card.classList.remove('dragging'); resetCard(); });
card.addEventListener('pointerleave', () => { if(!pointerStart) resetCard(); });
card.addEventListener('blur', resetCard);
card.addEventListener('click', () => {
  if(suppressClick) { suppressClick=false; return; }
  const flipped = card.classList.toggle('flipped'); card.setAttribute('aria-pressed',String(flipped));
  card.setAttribute('aria-label',flipped ? 'Profile card back. Click to return to Abdullah’s details.' : 'Abdullah’s interactive profile card. Click to flip; use arrow keys to tilt.');
});
card.addEventListener('keydown', event => {
  const transforms = {ArrowLeft:['--ry','-13deg'],ArrowRight:['--ry','13deg'],ArrowUp:['--rx','13deg'],ArrowDown:['--rx','-13deg']};
  if(transforms[event.key] && !reducedMotion.matches) {event.preventDefault(); const [key,value]=transforms[event.key];card.style.setProperty(key,value);}
});
card.addEventListener('keyup', event => { if(event.key.startsWith('Arrow')) resetCard(); });

if(finePointer.matches && !reducedMotion.matches) {
  const spark = $('.pointer-spark'), glow = $('.cursor-glow'); let framePending=false, px=0,py=0;
  document.addEventListener('pointermove', event => {
    if(event.pointerType !== 'mouse') return;
    px=event.clientX;py=event.clientY;
    if(!framePending) { framePending=true; requestAnimationFrame(()=>{
      if(!reducedMotion.matches) {
        spark.style.opacity='.95';spark.style.transform=`translate(${px+12}px,${py+14}px) rotate(-15deg)`;
        glow.style.opacity='1';glow.style.transform=`translate(${px-220}px,${py-220}px)`;
      }
      framePending=false;
    }); }
  }, {passive:true});
  document.documentElement.addEventListener('pointerleave',()=>{spark.style.opacity='0';glow.style.opacity='0';});
}

$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  $$('[data-filter]').forEach(item => {const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected));});
  $$('[data-category]').forEach(group => {group.hidden=category!=='all' && group.dataset.category!==category;group.classList.remove('entering');if(!group.hidden){void group.offsetWidth;group.classList.add('entering');}});
}));

const projectDetails = {
  clientflow: {kind:'INTERFACE STUDY',title:'ClientFlow',description:'A client-workflow interface study exploring a clearer journey from the initial conversation to the next action.',steps:['Create a clear starting point for the client journey.','Present the process as connected stages rather than disconnected tasks.','Use a consistent visual hierarchy to make the next step easier to understand.'],note:'Illustrative interface study: connect, coordinate, deliver. No specific technology stack or live integration is claimed.'},
  skydust: {kind:'SELECTED PROJECT',title:'Skydust Connection',description:'A fragrance storefront designed around product discovery, clear collections, and a responsive shopping experience.',steps:['Organize scent products into clear, browsable collections.','Present diffusers, aroma oils, and home fragrances with consistent product imagery.','Support a responsive interface across desktop and mobile.','Keep the visual identity consistent throughout the product experience.'],note:'Based on the public project README and source. Portfolio preview uses the project’s original diffuser image within a recreated storefront frame.'},
  dispatchpro: {kind:'SELECTED PROJECT',title:'DispatchPro',description:'A browser-based truck dispatching dashboard that brings load records, carriers, rates, and dispatch earnings into one workspace.',steps:['Create and manage loads with routes, appointments, brokers, mileage, and notes.','Keep carrier and equipment information alongside load assignments.','Compare broker, target, and negotiated rates with revenue-per-mile and dispatch-fee calculations.','Track the load lifecycle and export filtered records to CSV.'],note:'Public portfolio demo with fictional sample records and browser-local storage. The dashboard preview is an interface illustration.'},
  agents: {title:'Task-oriented Python agents.',description:'An illustrative Python AI-agent architecture connecting a language model to useful tools and business APIs.',steps:['Receive a request and check the information needed for the task.','Use a language model to choose an appropriate connected tool.','Execute permitted tool actions through a Python API layer.','Review the result, handle exceptions, and escalate decisions that need a person.']},
  workflow: { title:'Workflow architecture.',description:'An illustrative n8n workflow that connects an incoming event to a practical business action.',steps:['Capture an incoming form, message, or event.','Check and organize the information.','Route it to the right tool or human reviewer.','Record the outcome and handle exceptions.'] },
  tools: {title:'Purpose-built interfaces.',description:'An illustrative approach to building a small business interface with AI-assisted development.',steps:['Choose one clearly defined task.','Build an interface around the person doing the task.','Connect the workflow behind the interface.','Test real scenarios and refine the result.']},
  handoff: {title:'A better handoff.',description:'A concept for organizing incoming requests without losing the human review step.',steps:['Capture a request and its context.','Organize the details needed for the next action.','Prepare a clear summary for a reviewer.','Continue the workflow after human approval.']}
};
const projectDialog = $('#project-dialog');
$$('.project-open').forEach(button => button.addEventListener('click', () => {
  const concept=projectDetails[button.dataset.project];
  $('#dialog-kind').textContent=concept.kind || 'CONCEPT STUDY';
  $('#dialog-note').textContent=concept.note || 'Illustrative concept study exploring system design and implementation options.';
  $('#dialog-title').textContent=concept.title;$('#dialog-description').textContent=concept.description;
  $('#dialog-steps').replaceChildren(...concept.steps.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  projectDialog.showModal();
}));
$$('.dialog-close').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
$$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}}));
$('.dialog-contact').addEventListener('click',()=>projectDialog.close());

function downloadText(filename, text) {
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download=filename;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
if(profile.portrait) { $$('[data-portrait]').forEach(image=>{image.src=profile.portrait;image.alt='Portrait of Abdullah Malik';image.addEventListener('error',()=>{image.src='assets/portrait.svg';image.alt='AM monogram; profile photo unavailable';},{once:true});}); }
if(profile.linkedin) {
  try {const url=new URL(profile.linkedin);if(url.protocol==='https:' && (url.hostname==='linkedin.com'||url.hostname==='www.linkedin.com')){
    $$('[data-socials]').forEach(container=>{const a=document.createElement('a');a.className='icon-button';a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label','Abdullah’s LinkedIn');a.innerHTML='<span class="linkedin-mark" aria-hidden="true">in</span>';container.prepend(a);});
  }} catch {}
}
if(profile.location) $('#contact-location').textContent=profile.location;
const validEmail = typeof profile.email === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(profile.email);
if(validEmail) {
  const a=document.createElement('a');a.href=`mailto:${profile.email}`;a.textContent=profile.email;$('#contact-address').replaceChildren(a);
  $('#submit-label').textContent='Start a Conversation';$('#form-note').textContent='Opens your email app. Nothing is sent automatically.';
  $$('[data-socials]').forEach(container=>{let a=$('a[aria-label="Contact Abdullah"]',container);if(!a){a=document.createElement('a');a.className='icon-button';a.setAttribute('aria-label','Email Abdullah');a.innerHTML='<svg><use href="#mail"/></svg>';container.append(a);}a.href=`mailto:${profile.email}`;a.setAttribute('aria-label','Email Abdullah');});
}
let messageDraft='';
$('#contact-form').addEventListener('submit',event=>{
  event.preventDefault();
  const values=new FormData(event.currentTarget);
  const name=String(values.get('name')).trim(), email=String(values.get('email')).trim(), subject=String(values.get('subject')).trim(), message=String(values.get('message')).trim();
  if(!name || !subject || !message){const feedback=$('#form-feedback');feedback.hidden=false;feedback.textContent='Please complete the name, subject, and message fields.';return;}
  messageDraft=`Subject: ${subject}\nFrom: ${name} <${email}>\n\n${message}`;
  if(validEmail){
    const body=`${message}\n\nFrom: ${name}\nEmail: ${email}`;
    const draftLink=document.createElement('a');
    draftLink.href=`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    draftLink.target='_blank';draftLink.rel='noopener noreferrer';document.body.append(draftLink);draftLink.click();draftLink.remove();
    const feedback=$('#form-feedback');feedback.hidden=false;feedback.textContent='Email draft requested. Review and send it in your email app; nothing has been sent by this website.';
  } else {$('#message-preview').textContent=messageDraft;$('#message-dialog').showModal();}
});
$('#download-message').addEventListener('click',()=>downloadText('message-draft.txt',messageDraft));
