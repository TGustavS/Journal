(function () {
  'use strict';

  function init() {
    var toc = document.getElementById('table-of-contents');

    // ---- 1. TOC toggle button ----
    var toggle = document.createElement('button');
    toggle.id = 'toc-toggle';
    toggle.setAttribute('aria-label', 'Toggle table of contents');
    toggle.innerHTML = '☰';
    document.body.appendChild(toggle);

    toggle.addEventListener('click', function () {
      document.body.classList.toggle('toc-open');
    });

    // ---- 2. Fold / unfold sections on heading click ----
    var headings = document.querySelectorAll(
      '#content h1, #content h2, #content h3, ' +
      '#content h4, #content h5, #content h6'
    );

    headings.forEach(function (h) {
      // Skip the "Table of Contents" heading and anything else inside the TOC.
      if (toc && toc.contains(h)) return;

      h.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'A') return;

        var level = parseInt(h.tagName.substring(1), 10);
        var next = h.nextElementSibling;

        while (next) {
          if (/^H[1-6]$/.test(next.tagName)) {
            var nextLevel = parseInt(next.tagName.substring(1), 10);
            if (nextLevel <= level) break;
          }
          // Never hide the TOC itself.
          if (next !== toc) {
            next.style.display = (next.style.display === 'none') ? '' : 'none';
          }
          next = next.nextElementSibling;
        }

        if (h.parentElement) {
          h.parentElement.classList.toggle('section-collapsed');
        }
      });
    });

    // ---- 3. Unfold a section when its TOC entry is clicked ----
    if (toc) {
      toc.addEventListener('click', function (ev) {
        var a = ev.target.closest('a');
        if (!a) return;
        var href = a.getAttribute('href') || '';
        if (href.charAt(0) !== '#') return;
        var target = document.getElementById(href.slice(1));
        if (!target || !/^H[1-6]$/.test(target.tagName)) return;

        // Un-hide the target's siblings up to the next same/higher heading.
        var level = parseInt(target.tagName.substring(1), 10);
        var next = target.nextElementSibling;
        while (next) {
          if (/^H[1-6]$/.test(next.tagName)) {
            var nextLevel = parseInt(next.tagName.substring(1), 10);
            if (nextLevel <= level) break;
          }
          if (next.style.display === 'none') next.style.display = '';
          next = next.nextElementSibling;
        }
        if (target.parentElement) {
          target.parentElement.classList.remove('section-collapsed');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
