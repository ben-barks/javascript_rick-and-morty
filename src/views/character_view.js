const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js')
const CharacterListView = require('./character_list_view.js')

const CharacterView = function(container){
  this.container = container;
};

CharacterView.prototype.bindEvents = function () {
  PubSub.subscribe('Chars:selected-ready', (evt) => {
    const character = evt.detail;
    this.render(character);
  });
};

CharacterView.prototype.render = function (character) {
  this.container.innerHTML = '';

  const characterContainer = document.createElement('div');
  characterContainer.classList.add('character-container');

  const name = this.createContentHeading(character.name);
  characterContainer.appendChild(name);

  const status = this.createPara('status', character.status);
  characterContainer.appendChild(status);

  const species = this.createPara('species', character.species);
  characterContainer.appendChild(species);

  const gender = this.createPara('gender', character.gender);
  characterContainer.appendChild(gender);

  const origin = this.createPara('origin', character.origin.name);
  characterContainer.appendChild(origin);

  const image = this.createImg(character.image);
  characterContainer.appendChild(image);

  this.container.appendChild(characterContainer);
};

CharacterView.prototype.createContentHeading = function (name) {
  const heading = document.createElement('h3');
  heading.classList.add('character-name');
  heading.textContent = name;
  return heading;
};

CharacterView.prototype.createPara = function (label, text) {
  const para = document.createElement('p');
  para.classList.add('character-details');
  para.textContent = `${label}: ${text}`
  return para;
};

CharacterView.prototype.createImg = function (src) {
  const img = document.createElement('img');
  img.classList.add('character-image');
  img.src = src;
  return img;
};

module.exports = CharacterView;
