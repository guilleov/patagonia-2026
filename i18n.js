// Bilingual pages: every text exists twice, as lang="es" and lang="en" siblings, and
// style.css hides the inactive one. Spanish is the default; the choice is per browser.
(function(){
  var KEY = 'patagonia_lang', lang = 'es';
  try { lang = localStorage.getItem(KEY) || 'es'; } catch(e){}
  var root = document.documentElement;
  function apply(l){
    lang = l; root.lang = l;
    var t = document.querySelector('title');
    if (t && t.dataset[l]) document.title = t.dataset[l];
    var b = document.getElementById('langBtn');
    if (b) b.textContent = l === 'es' ? 'EN' : 'ES';
  }
  apply(lang);
  document.addEventListener('DOMContentLoaded', function(){
    var t = document.querySelector('title');
    if (t && !t.dataset.en) t.dataset.en = t.textContent;
    var nav = document.querySelector('.topnav .inner');
    if (nav){
      var b = document.createElement('button');
      b.id = 'langBtn'; b.className = 'lang-btn'; b.title = 'Español / English';
      b.onclick = function(){
        var l = lang === 'es' ? 'en' : 'es';
        try { localStorage.setItem(KEY, l); } catch(e){}
        apply(l);
      };
      // Right after the brand, not at the end: on pages wider than a phone screen
      // the end of the nav is off-screen and the button disappears.
      var brand = nav.querySelector('.brand');
      nav.insertBefore(b, brand ? brand.nextSibling : nav.firstChild);
    }
    apply(lang);
  });
})();

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
