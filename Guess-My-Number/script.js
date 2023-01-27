'use strict';
/*
const selector = document.querySelector('.message');
console.log(selector);

const number = document.querySelector('.number');
number.textContent = 100;

const guess = document.querySelector('.guess');
guess.value = 88;
*/
const messageEl = document.querySelector('.message');
const numberEl = document.querySelector('.number');
const guessEl = document.querySelector('.guess');
const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');
const scoreEl = document.querySelector('.score');
const bodyEl = document.querySelector('body');
const highscoreEl = document.querySelector('.highscore');
// 产生一个 1-20 随机数 secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// 设定得分的初始值 20
let score = 20;
let highscore = 0;
btnCheck.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // 当没有输入
  if (!guess) {
    messageEl.textContent = '🛑 No number!!!';
    // 猜对了
  } else if (guess === secretNumber) {
    numberEl.textContent = secretNumber;
    messageEl.textContent = 'Bingo!!!🎉🎉🎉';
    bodyEl.style.backgroundColor = '#60b347';
    numberEl.style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      messageEl.textContent =
        guess > secretNumber ? '📈 Too high' : '📉 Too low';
      score--;
      scoreEl.textContent = score;
    } else {
      messageEl.textContent = '💥 You loose';
      scoreEl.textContent = 0;
    }
  }
  // // 猜大了
  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     messageEl.textContent = '📈 Too high';
  //     score--;
  //     scoreEl.textContent = score;
  //   } else {
  //     messageEl.textContent = '💥 You loose';
  //     scoreEl.textContent = 0;
  //   }
  //   // 猜小了
  // } else {
  //   if (score > 1) {
  //     messageEl.textContent = '📉 Too low';
  //     score--;
  //     scoreEl.textContent = score;
  //   } else {
  //     messageEl.textContent = '💥 You loose';
  //     scoreEl.textContent = 0;
  //   }
  // }
});

btnAgain.addEventListener('click', function () {
  console.log('again btn');

  // 产生一个新的秘密数字；恢复得分为20、秘密数字为？、输入框为空格、css样式
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  scoreEl.textContent = score;
  numberEl.textContent = '?';
  guessEl.value = '';
  messageEl.textContent = 'Start guessing...';
  bodyEl.style.backgroundColor = '#222';
  numberEl.style.width = '15rem';
});
