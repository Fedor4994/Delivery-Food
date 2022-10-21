const loginButton = document.querySelector('.header__login_bnt');
const closeModalBtn = document.querySelector('[login-modal-close]');

const modal = document.querySelector('[login-data-modal]');

loginButton.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
window.addEventListener('keydown', closeModalByEsc);

function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    modal.classList.add('is-hidden');
  }
}

function toggleModal() {
  modal.classList.toggle('is-hidden');
}
