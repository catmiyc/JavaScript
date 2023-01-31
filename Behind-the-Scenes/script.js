'use strict';

/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear > 1981 && birthYear < 1996) {
      // block scope 块作用域
      const firstName = 'Steven';
      //const str = `Oh, and you're a millenial, ${firstName}`;
      var str = `Oh, and you're a millenial, ${firstName}`;
      //console.log(str);
      //output = `NEW OUTPUT`;\
      // 创建了一个同名变量
      const output = `NEW OUTPUT`;
    }
    console.log(output);
    // const / let is block-scope
    // var is funcion-scope
    //console.log(str);
  }

  // const / let is block-scope
  // var is funcion-scope
  //console.log(str);
  printAge();

  return age;
}
*/
//console.log(str);
// const firstName = 'Jonas';

// console.log(calcAge(1991));

/********************/
//hoisting
// console.log(me);
// console.log(job);
// console.log(year);
// var me = 'Jonas';
// let job = 'teacher';
// const year = '1991';

/*
const myName = 'Jonas';

if (myName == 'Jonas') {
  console.log(`Jonas is a${job}`);
  const age = 20;
  console.log(age);
  const job = 'teacher';
  console.log(x);
}
*/

// console.log(addDecl(2, 3));
// console.log(addExpr(3, 4)); //ReferenceError:Cannot access 'addExpr' before initialization
// console.log(addArrow(5, 6)); //ReferenceError

// 函数
function addDecl(a, b) {
  return a + b;
}
// 函数表达式
var addExpr = function (a, b) {
  return a + b;
};
// 箭头函数
var addArrow = (a, b) => a + b;

// var hoisting
// console.log(numberProducts);
// if (!numberProducts) deleteShoppingCart();

// var numberProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted');
// }

// var 定义的对象会在window 上
var x = 1;
let y = 2;
const z = 3;
// console.log(x === window.x);
// console.log(y === window.y);
// console.log(z === window.z);
/*
console.log(this); //window object

function declFunc() {
  console.log(2000);
  console.log(this); //undefined
}

const jonas = {
  name: 'Jonas',
  year: 1989,
  calcAge: function () {
    console.log(this); //jonas object
    return 2037 - this.year;
  },
};

const declArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); //window object
};

declFunc();
console.log(jonas.calcAge());
declArrow(1991);
*/

// var firstName = 'Matila';
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); //jonas object
    // return 2037 - this.year;
    // 方法1
    // const self = this;
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // 方法2
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => console.log(`hey ${this.firstName}`),
};
// jonas.calcAge();
// jonas.greet();

/*
const jessica = {
  firstName: 'Jessica',
  age: 28,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica);
jessicaCopy.firstName = 'JessicaCopy';
jessicaCopy.family.push('Mary');

console.log('jessica name: ', jessica.firstName);
console.log('jessica-copy name: ', jessicaCopy.firstName);
console.log('jessica family: ', jessica.family);
console.log('jessica-copy family: ', jessicaCopy.family);
*/

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log('Me:', me);
// console.log('Friend:', friend);

// reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After  marriage:', marriedJessica);

// copy objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Bob', 'Mark'],
};
const marriedJessica2 = Object.assign({}, jessica2);
marriedJessica2.lastName = 'Davis';
marriedJessica2.family.push('Alice');
console.log('Before marriage:', jessica2);
console.log('After  marriage:', marriedJessica2);
