(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:



(lib.chunfeng = function() {
	this.initialize(img.chunfeng);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,354,28);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AnLGkIAAtHIOXAAIAAAUIAAMzg");
	this.shape.setTransform(-2,181.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AHHHCIAAgUIuXAAIAAtvIAUAAIONAAIAAAKIAAN5g");
	this.shape_1.setTransform(-1.5,96.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0000FF").s().p("AHCINIAAgKIuNAAIAAwPIOXAAIAAQZg");

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("AjwD7QhjhoAAiTQAAiSBjhoQBkhoCMAAQCNAABkBoQBjBoAACSQAACThjBoQhkBoiNAAQiMAAhkhog");
	this.shape_3.setTransform(50,43);

	this.instance = new lib.chunfeng();
	this.instance.parent = this;
	this.instance.setTransform(0,7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.instance}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48,-52.5,94,276);


// stage content:
(lib.Untitled1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.mc1 = new lib.Symbol1();
	this.mc1.parent = this;
	this.mc1.setTransform(48,52.5);

	this.timeline.addTween(cjs.Tween.get(this.mc1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(47,51,94,276);
// library properties:
lib.properties = {
	width: 94,
	height: 102,
	fps: 24,
	color: "#666666",
	opacity: 1.00,
	manifest: [
		{src:"images/chunfeng.png?1482286847975", id:"chunfeng"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;