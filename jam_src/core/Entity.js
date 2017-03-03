export default class Entity{
  constructor(){
    this.constructor.tag = undefined;
    this.components = [];
    this.updates = [];
    this.renders = [];

    this.add_component = this.add_component.bind(this);
  }

  add_component(com_name){
    if (Entity.mods[this.constructor.tag][com_name] == undefined){
      // No mod for this type of entity loaded.
      console.log("No component named " + com_name +
                  " found for type " + this.constructor.tag);
      return;
    }
    var com = Entity.mods[this.constructor.tag][com_name];
    if (com.init != undefined){
      com.init.call(this);
    }
    if (com.update != undefined){
      this.updates.push(com.update.bind(this));
    }
    if (com.render != undefined){
      this.renders.push(com.render.bind(this));
    }
  }

  list_components(){
    // Format a printable list of componenets on this object
  }

  update(elapsed){
    var i;
    for(i=0;i<this.updates.length;i++){
      this.updates[i](elapsed);
    }
  }

  render(context, camera){
    var i;
    for(i=0;i<this.renders.length;i++){
      this.renders[i](context, camera);
    }
  }
}

Entity.mods = {};
Entity.mods.sprite = {};
Entity.mods.game = {};

Entity.loadMod = function(mod, name){
  // Add check if mod itself is already loaded.
  // Add check for if name is arleady defined, we can override, but should log a message.

  // Maybe trim unecessary (empty or undefined) components here.
  Entity.mods.sprite[name] = mod.sprite;
  Entity.mods.game[name] = mod.game;
};
