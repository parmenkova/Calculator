"use strict"

// https://codepen.io/kinday/pen/xLERbp?editors=1010

var field = document.getElementById("field");

const buttons = {
  one: document.querySelector('.btn-one'),
  two: document.querySelector('.btn-two'),
  three: document.querySelector('.btn-three'),
  four: document.querySelector('.btn-four'),
  five: document.querySelector('.btn-five'),
  six: document.querySelector('.btn-six'),
  seven: document.querySelector('.btn-seven'),
  eight: document.querySelector('.btn-eight'),
  nine: document.querySelector('.btn-nine'),
  zero: document.querySelector('.btn-zero'),
  point: document.querySelector('.btn-point'),
  summarize: document.querySelector('.btn-summarize'),
  subtract: document.querySelector('.btn-subtract'),
  multiply: document.querySelector('.btn-multiply'),
  divide: document.querySelector('.btn-divide'),
  ac: document.querySelector('.btn-ac'),
  equal: document.querySelector('.btn-equal'),
  с: document.querySelector('.btn-с')
};

var buffer = [];

function last(arr) {
  return arr[arr.length - 1];
}

function ifNumber(value) { //нажали цифру
    // ЕСЛИ буфер пустой или последний элемент буфера +, -, * или /
    if (!buffer.length || last(buffer) === '+' || last(buffer) === '-' || last(buffer) === '*' || last(buffer) === '/') {
        buffer.push(value);
    // ЕСЛИ последний элемент буфера ноль и мы вводим число
    } else if (last(buffer) === 0 || last(buffer) === '0') {
        buffer[buffer.length - 1] = value;
    // в остальных случаях просто добавляем к последнему элементу
    } else {
        buffer[buffer.length - 1] += value;
    }
}

function ifSighn(value) { //нажали +, -, * или /
    // ЕСЛИ буфер пустой
    if (!buffer.length) {
        buffer[0] = '0';
        buffer[1] = value;
    // ЕСЛИ последний элемент в буфере знак, заменяем его на новый введённый
    } else if (last(buffer) === '+' || last(buffer) === '-' || last(buffer) === '*' || last(buffer) === '/') {
        last(buffer) = value;
    // ЕСЛИ в буфере уже есть два операнда и знак между ними
    } else if (buffer.length > 2) {
        // считаем
        var result = eval(buffer.join(' '));
        buffer.length = 2;
        // добавляем результат первым элементом
        buffer[0] = result;
        // введённый знак вторым
        buffer[1] = value;
    // в остальных случаях просто добавляем введённый знак вторым элементом в буфер
    } else {
        // проверяем, чтобы не было точки в конце буфера
        checkLastElem();
        buffer.push(value);
    }
}

function ifPoint() {
    if (!buffer.length || last(buffer) === '+' || last(buffer) === '-' || last(buffer) === '*' || last(buffer) === '/') {
        buffer.push('0.');
    }
    var lastElement = last(buffer);
    if (lastElement.indexOf('.') === -1) {
        last(buffer) += ".";
    }
}

function ifAc() {
    buffer.length = 0;
}

function ifC() {
    if (buffer.length) {
        buffer.pop();
    }
}

function getResult() {
    var result;
    // если только один операнд и знак, то добавляем вторым операндом ноль
    if (buffer.length === 2) buffer.push('0');
    
    result = eval(buffer.join(' '));
    buffer[0] = result;
    buffer.length = 1;
}

// функция для удаления точки, если она стоит в конце последнего элемента буфера
function checkLastElem() {
    // проверяем, чтобы последний элемент не кончался точкой
    if (last(last(buffer)) === '.') {
        // убираем точку, если она есть
        last(buffer) = last(buffer).slice(0, -1);
    }
}

function appendToBuffer(buffer, value) {
    // ЕСЛИ ввели знак +, -, * или /
    if (value === "+" || value === "-" || value === "*" || value === "/") {
        ifSighn(value);
        return field.value = buffer.join(' ');
    // ЕСЛИ ввели точку
    } else if (value === '.') {
        ifPoint(value);
        return field.value = buffer.join(' ');
    // ЕСЛИ нажали очистку
    } else if (value === 'ac') {
        ifAc();
        return field.value = '';
    } else if (value === 'c') {
        ifC();
        return field.value = buffer.join(' ');
    // ЕСЛИ нажали равно
    } else if (value === '=') {
        getResult();
        return field.value = buffer[0];
    // ЕСЛИ ввели число
    } else {
        ifNumber(value);
        return field.value = buffer.join(' ');
    }
}

function getValue(target) {
  switch (target) {
    case buttons.one: return '1';
    case buttons.two: return '2';
    case buttons.three: return '3';
    case buttons.four: return '4';
    case buttons.five: return '5';
    case buttons.six: return '6';
    case buttons.seven: return '7';
    case buttons.eight: return '8';
    case buttons.nine: return '9';
    case buttons.zero: return '0';
    case buttons.point: return '.';
    case buttons.summarize: return '+';
    case buttons.subtract: return '-';
    case buttons.multiply: return '*';
    case buttons.divide: return '/';
    case buttons.ac: return 'ac';
    case buttons.equal: return '=';
    case buttons.с: return 'c';
  }
}

document.addEventListener('click', function (event) {
  var value = getValue(event.target)

  if (value) {
    appendToBuffer(buffer, value)
  }
})