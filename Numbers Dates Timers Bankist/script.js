'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-10-24T13:15:33.035Z',
    '2022-10-23T09:48:16.867Z',
    '2022-10-22T06:04:23.907Z',
    '2022-10-20T14:18:46.235Z',
    '2022-10-19T16:33:06.386Z',
    '2022-10-10T14:43:26.374Z',
    '2022-10-01T18:49:59.371Z',
    '2022-09-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2022-10-24T13:15:33.035Z',
    '2022-10-23T09:48:16.867Z',
    '2022-10-22T06:04:23.907Z',
    '2022-10-20T14:18:46.235Z',
    '2022-10-19T16:33:06.386Z',
    '2022-10-10T14:43:26.374Z',
    '2022-10-01T18:49:59.371Z',
    '2022-09-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.trunc(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0); // 2个字符，第一个没有的时候添加0
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = `${date.getFullYear()}`.padStart(2, 0);
    // const hour = `${date.getHours()}`.padStart(2, 0);
    // const minute = `${date.getMinutes()}`.padStart(2, 0);
    // return `${day}/${month}/${year}, ${hour}: ${minute}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// Fake always logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

const locale = navigator.language;
console.log(locale);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Creat current date

    // Intl
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0); // 2个字符，第一个没有的时候添加0
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = `${now.getFullYear()}`.padStart(2, 0);
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minute = `${now.getMinutes()}`.padStart(2, 0);
    //labelDate.textContent = `${day}/${month}/${year}, ${hour}: ${minute}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/* 
console.log(23 === 23.0); //true
console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1 + 0.2 === 0.3); //false

// Conversion
// 加号会做强制类型转换把字符串类型转为整型
console.log(Number('23'));
console.log(+'23');

// Parsing 解析
// 必须数字开头 否则无法解析, 后面的 10 表示十进制
console.log(Number.parseInt('30x23', 10));
console.log(Number.parseInt('x23', 10));

console.log(Number.parseInt('2.5rem'));
console.log(Number.parseFloat('2.5rem'));

// is not a number isNaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN('abc'));

// Checking if value is number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
*/

/*
// Math and Rounding
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 19, 45, 3, 23));
console.log(Math.max(5, 19, '45', 3, 23));
console.log(Math.max(5, 19, '45px', 3, 23));

console.log(Math.trunc(Math.random() * 10 + 1)); // 1-10随机整数

// Rounding intergers
console.log(Math.trunc(23.4));
console.log(Math.trunc(23.5));
// round 取整，四舍五入
console.log(Math.round(23.4));
console.log(Math.round(23.5));
// 往大【天花板】取整
console.log(Math.ceil(23.4));
console.log(Math.ceil(23.5));
// 往小【地板】取整
console.log(Math.floor(23.4));
console.log(Math.floor(23.5));
// floor / trunc 比较： trunc 去掉小数的取整
console.log(Math.floor(-23.3));
console.log(Math.trunc(-23.3));
// rounding decimals
// toFixed() 返回的是字符串
console.log(typeof (2.7).toFixed(0));
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.734345).toFixed(3));
*/

/*
// remainder
console.log(5 % 2);
console.log(5 / 2);

console.log(6 % 2);
console.log(6 / 2);

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
  });
});
*/

/*
// Numeric separator
// 287,460,000,000
const diameter = 287460000000;
const diameter1 = 287_460_000_000;
console.log(diameter, diameter1);

const n1 = 13_00;
const n2 = 1_300;
console.log(n1, n2);

console.log(Number('23000'));
console.log(Number('23_000'));
*/

/*
// BigInt
console.log(2 ** 54 - 1);
console.log(2 ** 54);
*/

// creating dates
/*
const now = new Date();
console.log(now);

console.log(new Date('Fri Oct 21 2022 14:38:42'));
console.log(new Date('Decmber 24, 2007'));

console.log(new Date('2020-07-26T12:01:20.894Z'));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));
*/

/*
const future = new Date(2034, 10, 24, 13, 44);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.toISOString());

console.log(future.getTime());

console.log(new Date(2047959840000));
*/

/*
// Operations with Dates
const future = new Date(2034, 10, 24, 13, 44);
console.log(+future);

// 时间戳转为时间
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const day1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(day1);
*/

setTimeout(() => console.log('Here is your pizza 🍕'), 3000);
