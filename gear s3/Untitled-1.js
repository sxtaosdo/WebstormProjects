(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:



(lib.biaopanbmp = function() {
	this.initialize(img.biaopanbmp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,451,453);// helper functions:

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


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FF00").s().p("AhCBDQgcgcAAgnQAAgmAcgcQAcgcAmAAQAnAAAcAcQAcAcAAAmQAAAngcAcQgcAcgnAAQgmAAgcgcg");
	this.shape.setTransform(9.5,9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,19,19), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0000FF").s().p("AiwCxQhJhKAAhnQAAhmBJhKQBKhJBmAAQBnAABKBJQBJBKAABmQAABnhJBKQhKBJhnAAQhmAAhKhJg");
	this.shape.setTransform(25,25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,50,50), null);


(lib.Symbol = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.biaopanbmp();
	this.instance.parent = this;
	this.instance.setTransform(-226,-227);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol, new cjs.Rectangle(-226,-227,451,453), null);


// stage content:
(lib.Untitled1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.portMc = new lib.Symbol3();
	this.portMc.parent = this;
	this.portMc.setTransform(335.1,107.9,1,1,0,0,0,9.5,9.5);

	this.p10 = new lib.Symbol1();
	this.p10.parent = this;
	this.p10.setTransform(121,107.9,1,1,0,0,0,25,25);

	this.p9 = new lib.Symbol1();
	this.p9.parent = this;
	this.p9.setTransform(71,183.1,1,1,0,0,0,25,25);

	this.p8 = new lib.Symbol1();
	this.p8.parent = this;
	this.p8.setTransform(71,270.2,1,1,0,0,0,25,25);

	this.p7 = new lib.Symbol1();
	this.p7.parent = this;
	this.p7.setTransform(121,340.2,1,1,0,0,0,25,25);

	this.p6 = new lib.Symbol1();
	this.p6.parent = this;
	this.p6.setTransform(196.1,382.2,1,1,0,0,0,25,25);

	this.p5 = new lib.Symbol1();
	this.p5.parent = this;
	this.p5.setTransform(271.1,382.2,1,1,0,0,0,25,25);

	this.p4 = new lib.Symbol1();
	this.p4.parent = this;
	this.p4.setTransform(343.1,332.2,1,1,0,0,0,25,25);

	this.p3 = new lib.Symbol1();
	this.p3.parent = this;
	this.p3.setTransform(379.1,260.2,1,1,0,0,0,25,25);

	this.p2 = new lib.Symbol1();
	this.p2.parent = this;
	this.p2.setTransform(379.1,177.1,1,1,0,0,0,25,25);

	this.p1 = new lib.Symbol1();
	this.p1.parent = this;
	this.p1.setTransform(335.1,107.9,1,1,0,0,0,25,25);

	this.btn = new lib.Symbol();
	this.btn.parent = this;
	this.btn.setTransform(226,227);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.btn},{t:this.p1},{t:this.p2},{t:this.p3},{t:this.p4},{t:this.p5},{t:this.p6},{t:this.p7},{t:this.p8},{t:this.p9},{t:this.p10},{t:this.portMc}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(225.5,226.5,451,453);
// library properties:
lib.properties = {
	width: 451,
	height: 453,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/biaopanbmp.png?1481699487243", id:"biaopanbmp"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;