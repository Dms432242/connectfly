
document.addEventListener('DOMContentLoaded', function () {
  const raw = localStorage.getItem('kontur-registration-data');
  if (!raw) return;

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    return;
  }

  const name = data.name || '';
  const email = data.email || '';
  const workspaceName = data.workspaceName || 'Рабочее пространство';
  const workspaceMode = data.workspaceMode || 'create';
  const userStatus = localStorage.getItem('kontur-user-status') || 'online';


  function getInitials(fullName) {
    if (!fullName) return '??';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  const initials = getInitials(name);
  const workspaceInitials = getInitials(workspaceName);


  document.querySelectorAll('[data-field="workspaceName"]').forEach(el => {
    el.textContent = workspaceName;
  });


  document.querySelectorAll('[data-field="userName"]').forEach(el => {
    el.textContent = name || 'Пользователь';
  });

  // Email пользователя
  document.querySelectorAll('[data-field="userEmail"]').forEach(el => {
    el.textContent = email || '';
  });

  // Инициалы пользователя в аватарах + статус
  document.querySelectorAll('[data-field="userInitials"]').forEach(el => {
    el.setAttribute('data-initials', initials);
    const img = el.querySelector('img');
    if (img) img.remove();
  });

  document.querySelectorAll('[data-field="userStatus"]').forEach(el => {
    el.className = 'status status-' + userStatus;
  });

  // Инициалы воркспейса
  document.querySelectorAll('[data-field="workspaceInitials"]').forEach(el => {
    el.setAttribute('data-initials', workspaceInitials);
    const img = el.querySelector('img');
    if (img) img.remove();
  });

  // --- Специфичные поля формы настроек ---

  const nameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const displayNameInput = document.getElementById('displayName');
  const emailInput = document.getElementById('email');

  if (nameInput || lastNameInput || displayNameInput) {
    const parts = name.trim().split(/\s+/);
    if (nameInput) nameInput.value = parts[0] || '';
    if (lastNameInput) lastNameInput.value = parts.slice(1).join(' ') || '';
    if (displayNameInput) displayNameInput.value = name || '';
  }

  if (emailInput) {
    emailInput.value = email;
  }

  // --- Бонус: подпись режима воркспейса ---
  document.querySelectorAll('[data-field="workspaceMode"]').forEach(el => {
    el.textContent = workspaceMode === 'create' ? 'Собственное пространство' : 'По приглашению';
  });
});
