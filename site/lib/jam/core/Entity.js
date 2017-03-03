define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Entity = function () {
    function Entity() {
      _classCallCheck(this, Entity);

      this.constructor.tag = undefined;
      this.components = [];
      this.updates = [];
      this.renders = [];

      this.add_component = this.add_component.bind(this);
    }

    _createClass(Entity, [{
      key: "add_component",
      value: function add_component(com_name) {
        if (Entity.mods[this.constructor.tag][com_name] == undefined) {
          // No mod for this type of entity loaded.
          console.log("No component named " + com_name + " found for type " + this.constructor.tag);
          return;
        }
        var com = Entity.mods[this.constructor.tag][com_name];
        if (com.init != undefined) {
          com.init.call(this);
        }
        if (com.update != undefined) {
          this.updates.push(com.update.bind(this));
        }
        if (com.render != undefined) {
          this.renders.push(com.render.bind(this));
        }
      }
    }, {
      key: "list_components",
      value: function list_components() {
        // Format a printable list of componenets on this object
      }
    }, {
      key: "update",
      value: function update(elapsed) {
        var i;
        for (i = 0; i < this.updates.length; i++) {
          this.updates[i](elapsed);
        }
      }
    }, {
      key: "render",
      value: function render(context, camera) {
        var i;
        for (i = 0; i < this.renders.length; i++) {
          this.renders[i](context, camera);
        }
      }
    }]);

    return Entity;
  }();

  exports.default = Entity;

  Entity.mods = {};
  Entity.mods.sprite = {};
  Entity.mods.game = {};

  Entity.loadMod = function (mod, name) {
    // Add check if mod itself is already loaded.
    // Add check for if name is arleady defined, we can override, but should log a message.

    // Maybe trim unecessary (empty or undefined) components here.
    Entity.mods.sprite[name] = mod.sprite;
    Entity.mods.game[name] = mod.game;
  };
});