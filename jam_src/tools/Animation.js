import Meta from "../core/Meta";
import Util from "../core/Util";
import Module from "../core/Module";
import jam from "../jam";

var Animation = {};

// Enables Sprite objects to be animated. Also includes horizontal flipping.
// Sprites can have a current animation object which are defined as a series
// of positions to select from inside one big sprite image. This way, you load
// just one image per sprite, even if it has many animations.

// There are any number of ways of defining these selectors, but this is a
// horizontal strip system:
// A contiguous region in the sprite image containing frames without any padding
Animation.Strip = function(frames, frameWidth, frameHeight, rate, offsetX, offsetY, callback){
	if(offsetX === undefined) { offsetX = 0; }
	if(offsetY === undefined) { offsetY = 0; }

	this.rate = rate;
	this.frames = [];
	this.callback = callback;
	var numFrames = frames.length;
	for(var i = 0; i < numFrames; ++i){
		var frame = {};
		frame.x = (frames[i] * frameWidth) + offsetX;
		frame.y = offsetY;
		frame.w = frameWidth;
		frame.h = frameHeight;
		this.frames.push(frame);
	}
}

var lib;
export default lib = new Module();
lib.load = function(jam){
  jam.Animation = Animation;
}
lib.sprite.init = function(){
	this.animation = null;
	this.lastAnimation = null;
	this.frame = null;
	this.animationFrame = 0;
	this._force = false;

  this.render_default = false;

	// Similar to Sprite's setImage, but we need to care about frameWidth and
	// frameHeight
	this.setImage = function(url, frameWidth, frameHeight){
		if(Util.cache[url] === undefined){
			Util.load(url, function(obj){
				this.image = Util.cache[url];
				this.width = (frameWidth === undefined) ? this.image.naturalWidth : frameWidth;
				this.height = (frameHeight === undefined) ?  this.image.naturalHeight : frameHeight;
				this.imageLoaded();
			});
		}else{
			this.image = Util.cache[url];
			this.width = (frameWidth === undefined) ? this.image.naturalWidth : frameWidth;
			this.height = (frameHeight === undefined) ?  this.image.naturalHeight : frameHeight;
			this.imageLoaded();
		}
	};

	// Simply sets the animation to whatever you pass it.
	this.playAnimation = function(animation, force){
		this.animation = animation;
		if(force) { this._force = true; }
		if(!this.frame || force){
			this.frame = this.animation.frames[0];
			this.animationFrame = 0;
		}
	}
};

lib.sprite.update = function(elapsed){
  // Update needs to (in addition to what Sprite does) update the animation
	// frame and call any animation callbacks are set.
	if(this.animation !== null){
		this.animationFrame = (this.animationFrame + (elapsed * this.animation.rate));
		if(this.animationFrame > this.animation.frames.length){
      // Wrap around the end
			this.animationFrame = 0;
			if(this.animation.callback !== undefined){
				this.animation.callback();
			}
		}

		// Make sure it's an integer frame index
		this.frame = this.animation.frames[Math.floor(this.animationFrame)];

		// We don't reset the frame number in case the animation actually
		// changes. It's common for people to make the same playAnimation
		// call every tick, so make sure we only reset stuff if it's a new
		// anim.
		if(this.animation !== this.lastAnimation || this._force){
			this.animationFrame = 0;
			this.frame = this.animation.frames[0];
			this._force = false;
		}
		this.lastAnimation = this.animation;
	}
};

lib.sprite.render = function(context, camera){
  // Selects the right frame given by the current frame
	// of the animation object. Flips horizontally if needed

  // The Animation render component is a special case in that to mimic old bhavior, it actually needs to overwrite Sprite.render. There's a temp patch on the problem for now, but we need to revisit and probably rewrite Sprite.render to be more flexible.
	if(this.image !== null && this.visible){
		var curFrame = null;
		if(this.frame === null || this.frame === undefined){
			curFrame = { x:0, y:0, w:this.width, h:this.height };
		}else{
			curFrame = this.frame;
		}
		this._renderHelper(context, camera, this.image,
							         curFrame.w, curFrame.h, curFrame.x,
                       curFrame.y, curFrame.w, curFrame.h);
	}
};

lib.name = 'animated';
