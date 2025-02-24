let firstCard = null;
let secondCard = null;
// Елементи
let blockGame = document.querySelector('.game-box'),
    modalWindow = document.querySelector('.modal'),
    inputQuantity = document.querySelector('.modal-input'),
    modalAttention = document.querySelector('.modal-attention'),
    modalLose = document.querySelector('.modal-lose'),
    startBtn = document.querySelector('.modal-btn'),
    congratulationBlock = document.querySelector('.congratulation');
inputQuantity.focus();
startBtn.addEventListener('click', (e) => {
  if (inputQuantity.value <= 9 && inputQuantity.value > 1) {
    modalAttention.classList.remove('text--red');
    inputQuantity.classList.remove('border--red');
    modalWindow.classList.remove('active');
    gameCards(inputQuantity.value);
  }
  else if (inputQuantity.value > 9 || inputQuantity.value <= 1) {
    modalAttention.classList.add('text--red');
    inputQuantity.classList.add('border--red');
    return;
  }
  inputQuantity.value = '';
  inputQuantity.focus();
})
let sameArr;
document.querySelector('.reset-same-game').addEventListener("click", () => {
  gameCards(sameArr.length / 2, sameArr);
  modalLose.classList.remove('active');
})

function gameCards (cardCount, cardsNumberArray = false) {
  let attemptBlock = document.querySelector('.attempt>span');
  let click = cardCount;
  attemptBlock.textContent = click;
  blockGame.innerHTML = '';
  if (!cardsNumberArray) {
    var cardsNumberArray = [];
    for (let i = 1; i <= cardCount; i++) {
      cardsNumberArray.push(i,i);
    }
    // цикл для перемішування массива
    for (let i = 0; i < cardsNumberArray.length; i++) {
      let randomCount = Math.floor(0 + Math.random() * ((cardsNumberArray.length - 1 ) + 1 - 0));
      let currentItem = cardsNumberArray[i];
      cardsNumberArray[i] = cardsNumberArray[randomCount];
      cardsNumberArray[randomCount] = currentItem;
    }
    sameArr = cardsNumberArray;
  }
  //
  for (let cardNumber of cardsNumberArray) {
    let createDiv = document.createElement('div');
    createDiv.classList.add('card');
    createDiv.setAttribute('data-id', cardNumber);
    createDiv.innerHTML = `<img src="img/${cardNumber}.jpeg" alt="dsda"/>`
    blockGame.appendChild(createDiv);
    // Подія кліку на елемент
    createDiv.addEventListener('click', (e) => {
      if (e.target.classList.contains('succes')) {
        return;
      }
      if (firstCard != null && secondCard != null && firstCard.dataset.id != secondCard.dataset.id) {
          firstCard.classList.remove('active');
          secondCard.classList.remove('active');
          firstCard = null;
          secondCard = null;

      }
      if (firstCard == null) {
        firstCard = e.target;
        firstCard.classList.add('active')
      }else if (secondCard == null && !e.target.classList.contains('active')) {
        secondCard = e.target;
        secondCard.classList.add('active');
      }
      if (firstCard != null && secondCard != null) {
        if (firstCard.dataset.id == secondCard.dataset.id) {
          firstCard.classList.add('succes');
          secondCard.classList.add('succes');
          firstCard = null;
          secondCard = null;
        } else {
          click = click - 1;
          attemptBlock.textContent = click;
        }
      }
      const succesCards = document.querySelectorAll('.card.succes');

      if (succesCards.length === cardsNumberArray.length) {
        congratulationBlock.classList.add('active');

      }
      if (click == 0) {
        modalLose.classList.add('active');
      }
    })
  }
}
document.querySelector('.congratulation-btn').addEventListener('click', () => {
  blockGame.innerHTML = '';
  congratulationBlock.classList.remove('active');
  modalWindow.classList.add('active');
  inputQuantity.focus();
})
document.querySelector('.reset-game').addEventListener('click', () => {
  blockGame.innerHTML = '';
  modalLose.classList.remove('active');
  modalWindow.classList.add('active');
  inputQuantity.focus();
})
