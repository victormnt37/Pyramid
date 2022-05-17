'use strict';

let row = 3; //The amount of letters the user can write in the word

window.addEventListener('keydown', (event) => {
  const input =
    document.querySelector('main').lastElementChild.previousElementSibling
      .firstElementChild;

  if (input.innerHTML.length < row) {
    insertLetter(event, input);
  }

  if (event.key === 'Backspace') {
    deleteLetter();
  }

  if (event.key === 'Enter') {
    verifyRow();
  }
});

function insertLetter(event, input) {
  const regexp = new RegExp('^[a-zA-Zs]*$');
  if (event.key.match(regexp) && event.key.length === 1) {
    input.innerHTML = input.innerHTML + event.key;
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
    enterButton = document.querySelector('footer div i.fa-check'),
    moveButton = document.querySelector('footer div i.fa-arrows-rotate'),
    shareButton = document.querySelector('footer div i.fa-share');

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

  enterButton.addEventListener('click', () => {
    verifyRow(); //Añadir función delay?
  });

  moveButton.addEventListener('click', () => {
    moveLetters(letter1, letter2, letter3, letter4, letter5, letter6, letter7);
  });

  shareButton.addEventListener('click', () => {});
}

function addLetter(letter) {
  const input =
    document.querySelector('main').lastElementChild.previousElementSibling
      .firstElementChild;
  if (input.innerHTML.length < row) {
    input.innerHTML = input.innerHTML + letter.innerHTML;
  }
}

function letterAdder(letter) {
  letter.addEventListener('click', () => {
    addLetter(letter);
  });
}

function deleteLetter() {
  let array = document
    .querySelector('main')
    .lastElementChild.previousElementSibling.firstElementChild.innerHTML.split(
      ''
    );
  array.pop();
  document.querySelector(
    'main'
  ).lastElementChild.previousElementSibling.firstElementChild.innerHTML =
    array.join('');
}

function moveLetters(l1, l2, l3, l4, l5, l6, l7) {
  const letters = [
    l1.innerHTML,
    l2.innerHTML,
    l3.innerHTML,
    l4.innerHTML,
    l5.innerHTML,
    l6.innerHTML,
    l7.innerHTML,
  ];

  let currentIndex = letters.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = letters[currentIndex];
    letters[currentIndex] = letters[randomIndex];
    letters[randomIndex] = temporaryValue;
  }

  for (let i = letters.length; i > 0; i--) {
    const cssLetter = 'button#letter' + i;
    document.querySelector(cssLetter).innerHTML = letters[i - 1];
  }
}

/************ CREATE NEW ROW ************/

function verifyRow() {
  const word =
    document.querySelector('main').lastElementChild.previousElementSibling
      .firstElementChild.innerHTML;
  console.log(word);
  if (word.length === row) {
    getWord(word);
    console.log('Long enought');
  }
}

async function getWord(word) {
  const resp = await fetch(
    'https://api.dictionaryapi.dev/api/v2/entries/en/' + word
  );
  //TODO: Al presionar Enter repetidas veces se crean muchas rows en blanco
  if (resp.ok) {
    const json = await resp.json();
    createRow();
  } else if (!resp.ok) {
    return;
  }
}

function createRow() {
  const main = document.querySelector('main');
  const rowDiv = document.createElement('div');
  const span = document.createElement('span');

  ++row;

  main.appendChild(rowDiv);
  rowDiv.id = 'row';
  rowDiv.appendChild(span);
  span.id = 'line';

  createLines(main);
}

function createLines(main) {
  const div = document.createElement('div');

  main.appendChild(div);
  for (let i = row; i > 0; i--) {
    const line = document.createElement('div');
    line.id = 'line';
    div.appendChild(line);
  }
}
