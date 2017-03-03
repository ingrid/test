// Load all the default modules
import Meta from "./core/Meta";
import Vector from "./core/Vector";
import Util from "./core/Util";
import Game from "./core/Game";
import Sprite from "./core/Sprite";
import Input from "./core/Input";
import Sound from "./core/Sound";
import Text from "./core/Text";
import Entity from "./core/Entity";

var lib;

export default lib = {};

lib.Meta = Meta;
lib.Vector = Vector;
lib.Util = Util;
lib.Game = Game;
lib.Sprite = Sprite;
lib.Input = Input;
lib.Sound = Sound;
lib.Text = Text;

lib.extend = Meta.extend;
lib.ex = Meta.extend;

lib.cache = Util.cache;

lib.config = function(obj) {
    Util.dataDir = obj.dataDir || "";
    Util.logLevel = obj.logLevel || 0;
};

// Loads and caches image files or sound files.
lib.load = Util.load;

// Preload just calls load and counts the number of currently loading objects
lib.preload = Util.preload;

// Makes a canvas filling the parent element
lib.showPreloader = Util.showPreloader;

lib.log = Util.log;

/** /
lib.config = function(obj) {
  Util.dataDir = obj.dataDir || "";
  Util.logLevel = obj.logLevel || 0;
};
/**/

lib.loadModule = function(mod, name){
  if (name == undefined){
    name = mod.name;
  }
  mod.preLoad();
  mod.load(lib);
  Entity.loadMod(mod, name);
};

// Add a flag on load module that loads mod as a 'default' so that that all new sprites incorperate it without declaration?
