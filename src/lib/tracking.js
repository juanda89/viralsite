// ──────────────────────────────────────────────────────────────────────────
// Meta attribution capture (CRITICAL for the HighLevel CAPI filter).
// The booked contact MUST carry fbclid for Meta to match the Schedule event.
// See ../../../MANUAL-META-ADS-LOW-CAC.md §9.
//
// First-touch capture of fbclid/utm/_fbp/_fbc → localStorage, then propagate
// to every booking link (a[data-book]) and the calendar iframe (#vi-calendar).
// ──────────────────────────────────────────────────────────────────────────
(function () {
  try {
    var params = new URLSearchParams(location.search);
    var store = {};
    try { store = JSON.parse(localStorage.getItem('vi_attr') || '{}'); } catch (e) {}

    ['fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'].forEach(function (k) {
      var v = params.get(k);
      if (v && !store[k]) store[k] = v; // first-touch wins
    });

    function cookie(name) {
      var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return m ? m.pop() : '';
    }
    var fbp = cookie('_fbp'); if (fbp) store._fbp = fbp;
    var fbc = cookie('_fbc'); if (fbc) store._fbc = fbc;
    // synthesize _fbc from fbclid if the Meta Pixel hasn't set it yet
    if (!store._fbc && store.fbclid) store._fbc = 'fb.1.' + Date.now() + '.' + store.fbclid;

    localStorage.setItem('vi_attr', JSON.stringify(store));
    window.__viAttr = store;

    var qs = Object.keys(store)
      .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(store[k]); })
      .join('&');
    if (!qs) return;

    function appendParams(url) {
      return url + (url.indexOf('?') > -1 ? '&' : '?') + qs;
    }
    document.querySelectorAll('a[data-book]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      // never decorate in-page anchors (e.g. #book) — it would break the scroll.
      // only real navigations (/prep, /book, external booking URLs) get the params.
      if (!href || href.charAt(0) === '#') return;
      a.href = appendParams(href);
    });
    document.querySelectorAll('iframe[src*="leadconnectorhq.com/widget/booking"], #vi-calendar').forEach(function (iframe) {
      if (iframe && iframe.src) iframe.src = appendParams(iframe.src);
    });
  } catch (e) { /* no-op: tracking must never break the page */ }
})();
