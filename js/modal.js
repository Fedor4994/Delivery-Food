const openModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');
const cancleBtn = document.querySelector('[cancle-btn]');

openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
window.addEventListener('keydown', closeModalByEsc);
cancleBtn.addEventListener('click', toggleModal);
modal.addEventListener('click', onModalClick);

function onModalClick(event) {
  if (event.target.classList.contains('backdrop')) {
    event.target.classList.add('is-hidden');
    enableScroll();
  }
}

function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    modal.classList.add('is-hidden');
    enableScroll();
  }
}

function toggleModal() {
  modal.classList.toggle('is-hidden');
  if (modal.classList.contains('is-hidden')) {
    enableScroll();
  } else {
    disableScroll();
  }
}
