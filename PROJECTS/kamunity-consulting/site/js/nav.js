/* nav.js — hamburger menu + contact modal (runs on all pages) */

(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }

  /* ===== HAMBURGER NAV ===== */
  var hamburger = $('site-hamburger');
  var navWrap   = $('site-nav-wrap');
  if (hamburger && navWrap) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = navWrap.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (navWrap.classList.contains('open') &&
          !hamburger.contains(e.target) && !navWrap.contains(e.target)) {
        navWrap.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===== CONTACT MODAL ===== */
  var overlay     = $('modal-overlay');
  var modal       = $('modal-contact');
  var closeBtn    = $('mct-close');
  var emailBtn    = $('mct-email-btn');
  var formToggle  = $('mct-form-toggle');
  var formArea    = $('mct-form-area');
  var netlifyForm = $('mct-netlify-form');
  var successMsg  = $('mct-form-success');

  var CONTACT_EMAIL = 'mike@kamunityconsulting.com';

  function openContactModal() {
    if (!modal) return;
    if (overlay) overlay.hidden = false;
    modal.hidden = false;
    /* Close any open hamburger nav */
    if (navWrap) navWrap.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  function closeContactModal() {
    if (!modal) return;
    modal.hidden = true;
    /* Only hide overlay if no other modals are open */
    var others = document.querySelectorAll('.kc-modal:not([hidden])');
    if (overlay && others.length === 0) overlay.hidden = true;
  }

  /* Wire all .nav-contact-link elements */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('.nav-contact-link');
    if (!link) return;
    e.preventDefault();
    openContactModal();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeContactModal);

  if (overlay) {
    overlay.addEventListener('click', function () {
      /* Close all modals */
      document.querySelectorAll('.kc-modal').forEach(function (m) {
        m.hidden = true;
      });
      overlay.hidden = true;
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && !modal.hidden) closeContactModal();
  });

  /* Email option */
  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=Hello from kamunityconsulting.com';
      closeContactModal();
    });
  }

  /* Form toggle */
  if (formToggle && formArea) {
    formToggle.addEventListener('click', function () {
      formArea.hidden = !formArea.hidden;
    });
  }

  /* Netlify form submit */
  if (netlifyForm) {
    netlifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = $('mct-form-message');
      if (!msg || !msg.value.trim()) {
        if (msg) msg.focus();
        return;
      }
      var data = new FormData(netlifyForm);
      fetch('/', { method: 'POST', body: data })
        .then(function () {
          if (successMsg) successMsg.hidden = false;
          netlifyForm.reset();
          if (formArea) { setTimeout(function () { formArea.hidden = true; }, 2000); }
          setTimeout(closeContactModal, 2200);
        })
        .catch(function () {
          /* Fallback: open email */
          var msgVal = msg ? encodeURIComponent(msg.value) : '';
          window.location.href = 'mailto:' + CONTACT_EMAIL +
            '?subject=Message from kamunityconsulting.com&body=' + msgVal;
        });
    });
  }

})();
