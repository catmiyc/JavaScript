'use strict';

const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal');

const showModal = function () {
  modalEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
};

const closeModal = function () {
  modalEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
};

for (let i = 0; i < btnsShowModal.length; i++) {
  btnsShowModal[i].addEventListener('click', showModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlayEl.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
    closeModal();
  }
});
