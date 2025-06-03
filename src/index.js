import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal, setPopupEventListeners } from "./components/modal.js";
import { enableValidation, clearValidation } from './components/validation.js';


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
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditProfile);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  };
  const newCard = createCard(newCardData, deleteCard, likeCard, openImagePopup);
  cardsContainer.prepend(newCard);
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig); // сбрасываем ошибки и кнопку
  closeModal(popupNewCard);
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

initialCards.forEach((item) => {
  const cardNew = createCard(item, deleteCard, likeCard, openImagePopup);
  cardsContainer.append(cardNew);
});

setPopupEventListeners(popupEditProfile);
setPopupEventListeners(popupNewCard);
setPopupEventListeners(popupImage);