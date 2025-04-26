const cardsContainer = document.querySelector('.places__list');

function createCard(data, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardNew.querySelector('.card__image');
  const cardTitle = cardNew.querySelector('.card__title');
  const deleteButton = cardNew.querySelector('.card__delete-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener('click', function() {
    deleteCard(cardNew);
  });

  return cardNew;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

initialCards.forEach((item) => {
  const cardNew = createCard(item, deleteCard);
  cardsContainer.append(cardNew);
});