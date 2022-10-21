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

  login = event.target.elements.email.value;
  password = event.target.elements.password.value;
  localStorage.setItem('login', login);

  if (login && password) {
    event.target.reset();
    toggleModal();
    checkAuth();
  } else {
    alert('Заполни все поля!');
  }
}

function onLogoutButtonClick() {
  login = '';
  localStorage.removeItem('login');
  checkAuth();

  loginButton.style.display = 'flex';
  logoutButton.style.display = 'none';
  userName.textContent = '';
}

function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    modal.classList.add('is-hidden');
  }
}

function toggleModal() {
  modal.classList.toggle('is-hidden');
}
