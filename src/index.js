import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openModal, closeModal, setPopupEventListeners } from "./components/modal.js";
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateProfile, addCardApi } from './components/api.js';


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

enableValidation(validationConfig);

const cardsContainer = document.querySelector('.places__list');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const popupImg = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = popupEditProfile.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');

const newCardForm = popupNewCard.querySelector('.popup__form');
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLinkInput = newCardForm.querySelector('.popup__input_type_url');

function openImagePopup(link, name) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  updateProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => console.error('Ошибка при обновлении профиля:', err));
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  addCardApi(newCardNameInput.value, newCardLinkInput.value)
    .then((newCardData) => {
      const newCard = createCard(newCardData, userId, openImagePopup); // передаем userId
      cardsContainer.prepend(newCard);
      newCardForm.reset();
      clearValidation(newCardForm, validationConfig);
      closeModal(popupNewCard);
    })
    .catch((err) => console.error('Ошибка при добавлении карточки:', err));
}

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openModal(popupEditProfile);
});

addButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openModal(popupNewCard);
});

editForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

let userId;

// Получение данных пользователя и карточек с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id; // сохраняем ID пользователя

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;

    cards.forEach((cardItem) => {
      const cardElement = createCard(cardItem, userId, openImagePopup);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => console.error('Ошибка загрузки данных:', err));

setPopupEventListeners(popupEditProfile);
setPopupEventListeners(popupNewCard);
setPopupEventListeners(popupImage);