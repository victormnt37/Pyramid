import {
  insertLetter,
  processKey,
  verifyRow,
  createLetters,
  addUpperDivs,
  deleteLetter,
  createButtons,
  createStylesButtons,
} from './export.js';

const letters = createLetters();

window.addEventListener('keydown', (event) => {
  processKey(event, letters);
});

/************ ADJUSTMENTS AND INFO ************/

addUpperDivs();

/************ LETTER'S BUTTONS ************/

createButtons(letters);

/************ STYLES ************/

createStylesButtons();
