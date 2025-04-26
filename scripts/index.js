// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');

function createCard(data, cardDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardNew.querySelector('.card__image');
  const cardTitle = cardNew.querySelector('.card__title');
  const deleteButton = cardNew.querySelector('.card__delete-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener('click', function() {
    cardDelete(cardNew);
  });

  return cardNew;
}

function cardDelete(cardElement) {
    cardElement.remove();
}

initialCards.forEach((item) => {
  const cardNew = createCard(item, cardDelete);
  placesList.append(cardNew);
});