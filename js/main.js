'use strict';

const input3 = document.querySelector('div#three span#input');
const row = 3; //The amount of letters the user can write in the word

window.addEventListener('keydown', (event) => {
  if (input3.innerHTML.length < row) {
    insertLetter(event);
  }

  if (event.key === 'Backspace') {
    deleteLetter();
  }

  if (event.key === 'Enter') {
    verifyRow(row);
  }
});

function insertLetter(event) {
  const regexp = new RegExp('^[a-zA-Zs]*$');
  if (event.key.match(regexp) && event.key.length === 1) {
    input3.innerHTML = input3.innerHTML + event.key;
  }
}

/************ ADJUSTMENTS AND INFO ************/

addUpperDivs();

function addUpperDivs() {
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
}

/************ LETTER'S BUTTONS ************/

createButtons();

function createButtons() {
  const letter1 = document.querySelector('button#letter1'),
    letter2 = document.querySelector('button#letter2'),
    letter3 = document.querySelector('button#letter3'),
    letter4 = document.querySelector('button#letter4'),
    letter5 = document.querySelector('button#letter5'),
    letter6 = document.querySelector('button#letter6'),
    letter7 = document.querySelector('button#letter7'),
    deleteButton = document.querySelector('footer div i.fa-delete-left'),
    refreshButton = document.querySelector('footer div i.fa-arrows-rotate');

  letterAdder(letter1);
  letterAdder(letter2);
  letterAdder(letter3);
  letterAdder(letter4);
  letterAdder(letter5);
  letterAdder(letter6);
  letterAdder(letter7);

  deleteButton.addEventListener('click', () => {
    deleteLetter();
  });

  refreshButton.addEventListener('click', () => {});
}

function addLetter(letter) {
  if (document.querySelector('div.selected span#input').innerHTML.length < 3) {
    document.querySelector('div.selected span#input').innerHTML =
      document.querySelector('div.selected span#input').innerHTML +
      letter.innerHTML;
  }
}

function letterAdder(letter) {
  letter.addEventListener('click', () => {
    addLetter(letter);
  });
}

function deleteLetter() {
  let array = document
    .querySelector('div.selected span#input')
    .innerHTML.split('');
  array.pop();
  document.querySelector('div.selected span#input').innerHTML = array.join('');
}

/************ CREATE NEW ROW ************/

function verifyRow() {
  if (
    document.querySelector('main').lastElementChild.previousElementSibling
      .firstElementChild.innerHTML.length === row
  ) {
    return;
  }
}
