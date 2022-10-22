import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';

const loginButton = document.querySelector('.header__login_bnt');
const logoutButton = document.querySelector('.header__out_bnt');
const userName = document.querySelector('.user-name');
const closeModalBtn = document.querySelector('[login-modal-close]');
const modal = document.querySelector('[login-data-modal]');
const loginForm = document.querySelector('.login-form');

const promoContainer = document.querySelector('.swiper-container');
const restaurants = document.querySelector('.restaurants');
const cardsRestaurants = document.querySelector('.cards__list');
const menu = document.querySelector('.menu');
const menuCards = document.querySelector('.menu-cards-list');
const logo = document.querySelectorAll('.logo');

loginButton.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
window.addEventListener('keydown', closeModalByEsc);
loginForm.addEventListener('submit', onFormSubmit);
modal.addEventListener('click', onModalClick);
logoutButton.addEventListener('click', onLogoutButtonClick);
cardsRestaurants.addEventListener('click', openGoods);

logo.forEach(logo => {
  logo.addEventListener('click', onLogoClick);
});

let login = localStorage.getItem('login');
let password = '';

menu.style.display = 'none';

const getData = async function (url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);
  }
  const data = await response.json();
  return data;
};

getData('./db/partners.json')
  .then(data => {
    data.forEach(card => {
      creatRestaurantCard(card);
    });
  })
  .catch(error => {
    console.log(error);
  });

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

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

function creatRestaurantCard(restaurant) {
  const {
    image,
    kitchen,
    name,
    price,
    stars,
    products,
    time_of_delivery: timeOfDelivery,
  } = restaurant;
  const card = `
     <li class="cards__item" data-products="${products}">
              <a class="cards__link link">
                <img src="${image}" alt="${name}" class="cards__image" />
                <div class="cards__text">
                  <div class="cards__heading">
                    <h3 class="cards__title">${name}</h3>
                    <div class="cards__time">${timeOfDelivery} мин</div>
                  </div>
                </div>
                <div class="cards__info">
                  <p class="cards__rating">
                    <img class="cards__rating_star" src="./img/icon/rating.svg" alt="star" /> ${stars}
                  </p>
                  <p class="cards__price">От ${price} ₽</p>
                  <p class="cards__product">${kitchen}</p>
                </div>
              </a>
            </li>
    `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createMenuCard(menuCard) {
  const { name, description, price, image } = menuCard;
  const card = `
        <li class="cards__item">
                <img src="${image}" alt="${name}" class="cards__image" />
                <div class="cards__text">
                  <div class="cards__heading_rest">
                    <h3 class="cards__title cards__title_reg">${name}</h3>
                    <p class="cards__descr">
                     ${description}
                    </p>
                  </div>
                </div>
                <div class="cards__info">
                  <button type="button" class="cards__btn">
                    В корзину &nbsp<img src="./img/icon/shopping-cart-white.svg" alt="cart" />
                  </button>
                  <p class="cards__price_rest">${price} ₽</p>
                </div>
              </li>
    `;

  menuCards.insertAdjacentHTML('beforeend', card);
}

function openGoods(event) {
  const restaurantCard = event.target.closest('.cards__item');

  if (restaurantCard && login) {
    menuCards.innerHTML = '';

    promoContainer.style.display = 'none';
    restaurants.style.display = 'none';
    menu.style.display = '';

    getData(`./db/${restaurantCard.dataset.products}`)
      .then(data => {
        data.forEach(card => {
          createMenuCard(card);
        });
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    toggleModal();
  }
}

function onLogoClick() {
  promoContainer.style.display = '';
  restaurants.style.display = '';
  menu.style.display = 'none';
}

checkAuth();

// Swiper
new Swiper('.swiper-container', {
  sliderPerView: 1,
  loop: true,
  autoplay: true,
  effect: 'cube',
  grabCursor: true,
  cubeEffect: {
    shadow: false,
  },
});
