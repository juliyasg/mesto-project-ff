import { likeCardApi, unlikeCardApi, deleteCardApi } from './api.js';

function createCard(cardData, userId, handleCardClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-count');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Установка содержимого
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  const isOwner = cardData.owner._id === userId;
  const isLiked = cardData.likes.some(like => like._id === userId);

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (!isOwner) {
    deleteButton.remove();
  }

  // Обработка клика по изображению
  cardImage.addEventListener('click', () => {
    handleCardClick(cardData.link, cardData.name);
  });

  // Обработка лайка
  likeButton.addEventListener('click', () => {
    const liked = likeButton.classList.contains('card__like-button_is-active');
    const action = liked ? unlikeCardApi : likeCardApi;

    action(cardData._id)
      .then((updatedCard) => {
        cardData.likes = updatedCard.likes;
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => console.error(`Ошибка при ${liked ? 'удалении лайка' : 'установке лайка'}:`, err));
  });

  // Обработка удаления карточки
  deleteButton.addEventListener('click', () => {
    deleteCardApi(cardData._id)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => console.error('Ошибка при удалении карточки:', err));
  });

  return cardElement;
}

export { createCard };