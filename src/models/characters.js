const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Characters = function() { //constructor
  this.characterList = null;
};

Characters.prototype.getData = function () {
  const url = `https://rickandmortyapi.com/api/character/`;
  const requestHelper = new RequestHelper(url);
  console.log(requestHelper);
  requestHelper.get()
    .then((characters) => {
      this.characterList = characters.results;
      const allChars = [];
      let names = this.characterList.forEach((character) => {
        allChars.push(character.name)
      });
      PubSub.publish('Chars:ready', allChars)
    })
    .catch(() => {

    });
};

Characters.prototype.bindEvents = function () {
  PubSub.subscribe('CharsSelV:selected', (evt) => {
    const selectedIndex = evt.detail;
    const selectedCharacter = this.characterList[selectedIndex];
    // send character wherever
    PubSub.publish('Chars:selected-ready', selectedCharacter)
  });
};

module.exports = Characters;
