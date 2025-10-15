(function(){
  // Intercept clicks on mailto: links and open Gmail web compose instead.
  // Falls back to default mailto behavior when necessary.

  function openGmailCompose(href) {
    // href is like: mailto:someone@example.com?subject=Hi&body=Hello
    try {
      const mailto = href.replace(/^mailto:/i, '');
      const [toPart, queryPart] = mailto.split('?');
      const to = encodeURIComponent(toPart || '');
      const params = new URLSearchParams(queryPart || '');
      // Gmail compose uses: https://mail.google.com/mail/?view=cm&fs=1&to=...&su=...&body=...
      const gmailUrl = new URL('https://mail.google.com/mail/');
      gmailUrl.searchParams.set('view', 'cm');
      gmailUrl.searchParams.set('fs', '1');
      if (to) gmailUrl.searchParams.set('to', decodeURIComponent(to));
      if (params.has('subject')) gmailUrl.searchParams.set('su', params.get('subject'));
      if (params.has('body')) gmailUrl.searchParams.set('body', params.get('body'));
      // open in new tab
      const win = window.open(gmailUrl.toString(), '_blank');
      if (!win) return false; // popup blocked
      win.focus();
      return true;
    } catch (err) {
      console.warn('Failed to open Gmail compose', err);
      return false;
    }
  }

  document.addEventListener('click', function (e) {
    // find nearest anchor
    let el = e.target;
    while (el && el !== document.body) {
      if (el.tagName && el.tagName.toLowerCase() === 'a' && el.href && el.href.startsWith('mailto:')) {
        // Intercept
        const href = el.getAttribute('href');
        // Try Gmail first
        const opened = openGmailCompose(href);
        if (opened) {
          e.preventDefault();
          return;
        }
        // else allow default behavior (mailto:)
        return;
      }
      el = el.parentElement;
    }
  }, false);
})();
