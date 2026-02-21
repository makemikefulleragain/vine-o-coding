/* doors.js — single press: knock + haptic → 1 s → flip */

(function () {
  'use strict';

  function playKnock() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      var ctx = new AC();

      /* Resume is required on iOS Safari — audio context starts suspended */
      ctx.resume().then(function () {
        var comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -12;
        comp.knee.value = 6;
        comp.ratio.value = 4;
        comp.attack.value = 0.001;
        comp.release.value = 0.1;
        comp.connect(ctx.destination);

        function oneKnock(t) {
          /* Transient: shaped noise through low-pass */
          var dur = 0.18;
          var len = Math.floor(ctx.sampleRate * dur);
          var buf = ctx.createBuffer(1, len, ctx.sampleRate);
          var d   = buf.getChannelData(0);
          for (var i = 0; i < len; i++) {
            var env = Math.pow(Math.max(0, 1 - i / (len * 0.18)), 2.5);
            d[i] = (Math.random() * 2 - 1) * env;
          }

          var lp = ctx.createBiquadFilter();
          lp.type = 'lowpass';
          lp.frequency.value = 320;
          lp.Q.value = 1.8;

          var noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(2.2, t);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

          var noiseSrc = ctx.createBufferSource();
          noiseSrc.buffer = buf;
          noiseSrc.connect(lp);
          lp.connect(noiseGain);
          noiseGain.connect(comp);
          noiseSrc.start(t);

          /* Body: descending sine = wooden resonance */
          var osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(210, t);
          osc.frequency.exponentialRampToValueAtTime(55, t + 0.14);

          var oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime(1.1, t);
          oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

          osc.connect(oscGain);
          oscGain.connect(comp);
          osc.start(t);
          osc.stop(t + 0.25);

          /* High harmonic click for articulation */
          var click = ctx.createOscillator();
          click.type = 'triangle';
          click.frequency.setValueAtTime(900, t);
          click.frequency.exponentialRampToValueAtTime(200, t + 0.03);

          var clickGain = ctx.createGain();
          clickGain.gain.setValueAtTime(0.35, t);
          clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

          click.connect(clickGain);
          clickGain.connect(comp);
          click.start(t);
          click.stop(t + 0.05);
        }

        oneKnock(ctx.currentTime);
        oneKnock(ctx.currentTime + 0.32);
      });
    } catch (e) { /* silent */ }

    /* Haptic: two taps matching knock timing */
    try {
      if (navigator.vibrate) navigator.vibrate([30, 290, 30]);
    } catch (e) { /* silent */ }
  }

  var doors = [
    { wrapperId: 'wrapper-fix',        flipperId: 'flipper-fix' },
    { wrapperId: 'wrapper-impossible', flipperId: 'flipper-impossible' },
  ];

  doors.forEach(function (d) {
    var wrapper = document.getElementById(d.wrapperId);
    var flipper = document.getElementById(d.flipperId);
    if (!wrapper || !flipper) return;

    var pending = false; /* guard during the 1 s knock-to-flip delay */

    function rattle() {
      playKnock();
      flipper.classList.remove('door-knock');
      void flipper.offsetWidth;
      flipper.classList.add('door-knock');
      flipper.addEventListener('animationend', function fn() {
        flipper.classList.remove('door-knock');
        flipper.removeEventListener('animationend', fn);
      });
    }

    function flip() {
      pending = false;
      flipper.classList.toggle('flipped');
      wrapper.setAttribute('aria-expanded', String(flipper.classList.contains('flipped')));
    }

    function knockThenFlip() {
      if (pending) return;
      pending = true;
      rattle();
      setTimeout(flip, 1000);
    }

    /* Desktop click — single action */
    wrapper.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return;
      if (flipper.classList.contains('flipped')) { flip(); } else { knockThenFlip(); }
    });

    /* Mobile tap — single action; suppress synthetic click */
    wrapper.addEventListener('touchstart', function (e) {
      if (flipper.classList.contains('flipped') && e.target.closest('a, button')) return;
      e.preventDefault();
      if (flipper.classList.contains('flipped')) { flip(); } else { knockThenFlip(); }
    }, { passive: false });

    /* Keyboard */
    wrapper.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      if (flipper.classList.contains('flipped')) { flip(); } else { knockThenFlip(); }
    });
  });

})();

