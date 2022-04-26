'use strict';

const input3 = document.querySelector('div#three input');

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

letter1.addEventListener('click', () => {
  //El input3 se deberá cambiar por un "document.querySelector('input.selected')".
  //esto permite que se identifique automáticamente cual es el input en el que se debe escribir en esa ocasión
  if (document.querySelector('div.selected input').value.length < 3) {
    document.querySelector('div.selected input').value =
      document.querySelector('div.selected input').value + letter1.innerHTML;
  }
});
