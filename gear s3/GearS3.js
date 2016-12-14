(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:
// helper functions:

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


(lib.Symbol2 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AyWSZQnqnoAAqxQAAqwHqnoQHonoKzAAQK0AAHoHoQGlGjA7I3I6hAAIAAIRIaLAAQheHblsFrQnoHoq0AAQqzAAnonog");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(-166.5,-166.5,333,333), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0000FF").s().p("AiwCxQhJhKAAhnQAAhmBJhKQBKhJBmAAQBnAABKBJQBJBKAABmQAABnhJBKQhKBJhnAAQhmAAhKhJg");
	this.shape.setTransform(25,25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,50,50), null);


// stage content:
(lib.GearS3 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.portMc = new lib.Symbol3();
	this.portMc.parent = this;
	this.portMc.setTransform(518.7,578.6,1,1,0,0,0,9.5,9.5);

	this.p10 = new lib.Symbol1();
	this.p10.parent = this;
	this.p10.setTransform(144.1,607.9,1,1,0,0,0,25,25);

	this.p9 = new lib.Symbol1();
	this.p9.parent = this;
	this.p9.setTransform(107.1,704.2,1,1,0,0,0,25,25);

	this.p8 = new lib.Symbol1();
	this.p8.parent = this;
	this.p8.setTransform(107.1,810.2,1,1,0,0,0,25,25);

	this.p7 = new lib.Symbol1();
	this.p7.parent = this;
	this.p7.setTransform(164.6,903.2,1,1,0,0,0,25,25);

	this.p6 = new lib.Symbol1();
	this.p6.parent = this;
	this.p6.setTransform(261.1,953.2,1,1,0,0,0,25,25);

	this.p5 = new lib.Symbol1();
	this.p5.parent = this;
	this.p5.setTransform(370.1,953.2,1,1,0,0,0,25,25);

	this.p4 = new lib.Symbol1();
	this.p4.parent = this;
	this.p4.setTransform(459.1,890.9,1,1,0,0,0,25,25);

	this.p3 = new lib.Symbol1();
	this.p3.parent = this;
	this.p3.setTransform(509.1,791.2,1,1,0,0,0,25,25);

	this.p2 = new lib.Symbol1();
	this.p2.parent = this;
	this.p2.setTransform(509.1,692.2,1,1,0,0,0,25,25);

	this.p1 = new lib.Symbol1();
	this.p1.parent = this;
	this.p1.setTransform(473.2,607.9,1,1,0,0,0,25,25);

	this.btn = new lib.Symbol2();
	this.btn.parent = this;
	this.btn.setTransform(306.1,749.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.btn},{t:this.p1},{t:this.p2},{t:this.p3},{t:this.p4},{t:this.p5},{t:this.p6},{t:this.p7},{t:this.p8},{t:this.p9},{t:this.p10},{t:this.portMc}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(402.1,1138.1,452.1,409.1);
// library properties:
lib.properties = {
	width: 640,
	height: 1138,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;