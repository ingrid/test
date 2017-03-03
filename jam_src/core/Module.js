export default class Module{
  // This class exists so we can call hooks without them being implmented.
  constructor(){
    this.sprite = {
      init: function(){},
      update: undefined,
      render: undefined};
    this.game = {
      init: function(){},
      update: undefined,
      render: undefined};

    // Default name, can be overwritten.
    this.name = "";
  }
  preLoad(){
    // Makes sure any required modules are loaded beforehand.
  }
  // Do we need modLevel? ModGroup? Do we need hooks fod deconstruct or delete?
}
