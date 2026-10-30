const PAGE_URL = 'https://smit1980.github.io/ContactID/';
const TELEGRAM = 'https://t.me/smitAnin';
const MAX = 'https://max.ru/u/f9LHodD0cOKaNhYvavkT7QKqgx6Lv1mXZ2a-hdBAluW5cwIoXoVjrygJHnA';
const EMAIL = 'always-profit@mail.ru';
// Add the confirmed international phone number here (digits only) to enable WhatsApp.
const WHATSAPP_NUMBER = '';
const nameInput = document.getElementById('guest-name');
const note = document.getElementById('contact-note');
const telegramLink = document.getElementById('telegram-link');
const maxLink = document.getElementById('max-link');
const whatsappLink = document.getElementById('whatsapp-link');
const emailLink = document.getElementById('email-link');
const dialog = document.getElementById('qr-dialog');
function greeting() {
  return 'Привет, меня зовут ' + nameInput.value.trim() + '. Мы познакомились на конференции.';
}
function requireName(event) {
  if (nameInput.value.trim()) return true;
  event.preventDefault();
  nameInput.focus();
  nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  note.textContent = 'Сначала напишите своё имя — мы добавим его в первое сообщение.';
  return false;
}
function updateLinks() {
  const message = greeting();
  telegramLink.href = TELEGRAM + '?text=' + encodeURIComponent(message);
  emailLink.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Знакомство на конференции') + '&body=' + encodeURIComponent(message);
  if (WHATSAPP_NUMBER) {
    whatsappLink.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }
}
nameInput.addEventListener('input', () => {
  updateLinks();
  note.textContent = 'Сообщение подготовлено для выбранного способа связи. Отправка — только после вашего нажатия в приложении.';
});
for (const link of [telegramLink, emailLink]) link.addEventListener('click', requireName);
maxLink.addEventListener('click', event => {
  if (!requireName(event)) return;
  const message = greeting();
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(message).then(() => {
      note.textContent = 'Приветствие скопировано. Вставьте его в чат MAX.';
    }).catch(() => {
      note.textContent = 'Скопируйте приветствие и вставьте в чат MAX: ' + message;
    });
  } else {
    note.textContent = 'Скопируйте приветствие и вставьте в чат MAX: ' + message;
  }
});
if (WHATSAPP_NUMBER) {
  whatsappLink.removeAttribute('aria-disabled');
  document.getElementById('whatsapp-caption').textContent = 'Сообщение откроется в чате';
  whatsappLink.addEventListener('click', requireName);
} else {
  whatsappLink.addEventListener('click', event => event.preventDefault());
}
updateLinks();
document.getElementById('show-qr').addEventListener('click', () => dialog.showModal());
document.getElementById('close-qr').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.getElementById('copy-url').addEventListener('click', async event => {
  try {
    await navigator.clipboard.writeText(PAGE_URL);
    event.currentTarget.textContent = 'Ссылка скопирована ✓';
  } catch {
    event.currentTarget.textContent = PAGE_URL;
  }
});

