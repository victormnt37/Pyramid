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

function createLetters() {
  const letters = ['p', 'y', 'r', 'a', 'm', 'i', 'd'];

  return letters;
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
  const letters = createLetters();

  appendLetters(letters);

  const deleteButton = document.querySelector('footer div i.fa-delete-left'),
    enterButton = document.querySelector('footer div i.fa-check'),
    moveButton = document.querySelector('footer div i.fa-arrows-rotate'),
    shareButton = document.querySelector('footer div i.fa-share');

  deleteButton.addEventListener('click', () => {
    deleteLetter();
  });

  enterButton.addEventListener('click', () => {
    verifyRow(); //Añadir función delay?
  });

  moveButton.addEventListener('click', () => {
    moveLetters(letters);
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

function appendLetters(letters) {
  for (let i = 0; i < letters.length; i++) {
    let j = i + 1;
    const letter = document.querySelector('button#letter' + j);
    letter.innerHTML = letters[i];
    letterAdder(letter);
  }
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

function moveLetters(letters) {
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
