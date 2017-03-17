(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:



(lib.图层190 = function() {
	this.initialize(img.图层190);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1138);


(lib.封面 = function() {
	this.initialize(img.封面);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1045);


(lib.开始butten = function() {
	this.initialize(img.开始butten);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,92,131);


(lib.活动介绍 = function() {
	this.initialize(img.活动介绍);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1031);


(lib.算账页 = function() {
	this.initialize(img.算账页);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1031);


(lib.线路 = function() {
	this.initialize(img.线路);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1031);


(lib.线路2 = function() {
	this.initialize(img.线路2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1031);


(lib.线路3 = function() {
	this.initialize(img.线路3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1031);


(lib.问卷调查 = function() {
	this.initialize(img.问卷调查);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,507,434);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AxVFKIAAqTMAirAAAIAAKTg");
	this.shape.setTransform(111,33);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol8, new cjs.Rectangle(0,0,222.1,66), null);


(lib.blackbold = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.问卷调查();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.blackbold, new cjs.Rectangle(0,0,507,434), null);


(lib.page4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// Layer 1
	this.instance = new lib.线路();
	this.instance.parent = this;

	this.instance_1 = new lib.线路2();
	this.instance_1.parent = this;

	this.instance_2 = new lib.线路3();
	this.instance_2.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1031);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.开始butten();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,92,131), null);


(lib.page5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.p5Btn = new lib.Symbol8();
	this.p5Btn.parent = this;
	this.p5Btn.setTransform(311.1,888.2,1,1,0,0,0,111,33);
	this.p5Btn.alpha = 0.102;

	this.timeline.addTween(cjs.Tween.get(this.p5Btn).wait(1));

	// Layer 1
	this.instance = new lib.算账页();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.page5, new cjs.Rectangle(0,0,640,1031), null);


(lib.page3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgaA4IgrAHIgDgUQAdgDAUgDIAAAQQAZgFAJgKIggAAIAAgRIAaAAQgMgGgQgHIAHgLIAcANIgHALIAPAAQADgNAAgXIATAAQAAAUgDAQIAiAAIAAARIgmAAIAmATIgKAQQgRgLgWgLQgOANgZAKgAhGAOQAIgJAKgPIgPACIgFgRQALgPALggIASAFQgKAWgLASIALAAIAJgTIASAHIgCAFIAgAAIAAgJIgeAAIAAgQIAeAAIAAgMIAUAAIAAAMIAeAAIAAAQIgeAAIAAAJIAlAAIAAAPIgEAUIgSgBIAFgSIg8AAIAZALIgHAKIgbgLIAGgKIgMAAIAAgMQgLAUgQAWIAWgDIgBARQgYACgPADg");
	this.shape.setTransform(446.7,946.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgVBGIAAhdQgJAQgQAUIAUgDIgBASQgYACgOADIgFgRQAKgJAJgPIgRACIgEgQQAJgMAPgjIARAIQgMAXgJAOIAMAAIAGgNIANAGIAAgfIATAAIAABTQAOgMAJgPIgVAAIAAgRIAZAAIAAgtIASAAIAAAtIAYAAIAAARIgYAAIAAANIAIgHQALALALAOIgOALIgQgUIAAAiIgSAAIAAgiQgJAPgMAMIgGgVIAAAfIBJAAIAAARgAhIAuIAwgGIgBASIgsAGgAgBg3IAOgFQAEANAFAPIgPAFIgIgcgAAtghQAIgOADgNIAPAFIgKAbg");
	this.shape_1.setTransform(431.7,946.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhHA9QAKgPAIgRIARAIQgIAPgKASgAAmAjIARgHIARAhIgSAHgAgfAlIATgFIALAdIgTAFIgLgdgAAEAkIASgFIAMAcIgTAGgAgCAcIAAgrIBDAAIAAArgAAOAMIAiAAIAAgMIgiAAgAhAAbIAAhfIA0AAIAABfgAguAKIAQAAIAAgWIgQAAgAgugdIAQAAIAAgWIgQAAgAgHgfQANgGADgQIgOAAIAAgQIBJAAIgBAcQAAAKgEAEQgEAFgHABQgGABgRAAIgEgRIARABQAFAAABgCQABgDAAgMIgWAAQgEAagSAKIgMgOg");
	this.shape_2.setTransform(224.7,946.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhDAzIAMABQAFAAAAgHIAAgbIgRADIgBgVIASgBIAAgaIgRAAIAAgTIARAAIAAgYIAUAAIAAAYIANAAIAAATIgNAAIAAAWIAOgCIAAASIgOADIAAAmQAAALgGAEQgFAEgUABgAAxBHIAAgJIgpAAIAAAJIgUAAIAAh4IAVAAIAFgWIAYAEIgGASIAlAAIAAB4gAAIAtIApAAIAAgfIgpAAgAAIgCIApAAIAAgeIgpAAg");
	this.shape_3.setTransform(209.3,946.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#42281B").ss(1,1,1).p("AISiQIRMAAIAAE1IxMAAgA5dikIQGAAIAAEXIwGAAg");
	this.shape_4.setTransform(332,950.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#402919").s().p("AISClIAAk1IRMAAIAAE1gA5dBzIAAkXIQGAAIAAEXg");
	this.shape_5.setTransform(332,950.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer 2
	this.p3Btn2 = new lib.Symbol1();
	this.p3Btn2.parent = this;
	this.p3Btn2.setTransform(438,894.4,1,1,0,0,0,46,65.5);

	this.p3Btn1 = new lib.Symbol1();
	this.p3Btn1.parent = this;
	this.p3Btn1.setTransform(219.1,894.4,1,1,0,0,0,46,65.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#42281B").ss(1,1,1).p("ANrhjIHCAAIAADHInCAAgA0shtIISAAIAADbIoSAAg");
	this.shape_6.setTransform(326.5,948.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.p3Btn1},{t:this.p3Btn2}]}).wait(1));

	// Layer 3
	this.instance = new lib.图层190();
	this.instance.parent = this;
	this.instance.setTransform(0,-50);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.page3, new cjs.Rectangle(0,-50,640,1138), null);


(lib.page2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.p2GoBtn = new lib.Symbol1();
	this.p2GoBtn.parent = this;
	this.p2GoBtn.setTransform(319,902,1,1,0,0,0,46,65.5);

	this.instance = new lib.活动介绍();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.p2GoBtn}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.page2, new cjs.Rectangle(0,0,640,1031), null);


(lib.page1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.goBtn = new lib.Symbol1();
	this.goBtn.parent = this;
	this.goBtn.setTransform(320,932.5,1,1,0,0,0,46,65.5);

	this.instance = new lib.封面();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.goBtn}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.page1, new cjs.Rectangle(0,0,640,1045), null);


// stage content:
(lib.game = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;
// library properties:
lib.properties = {
	width: 640,
	height: 1045,
	fps: 24,
	color: "#CCCCCC",
	opacity: 1.00,
	manifest: [
		{src:"images/图层190.png?1489730169567", id:"图层190"},
		{src:"images/封面_.jpg?1489730169567", id:"封面"},
		{src:"images/开始butten.png?1489730169567", id:"开始butten"},
		{src:"images/活动介绍_.jpg?1489730169567", id:"活动介绍"},
		{src:"images/算账页_.jpg?1489730169567", id:"算账页"},
		{src:"images/线路_.jpg?1489730169567", id:"线路"},
		{src:"images/线路2.jpg?1489730169567", id:"线路2"},
		{src:"images/线路3.jpg?1489730169567", id:"线路3"},
		{src:"images/问卷调查_.png?1489730169567", id:"问卷调查"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;