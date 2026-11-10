'use strict';
const button=document.querySelector('.theme-toggle');
function setTheme(theme){document.documentElement.dataset.theme=theme;button.setAttribute('aria-label',`Switch to ${theme==='dark'?'light':'dark'} theme`);button.querySelector('use').setAttribute('href',theme==='dark'?'#sun':'#moon');document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#050505':'#f7f8fc';}
try{if(localStorage.getItem('portfolio-theme')==='light')setTheme('light');}catch{}
button.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(theme);try{localStorage.setItem('portfolio-theme',theme);}catch{}});
