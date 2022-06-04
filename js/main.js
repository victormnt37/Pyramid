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
} from './export.js';

const letters = createLetters();

window.addEventListener('keydown', (event) => {
  const input = document.querySelector('main div#row span.selected');

  if (!input) {
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

/************ ADJUSTMENTS AND INFO ************/

addUpperDivs();

/************ LETTER'S BUTTONS ************/

createButtons(letters);

/************ STYLES ************/

createStylesButtons();
