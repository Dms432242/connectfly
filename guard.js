(function () {
  const path = window.location.pathname;
  const isRegisterPage = /register\.html$/.test(path);
  const isLoginPage = /login\.html$/.test(path);

  const isRegistered = localStorage.getItem('kontur-registration-complete') === 'true';
  const hasSession = localStorage.getItem('kontur-session-active') === 'true';

  if (!isRegistered) {
    if (isRegisterPage) return;
    const step = localStorage.getItem('kontur-registration-step') || '1';
    window.location.replace('register.html?step=' + step);
    return;
  }


  if (!hasSession && !isLoginPage) {
    window.location.replace('login.html');
  }
})();
