'use strict';

const input3 = document.querySelector('div#three span#input');
const row = 3; //The amount of letters the user can write in the word

window.addEventListener('keydown', (event) => {
  insertLetter(event);
  if (event.key === 'Backspace') {
    deleteLetter();
  }
});

function insertLetter(event) {
  const regexp = new RegExp('^[a-zA-Zs]*$');
  if (input3.innerHTML.length < row) {
    if (event.key.match(regexp) && event.key.length === 1) {
      input3.innerHTML = input3.innerHTML + event.key;
    }
  }
}

/************ ADJUSTMENTS AND INFO ************/

const info = document.querySelector('div#info');
const infoButton = document.querySelector('i.fa-solid.fa-circle-question');
const infoEsc = document.querySelector('div#info button');

const adjust = document.querySelector('div#adjust');
const adjustButton = document.querySelector('i.fa-solid.fa-gear');
const adjustEsc = document.querySelector('div#adjust button');

info.hidden = true;
adjust.hidden = true;

infoButton.addEventListener('click', () => {
  info.hidden = false;
});

infoEsc.addEventListener('click', () => {
  info.hidden = true;
});

adjustButton.addEventListener('click', () => {
  adjust.hidden = false;
});

adjustEsc.addEventListener('click', () => {
  adjust.hidden = true;
});

/************ LETTER'S BUTTONS ************/

const letter1 = document.querySelector('button#letter1');
const letter2 = document.querySelector('button#letter2');
const letter3 = document.querySelector('button#letter3');
const letter4 = document.querySelector('button#letter4');
const letter5 = document.querySelector('button#letter5');
const letter6 = document.querySelector('button#letter6');
const letter7 = document.querySelector('button#letter7');
const deleteButton = document.querySelector('footer div i.fa-delete-left');
const refreshButton = document.querySelector('footer div i.fa-arrows-rotate');

letter1.addEventListener('click', () => {
  addLetter(letter1);
});
letter2.addEventListener('click', () => {
  addLetter(letter2);
});
letter3.addEventListener('click', () => {
  addLetter(letter3);
});
letter4.addEventListener('click', () => {
  addLetter(letter4);
});
letter5.addEventListener('click', () => {
  addLetter(letter5);
});
letter6.addEventListener('click', () => {
  addLetter(letter6);
});
letter7.addEventListener('click', () => {
  addLetter(letter7);
});

deleteButton.addEventListener('click', () => {
  deleteLetter();
});

refreshButton.addEventListener('click', () => {});

function addLetter(letter) {
  if (document.querySelector('div.selected span#input').value.length < 3) {
    document.querySelector('div.selected span#input').value =
      document.querySelector('div.selected span#input').value +
      letter.innerHTML;
  }
}

function deleteLetter() {
  let word = document.querySelector('div.selected span#input').value; //word is undefined
  let array = word.split('');
  array.pop();
  document.querySelector('div.selected span#input').value = array.join('');
}
