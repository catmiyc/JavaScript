'use strict';

/*
/////////////////////////////////////////////////////
// Default Parameters
const bookings = [];

const createBooking = function (flightNum, passengersNum = 1, price = 200) {
  // ES5
  // passengersNum ||= 1;
  // price ||= 200;

  const booking = {
    flightNum,
    passengersNum,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('E123');
createBooking('E123', 1);
createBooking('E123', 2, 300);
console.log(bookings);
*/

/*
/////////////////////////////////////
// 传递参数是如何工作的 值 VS 引用
const flight = 'LH123';
const jonas = {
  name: 'Jonas Sch',
  passport: 234523243,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 234523243) {
    alert('Checked in');
  } else {
    alert('Wrong passport');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);
*/

/*
/////////////////////////////////////
// funtions accepting callback funtion
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string:    ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
*/

/*
/////////////////////////////////////
// function return function
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

console.log(greet('hello'));
greet('hello')('Jonas');
// 用箭头函数重写
const greet1 = greeting => name => console.log(`${greeting} ${name}`);
greet1('hello')('jonas');
*/

/*
// the call and apply Methods
const lu = {
  planes: 300,
  airline: 'Luuuu',
  iataCode: 'LU',
  bookings: [],
  //book:function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
  },
};

lu.book('23B', 'jonas');
lu.book('123A', 'mark');
//console.log(lu.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Call method
const book = lu.book;
//console.log(book);

// Does NOT work
//book(23, 'Sara');

book.call(eurowings, 23, 'Sara');
console.log(eurowings);

book.call(lu, 45, 'John');
console.log(lu);

// Apply method
const flightData = [111, 'Gorge'];
book.apply(eurowings, flightData);
console.log(eurowings);
*/

/*
// Bind method
const bookEW = book.bind(eurowings);
const bookLU = book.bind(lu);

bookEW(456, 'Steven');
bookLU(32, 'Jobs');

// 带对象和参数
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Mata');

// With Event Listeners
// 对象里面添加 planes 属性和buyPlanes方法
lu.planes = 300;
lu.buyPlanes = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//document.querySelector('.buy').addEventListener('click', lu.buyPlanes);
document.querySelector('.buy').addEventListener('click', lu.buyPlanes.bind(lu));

//Partial application
// bind 预设参数

const addTax1 = function (rate, value) {
  return value + value * rate;
};

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value =>value + value*0.23;
console.log(addVAT(100));
*/

/*
// Immediately Invoked Function Expression IIFE
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

(function () {
  console.log('This will never run again too');
})();

(() => console.log('This will never run again too'))
();
*/

/*
//Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();
*/

// More Closure Examples
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 88;
  f = function () {
    console.log(b * 2);
  };
};

g();
console.log(f);
f(); // 可以访问 g()里面的 a
console.dir(f);
console.log('----------重新给 f 赋值----------');
h();
console.log(f);
f();
console.dir(f);
