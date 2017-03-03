import jam from "../lib/jam/jam";
import animation from "../lib/jam/tools/Animation";

jam.loadModule(animation);

var init = function(){
  var g = new jam.Game(400, 400, document.body);

  var hams = [
    [20, 20, 'down'],
    [60, 20, 'up'],
    [100, 20, 'left'],
    [140, 20, 'right'],

    [20, 60, 'down1'],
    [60, 60, 'up1'],
    [100, 60, 'left1'],
    [140, 60, 'right1'],

    [20, 100, 'down2'],
    [60, 100, 'up2'],
    [100, 100, 'left2'],
    [140, 100, 'right2'],

    [20, 140, 'down3'],
    [60, 140, 'up3'],
    [100, 140, 'left3'],
    [140, 140, 'right3'],

    [20, 180, 'down4'],
    [60, 180, 'up4'],
    [100, 180, 'left4'],
    [140, 180, 'right4'],
  ];

  var h, i;
  for(i=0;i<hams.length;i++){
    h = new Player(hams[i][0], hams[i][1]);
    g.add(h);
    console.log(Player.anim.walk[hams[i][2]]);
    h.playAnimation(Player.anim.walk[hams[i][2]]);
  }

  g.run();
};

class Player extends jam.Sprite{
  constructor(x, y){
    super(x, y, ['animated']);
    this.setImage("data/img/hamtaro_walk_no_padding.png", Player.w, Player.h);
  }
}

Player.w = 31;
Player.h = 34;
Player.anim = {};
Player.anim.walk = {};
Player.anim.idle = {};

Player.anim.walk.down = new jam.Animation.Strip([0,1,2,3], Player.w, Player.h, 8);
Player.anim.walk.up = new jam.Animation.Strip([4,5,6,7], Player.w, Player.h, 8);
Player.anim.walk.left = new jam.Animation.Strip([8,9,10,11], Player.w, Player.h, 8);
Player.anim.walk.right = new jam.Animation.Strip([12,13,14,15], Player.w, Player.h, 8);

Player.anim.walk.down1 = new jam.Animation.Strip([0], Player.w, Player.h, 0);
Player.anim.walk.down2 = new jam.Animation.Strip([1], Player.w, Player.h, 0);
Player.anim.walk.down3 = new jam.Animation.Strip([2], Player.w, Player.h, 0);
Player.anim.walk.down4 = new jam.Animation.Strip([3], Player.w, Player.h, 0);

Player.anim.walk.up1 = new jam.Animation.Strip([4], Player.w, Player.h, 0);
Player.anim.walk.up2 = new jam.Animation.Strip([5], Player.w, Player.h, 0);
Player.anim.walk.up3 = new jam.Animation.Strip([6], Player.w, Player.h, 0);
Player.anim.walk.up4 = new jam.Animation.Strip([7], Player.w, Player.h, 0);

Player.anim.walk.left1 = new jam.Animation.Strip([8], Player.w, Player.h, 0);
Player.anim.walk.left2 = new jam.Animation.Strip([9], Player.w, Player.h, 0);
Player.anim.walk.left3 = new jam.Animation.Strip([10], Player.w, Player.h, 0);
Player.anim.walk.left4 = new jam.Animation.Strip([11], Player.w, Player.h, 0);

Player.anim.walk.right1 = new jam.Animation.Strip([12], Player.w, Player.h, 0);
Player.anim.walk.right2 = new jam.Animation.Strip([13], Player.w, Player.h, 0);
Player.anim.walk.right3 = new jam.Animation.Strip([14], Player.w, Player.h, 0);
Player.anim.walk.right4 = new jam.Animation.Strip([15], Player.w, Player.h, 0);




var preload = function(){
  jam.preload("data/img/hamtaro_walk_no_padding.png");
	jam.showPreloader(document.body, init);
}

if (document.readyState === "complete"){
  preload();
} else {
  window.onload = preload;
}
