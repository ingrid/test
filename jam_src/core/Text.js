import Sprite from  "./Sprite";
// A sprite-like object which renders by drawing text to the screen

/*	SAMPLE USAGE:

** Score display **
var score = 0;
var scoreText = jam.Text(10, 30);
scoreText.font = "16pt monospace";
scoreText.color = "rgb(0,0,0)";
game.add(scoreText);

// in update
scoreText.text = score;

*/
export default class Text extends Sprite{
  constructor(x, y){
    super(x, y);
	  this.text = "";
	  this.font = "";
	  this.color = ""
  }

	render(context, camera){
		context.font = this.font;
		context.fillStyle = this.color;
		context.fillText(this.text,
			               this.x - camera.scroll.x * this.parallax.x,
			               this.y - camera.scroll.y * this.parallax.y);
	}
};
