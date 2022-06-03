import {
  insertLetter,
  verifyRow,
  createLetters,
  addUpperDivs,
  deleteLetter,
  createButtons,
  createStylesButtons,
  useSelectedTheme,
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
  } else if (event.key === 'Enter') {
    verifyRow(letters);
  }
});

/************ LOCAL STORAGE ************/

useSelectedTheme();

/************ ADJUSTMENTS AND INFO ************/

addUpperDivs();

/************ LETTER'S BUTTONS ************/

createButtons(letters);

/************ STYLES ************/

createStylesButtons();
