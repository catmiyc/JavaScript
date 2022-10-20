'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovement = function (movements, sort = false) {
  // 先清空容器
  containerMovements.innerHTML = '';
  // NOTICE注意这里要创建一个数组的复制
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // 一次添加元素
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
  //console.log(username);
};
createUsernames(accounts);

const updateUI = function (currentAccount) {
  // Display movements
  displayMovement(currentAccount.movements);
  // Display balance
  calcDisplayBalance(currentAccount);
  // Diaplay summary
  calcDiaplaySummary(currentAccount);
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${account.balance}€`;
};

const calcDiaplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${outcomes}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // 防止表单提交
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Diaplay UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // update ui
    updateUI(currentAccount);
  }
});

// 1. 确定 转的钱是正数
// 2. 确定 账户余额够转
// 3. 确定 转的账户存在
// 4. 不能自己转给自己
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
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movements
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
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
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// const user = 'Steven Thomas Williams'; // stw
// createUsernames(user);
//console.log(containerMovements.innerHTML);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//////////////////////////////////////
// Simple Array Methods
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
//for (const movement of movements)
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---------------');
//第一个参数： 当前元素；第二个参数：当前元素的索引；第三个参数：整个数组
movements.forEach(function (movement, index, Array) {
  if (movement > 0) {
    console.log(`Movement ${index}:You deposited ${movement}`);
  } else {
    console.log(`Movement ${index}:You withdrew ${Math.abs(movement)}`);
  }
});
*/
/*
///////////////////////////////////////////
// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// 第一个参数：当前值； 第二个参数：当前值的key;第三个参数：全部的map
currencies.forEach(function (value, key, map) {
  console.log(`key: ${key}, value: ${value}, map: ${map}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GDP', 'RMB', 'USD', 'GDP']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}, ${set} `);
});
*/

/*
/////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];

//Slice
console.log(arr.slice(1)); //['b', 'c', 'd', 'e']
console.log(arr.slice(1, 3)); //['b', 'c']
console.log(arr.slice(-2)); //['d', 'e']
console.log(arr.slice(-1)); //['e']
console.log(arr.slice(1, -2)); //['b', 'c']
console.log(arr.slice()); //['a', 'b', 'c', 'd', 'e']
console.log([...arr]); //['a', 'b', 'c', 'd', 'e']

//Splice
const elment1 = arr.splice(-1);
console.log(elment1); //['e'] 返回数组切掉的部分
console.log(arr); //['a', 'b', 'c', 'd'] 数组剩下的部分
const elment2 = arr.splice(1, 2);
console.log(elment2); //['b', 'c']
console.log(arr); //['a', 'd']

// Reverse
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.reverse()); //['e', 'd', 'c', 'b', 'a']
console.log(arr); //['e', 'd', 'c', 'b', 'a'] 实际上改变了数组元素的位置

// Concat
const arr2 = ['h', 'i', 'j'];
const letters = arr.concat(arr2); //['e', 'd', 'c', 'b', 'a', 'h', 'i', 'j']
console.log(letters);
console.log([...arr, ...arr2]); //['e', 'd', 'c', 'b', 'a', 'h', 'i', 'j']

//Join
console.log(letters.join('-')); //e-d-c-b-a-h-i-j
*/

/*
//////////////////////////////////
// The new at Methods

const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// 获取最后一个元素
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]); //[64][0] => 64
console.log(arr.at(-1));
// ata 也适用于 字符串
console.log('hello'.at(-1));
console.log('hello'.at(0));
*/

/*
//////////////////////////////////
// Map Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// 欧元转美元
const eurToUsd = 1.1;

const movementUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements);
console.log(movementUSD);
// arrow function
const movementUSDArrow = movements.map(mov => mov * eurToUsd);
console.log(movementUSDArrow);
// for-of
const movementUSDfor = [];
for (const move of movements) {
  movementUSDfor.push(move * eurToUsd);
}
console.log(movementUSDfor);
*/

/*
// Filter Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);
*/

//console.log(movements);

// acc: accumulator; 0 表示从0开始累加
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

/*
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balanceFor = 0;
for (const mov of movements) {
  balanceFor += mov;
}
console.log(balanceFor);

const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    acc = mov;
  }
  return acc;
}, movements[0]);

console.log(max);
*/
/*
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/
/*
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/
/*
console.log(movements);

// 只能比较是否相等的条件
console.log(movements.includes(-130));
// 可以设置条件
console.log(movements.some(mov => mov > 1500));
// 所有元素满足条件
console.log(movements.every(mov => mov > 0));

// 回调函数分开写
const callbackfunc = mov => mov > 0;
console.log(movements.some(callbackfunc));
console.log(movements.every(callbackfunc));
console.log(movements.filter(callbackfunc));
*/
/*
/////////////////////////////////
// falt method
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arr2 = [[[1, 2], 3], 4];
console.log(arr2.flat());
console.log(arr2.flat(2));

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

const overallBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

// flatMap
const overallBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance3);
*/

/*
// Sorting Array
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Morty'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);
// console.log(movements.sort());
// console.log(movements);

// return < 0, A, B
// return > 0, B, A
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);
*/

/*
// Empty Array + fill method
const x = new Array(7);
console.log(x);

// 从索引 3 的位置开始,到索引5 结束，填充 1
x.fill(1, 3, 5);
console.log(x);

// Array.from()
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);
*/

// Array Methods Practice
//  1
//const bankDepositSum = accounts.map(acc => acc.movements).flat();
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2
const numDeposit1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000);
console.log(numDeposit1000);

const numDeposit1000_reduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(numDeposit1000_reduce);

// 3
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

//4.
// this is a nice title => This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str =>
    exceptions.includes(str) ? str : str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title ,but not too long'));
console.log(convertTitleCase('and here is another tilte with an EXAMPLE'));
