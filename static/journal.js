(function () {
  'use strict';

  function init() {
    // ---------------------------------------------------------------
    // 1. Inject the TOC toggle button
    // ---------------------------------------------------------------
    var toggle = document.createElement('button');
    toggle.id = 'toc-toggle';
    toggle.setAttribute('aria-label', 'Toggle table of contents');
    toggle.innerHTML = '☰';
    document.body.appendChild(toggle);

    toggle.addEventListener('click', function () {
      document.body.classList.toggle('toc-open');
    });

    // ---------------------------------------------------------------
    // 2. Collapse / expand sections on heading click
    // ---------------------------------------------------------------
    var headings = document.querySelectorAll(
      '#content h1, #content h2, #content h3, ' +
      '#content h4, #content h5, #content h6'
    );

    headings.forEach(function (h) {
      h.addEventListener('click', function (ev) {
        // don't toggle if the user clicked a link inside the heading
        if (ev.target.tagName === 'A') return;

        var level = parseInt(h.tagName.substring(1), 10);
        var next = h.nextElementSibling;

        while (next) {
          if (/^H[1-6]$/.test(next.tagName)) {
            var nextLevel = parseInt(next.tagName.substring(1), 10);
            if (nextLevel <= level) break;
          }
          next.style.display = (next.style.display === 'none') ? '' : 'none';
          next = next.nextElementSibling;
        }

        // Rotate the chevron on the heading itself
        if (h.parentElement) {
          h.parentElement.classList.toggle('section-collapsed');
        }
      });
    });
  }

  // Wait for the DOM to be parsed before touching document.body.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
