import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openModal, closeModal, setPopupEventListeners } from "./components/modal.js";
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateProfile, addCardApi, updateAvatarApi } from './components/api.js';

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

const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = popupAvatar.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');

profileImage.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(popupAvatar);
});

function renderLoading(isLoading, buttonElement, defaultText = "Сохранить", loadingText = "Сохранение...") {
  buttonElement.textContent = isLoading ? loadingText : defaultText;
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button);

  updateAvatarApi(avatarInput.value)
    .then((userData) => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(popupAvatar);
    })
    .catch((err) => console.error('Ошибка при обновлении аватара:', err))
    .finally(() => renderLoading(false, button));
}

function openImagePopup(link, name) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button);

  updateProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => console.error('Ошибка при обновлении профиля:', err))
    .finally(() => renderLoading(false, button));
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button);

  addCardApi(newCardNameInput.value, newCardLinkInput.value)
    .then((newCardData) => {
      const newCard = createCard(newCardData, userId, openImagePopup);
      cardsContainer.prepend(newCard);
      newCardForm.reset();
      clearValidation(newCardForm, validationConfig);
      closeModal(popupNewCard);
    })
    .catch((err) => console.error('Ошибка при добавлении карточки:', err))
    .finally(() => renderLoading(false, button));
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
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

let userId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cards.forEach((cardItem) => {
      const cardElement = createCard(cardItem, userId, openImagePopup);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => console.error('Ошибка загрузки данных:', err));

setPopupEventListeners(popupEditProfile);
setPopupEventListeners(popupNewCard);
setPopupEventListeners(popupImage);
setPopupEventListeners(popupAvatar);
