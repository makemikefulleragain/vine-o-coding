/* post.js — LinkedIn post interactions */

(function () {
  'use strict';

  /* ===== HELPERS ===== */
  function $(id) { return document.getElementById(id); }
  function showModal(el) {
    el.hidden = false;
    $('modal-overlay').hidden = false;
    el.querySelector('.kc-modal-close').focus();
  }
  function closeModal(el) {
    el.hidden = true;
    $('modal-overlay').hidden = true;
  }
  function closeAllModals() {
    [$('modal-comment'), $('modal-share')].forEach(function (m) {
      if (m) m.hidden = true;
    });
    $('modal-overlay').hidden = true;
  }

  /* ===== 3-DOT SITE MENU ===== */
  var moreBtn  = $('li-more-btn');
  var moreMenu = $('li-more-menu');
  if (moreBtn && moreMenu) {
    moreBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = moreMenu.hidden;
      moreMenu.hidden = !open;
      moreBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!moreMenu.contains(e.target) && e.target !== moreBtn) {
        moreMenu.hidden = true;
        moreBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !moreMenu.hidden) {
        moreMenu.hidden = true;
        moreBtn.setAttribute('aria-expanded', 'false');
        moreBtn.focus();
      }
    });
  }

  /* ===== LIKE BUTTON ===== */
  var likeBtn = $('btn-like');
  if (likeBtn) {
    likeBtn.addEventListener('click', function () {
      var on = likeBtn.classList.toggle('li-liked');
      likeBtn.setAttribute('aria-pressed', String(on));
    });
  }

  /* ===== COMPOSE TEXTAREA ===== */
  var ta         = $('compose-ta');
  var btns       = $('compose-btns');
  var cancelBtn  = $('compose-cancel');
  var postBtn    = $('compose-post');

  function autoGrow() {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }

  var notSharedRow = null;

  function collapseNotShared() {
    ta.classList.add('not-shared');
    ta.style.height = '';
    btns.hidden = true;
    if (!notSharedRow) {
      notSharedRow = document.createElement('div');
      notSharedRow.className = 'not-shared-row';
      notSharedRow.innerHTML = '<span class="not-shared-tag">not shared</span>';
      ta.parentNode.insertBefore(notSharedRow, ta.nextSibling);
    }
    notSharedRow.hidden = false;
  }

  function expandCompose() {
    ta.classList.remove('not-shared');
    ta.style.height = '';
    autoGrow();
    if (notSharedRow) notSharedRow.hidden = true;
    if (ta.value.trim()) btns.hidden = false;
    ta.focus();
  }

  if (ta) {
    ta.addEventListener('input', function () {
      autoGrow();
      btns.hidden = ta.value.trim() === '';
    });

    ta.addEventListener('focus', function () {
      if (ta.classList.contains('not-shared')) expandCompose();
    });

    ta.addEventListener('click', function () {
      if (ta.classList.contains('not-shared')) expandCompose();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      ta.value = '';
      btns.hidden = true;
      ta.style.height = '';
      if (notSharedRow) { notSharedRow.hidden = true; }
      ta.classList.remove('not-shared');
    });
  }

  /* ===== COMMENT BUTTON → focus textarea ===== */
  var commentBtn = $('btn-comment');
  if (commentBtn && ta) {
    commentBtn.addEventListener('click', function () {
      ta.classList.remove('not-shared');
      if (notSharedRow) notSharedRow.hidden = true;
      ta.scrollIntoView({ behavior: 'smooth', block: 'center' });
      ta.classList.remove('pulse');
      void ta.offsetWidth;
      ta.classList.add('pulse');
      ta.addEventListener('animationend', function fn() {
        ta.classList.remove('pulse');
        ta.removeEventListener('animationend', fn);
      });
      setTimeout(function () { ta.focus(); }, 200);
    });
  }

  /* ===== POST BUTTON → comment share modal ===== */
  var modal = $('modal-comment');
  var preview = $('mc-preview');

  if (postBtn && modal) {
    postBtn.addEventListener('click', function () {
      var text = ta.value.trim();
      if (!text) return;
      preview.textContent = text;
      $('mc-form-comment').value = text;
      showModal(modal);
    });
  }

  /* Email option */
  var emailBtn = $('mc-email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      var text = ta.value.trim();
      var subject = encodeURIComponent('Comment from kamunityconsulting.com');
      var body = encodeURIComponent(
        'Hi Mike,\n\nI was on your Kamunity Consulting site and wanted to share this with you:\n\n' +
        text +
        '\n\nThanks for reading!\n'
      );
      window.location.href = 'mailto:mike@kamunityconsulting.com?subject=' + subject + '&body=' + body;
      closeModal(modal);
    });
  }

  /* Form toggle */
  var formToggle = $('mc-form-toggle');
  var formArea   = $('mc-form-area');
  if (formToggle && formArea) {
    formToggle.addEventListener('click', function () {
      formArea.hidden = !formArea.hidden;
      formToggle.textContent = formArea.hidden ? 'Post to Mike' : 'Close';
    });
  }

  /* Emoji picker */
  var epBtns = document.querySelectorAll('.kc-ep');
  var reactVal = $('mc-reactions-val');
  epBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var already = btn.classList.contains('selected');
      epBtns.forEach(function (b) { b.classList.remove('selected'); });
      if (!already) {
        btn.classList.add('selected');
        reactVal.value = btn.dataset.val;
      } else {
        reactVal.value = '';
      }
    });
  });

  /* Netlify form submit */
  var netlifyForm = $('mc-netlify-form');
  var formSuccess = $('mc-form-success');
  if (netlifyForm) {
    netlifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(netlifyForm);
      fetch('/', { method: 'POST', body: data })
        .then(function () {
          netlifyForm.hidden = true;
          formSuccess.hidden = false;
          setTimeout(function () { closeModal(modal); }, 2000);
        })
        .catch(function () {
          alert('Something went wrong. Please try the email option.');
        });
    });
  }

  /* Don't share */
  var dontShare = $('mc-dontshare');
  if (dontShare) {
    dontShare.addEventListener('click', function () {
      closeModal(modal);
      collapseNotShared();
    });
  }

  /* Close comment modal */
  var mcClose = $('mc-close');
  if (mcClose) mcClose.addEventListener('click', function () { closeModal(modal); });

  /* ===== SHARE MODAL (Repost + Send) ===== */
  var shareModal = $('modal-share');

  function openShare() {
    var url = window.location.href.split('?')[0];
    var text = encodeURIComponent('Less hours. Fewer programs. More rules. More need. Do it anyway. \u2014 Mike Fuller, Kamunity Consulting');
    var enc = encodeURIComponent(url);

    $('share-linkedin').href  = 'https://www.linkedin.com/sharing/share-offsite/?url=' + enc;
    $('share-facebook').href  = 'https://www.facebook.com/sharer/sharer.php?u=' + enc;
    $('share-twitter').href   = 'https://twitter.com/intent/tweet?url=' + enc + '&text=' + text;
    $('share-whatsapp').href  = 'https://wa.me/?text=' + text + '%20' + enc;

    $('share-copy-label').textContent = 'Copy link';
    showModal(shareModal);
  }

  var repostBtn = $('btn-repost');
  var sendBtn   = $('btn-send');
  if (repostBtn) repostBtn.addEventListener('click', openShare);
  if (sendBtn)   sendBtn.addEventListener('click', openShare);

  /* Copy link */
  var copyBtn = $('share-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var url = window.location.href.split('?')[0];
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          $('share-copy-label').textContent = 'Copied!';
          setTimeout(function () { $('share-copy-label').textContent = 'Copy link'; }, 2500);
        });
      } else {
        var tmp = document.createElement('textarea');
        tmp.value = url; document.body.appendChild(tmp);
        tmp.select(); document.execCommand('copy'); document.body.removeChild(tmp);
        $('share-copy-label').textContent = 'Copied!';
        setTimeout(function () { $('share-copy-label').textContent = 'Copy link'; }, 2500);
      }
    });
  }

  /* Mastodon: copy URL + note */
  var mastoBtn = $('share-mastodon');
  if (mastoBtn) {
    var mastoOrig = mastoBtn.innerHTML;
    mastoBtn.addEventListener('click', function () {
      var url = window.location.href.split('?')[0];
      if (navigator.clipboard) { navigator.clipboard.writeText(url); }
      mastoBtn.textContent = 'Copied \u2014 paste into your instance';
      setTimeout(function () { mastoBtn.innerHTML = mastoOrig; }, 3000);
    });
  }

  /* Close share modal */
  var msClose = $('ms-close');
  if (msClose) msClose.addEventListener('click', function () { closeModal(shareModal); });

  /* Overlay click closes */
  $('modal-overlay').addEventListener('click', closeAllModals);

  /* Escape key closes */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllModals();
  });

  /* ===== COMMENT REACTION PILLS ===== */
  document.querySelectorAll('.li-c-react').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var span = btn.querySelector('span');
      if (btn.classList.contains('reacted')) {
        btn.classList.remove('reacted');
        span.textContent = String(parseInt(span.textContent, 10) - 1);
      } else {
        btn.classList.add('reacted');
        span.textContent = String(parseInt(span.textContent, 10) + 1);
      }
      btn.setAttribute('aria-label', span.textContent + ' likes');
    });
  });

  /* ===== COMMENT LIKE BUTTONS ===== */
  document.querySelectorAll('.li-c-like-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.toggle('liked');
      btn.textContent = btn.classList.contains('liked') ? 'Unlike' : 'Like';
    });
  });

})();
