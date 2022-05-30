import {
  insertLetter,
  verifyRow,
  createLetters,
  addUpperDivs,
  deleteLetter,
  createButtons,
  createStylesButtons,
} from './export.js';

const letters = createLetters();

window.addEventListener('keydown', (event) => {
  const input =
    document.querySelector('main').lastElementChild.previousElementSibling
      .firstElementChild;

  if (input.innerHTML.length < letters.row) {
    insertLetter(event, input);
  }

  if (event.key === 'Backspace') {
    deleteLetter();
  }

  if (event.key === 'Enter') {
    verifyRow(letters);
  }
});

/************ ADJUSTMENTS AND INFO ************/

addUpperDivs();

/************ LETTER'S BUTTONS ************/

createButtons(letters);

/************ STYLES ************/

createStylesButtons();

/************ COOKIES ************/
//TODO: cookies
// - Streack
// - Words gessed of that day
// - Style selection
