'use strict';
const products = [
 {id:'sutlu',name:'Sütlü Çikolata',category:'tablet',categoryLabel:'Tablet Çikolata',image:'sutlu.webp',description:'Yumuşacık sütlü çikolata deneyimi. Her lokmada KIVA’nın klasik mutluluğunu keşfet.'},
 {id:'bitter',name:'Bitter Çikolata',category:'tablet',categoryLabel:'Tablet Çikolata',image:'bitter.webp',description:'Yoğun kakao karakteri ve kendine has tadıyla bitter çikolata keyfi.'},
 {id:'findikli',name:'Fındıklı Çikolata',category:'tablet',categoryLabel:'Tablet Çikolata',image:'findikli.webp',description:'Fındığın kendine özgü aroması ve çikolatanın lezzeti bir arada.'},
 {id:'draje',name:'Çikolata Kaplı Draje',category:'kavanoz',categoryLabel:'Kavanoz Lezzetleri',image:'draje.webp',description:'Paylaşmaya değer çikolata kaplı drajelerle küçük mutluluklar.'},
 {id:'krema',name:'Kakaolu Fındık Kreması',category:'kavanoz',categoryLabel:'Kavanoz Lezzetleri',image:'krema.webp',description:'Kakaolu fındık kremasıyla tatlı molalara ve kahvaltılara keyif kat.'},
 {id:'sos',name:'Çikolata Sosu',category:'kavanoz',categoryLabel:'Kavanoz Lezzetleri',image:'sos.webp',description:'Tatlıların yanına yoğun çikolata lezzeti taşıyan KIVA çikolata sosu.'},
 {id:'anneler',name:'Anneler Günü Seti',category:'hediye',categoryLabel:'Özel Gün Setleri',image:'anneler.webp',description:'Anneler Günü için özenle tasarlanmış özel çikolata koleksiyonu.'},
 {id:'sevgililer',name:'Sevgililer Günü Seti',category:'hediye',categoryLabel:'Özel Gün Setleri',image:'sevgililer.webp',description:'Sevdiklerine tatlı bir sürpriz sunan özel çikolata koleksiyonu.'}
];
const $ = (selector) => document.querySelector(selector);
const grid = $('#productGrid');
const dialog = $('#productDialog');
let lastTrigger = null;
function showProduct(p, trigger) {
 lastTrigger = trigger || document.activeElement;
 $('#dialogImage').src = 'assets/' + p.image;
 $('#dialogImage').alt = 'KIVA ' + p.name + ' ürün ambalajı';
 $('#dialogCategory').textContent = p.categoryLabel;
 $('#dialogTitle').textContent = p.name;
 $('#dialogDescription').textContent = p.description;
 if (typeof dialog.showModal === 'function') dialog.showModal();
 else dialog.setAttribute('open','');
 $('#dialogClose').focus();
}
function closeProduct() {
 dialog.close();
 if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus();
}
function renderProducts(category='all') {
 const fragment = document.createDocumentFragment();
 for (const p of products.filter(p=>category==='all'||p.category===category)) {
  const article=document.createElement('article'); article.className='product-card'; article.dataset.category=p.category;
  const visual=document.createElement('div');visual.className='product-visual';
  const image=document.createElement('img'); image.src='assets/'+p.image;image.alt='KIVA '+p.name+' ürün ambalajı';image.loading='lazy';image.decoding='async';image.width=500;image.height=600;visual.append(image);
  const body=document.createElement('div');body.className='product-body';
  const cat=document.createElement('p');cat.className='product-category';cat.textContent=p.categoryLabel;
  const name=document.createElement('h3');name.textContent=p.name;
  const button=document.createElement('button');button.className='product-detail';button.type='button';button.textContent='Ürünü incele ↗';button.setAttribute('aria-label',p.name+' ürününü incele');button.addEventListener('click',()=>showProduct(p,button));
  body.append(cat,name,button);article.append(visual,body);fragment.append(article);
 }
 grid.replaceChildren(fragment);
}
renderProducts();
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false')});
 button.classList.add('is-active');button.setAttribute('aria-pressed','true');renderProducts(button.dataset.filter);
}));
document.querySelectorAll('[data-product]').forEach(b=>b.addEventListener('click',()=>{const p=products.find(p=>p.id===b.dataset.product);if(p)showProduct(p,b)}));
$('#dialogClose').addEventListener('click',closeProduct);
dialog.addEventListener('click',event=>{if(event.target===dialog)closeProduct()});
$('#dialogContact').addEventListener('click',()=>{dialog.close()});
const slides=[{name:'Sütlü Çikolata',subtitle:'Her lokmada mutluluk',image:'sutlu.webp'},{name:'Bitter Çikolata',subtitle:'Yoğun kakao deneyimi',image:'bitter.webp'},{name:'Fındıklı Çikolata',subtitle:'Fındığın kendine özgü aroması',image:'findikli.webp'}];
let slideIndex=0;
function changeSlide(delta){slideIndex=(slideIndex+delta+slides.length)%slides.length;const item=slides[slideIndex];const image=$('#heroImage');image.src='assets/'+item.image;image.alt='KIVA '+item.name+' ambalajı';image.classList.remove('changing');void image.offsetWidth;image.classList.add('changing');$('#heroName').textContent=item.name;$('#heroSubtitle').textContent=item.subtitle;$('#heroCount').textContent=String(slideIndex+1).padStart(2,'0')+' / 03'}
$('#heroPrev').addEventListener('click',()=>changeSlide(-1));$('#heroNext').addEventListener('click',()=>changeSlide(1));
const menuButton=$('#menuToggle'),nav=$('#mainNav');
function closeMenu(){nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Menüyü aç')}
menuButton.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')==='true';nav.classList.toggle('is-open',!expanded);menuButton.setAttribute('aria-expanded',String(!expanded));menuButton.setAttribute('aria-label',expanded?'Menüyü aç':'Menüyü kapat')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});
const topButton=$('#toTop');
let scrollQueued=false;
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(()=>{topButton.classList.toggle('is-visible',window.scrollY>600);scrollQueued=false})}},{passive:true});
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
$('#year').textContent=new Date().getFullYear();
const form=$('#contactForm');
form.addEventListener('submit',async event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const send=$('#sendButton'),status=$('#formStatus');send.disabled=true;send.textContent='Gönderiliyor…';status.textContent='';
 try{
  const ctrl=new AbortController();const timeout=setTimeout(()=>ctrl.abort(),15000);
  try {const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:ctrl.signal});const data=await response.json();if(!response.ok||!data.success)throw new Error('Form gönderimi başarısız');status.textContent='Mesajın iletildi. Teşekkür ederiz!';form.reset()}
  finally{clearTimeout(timeout)}
 }catch(error){status.textContent=error.name==='AbortError'?'İstek zaman aşımına uğradı. Yeniden deneyebilirsin.':'Mesaj gönderilemedi. Lütfen bağlantını kontrol edip tekrar dene.'}
 finally{send.disabled=false;send.textContent='Mesajı gönder ↗'}
});
