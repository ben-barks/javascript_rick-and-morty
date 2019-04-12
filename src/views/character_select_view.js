const PubSub = require('../helpers/pub_sub.js')

const CharacterSelectView = function(container){
  this.container = container;
};

CharacterSelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Chars:ready', (evt) => {
    const names = evt.detail;
    names.forEach((name, index) => {
      const option = document.createElement('option')
      option.textContent = name;
      option.value = index;
      this.container.appendChild(option);
    });
    this.container.addEventListener('change', (evt) => {
      const selectedChar = evt.target.value;
      PubSub.publish('CharsSelV:selected', selectedChar)
    });
  });
};



module.exports = CharacterSelectView;
