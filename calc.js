"use strict"

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
  с: document.querySelector('.btn-с'),
  percent: document.querySelector('.btn-percent'),
  posNeg: document.querySelector('.btn-pos-neg')
};

var buffer = [];

var finalStatement = false;

function last(arr) {
  return arr[arr.length - 1];
}

function ifNumber(buffer, value) {
    if (finalStatement) buffer = [];
    finalStatement = false;

    if (!buffer.length || last(buffer) === '+' || (last(buffer) === '-' && buffer.length !== 1 && buffer.length !== 3) || last(buffer) === '*' || last(buffer) === '/') {
        buffer.push(value);
    } else if (last(buffer) === 0 || last(buffer) === '0') {
        buffer[buffer.length - 1] = value;
    } else if (buffer.length === 1 && buffer[0] === '-') {
        buffer[0] += value;
    } else if (buffer.length === 3 && buffer[2] === '-') {
        buffer[2] += value;
    } else {
        buffer[buffer.length - 1] += value;
    }
    return buffer;
}

function ifSighn(buffer, value) {
    finalStatement = false;
    if (!buffer.length) {
        buffer[0] = '0';
        buffer[1] = value;
    } else if (last(buffer) === '+' || last(buffer) === '-' || last(buffer) === '*' || last(buffer) === '/') {
        buffer[buffer.length - 1] = value;
    } else if (buffer.length > 2) {
        var result = eval(buffer.join(' '));
        buffer.length = 2;
        buffer[0] = result;
        buffer[1] = value;
    } else {
        buffer = checkLastElem(buffer);
        buffer.push(value);
    }
    return buffer;
}

function ifPoint(buffer) {
    if (finalStatement) buffer = [];
    finalStatement = false;
    
    if (!buffer.length || last(buffer) === '+' || last(buffer) === '-' || last(buffer) === '*' || last(buffer) === '/') {
        buffer.push('0.');
    }
    var lastElement = last(buffer);
    if (lastElement.indexOf('.') === -1) {
        buffer[buffer.length - 1] += ".";
    }
    return buffer;
}

function ifAc(buffer) {
    buffer.length = 0;
    return buffer;
}

function ifC(buffer) {
    if (buffer.length) {
        buffer.pop();
    }
    return buffer;
}

function ifPercent(buffer) {
    if (buffer.length === 1) {
        buffer[0] = buffer[0] / 100;
    }
    if (buffer.length === 2) {
        if (buffer[1] === '+' || buffer[1] === '-') {
            buffer.push(buffer[0] / 100 * buffer[0]);
            return buffer;
        } else {
            buffer.push(buffer[0] / 100);
            return buffer;
        }
    }
    if (buffer.length === 3) {
        if (buffer[1] === '+' || buffer[1] === '-') {
            buffer[2] = buffer[0] / 100 * buffer[2];
        } else {
            buffer[2] = buffer[2] / 100;
        }
    }
    return buffer; 
}

function ifPosNeg(buffer) {
    if (finalStatement) buffer = [];
    finalStatement = false;
    
    if (buffer[0] === '-') {
        buffer = [];
    } else if ((buffer.length === 1 && buffer[0] !== '-') || buffer.length === 3 && buffer[2] !== '-') {
        buffer[buffer.length - 1] = buffer[buffer.length - 1] * '-1';
    } else if (!buffer.length || buffer.length === 2) {
        buffer.push('-');
    } else {
        buffer.length = 2;
    }
    return buffer;
}

function getResult(buffer) {
    var result;
    if (buffer.length === 2) buffer.push(buffer[0]);
    
    result = eval(buffer.join(' '));
    buffer[0] = result;
    buffer.length = 1;
    finalStatement = true;
    return buffer;
}

function checkLastElem(buffer) {
    if (last(last(buffer)) === '.') {
        buffer[buffer.length - 1] = last(buffer).slice(0, -1);
    }
    return buffer;
}

function appendToBuffer(buffer, value) {
    switch(value) {
        case('+'):
        case('-'):
        case('/'):
        case('*'): return ifSighn(buffer, value);
        case('.'): return ifPoint(buffer);
        case('ac'): return ifAc(buffer);
        case('c'): return ifC(buffer);
        case('%'): return ifPercent(buffer);
        case('+/-'): return ifPosNeg(buffer);
        case('='): return getResult(buffer);
        default: return ifNumber(buffer, value);
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
    case buttons.percent: return '%';
    case buttons.posNeg: return '+/-';
  }
}

document.addEventListener('click', function (event) {
  var value = getValue(event.target)

  if (value) {
    buffer = appendToBuffer(buffer, value);
    field.value = buffer[2] || buffer[0] || '0';
  }
})