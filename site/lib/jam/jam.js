define(["exports", "./core/Meta", "./core/Vector", "./core/Util", "./core/Game", "./core/Sprite", "./core/Input", "./core/Sound", "./core/Text", "./core/Entity"], function (exports, _Meta, _Vector, _Util, _Game, _Sprite, _Input, _Sound, _Text, _Entity) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Meta2 = _interopRequireDefault(_Meta);

  var _Vector2 = _interopRequireDefault(_Vector);

  var _Util2 = _interopRequireDefault(_Util);

  var _Game2 = _interopRequireDefault(_Game);

  var _Sprite2 = _interopRequireDefault(_Sprite);

  var _Input2 = _interopRequireDefault(_Input);

  var _Sound2 = _interopRequireDefault(_Sound);

  var _Text2 = _interopRequireDefault(_Text);

  var _Entity2 = _interopRequireDefault(_Entity);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var lib; // Load all the default modules

  exports.default = lib = {};

  lib.Meta = _Meta2.default;
  lib.Vector = _Vector2.default;
  lib.Util = _Util2.default;
  lib.Game = _Game2.default;
  lib.Sprite = _Sprite2.default;
  lib.Input = _Input2.default;
  lib.Sound = _Sound2.default;
  lib.Text = _Text2.default;

  lib.extend = _Meta2.default.extend;
  lib.ex = _Meta2.default.extend;

  lib.cache = _Util2.default.cache;

  lib.config = function (obj) {
    _Util2.default.dataDir = obj.dataDir || "";
    _Util2.default.logLevel = obj.logLevel || 0;
  };

  // Loads and caches image files or sound files.
  lib.load = _Util2.default.load;

  // Preload just calls load and counts the number of currently loading objects
  lib.preload = _Util2.default.preload;

  // Makes a canvas filling the parent element
  lib.showPreloader = _Util2.default.showPreloader;

  lib.log = _Util2.default.log;

  /** /
  lib.config = function(obj) {
    Util.dataDir = obj.dataDir || "";
    Util.logLevel = obj.logLevel || 0;
  };
  /**/

  lib.loadModule = function (mod, name) {
    if (name == undefined) {
      name = mod.name;
    }
    mod.preLoad();
    mod.load(lib);
    _Entity2.default.loadMod(mod, name);
  };

  // Add a flag on load module that loads mod as a 'default' so that that all new sprites incorperate it without declaration?
});