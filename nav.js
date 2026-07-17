/* =============================================================
   A Chapter Together — navigation behaviour
   Handles: Resources dropdown (desktop), mobile menu, mobile
   sub-menu. No dependencies. Load once per page with `defer`.
   ============================================================= */
(function () {
  'use strict';

  // Tells the CSS that JS is running (enables the no-JS hover fallback to stand down).
  document.documentElement.classList.add('js');

  // Real mouse only. Touch devices report `hover: none`, so we never bind
  // hover handlers there — that's what made the old menu open-then-close on a tap.
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var dropdowns = Array.prototype.slice.call(document.querySelectorAll('.nav-dd'));

  function closeAllDropdowns(except) {
    dropdowns.forEach(function (dd) {
      if (dd !== except && dd.close) dd.close();
    });
  }

  dropdowns.forEach(function (dd) {
    var trigger = dd.querySelector('.dd-trigger');
    var menu = dd.querySelector('.nav-dd-menu');
    if (!trigger || !menu) return;

    var closeTimer = null;
    var pinned = false;   // opened by click/keyboard -> a stray mouse-out must not close it

    dd.open = function () {
      window.clearTimeout(closeTimer);
      closeAllDropdowns(dd);
      dd.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    };

    dd.close = function () {
      window.clearTimeout(closeTimer);
      pinned = false;
      dd.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    // Hover may already have opened the menu by the time the click lands. Without
    // the `pinned` flag, that click would read the menu as open and shut it —
    // so the menu would vanish the instant you clicked the thing that opens it.
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (pinned) {
        dd.close();
      } else {
        dd.open();
        pinned = true;
      }
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'Down') {
        e.preventDefault();
        dd.open();
        pinned = true;
        var first = menu.querySelector('a');
        if (first) first.focus();
      }
    });

    dd.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        dd.close();
        trigger.focus();
      }
    });

    // Tab out of the menu entirely -> close it.
    dd.addEventListener('focusout', function (e) {
      if (!dd.contains(e.relatedTarget)) dd.close();
    });

    if (canHover) {
      dd.addEventListener('mouseenter', function () {
        window.clearTimeout(closeTimer);
        dd.open();
      });
      dd.addEventListener('mouseleave', function () {
        if (pinned) return;
        // Small grace period so a slightly loose mouse path doesn't snap it shut.
        closeTimer = window.setTimeout(dd.close, 150);
      });
    }
  });

  // Click anywhere else on the page closes an open dropdown.
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (dd) {
      if (!dd.contains(e.target) && dd.close) dd.close();
    });
  });

  /* ---------- Mobile menu ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    // Older pages carry an inline onclick that would double-toggle. Drop it.
    navToggle.removeAttribute('onclick');
    navToggle.setAttribute('aria-controls', 'mobileMenu');
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------- Mobile sub-menu (Resources) ---------- */
  Array.prototype.forEach.call(
    document.querySelectorAll('.mobile-sub-toggle'),
    function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      btn.addEventListener('click', function () {
        var isOpen = panel.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  );

  /* ---------- Tidy up on resize ---------- */
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (window.innerWidth > 820 && mobileMenu) {
        mobileMenu.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      } else {
        closeAllDropdowns(null);
      }
    }, 150);
  });
})();
