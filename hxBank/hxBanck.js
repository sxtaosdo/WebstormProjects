(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [
		{name:"hxBanck_atlas_", frames: [[1932,485,108,85],[752,0,750,1334],[0,0,750,1334],[1932,572,102,89],[1504,0,234,226],[1959,163,77,27],[1959,0,81,82],[1959,84,79,77],[1666,720,34,47],[1504,228,217,227],[0,1336,618,5],[1723,405,310,78],[1504,485,310,78],[1705,671,102,76],[1740,0,217,227],[1816,485,114,134],[1504,565,172,56],[1504,720,160,48],[1678,621,198,48],[1878,663,137,59],[1504,671,199,47],[1809,724,138,50],[1504,623,101,45],[1723,229,167,162],[1892,229,150,174],[1949,724,88,78]]}
];


// symbols:



(lib._182220200 = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.bg = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.bg_1 = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.chuxian = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.daquan = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.downArrow = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.dunshou = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.fangzishou = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.jiantou = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.jiantoubg2 = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.line = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.logo = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.logo_1 = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.qiandai = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.quanjiantou = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.shalou = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.textBg = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.textBuchaoguo = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.textDaikuan = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.textDanbao = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.textShouxin = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.textZuichang = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.woshou = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.yuan = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.zhongjian = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.zuanshishou = function() {
	this.spriteSheet = ss["hxBanck_atlas_"];
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();
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


(lib.Symbol15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.text = new cjs.Text("分期归还", "30px 'Microsoft YaHei'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 142;
	this.text.parent = this;
	this.text.setTransform(73,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol15, new cjs.Rectangle(0,0,146,43.6), null);


(lib.Symbol12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.text = new cjs.Text("一次性还款", "30px 'Microsoft YaHei'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 156;
	this.text.parent = this;
	this.text.setTransform(80,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol12, new cjs.Rectangle(0,0,160.1,43.6), null);


(lib.Symbol10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.jiantou();
	this.instance.parent = this;
	this.instance.setTransform(49.7,3.9,1,1,94.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol10, new cjs.Rectangle(0,0,49.7,37.8), null);


(lib.Symbol8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.text = new cjs.Text("逐笔归还", "30px 'Microsoft YaHei'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 142;
	this.text.parent = this;
	this.text.setTransform(73,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol8, new cjs.Rectangle(0,0,146,43.6), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.jiantou();
	this.instance.parent = this;
	this.instance.setTransform(-1.6,12.6,1,1,-23.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-1.6,-0.8,49.8,56.6), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.daquan();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,234,226), null);


(lib.Symbol = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.jiantou();
	this.instance.parent = this;
	this.instance.setTransform(27.4,58,1,1,-143.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol, new cjs.Rectangle(0,0,55.3,58), null);


(lib.text4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.textBuchaoguo();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.text4, new cjs.Rectangle(0,0,160,48), null);


(lib.text3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.textZuichang();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.text3, new cjs.Rectangle(0,0,138,50), null);


(lib.text2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.textDaikuan();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.text2, new cjs.Rectangle(0,0,198,48), null);


(lib.text1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.textShouxin();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.text1, new cjs.Rectangle(0,0,199,47), null);


(lib.Symbol16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.quanjiantou();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol16, new cjs.Rectangle(0,0,217,227), null);


(lib.Symbol15_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shalou();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol15_1, new cjs.Rectangle(0,0,114,134), null);


(lib.Symbol2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance_1 = new lib.jiantoubg2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(7,7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2_1, new cjs.Rectangle(7,7,217,227), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.downArrow();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,77,27), null);


(lib.Tween17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.woshou();
	this.instance.parent = this;
	this.instance.setTransform(-50.5,-22.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50.5,-22.5,101,45);


(lib.Tween16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.woshou();
	this.instance.parent = this;
	this.instance.setTransform(-50.5,-22.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50.5,-22.5,101,45);


(lib.Tween15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.woshou();
	this.instance.parent = this;
	this.instance.setTransform(-50.5,-22.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50.5,-22.5,101,45);


(lib.Tween14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.dunshou();
	this.instance.parent = this;
	this.instance.setTransform(-40.5,-41);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.5,-41,81,82);


(lib.Tween13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.dunshou();
	this.instance.parent = this;
	this.instance.setTransform(-40.5,-41);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.5,-41,81,82);


(lib.Tween12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.dunshou();
	this.instance.parent = this;
	this.instance.setTransform(-40.5,-41);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.5,-41,81,82);


(lib.Tween11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.fangzishou();
	this.instance.parent = this;
	this.instance.setTransform(-39.5,-38.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.5,-38.5,79,77);


(lib.Tween10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.fangzishou();
	this.instance.parent = this;
	this.instance.setTransform(-39.5,-38.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.5,-38.5,79,77);


(lib.Tween9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.fangzishou();
	this.instance.parent = this;
	this.instance.setTransform(-39.5,-38.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.5,-38.5,79,77);


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.zuanshishou();
	this.instance.parent = this;
	this.instance.setTransform(-44,-39);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44,-39,88,78);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.zuanshishou();
	this.instance.parent = this;
	this.instance.setTransform(-44,-39);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44,-39,88,78);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.zuanshishou();
	this.instance.parent = this;
	this.instance.setTransform(-44,-39);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44,-39,88,78);


(lib.Symbol17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.yuan();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol17, new cjs.Rectangle(0,0,167,162), null);


(lib.Symbol12_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.text_1 = new cjs.Text("信用", "30px 'Microsoft YaHei'", "#FFFFFF");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 42;
	this.text_1.lineWidth = 100;
	this.text_1.parent = this;
	this.text_1.setTransform(52,2);

	this.timeline.addTween(cjs.Tween.get(this.text_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol12_1, new cjs.Rectangle(0,0,104,43.6), null);


(lib.Symbol11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.text = new cjs.Text("保证", "30px 'Microsoft YaHei'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 100;
	this.text.parent = this;
	this.text.setTransform(52,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol11, new cjs.Rectangle(0,0,104,43.6), null);


(lib.Symbol10_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.text = new cjs.Text("抵押", "30px 'Microsoft YaHei'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 100;
	this.text.parent = this;
	this.text.setTransform(52,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol10_1, new cjs.Rectangle(0,0,104,43.6), null);


(lib.Symbol9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.text = new cjs.Text("质押", "30px 'Microsoft YaHei'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 100;
	this.text.parent = this;
	this.text.setTransform(52,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol9, new cjs.Rectangle(0,0,104,43.6), null);


(lib.Symbol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.jiantou();
	this.instance.parent = this;
	this.instance.setTransform(32.1,59.1,1,1,-106.3);

	this.instance_1 = new lib.jiantou();
	this.instance_1.parent = this;
	this.instance_1.setTransform(44.6,0,1,1,71.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(0,0,77.2,59.1), null);


(lib.Symbol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.jiantou();
	this.instance.parent = this;
	this.instance.setTransform(34.4,60,1,1,179.6);

	this.instance_1 = new lib.jiantou();
	this.instance_1.parent = this;
	this.instance_1.setTransform(25,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(0,0,59,60.3), null);


(lib.Symbol1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance_1 = new lib.Symbol2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(117,113,1,1,0,0,0,117,113);
	this.instance_1.alpha = 0.801;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({alpha:1},19).to({alpha:0.801},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,234,226);


(lib.Symbol14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol16();
	this.instance.parent = this;
	this.instance.setTransform(108.5,113.5,1,1,0,0,0,108.5,113.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:0.699},30).to({alpha:1},29).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,217,227);


(lib.Symbol13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol15_1();
	this.instance.parent = this;
	this.instance.setTransform(57,67,1,1,0,0,0,57,67);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(92).to({rotation:12.5,y:67.1},0).wait(1).to({rotation:26.1,y:67},0).wait(1).to({rotation:40.8,y:67.1},0).wait(1).to({rotation:56.4,y:67},0).wait(1).to({rotation:72.8},0).wait(1).to({rotation:90},0).wait(1).to({rotation:107.7},0).wait(1).to({rotation:125.8},0).wait(1).to({rotation:144.2},0).wait(1).to({rotation:162.5},0).wait(1).to({rotation:180.5},0).wait(1).to({rotation:198.1},0).wait(1).to({rotation:215.1},0).wait(1).to({rotation:231.3},0).wait(1).to({rotation:246.5},0).wait(1).to({rotation:260.7},0).wait(1).to({rotation:273.8},0).wait(1).to({rotation:285.7},0).wait(1).to({rotation:296.4},0).wait(1).to({rotation:306},0).wait(1).to({rotation:314.3,x:57.1},0).wait(1).to({rotation:321.5},0).wait(1).to({rotation:327.3},0).wait(1).to({rotation:331.8,x:57},0).wait(1).to({rotation:335.4},0).wait(1).to({rotation:338.4,x:57.1},0).wait(1).to({rotation:341.4,x:57},0).wait(1).to({rotation:345.1},0).wait(1).to({rotation:350.7},0).wait(1).to({rotation:360},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,114,134);


(lib.arrmc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol1();
	this.instance.parent = this;
	this.instance.setTransform(38.5,-6.5,1,1,0,0,0,38.5,13.5);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(72).to({_off:false},0).to({y:13.5,alpha:1},16).wait(9).to({alpha:0},6).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.Symbol18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.Symbol17();
	this.instance.parent = this;
	this.instance.setTransform(85.5,81,1,1,0,0,0,83.5,81);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:0.75},19).to({alpha:1},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2,0,167,162);


(lib.Symbol16_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance_1 = new lib.woshou();
	this.instance_1.parent = this;

	this.instance_2 = new lib.Tween15("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(50.5,22.5);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween16("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(50.5,27.5);
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween17("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(50.5,22.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},19).to({state:[{t:this.instance_3}]},20).to({state:[{t:this.instance_4}]},20).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19).to({_off:false},0).to({_off:true,y:27.5},20).wait(21));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},20).to({_off:true,y:22.5},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,101,45);


(lib.Symbol15_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance_1 = new lib.dunshou();
	this.instance_1.parent = this;

	this.instance_2 = new lib.Tween12("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(40.5,41);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween13("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(40.5,46);
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween14("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(40.5,41);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},19).to({state:[{t:this.instance_3}]},20).to({state:[{t:this.instance_4}]},20).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19).to({_off:false},0).to({_off:true,y:46},20).wait(21));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},20).to({_off:true,y:41},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,81,82);


(lib.Symbol14_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance_1 = new lib.fangzishou();
	this.instance_1.parent = this;

	this.instance_2 = new lib.Tween9("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(39.5,38.5);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween10("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(39.5,43.5);
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween11("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(39.5,38.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},19).to({state:[{t:this.instance_3}]},20).to({state:[{t:this.instance_4}]},20).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19).to({_off:false},0).to({_off:true,y:43.5},20).wait(21));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},20).to({_off:true,y:38.5},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,79,77);


(lib.Symbol13_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance_1 = new lib.zuanshishou();
	this.instance_1.parent = this;

	this.instance_2 = new lib.Tween6("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(44,39);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween7("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(44,44);
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween8("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(44,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},19).to({state:[{t:this.instance_3}]},20).to({state:[{t:this.instance_4}]},20).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19).to({_off:false},0).to({_off:true,y:44},20).wait(21));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},20).to({_off:true,y:39},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,88,78);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol18();
	this.instance.parent = this;
	this.instance.setTransform(85.5,81,1,1,0,0,0,85.5,81);

	this.instance_1 = new lib.Symbol15_2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(83.5,86,1,1,0,0,0,40.5,41);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(2,0,167,162), null);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol18();
	this.instance.parent = this;
	this.instance.setTransform(85.5,81,1,1,0,0,0,85.5,81);

	this.instance_1 = new lib.Symbol16_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(82.5,89.5,1,1,0,0,0,50.5,22.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(2,0,167,162), null);


(lib.Symbol3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance_1 = new lib.Symbol18();
	this.instance_1.parent = this;
	this.instance_1.setTransform(85.5,81,1,1,0,0,0,85.5,81);

	this.instance_2 = new lib.Symbol14_1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(84.5,79.5,1,1,0,0,0,39.5,38.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol3_1, new cjs.Rectangle(2,0,167,162), null);


(lib.Symbol2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance_2 = new lib.Symbol13_1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(89,78,1,1,0,0,0,44,39);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer 3
	this.instance_3 = new lib.Symbol18();
	this.instance_3.parent = this;
	this.instance_3.setTransform(83.5,81,1,1,0,0,0,83.5,81);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2_2, new cjs.Rectangle(2,0,167,162), null);


(lib.Symbol1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_240 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(240).call(this.frame_240).wait(1));

	// Layer 15
	this.instance_2 = new lib.Symbol12_1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(531.2,978.9,1,1,0,0,0,52,21.8);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({_off:false},0).wait(219).to({y:958.9},0).to({y:978.9,alpha:1},20).wait(1));

	// Layer 14
	this.instance_3 = new lib.Symbol4();
	this.instance_3.parent = this;
	this.instance_3.setTransform(526.5,874.1,1,1,0,0,0,83.5,81);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({_off:false},0).wait(199).to({x:506.5,y:854.1},0).to({x:526.5,y:874.1,alpha:1},20).wait(21));

	// Layer 13
	this.instance_4 = new lib.Symbol6();
	this.instance_4.parent = this;
	this.instance_4.setTransform(472.5,785.1,1,1,0,0,0,29.5,30.1);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({_off:false},0).wait(179).to({x:452.5,y:765.1},0).to({x:472.5,y:785.1,alpha:1},20).wait(41));

	// Layer 12
	this.instance_5 = new lib.Symbol11();
	this.instance_5.parent = this;
	this.instance_5.setTransform(223.1,974.9,1,1,0,0,0,52,21.8);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({_off:false},0).wait(159).to({y:954.9},0).to({y:974.9,alpha:1},20).wait(61));

	// Layer 11
	this.instance_6 = new lib.Symbol5();
	this.instance_6.parent = this;
	this.instance_6.setTransform(224.5,872.1,1,1,0,0,0,83.5,81);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1).to({_off:false},0).wait(139).to({x:244.5,y:852.1},0).to({x:224.5,y:872.1,alpha:1},20).wait(81));

	// Layer 10
	this.instance_7 = new lib.Symbol7();
	this.instance_7.parent = this;
	this.instance_7.setTransform(285.6,785.8,1,1,0,0,0,38.6,29.6);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1).to({_off:false},0).wait(119).to({x:305.6,y:765.8,alpha:0.699},0).to({x:285.6,y:789.8,alpha:1},20).wait(101));

	// Layer 9
	this.instance_8 = new lib.Symbol10_1();
	this.instance_8.parent = this;
	this.instance_8.setTransform(531.2,436.2,1,1,0,0,0,52,21.8);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1).to({_off:false},0).wait(99).to({y:446.2},0).to({y:436.2,alpha:1},20).wait(121));

	// Layer 8
	this.instance_9 = new lib.Symbol3_1();
	this.instance_9.parent = this;
	this.instance_9.setTransform(533.5,549.1,1,1,0,0,0,83.5,81);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1).to({_off:false},0).wait(79).to({x:523.5,y:559.1},0).to({x:533.5,y:549.1,alpha:1},20).wait(141));

	// Layer 7
	this.instance_10 = new lib.Symbol7();
	this.instance_10.parent = this;
	this.instance_10.setTransform(474.3,639.8,1,1,0,0,0,38.6,29.6);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({_off:false},0).wait(59).to({x:464.3,y:649.8},0).to({x:474.3,y:639.8,alpha:1},20).wait(161));

	// Layer 6
	this.instance_11 = new lib.Symbol9();
	this.instance_11.parent = this;
	this.instance_11.setTransform(223.1,437.2,1,1,0,0,0,52,21.8);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1).to({_off:false},0).wait(39).to({y:447.2},0).to({y:437.2,alpha:1},20).wait(181));

	// Layer 5
	this.instance_12 = new lib.Symbol2_2();
	this.instance_12.parent = this;
	this.instance_12.setTransform(226.5,549.1,1,1,0,0,0,83.5,81);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1).to({_off:false},0).wait(19).to({x:236.5,y:559.1},0).to({x:226.5,y:549.1,alpha:1},20).wait(201));

	// Layer 4
	this.instance_13 = new lib.Symbol6();
	this.instance_13.parent = this;
	this.instance_13.setTransform(296.6,649.3,1,1,0,0,0,29.5,30.1);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1).to({_off:false},0).to({x:286.6,y:639.3,alpha:1},19).wait(221));

	// Layer 2
	this.contentText = new cjs.Text("可采取质押、抵押、保证、信用中的一种过多种组合。", "29px 'Microsoft YaHei'", "#FFFFFF");
	this.contentText.name = "contentText";
	this.contentText.lineHeight = 40;
	this.contentText.lineWidth = 730;
	this.contentText.parent = this;
	this.contentText.setTransform(44.9,277.4);

	this.text = new cjs.Text("担保多样", "bold 30px 'Microsoft YaHei'");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 136;
	this.text.parent = this;
	this.text.setTransform(125.9,191.4);

	this.instance_14 = new lib.logo_1();
	this.instance_14.parent = this;

	this.instance_15 = new lib.textBg();
	this.instance_15.parent = this;
	this.instance_15.setTransform(39,181);

	this.instance_16 = new lib.line();
	this.instance_16.parent = this;
	this.instance_16.setTransform(39,237);

	this.instance_17 = new lib.textDanbao();
	this.instance_17.parent = this;
	this.instance_17.setTransform(308,682);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.text},{t:this.contentText}]}).wait(241));

	// Layer 1
	this.instance_18 = new lib.bg_1();
	this.instance_18.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(241));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-130,777.1,1464);


(lib.Symbol14_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance_5 = new lib.Symbol18();
	this.instance_5.parent = this;
	this.instance_5.setTransform(85.5,81,1,1,0,0,0,85.5,81);

	this.instance_6 = new lib._182220200();
	this.instance_6.parent = this;
	this.instance_6.setTransform(30,43.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol14_2, new cjs.Rectangle(2,0,167,162), null);


(lib.Symbol13_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_59 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(59).call(this.frame_59).wait(1));

	// Layer 3
	this.instance_5 = new lib.Symbol15();
	this.instance_5.parent = this;
	this.instance_5.setTransform(81.7,236.4,1,1,0,0,0,73,21.8);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(39).to({y:206.4},0).to({y:236.4,alpha:1},20).wait(1));

	// Layer 2
	this.instance_6 = new lib.Symbol14_2();
	this.instance_6.parent = this;
	this.instance_6.setTransform(81.5,132,1,1,0,0,0,83.5,81);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(19).to({y:102},0).to({y:132,alpha:1},20).wait(21));

	// Layer 1
	this.instance_7 = new lib.Symbol();
	this.instance_7.parent = this;
	this.instance_7.setTransform(81.6,-1,1,1,0,0,0,27.7,29);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({y:29,alpha:1},19).wait(41));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-30,167,288.2);


(lib.Symbol11_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol18();
	this.instance.parent = this;
	this.instance.setTransform(85.5,81,1,1,0,0,0,85.5,81);

	this.instance_1 = new lib.qiandai();
	this.instance_1.parent = this;
	this.instance_1.setTransform(35,50);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol11_1, new cjs.Rectangle(2,0,167,162), null);


(lib.Symbol9_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_54 = function() {
		this.stop();
		this.parent.gotoAndStop(this.parent.currentFrame+1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(54).call(this.frame_54).wait(1));

	// Layer 4
	this.instance = new lib.Symbol12();
	this.instance.parent = this;
	this.instance.setTransform(125,21.8,1,1,0,0,0,80,21.8);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(39).to({y:6.8},0).to({y:1.8,alpha:1},15).wait(1));

	// Layer 3
	this.instance_1 = new lib.Symbol11_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(105.5,118.5,1,1,0,0,0,83.5,81);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19).to({x:133.5,y:99.5,alpha:1},20).wait(16));

	// Layer 1
	this.instance_2 = new lib.Symbol10();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-12.7,184.8,1,1,0,0,0,24.8,18.9);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:12.8,y:170.8,alpha:1},19).wait(36));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-135.1,0,393.5,256);


(lib.Symbol7_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance_2 = new lib.Symbol18();
	this.instance_2.parent = this;
	this.instance_2.setTransform(85.5,81,1,1,0,0,0,85.5,81);

	this.instance_3 = new lib.chuxian();
	this.instance_3.parent = this;
	this.instance_3.setTransform(37,40);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol7_1, new cjs.Rectangle(2,0,167,162), null);


(lib.Symbol6_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance_2 = new lib.Symbol1_1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(117,113,1,1,0,0,0,117,113);

	this.instance_3 = new lib.zhongjian();
	this.instance_3.parent = this;
	this.instance_3.setTransform(45,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol6_1, new cjs.Rectangle(0,0,234,226), null);


(lib.Symbol5_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_59 = function() {
		this.stop();
		this.parent.gotoAndStop(this.parent.currentFrame+1);
		console.log("this.parent.currentFram"+this.parent.currentFrame);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(59).call(this.frame_59).wait(1));

	// Layer 3
	this.instance_2 = new lib.Symbol8();
	this.instance_2.parent = this;
	this.instance_2.setTransform(83,21.8,1,1,0,0,0,73,21.8);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(39).to({y:11.8,alpha:1},20).wait(1));

	// Layer 1
	this.instance_3 = new lib.Symbol7_1();
	this.instance_3.parent = this;
	this.instance_3.setTransform(83.5,126,1,1,0,0,0,83.5,81);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({x:108.5,y:123},0).to({x:83.5,y:107.5,alpha:1},20).wait(21));

	// Layer 2
	this.instance_4 = new lib.Symbol3();
	this.instance_4.parent = this;
	this.instance_4.setTransform(203.9,178.1,1,1,0,0,0,23.2,27.5);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({x:178.9,y:163.1,alpha:1},19).wait(41));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114,-6.1,494.1,286.1);


(lib.page6 = function(mode,startPosition,loop) {
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
	this.frame_3 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1));

	// Layer 5
	this.instance = new lib.Symbol13_2();
	this.instance.parent = this;
	this.instance.setTransform(377,1006.6,1,1,0,0,0,83.5,129.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	// Layer 4
	this.instance_1 = new lib.Symbol9_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(594.5,622,1,1,0,0,0,102.5,102.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({_off:false},0).wait(2));

	// Layer 3
	this.instance_2 = new lib.Symbol5_1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(163.1,625.3,1,1,0,0,0,101,102.8);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({_off:false},0).wait(3));

	// Layer 1
	this.instance_3 = new lib.Symbol6_1();
	this.instance_3.parent = this;
	this.instance_3.setTransform(375,764,1,1,0,0,0,117,113);

	this.instance_4 = new lib.logo();
	this.instance_4.parent = this;

	this.contentText = new cjs.Text("可以选择主笔还款、分期归还、一次性还款", "30px 'Microsoft YaHei'", "#FFFFFF");
	this.contentText.name = "contentText";
	this.contentText.lineHeight = 42;
	this.contentText.lineWidth = 584;
	this.contentText.parent = this;
	this.contentText.setTransform(94.1,282.4);

	this.text = new cjs.Text("还款灵活", "bold 30px 'Microsoft YaHei'");
	this.text.lineHeight = 42;
	this.text.lineWidth = 128;
	this.text.parent = this;
	this.text.setTransform(104.1,200.3);

	this.instance_5 = new lib.textBg();
	this.instance_5.parent = this;
	this.instance_5.setTransform(79,193);

	this.instance_6 = new lib.line();
	this.instance_6.parent = this;
	this.instance_6.setTransform(79,244);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.text},{t:this.contentText},{t:this.instance_4},{t:this.instance_3}]}).wait(4));

	// Layer 2
	this.instance_7 = new lib.bg();
	this.instance_7.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1334);


(lib.page5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.instance = new lib.Symbol13();
	this.instance.parent = this;
	this.instance.setTransform(381,692,1,1,0,0,0,57,67);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 3
	this.instance_1 = new lib.Symbol14();
	this.instance_1.parent = this;
	this.instance_1.setTransform(380.5,685.5,1,1,0,0,0,108.5,113.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer 1
	this.instance_2 = new lib.line();
	this.instance_2.parent = this;
	this.instance_2.setTransform(53,183);

	this.instance_3 = new lib.Symbol2_1();
	this.instance_3.parent = this;
	this.instance_3.setTransform(380.5,686.5,1,1,0,0,0,116.5,121.5);

	this.instance_4 = new lib.arrmc();
	this.instance_4.parent = this;
	this.instance_4.setTransform(375.5,1116.5,1,1,0,0,0,38.5,13.5);

	this.text4 = new lib.text4();
	this.text4.parent = this;
	this.text4.setTransform(500,947,1,1,0,0,0,80,24);

	this.text3 = new lib.text3();
	this.text3.parent = this;
	this.text3.setTransform(489,475,1,1,0,0,0,69,25);

	this.text2 = new lib.text2();
	this.text2.parent = this;
	this.text2.setTransform(381,899,1,1,0,0,0,99,24);

	this.text1 = new lib.text1();
	this.text1.parent = this;
	this.text1.setTransform(380.5,426.5,1,1,0,0,0,99.5,23.5);

	this.instance_5 = new lib.logo_1();
	this.instance_5.parent = this;

	this.contentText = new cjs.Text("授信期限最长3年，贷款期限不超过1年。", "30px 'Microsoft YaHei'", "#FFFFFF");
	this.contentText.name = "contentText";
	this.contentText.lineHeight = 42;
	this.contentText.lineWidth = 610;
	this.contentText.parent = this;
	this.contentText.setTransform(90.1,240.4);

	this.text = new cjs.Text("期限较长", "bold 30px 'Microsoft YaHei'");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 124;
	this.text.parent = this;
	this.text.setTransform(138.1,139);

	this.instance_6 = new lib.textBg();
	this.instance_6.parent = this;
	this.instance_6.setTransform(53,127);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.text},{t:this.contentText},{t:this.instance_5},{t:this.text1},{t:this.text2},{t:this.text3},{t:this.text4},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]}).wait(1));

	// Layer 2
	this.instance_7 = new lib.bg_1();
	this.instance_7.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

}).prototype = getMCSymbolPrototype(lib.page5, new cjs.Rectangle(0,0,750,1334), null);


(lib.page = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.p7 = new lib.Symbol1_2();
	this.p7.parent = this;
	this.p7.setTransform(378.5,3336,1,1,0,0,0,378.5,667);

	this.p6 = new lib.page6();
	this.p6.parent = this;
	this.p6.setTransform(375,2002,1,1,0,0,0,375,667);

	this.p5 = new lib.page5();
	this.p5.parent = this;
	this.p5.setTransform(375,667,1,1,0,0,0,375,667);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.p5},{t:this.p6},{t:this.p7}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.page, new cjs.Rectangle(0,0,777.1,4003), null);


// stage content:
(lib.hxBanck = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.pageMc = new lib.page();
	this.pageMc.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.pageMc).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(375,667,777.1,4003);
// library properties:
lib.properties = {
	width: 750,
	height: 1334,
	fps: 30,
	color: "#999999",
	opacity: 1.00,
	manifest: [
		{src:"images/hxBanck_atlas_.png?1488359892106", id:"hxBanck_atlas_"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;