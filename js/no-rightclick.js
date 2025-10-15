// Disable right-click context menu with optional admin bypass via cookie
(function () {
  function isBypassed() {
    // If cookie no_rc_bypass=true is set, don't block
    return document.cookie.split(';\n').map(c => c.split('=')).some(([k, v]) => k.trim() === 'no_rc_bypass' && v === 'true');
  }

  function disableContext(e) {
    if (isBypassed()) return; // allow for bypass
    e.preventDefault();
  }

  document.addEventListener('contextmenu', disableContext);

  // Optional: expose a function to enable/disable for debugging
  window.__noRightClick = {
    disable: function () { document.addEventListener('contextmenu', disableContext); },
    enableForThisSession: function () { document.cookie = 'no_rc_bypass=true; path=/'; },
    disableBypass: function () { document.cookie = 'no_rc_bypass=false; path=/'; }
  };
})();
