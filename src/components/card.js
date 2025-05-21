function createCard(data, deleteCard, likeCard, openImagePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardNew.querySelector('.card__image');
  const cardTitle = cardNew.querySelector('.card__title');
  const deleteButton = cardNew.querySelector('.card__delete-button');
  const likeButton = cardNew.querySelector('.card__like-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener('click', () => deleteCard(cardNew));
  likeButton.addEventListener('click', () => likeCard(likeButton));

  cardImage.addEventListener('click', () => {
    openImagePopup(data.link, data.name);
  });

  return cardNew;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };