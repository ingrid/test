var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

define(["../lib/jam/jam", "../lib/jam/tools/Animation"], function (_jam, _Animation) {
  "use strict";

  var _jam2 = _interopRequireDefault(_jam);

  var _Animation2 = _interopRequireDefault(_Animation);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  _jam2.default.loadModule(_Animation2.default);

  var init = function init() {
    var g = new _jam2.default.Game(400, 400, document.body);

    var hams = [[20, 20, 'down'], [60, 20, 'up'], [100, 20, 'left'], [140, 20, 'right'], [20, 60, 'down1'], [60, 60, 'up1'], [100, 60, 'left1'], [140, 60, 'right1'], [20, 100, 'down2'], [60, 100, 'up2'], [100, 100, 'left2'], [140, 100, 'right2'], [20, 140, 'down3'], [60, 140, 'up3'], [100, 140, 'left3'], [140, 140, 'right3'], [20, 180, 'down4'], [60, 180, 'up4'], [100, 180, 'left4'], [140, 180, 'right4']];

    var h, i;
    for (i = 0; i < hams.length; i++) {
      h = new Player(hams[i][0], hams[i][1]);
      g.add(h);
      console.log(Player.anim.walk[hams[i][2]]);
      h.playAnimation(Player.anim.walk[hams[i][2]]);
    }

    g.run();
  };

  var Player = function (_jam$Sprite) {
    _inherits(Player, _jam$Sprite);

    function Player(x, y) {
      _classCallCheck(this, Player);

      var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, ['animated']));

      _this.setImage("data/img/hamtaro_walk_no_padding.png", Player.w, Player.h);
      return _this;
    }

    return Player;
  }(_jam2.default.Sprite);

  Player.w = 31;
  Player.h = 34;
  Player.anim = {};
  Player.anim.walk = {};
  Player.anim.idle = {};

  Player.anim.walk.down = new _jam2.default.Animation.Strip([0, 1, 2, 3], Player.w, Player.h, 8);
  Player.anim.walk.up = new _jam2.default.Animation.Strip([4, 5, 6, 7], Player.w, Player.h, 8);
  Player.anim.walk.left = new _jam2.default.Animation.Strip([8, 9, 10, 11], Player.w, Player.h, 8);
  Player.anim.walk.right = new _jam2.default.Animation.Strip([12, 13, 14, 15], Player.w, Player.h, 8);

  Player.anim.walk.down1 = new _jam2.default.Animation.Strip([0], Player.w, Player.h, 0);
  Player.anim.walk.down2 = new _jam2.default.Animation.Strip([1], Player.w, Player.h, 0);
  Player.anim.walk.down3 = new _jam2.default.Animation.Strip([2], Player.w, Player.h, 0);
  Player.anim.walk.down4 = new _jam2.default.Animation.Strip([3], Player.w, Player.h, 0);

  Player.anim.walk.up1 = new _jam2.default.Animation.Strip([4], Player.w, Player.h, 0);
  Player.anim.walk.up2 = new _jam2.default.Animation.Strip([5], Player.w, Player.h, 0);
  Player.anim.walk.up3 = new _jam2.default.Animation.Strip([6], Player.w, Player.h, 0);
  Player.anim.walk.up4 = new _jam2.default.Animation.Strip([7], Player.w, Player.h, 0);

  Player.anim.walk.left1 = new _jam2.default.Animation.Strip([8], Player.w, Player.h, 0);
  Player.anim.walk.left2 = new _jam2.default.Animation.Strip([9], Player.w, Player.h, 0);
  Player.anim.walk.left3 = new _jam2.default.Animation.Strip([10], Player.w, Player.h, 0);
  Player.anim.walk.left4 = new _jam2.default.Animation.Strip([11], Player.w, Player.h, 0);

  Player.anim.walk.right1 = new _jam2.default.Animation.Strip([12], Player.w, Player.h, 0);
  Player.anim.walk.right2 = new _jam2.default.Animation.Strip([13], Player.w, Player.h, 0);
  Player.anim.walk.right3 = new _jam2.default.Animation.Strip([14], Player.w, Player.h, 0);
  Player.anim.walk.right4 = new _jam2.default.Animation.Strip([15], Player.w, Player.h, 0);

  var preload = function preload() {
    _jam2.default.preload("data/img/hamtaro_walk_no_padding.png");
    _jam2.default.showPreloader(document.body, init);
  };

  if (document.readyState === "complete") {
    preload();
  } else {
    window.onload = preload;
  }
});