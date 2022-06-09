import {
  insertLetter,
  verifyRow,
  createLetters,
  addUpperDivs,
  deleteLetter,
  createButtons,
  createStylesButtons,
  useSelectedTheme,
  storeData,
  getJSON,
} from './export.js';

getJSON('../json/letters.json').then((data) => {
  sessionStorage.setItem('letters', JSON.stringify(data));
});

const letters = createLetters();

window.addEventListener('keydown', (event) => {
  const input = document.querySelector('main div#row span.selected');

  if (!input) {
    //There is a breve moment when there is not a span.selected in the document. That is when the word is being verified.
    return;
  }

  if (input.innerHTML.length < letters.row) {
    insertLetter(event, input);
  }

  if (event.key === 'Backspace') {
    deleteLetter();
  } else if (event.key === 'Enter') {
    verifyRow(letters);
  }
});

/************ LOCAL STORAGE ************/

storeData(letters);
useSelectedTheme();

/************ ADJUSTMENTS, INFO & ENDING ************/

addUpperDivs();

if (letters.row >= letters.maxLength) {
  document.querySelector('div#end').hidden = false;
  document.querySelector('div#end p span#victories').innerHTML =
    localStorage.getItem('victories');
}

/************ LETTER'S BUTTONS ************/

createButtons(letters);

/************ STYLES ************/

createStylesButtons();
