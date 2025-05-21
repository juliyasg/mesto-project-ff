const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};

const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscKeyUp);
};

const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscKeyUp);
};

const setPopupEventListeners = (popupElement) => {
  const closeButton = popupElement.querySelector('.popup__close');

  closeButton.addEventListener('click', () => {
    closeModal(popupElement);
  });

  popupElement.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closeModal(popupElement);
    }
  });
};

export { openModal, closeModal, setPopupEventListeners };