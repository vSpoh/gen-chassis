// Cart drawer + product gallery. The store isn't open yet, so the cart stays empty.
(function () {
  var body = document.body;

  // ----- cart -----
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem('gc-cart') || '[]'); } catch (e) {}
  var count = cart.reduce(function (n, item) { return n + (item.qty || 0); }, 0);
  document.querySelectorAll('.cart-count').forEach(function (el) { el.textContent = count; });

  function openCart() { body.classList.add('cart-open'); }
  function closeCart() { body.classList.remove('cart-open'); }
  document.querySelectorAll('[data-open-cart]').forEach(function (b) { b.addEventListener('click', openCart); });
  document.querySelectorAll('[data-close-cart]').forEach(function (b) { b.addEventListener('click', closeCart); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });

  // ----- gallery -----
  var main = document.querySelector('.gallery-main img');
  document.querySelectorAll('.thumb').forEach(function (t) {
    t.addEventListener('click', function () {
      var img = t.querySelector('img');
      main.src = img.src; main.alt = img.alt;
      document.querySelectorAll('.thumb').forEach(function (o) { o.setAttribute('aria-current', 'false'); });
      t.setAttribute('aria-current', 'true');
    });
  });

  // ----- color swatches (preview only) -----
  document.querySelectorAll('.swatch').forEach(function (s) {
    s.addEventListener('click', function () {
      document.querySelectorAll('.swatch').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
      s.setAttribute('aria-pressed', 'true');
      var target = document.querySelector('.thumb[data-key="' + s.dataset.show + '"]');
      if (target) target.click();
    });
  });
})();
