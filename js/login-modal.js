const loginButton = document.querySelector('.header__login_bnt');
const logoutButton = document.querySelector('.header__out_bnt');
const userName = document.querySelector('.user-name');
const closeModalBtn = document.querySelector('[login-modal-close]');
const modal = document.querySelector('[login-data-modal]');
const loginForm = document.querySelector('.login-form');

loginButton.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
window.addEventListener('keydown', closeModalByEsc);
loginForm.addEventListener('submit', onFormSubmit);
modal.addEventListener('click', onModalClick);
logoutButton.addEventListener('click', onLogoutButtonClick);

let login = localStorage.getItem('login');
let password = '';

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

checkAuth();

function autorized() {
  console.log('Авторизован');

  loginButton.style.display = 'none';
  logoutButton.style.display = 'flex';
  userName.textContent = login;
}

function notAutorized() {
  console.log('Не авторизован');
}

function onFormSubmit(event) {
  event.preventDefault();

  login = event.target.elements.email.value.trim();
  password = event.target.elements.password.value.trim();

  event.target.elements.email.style.borderColor = '';
  event.target.elements.password.style.borderColor = '';
  if (login === '') {
    event.target.elements.email.value = '';
    event.target.elements.email.style.borderColor = 'red';
    return;
  }
  if (password === '') {
    event.target.elements.password.value = '';
    event.target.elements.password.style.borderColor = 'red';
    return;
  }

  localStorage.setItem('login', login);
  event.target.reset();
  toggleModal();
  checkAuth();
}

function onLogoutButtonClick() {
  login = '';
  localStorage.removeItem('login');
  checkAuth();

  loginButton.style.display = 'flex';
  logoutButton.style.display = 'none';
  userName.textContent = '';
}

function onModalClick(event) {
  if (event.target.classList.contains('backdrop')) {
    event.target.classList.add('is-hidden');
    enableScroll();
  }
}

function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    modal.classList.add('is-hidden');
  }
  enableScroll();
}

function toggleModal() {
  loginForm.elements.email.style.borderColor = '';
  loginForm.elements.password.style.borderColor = '';

  modal.classList.toggle('is-hidden');
  if (modal.classList.contains('is-hidden')) {
    enableScroll();
  } else {
    disableScroll();
  }
}
