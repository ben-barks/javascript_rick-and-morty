const Characters = require('./models/characters.js');
const CharacterSelectView = require('./views/character_select_view.js');
const CharacterView = require('./views/character_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const characterContainer = document.querySelector('.characters-div');
  const characterView = new CharacterView(characterContainer);
  characterView.bindEvents();

  const characterSelectContainer = document.querySelector('.character-dropdown');
  const characterSelectView = new CharacterSelectView(characterSelectContainer);
  characterSelectView.bindEvents();

  const characters = new Characters();
  characters.getData();
  characters.bindEvents();
});
