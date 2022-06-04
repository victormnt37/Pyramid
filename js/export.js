import json from '../json/letters.json' assert { type: 'json' };
// const json = fetch('../json/letters.json'); //una vez subido al host, hacer un fetch?

export {
  insertLetter,
  verifyRow,
  createLetters,
  addUpperDivs,
  deleteLetter,
  createButtons,
  createStylesButtons,
  useSelectedTheme,
};

/************ DATA ************/

function createLetters() {
  const date = new Date();
  const day = date.getDate();
  let month = date.getMonth();
  month++;
  const year = date.getFullYear();

  const currentDate = day + '/' + month + '/' + year;

  storeData(currentDate);

  for (let i = 0; i < json.dailyLetters.length; i++) {
    if (json.dailyLetters[i].date == currentDate) {
      json.dailyLetters[i].row = 3;
      return json.dailyLetters[i];
    }
  }
}

function storeData(date) {
  //Here storing the date and the words
  const lastWords = localStorage.getItem('words');

  if (!lastWords) {
    //First time playing
    localStorage.setItem('words', date); // 'words' will store the date in first possition and the words the user guessed
  } else {
    const arr = lastWords.split(',');
    console.log(arr);
    if (arr[0] == date) {
      //Same day
    } else {
      //Different day
      localStorage.setItem('words', date);
    }
  }
  const storedWords = localStorage.getItem('words');
  console.log(storedWords);
}

function useSelectedTheme() {
  let theme = localStorage.getItem('theme');
  if (!theme) {
    theme = 'styles';
  }

  const cssLink = document.head.lastElementChild;
  cssLink.href = '../css/' + theme + '.css';
}

/************ ADJUSTMENTS AND INFO ************/

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

function insertLetter(event, input) {
  const regexp = new RegExp('^[a-zA-Zs]*$');
  if (event.key.match(regexp) && event.key.length === 1) {
    input.innerHTML = input.innerHTML + event.key;
  }
}

function addLetter(letter, letters) {
  const input =
    document.querySelector('main').lastElementChild.previousElementSibling
      .firstElementChild;
  if (input.innerHTML.length < letters.row) {
    input.innerHTML = input.innerHTML + letter.innerHTML;
  }
}

function letterAdder(letter, letters) {
  letter.addEventListener('click', () => {
    addLetter(letter, letters);
  });
}

function appendLetters(letters) {
  const arrayLetters = letters.letters;
  for (let i = 0; i < arrayLetters.length; i++) {
    let j = i + 1;
    const letter = document.querySelector('button#letter' + j);
    letter.innerHTML = arrayLetters[i];
    letterAdder(letter, letters);
  }
}

function deleteLetter() {
  let array = document
    .querySelector('main div#row span.selected')
    .innerHTML.split('');
  array.pop();
  document.querySelector('main div#row span.selected').innerHTML =
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

/************ LETTER'S BUTTONS ************/

function createButtons(letters) {
  appendLetters(letters);

  const deleteButton = document.querySelector('footer div i.fa-delete-left'),
    enterButton = document.querySelector('footer div i.fa-check'),
    moveButton = document.querySelector('footer div i.fa-arrows-rotate'),
    shareButton = document.querySelector('footer div i.fa-share');

  deleteButton.addEventListener('click', () => {
    deleteLetter();
  });

  enterButton.addEventListener('click', () => {
    verifyRow(letters);
  });

  moveButton.addEventListener('click', () => {
    moveLetters(letters.letters);
  });

  shareButton.addEventListener('click', () => {}); //TO-DO
}

/************ CREATE NEW ROW ************/

function verifyRow(letters) {
  const wordSpan = document.querySelector('main div#row span.selected');
  const word = wordSpan.innerHTML;
  if (word.length === letters.row && filterLetters(word, letters) == false) {
    wordSpan.classList.remove('selected');
    getWord(wordSpan, word, letters);
  } else if (word.length < letters.row) {
    showMessage('Not long enought', 'red');
  } else if (filterLetters(word, letters) > 0) {
    showMessage('Wrong letters', 'red');
    document.querySelector(
      'main'
    ).lastElementChild.previousElementSibling.firstElementChild.innerHTML = '';
  }
}

async function getWord(wordSpan, word, letters) {
  const resp = await fetch(
    'https://api.dictionaryapi.dev/api/v2/entries/en/' + word
  );
  if (resp.ok && letters.row < letters.maxLength && word.length > 2) {
    //const json = await resp.json();
    createRow(letters);
  } else if (!resp.ok) {
    showMessage('"' + word + '" does not exist :/', 'red');
    document.querySelector(
      'main'
    ).lastElementChild.previousElementSibling.firstElementChild.innerHTML = '';
    wordSpan.className = 'selected';
    return;
  } else if (resp.ok && letters.row >= letters.maxLength) {
    alert('Congrats! You made it'); //TO-DO: game finished
  }
}

function filterLetters(word, letters) {
  //Checks if the word uses the letters of the day. Returns 0 if correct, > 0 if wrong letters
  let result = 0;
  const wordArray = word.split('');
  for (let i = 0; i < wordArray.length; i++) {
    if (letters.letters.indexOf(wordArray[i]) < 0) {
      result++;
    }
  }

  return result;
}

function showMessage(message, color) {
  const divMessage = document.createElement('div');

  divMessage.id = 'message';
  divMessage.innerHTML = message;
  divMessage.style.backgroundColor = color;

  document.body.appendChild(divMessage);

  fade(divMessage);
}

function fade(element) {
  let op = 1; // initial opacity
  let timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.remove();
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ')';
    op -= op * 0.1;
  }, 50);
}

function createRow(letters) {
  const main = document.querySelector('main');
  const rowDiv = document.createElement('div');
  const span = document.createElement('span');

  ++letters.row;

  main.appendChild(rowDiv);
  rowDiv.id = 'row';
  rowDiv.appendChild(span);
  span.id = 'input';
  span.className = 'selected';

  createLines(main, letters);
}

function createLines(main, letters) {
  const div = document.createElement('div');

  main.appendChild(div);
  for (let i = letters.row; i > 0; i--) {
    const line = document.createElement('div');
    line.id = 'line';
    div.appendChild(line);
  }
}

/************ STYLES ************/

function createStylesButtons() {
  const cssLink = document.head.lastElementChild;

  const classicButton = document.querySelector('div#adjust button#classic');
  classicButton.addEventListener('click', () => {
    cssLink.href = '../css/styles.css';
    localStorage.setItem('theme', 'styles');
  });

  const desertButton = document.querySelector('div#adjust button#desert');
  desertButton.addEventListener('click', () => {
    cssLink.href = '../css/desert.css';
    localStorage.setItem('theme', 'desert');
  });

  const draculaButton = document.querySelector('div#adjust button#dracula');
  draculaButton.addEventListener('click', () => {
    cssLink.href = '../css/dracula.css';
    localStorage.setItem('theme', 'dracula');
  });

  const terminalButton = document.querySelector('div#adjust button#terminal');
  terminalButton.addEventListener('click', () => {
    cssLink.href = '../css/terminal.css';
    localStorage.setItem('theme', 'terminal');
  });

  const cakeButton = document.querySelector('div#adjust button#cake');
  cakeButton.addEventListener('click', () => {
    cssLink.href = '../css/cake.css';
    localStorage.setItem('theme', 'cake');
  });
}
