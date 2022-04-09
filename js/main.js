'use strict';

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
