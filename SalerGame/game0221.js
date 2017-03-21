(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.bg1 = function() {
	this.initialize(img.bg1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1029);


(lib.h头像框 = function() {
	this.initialize(img.h头像框);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,121,160);


(lib.h头像框星 = function() {
	this.initialize(img.h头像框星);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,25,27);


(lib.m跑1 = function() {
	this.initialize(img.m跑1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,144);


(lib.m跑2 = function() {
	this.initialize(img.m跑2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,144);


(lib.m跑3 = function() {
	this.initialize(img.m跑3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,144);


(lib.m跑4 = function() {
	this.initialize(img.m跑4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,144);


(lib.m跑5 = function() {
	this.initialize(img.m跑5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,144);


(lib.m转1 = function() {
	this.initialize(img.m转1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,144);


(lib.m转2 = function() {
	this.initialize(img.m转2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,144);


(lib.p1m呆毛 = function() {
	this.initialize(img.p1m呆毛);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,80,103);


(lib.p1m嘴 = function() {
	this.initialize(img.p1m嘴);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,127,56);


(lib.p1m身 = function() {
	this.initialize(img.p1m身);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,242,271);


(lib.p1txt = function() {
	this.initialize(img.p1txt);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,348,402);


(lib.p1房子 = function() {
	this.initialize(img.p1房子);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,93,274);


(lib.p1飞船 = function() {
	this.initialize(img.p1飞船);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,83,47);


(lib.人手1 = function() {
	this.initialize(img.人手1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,24);


(lib.人手2 = function() {
	this.initialize(img.人手2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,20);


(lib.人腿1 = function() {
	this.initialize(img.人腿1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,39,35);


(lib.人腿2 = function() {
	this.initialize(img.人腿2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,32);


(lib.人身 = function() {
	this.initialize(img.人身);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,51,91);


(lib.人转手1 = function() {
	this.initialize(img.人转手1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,33,39);


(lib.人转手2 = function() {
	this.initialize(img.人转手2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,31,22);


(lib.人转腿1 = function() {
	this.initialize(img.人转腿1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,24);


(lib.人转腿2 = function() {
	this.initialize(img.人转腿2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,37,29);


(lib.人转身 = function() {
	this.initialize(img.人转身);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,49,92);// helper functions:

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


(lib.广告 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.6)").s().p("AC4BxIAAgPIh8AAIAAAPIgXAAIAAhdICqAAIAABdgAA8BSIB8AAIAAgqIh8AAgAjpBgQARgSAIgbQAHgcgCgjIAAhAIBZAAIgJgXIgDgHIAagGQAJASAFAPIgMADIBaAAIAAAVIisAAIAAAsQAAAXgBASQgCASgEAMQgDANgGAMQgHANgJAOgAAJgDIAAgUIBrAAIAAgjIg8AAQgGAOgMAOIgTgIQALgPAJgRQAIgQAGgSIAVADIgJAYIAzAAIAAgjIAVAAIAAAjIBQAAIAAATIhQAAIAAAjIBhAAIAAAUg");
	this.shape.setTransform(23.4,11.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.广告, new cjs.Rectangle(0,0,46.7,22.5), null);


(lib.p1飞船_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.p1飞船();
	this.instance.parent = this;
	this.instance.setTransform(-41.5,-23.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.p1飞船_1, new cjs.Rectangle(-41.5,-23.5,83,47), null);


(lib.p1房子_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.p1房子();
	this.instance.parent = this;
	this.instance.setTransform(-46.5,-137);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.p1房子_1, new cjs.Rectangle(-46.5,-137,93,274), null);


(lib.p1m嘴_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.p1m嘴();
	this.instance.parent = this;
	this.instance.setTransform(-63.5,-28);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.p1m嘴_1, new cjs.Rectangle(-63.5,-28,127,56), null);


(lib.p1m呆毛_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.p1m呆毛();
	this.instance.parent = this;
	this.instance.setTransform(-40,-103);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.p1m呆毛_1, new cjs.Rectangle(-40,-103,80,103), null);


(lib.p1bt圆 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhwBxQgvgvAAhCQAAhBAvgvQAugvBCAAQBCAAAvAvQAvAvAABBQAABCgvAvQgvAvhCAAQhCAAgugvg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.p1bt圆, new cjs.Rectangle(-16,-16,32,32), null);


(lib.m转 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.m转1();
	this.instance.parent = this;
	this.instance.setTransform(-49,-144);

	this.instance_1 = new lib.m转2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-49,-144);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{skewY:0,x:-49}}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance,p:{skewY:180,x:49}}]},3).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-144,98,144);


(lib.m跑 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.instance = new lib.m跑4();
	this.instance.parent = this;
	this.instance.setTransform(-49,-149);

	this.instance_1 = new lib.m跑3();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-49,-144);

	this.instance_2 = new lib.m跑2();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-49,-149);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},1).wait(2));

	// Layer 1
	this.instance_3 = new lib.m跑1();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-49,-159);

	this.instance_4 = new lib.m跑2();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-49,-149);

	this.instance_5 = new lib.m跑3();
	this.instance_5.parent = this;
	this.instance_5.setTransform(-49,-144);

	this.instance_6 = new lib.m跑4();
	this.instance_6.parent = this;
	this.instance_6.setTransform(-49,-149);

	this.instance_7 = new lib.m跑5();
	this.instance_7.parent = this;
	this.instance_7.setTransform(-49,-154);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},2).to({state:[]},2).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-159,98,144);


(lib.logo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgeBsQgagQAAgkIAAgSIA9AAIAAAXQAAAJAGAGQAGAGALgBQATAAADgPQADgJgDgIQgEgKgQgKIgggTQgtgYgGgZQgDgPADgRQAEgaAXgNQAUgMAgAAQAgAAATALQAbAOAAAhIAAAQIg6AAIAAgOQAAgKgGgFQgFgGgKAAQgSAAgDAQQgBADABAJQACAIAPAKIAhASQAwAZAFAbQAEAPgDAXQgEAagYAOQgUAMgiAAQgjAAgVgPgAsQBsQgZgQAAgkIAAgSIA9AAIAAAXQAAAJAGAGQAHAGAKgBQATAAADgPQADgJgDgIQgEgKgPgKIghgTQgugYgFgZQgDgRACgPQAFgaAWgNQAVgMAhAAQAgAAATALQAaAOAAAhIAAAQIg5AAIAAgOQAAgKgGgFQgGgGgJAAQgTAAgCAQQgCADACAJQACAIAPAKIAhASQAvAZAGAbQADAQgDAWQgEAagXAOQgUAMgiAAQgkAAgWgPgACjBAIAAgOIAAimIA6AAIAACrIABAIQABAHAEAEQAGAGALAAQALAAAGgGQAEgEABgHIABgIIAAirIA6AAIAAC0QgGA6hLAAQhLAAgGg6gAKhBrQgYgPgDgeIgBgPIAAhgIABgQQAEgeAYgOQAUgNAiAAQAiAAAUANQAYAOADAeIABAQIAAAHIg7AAIAAgNIgBgJQgBgFgEgFQgGgGgMAAQgLAAgGAGQgFAFAAAFQgCAEAAAHIAABpIABAJQABAGAFAEQAGAHAMAAQALAAAGgHQAFgEABgGIABgJIAAghIgYAAIAAghIBSAAIAAA9IgBAPQgCAcgWAPQgIAGgKADIgIACQgOADgRAAQgiAAgVgMgAirBzIgBjWIgoDWIg7AAIgojWIgBDWIg6AAIAFjnIBeAAIAeC0IAdi0IBeAAIAFDngAnfBzIgfjWIghDWIg+AAIArjnIBnAAIAqDngAH2BxIg7jAIAEDAIg5AAIAAjlIBWAAIA2C6IgDi6IA6AAIAADlg");
	this.shape.setTransform(81,12.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.logo, new cjs.Rectangle(0,0,162.1,24.6), null);


(lib.h转 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 人转身.png
	this.instance = new lib.人转身();
	this.instance.parent = this;
	this.instance.setTransform(-24.2,-120.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({y:-115.2},0).wait(2).to({skewY:180,x:29.3},0).wait(2).to({y:-120.2},0).wait(2));

	// 人转腿2.png
	this.instance_1 = new lib.人转腿2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(39.7,-42.5,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({skewX:35.7,skewY:215.7,x:40,y:-17.7},0).wait(2).to({rotation:-35.7,skewX:0,skewY:360,x:-33.6},0).wait(2).to({rotation:0,x:-34.7,y:-41.5},0).wait(2));

	// 人转腿1.png
	this.instance_2 = new lib.人转腿1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(5.5,-43.5,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({skewX:-21,skewY:159,x:1.8,y:-39.7},0).wait(2).to({rotation:21,skewX:0,skewY:0,x:4.6},0).wait(2).to({rotation:0,x:1,y:-43.7},0).wait(2));

	// 人转手2.png
	this.instance_3 = new lib.人转手2();
	this.instance_3.parent = this;
	this.instance_3.setTransform(36.7,-77.2,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2).to({skewX:17.5,skewY:197.5,x:38.2,y:-64.8},0).wait(2).to({rotation:-17.5,skewX:0,skewY:360,x:-31.8},0).wait(2).to({rotation:0,x:-31.5,y:-76.7},0).wait(2));

	// 人转手1.png
	this.instance_4 = new lib.人转手1();
	this.instance_4.parent = this;
	this.instance_4.setTransform(2.7,-72.5,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(2).to({skewX:-21.2,skewY:158.8,x:1.8,y:-70.9},0).wait(2).to({rotation:21.2,skewX:0,skewY:0,x:4.6},0).wait(2).to({rotation:0,x:1,y:-73.2},0).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.5,-120.2,70.3,106.8);


(lib.h跑 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 人手1.png
	this.instance = new lib.人手1();
	this.instance.parent = this;
	this.instance.setTransform(-36,-78.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({rotation:-26.2,x:-34.7,y:-58.7},0).wait(2).to({rotation:-78.7,x:-16.5,y:-35.8},0).wait(1).to({rotation:-113.7,x:4.1,y:-32.7},0).wait(2).to({rotation:-160.7,x:27.9,y:-53.4},0).wait(2).to({rotation:-113.7,x:4.1,y:-32.7},0).wait(2).to({rotation:-78.7,x:-16.5,y:-35.8},0).wait(1).to({rotation:-26.2,x:-34.7,y:-58.7},0).wait(2));

	// 人身.png
	this.instance_1 = new lib.人身();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-23,-125);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3).to({y:-120},0).wait(2).to({y:-117.5},0).wait(1).to({y:-120},0).wait(2).to({y:-127.5},0).wait(2).to({y:-120},0).wait(2).to({y:-117.5},0).wait(1).to({y:-120},0).wait(2));

	// 人手2.png
	this.instance_2 = new lib.人手2();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-1,-76.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3).to({rotation:25.4,x:2.8,y:-74.5},0).wait(2).to({rotation:54.7,x:7.4,y:-72.7},0).wait(1).to({rotation:119.9,x:11.3,y:-70.7},0).wait(2).to({rotation:152.1,x:5.8,y:-70.5},0).wait(2).to({rotation:119.9,x:11.3,y:-70.7},0).wait(2).to({rotation:54.7,x:7.4,y:-72.7},0).wait(1).to({rotation:25.4,x:2.8,y:-74.5},0).wait(2));

	// 人腿1.png
	this.instance_3 = new lib.人腿1();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-40,-51.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3).to({rotation:-29.2,x:-40.7,y:-29.5},0).wait(2).to({rotation:-54.9,x:-33.1,y:-13.6},0).wait(1).to({rotation:-35.9,x:-36.7,y:-25.7},0).wait(2).to({rotation:0,x:-37.5,y:-54.2},0).wait(2).to({rotation:-35.9,x:-36.7,y:-25.7},0).wait(2).to({rotation:-54.9,x:-33.1,y:-13.6},0).wait(1).to({rotation:-29.2,x:-40.7,y:-29.5},0).wait(2));

	// 人腿2.png
	this.instance_4 = new lib.人腿2();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-4,-48.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3).to({rotation:23.5,x:2.4,y:-46.2},0).wait(2).to({rotation:69,x:13,y:-47.9},0).wait(1).to({rotation:33.4,x:3,y:-46.6},0).wait(2).to({rotation:2.3,x:-3.9,y:-52.8},0).wait(2).to({rotation:33.4,x:3,y:-46.6},0).wait(2).to({rotation:67.9,x:12.8,y:-48},0).wait(1).to({rotation:23.5,x:2.4,y:-46.2},0).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40,-125,79,108.3);


(lib.h头像框星_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.h头像框星();
	this.instance.parent = this;
	this.instance.setTransform(-12.5,-13.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.h头像框星_1, new cjs.Rectangle(-12.5,-13.5,25,27), null);


(lib.h头像框尴尬 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhIBzQgGg6gDgFIgtgDQgNgDgFgGQgCgEAAgIQAAgNATgEQASgFAXAIQA8AVAABHIAAAeQgEAXgQAAQgUAAgGgsgAAXB9QgCgIACgIQAAgHACgLQAFgTAKgOQAfgrBIATQAKADAGAHQAEAGAAAEQAAAKgJAEQgTAKg3gBQgCACgLAlQgIAXgQAAQgRAAgDgOgAASg6QgKgTAAgkQAAgjAMgCQANgDAPAvQAEAcAzASQAyARAAANQAAAUgcAAQhRAAgagwgAifgZQgDgFABgGQAAgHAPgEIAggHQAwgOAAgyQAAg5AUAXQAUAYAAAZQAAAngIANQgUAkhLAAQgXAAgHgKg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.h头像框尴尬, new cjs.Rectangle(-16.2,-15.9,32.5,31.9), null);


(lib.p1飞船mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.p1飞船_1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-5},12).to({y:0},12).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.5,-23.5,83,47);


(lib.p1房子mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.p1房子_1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.98,rotation:-0.8,x:-3,y:-1.5},12).to({scaleX:1,scaleY:0.98,rotation:1,x:3.5,y:2},14).to({scaleY:1,rotation:0,x:0,y:0},13).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.5,-137,93,274);


(lib.p1m嘴mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.p1m嘴_1();
	this.instance.parent = this;
	this.instance.setTransform(0,-25.5,1,1,0,0,0,0,-25.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:-25.4,scaleX:1.05,scaleY:0.9,y:-25.4},5,cjs.Ease.get(1)).to({regY:-25.5,scaleX:1,scaleY:1,y:-25.5},5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.5,-28,127,56);


(lib.p1m呆毛mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.p1m呆毛_1();
	this.instance.parent = this;
	this.instance.setTransform(-6,-0.1,0.899,1.099,10,0,0,-5,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:0,regY:-51.5,scaleX:0.9,rotation:9.9,x:8.2,y:-55.2},0).wait(1).to({scaleX:0.9,scaleY:1.1,rotation:9.8,x:8.1},0).wait(1).to({scaleX:0.9,scaleY:1.1,rotation:9.5,x:7.8,y:-55.1},0).wait(1).to({scaleX:0.91,scaleY:1.09,rotation:9.1,x:7.4},0).wait(1).to({scaleX:0.91,scaleY:1.09,rotation:8.6,x:7,y:-55},0).wait(1).to({scaleX:0.91,scaleY:1.09,rotation:8,x:6.4},0).wait(1).to({scaleX:0.92,scaleY:1.08,rotation:7.3,x:5.7,y:-54.9},0).wait(1).to({scaleX:0.92,scaleY:1.08,rotation:6.4,x:5,y:-54.8},0).wait(1).to({scaleX:0.93,scaleY:1.07,rotation:5.5,x:4.1,y:-54.6},0).wait(1).to({scaleX:0.93,scaleY:1.07,rotation:4.5,x:3.2,y:-54.5},0).wait(1).to({scaleX:0.94,scaleY:1.06,rotation:3.4,x:2.2,y:-54.3},0).wait(1).to({scaleX:0.95,scaleY:1.05,rotation:2.2,x:1.2,y:-54.1},0).wait(1).to({scaleX:0.95,scaleY:1.05,rotation:0.9,x:0.1,y:-53.8},0).wait(1).to({scaleX:0.96,scaleY:1.04,rotation:-0.4,x:-1.1,y:-53.5},0).wait(1).to({scaleX:0.97,scaleY:1.03,rotation:-1.8,x:-2.2,y:-53.1},0).wait(1).to({scaleX:0.98,scaleY:1.02,rotation:-3.2,x:-3.4,y:-52.7},0).wait(1).to({scaleX:0.99,scaleY:1.01,rotation:-4.6,x:-4.5,y:-52.4},0).wait(1).to({scaleX:1,scaleY:1,rotation:-6,x:-5.6,y:-51.9},0).wait(1).to({scaleX:1,scaleY:1,rotation:-7.3,x:-6.7,y:-51.5},0).wait(1).to({scaleX:1.01,scaleY:0.99,rotation:-8.6,x:-7.7,y:-51},0).wait(1).to({scaleX:1.02,scaleY:0.98,rotation:-9.8,x:-8.6,y:-50.6},0).wait(1).to({scaleX:1.02,scaleY:0.97,rotation:-11,x:-9.5,y:-50.2},0).wait(1).to({scaleX:1.03,scaleY:0.97,rotation:-12,x:-10.3,y:-49.8},0).wait(1).to({scaleX:1.04,scaleY:0.96,rotation:-12.9,x:-10.9,y:-49.4},0).wait(1).to({scaleX:1.04,scaleY:0.96,rotation:-13.6,x:-11.4,y:-49.1},0).wait(1).to({scaleX:1.05,scaleY:0.95,rotation:-14.2,x:-11.8,y:-48.9},0).wait(1).to({scaleX:1.05,scaleY:0.95,rotation:-14.6,x:-12.2,y:-48.6},0).wait(1).to({scaleX:1.05,scaleY:0.95,rotation:-14.9,x:-12.4,y:-48.5},0).wait(1).to({regX:-4.9,regY:0.1,scaleY:0.95,rotation:-15,x:-4.8,y:0.2},0).wait(1).to({regX:0,regY:-51.5,scaleY:0.95,rotation:-14.9,x:-12.5,y:-48.5},0).wait(1).to({scaleX:1.05,scaleY:0.95,rotation:-14.8,x:-12.4,y:-48.6},0).wait(1).to({scaleX:1.05,scaleY:0.95,rotation:-14.5,x:-12.2,y:-48.7},0).wait(1).to({scaleX:1.04,scaleY:0.95,rotation:-14.2,x:-11.9,y:-48.8},0).wait(1).to({scaleX:1.04,scaleY:0.96,rotation:-13.7,x:-11.6,y:-49},0).wait(1).to({scaleX:1.04,scaleY:0.96,rotation:-13.1,x:-11.2,y:-49.3},0).wait(1).to({scaleX:1.03,scaleY:0.97,rotation:-12.5,x:-10.7,y:-49.5},0).wait(1).to({scaleX:1.03,scaleY:0.97,rotation:-11.7,x:-10.1,y:-49.9},0).wait(1).to({scaleX:1.02,scaleY:0.98,rotation:-10.8,x:-9.4,y:-50.2},0).wait(1).to({scaleX:1.02,scaleY:0.98,rotation:-9.8,x:-8.7,y:-50.6},0).wait(1).to({scaleX:1.01,scaleY:0.99,rotation:-8.8,x:-7.9,y:-50.9},0).wait(1).to({scaleX:1,scaleY:0.99,rotation:-7.7,x:-7,y:-51.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:-6.5,x:-6.1,y:-51.7},0).wait(1).to({scaleX:0.99,scaleY:1.01,rotation:-5.2,x:-5.1,y:-52.1},0).wait(1).to({scaleX:0.98,scaleY:1.02,rotation:-3.9,x:-4.1,y:-52.5},0).wait(1).to({scaleX:0.98,scaleY:1.02,rotation:-2.6,x:-2.9,y:-52.9},0).wait(1).to({scaleX:0.97,scaleY:1.03,rotation:-1.2,x:-1.9,y:-53.3},0).wait(1).to({scaleX:0.96,scaleY:1.04,rotation:0.1,x:-0.7,y:-53.6},0).wait(1).to({scaleX:0.95,scaleY:1.05,rotation:1.5,x:0.4,y:-53.9},0).wait(1).to({scaleX:0.94,scaleY:1.06,rotation:2.7,x:1.6,y:-54.2},0).wait(1).to({scaleX:0.94,scaleY:1.06,rotation:4,x:2.7,y:-54.4},0).wait(1).to({scaleX:0.93,scaleY:1.07,rotation:5.1,x:3.7,y:-54.6},0).wait(1).to({scaleX:0.92,scaleY:1.08,rotation:6.2,x:4.7,y:-54.8},0).wait(1).to({scaleX:0.92,scaleY:1.08,rotation:7.2,x:5.6,y:-54.9},0).wait(1).to({scaleX:0.91,scaleY:1.09,rotation:8,x:6.3,y:-55},0).wait(1).to({scaleX:0.91,scaleY:1.09,rotation:8.7,x:7},0).wait(1).to({scaleX:0.9,scaleY:1.1,rotation:9.3,x:7.5,y:-55.1},0).wait(1).to({scaleX:0.9,scaleY:1.1,rotation:9.7,x:7.9},0).wait(1).to({scaleX:0.9,scaleY:1.1,rotation:9.9,x:8.1,y:-55.2},0).wait(1).to({regX:-5,regY:0.1,scaleX:0.9,rotation:10,x:-6,y:-0.1},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-117.1,90.6,124);


(lib.p1m = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// p1m呆毛mc
	this.instance = new lib.p1m呆毛mc();
	this.instance.parent = this;
	this.instance.setTransform(10,-314,1,1,0,0,0,0,-51.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// p1m嘴mc
	this.instance_1 = new lib.p1m嘴mc();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-4.7,-118.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// p1m身.png
	this.instance_2 = new lib.p1m身();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-121,-271);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

}).prototype = getMCSymbolPrototype(lib.p1m, new cjs.Rectangle(-121,-379.7,242,379.7), null);


(lib.p1bt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 6
	this.instance = new lib.p1bt圆();
	this.instance.parent = this;
	this.instance.setTransform(0,-19.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:1.3,scaleY:1.3},4,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},10,cjs.Ease.get(-1)).wait(5));

	// Layer 5
	this.instance_1 = new lib.p1bt圆();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,-19.7,1.15,1.15);
	this.instance_1.alpha = 0.25;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({scaleX:1.3,scaleY:1.3,alpha:0.5},0).to({scaleX:2.82,scaleY:2.82,alpha:0},18,cjs.Ease.get(-1)).wait(1));

	// Layer 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("AHAAAQAAC5iECDQiDCEi5AAQi4AAiEiEQiDiDAAi5QAAi4CDiEQCEiDC4AAQC5AACDCDQCECEAAC4g");
	this.shape.setTransform(0,-19.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(20));

	// Layer 3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AmpBSQAxgXgCgyIgyAAIAAgSIAyAAIAAg5IgoAAIAAgSICzAAIAAASIgmAAIAAA5IAvAAIAAASIgvAAIAABXIgUAAIAAhXIg9AAQABAegNAXQgNAWgbAPgAlmgJIA9AAIAAg5Ig9AAgACdBiIAAgLIhhAAIAAALIgTAAIAAhCICHAAIAABCgAA8BJIBhAAIAAgZIhhAAgAgrBiIAAgNIg7AAIAAANIgSAAIAAhZIBgAAIAABZgAhmBGIA7AAIAAgtIg7AAgADkBWQAHgKADgPQAEgQAAgWIAPABIAAAUQAHAPAKAHIAAg0IgsAAIAAgPIBbAAIAAAPIgfAAIAAAUIAdAAIAAAOIgdAAIAAAZQANACASABIBsgBIgGASIhngBQgyAAgRgbQgBAIgEAIQgDAIgFAIgAjTBSQALgIAKgJQAJgIAHgKIgegaQAJgmAEgXIgTAAIAAgRIAWAAIAFgoIATACIgGAmIAmAAIAAARQgCAdgFAUQgFAVgHAOIAYAWIgNAMIgVgTQgGAJgJAJQgKAJgNAKgAi5AQIAUAQQAFgKAEgSQAEgRACgbIgXAAQgHAogFAQgAFAA7QAYgJAMgPQALgPgCgWIAAgYIAQAAIgBAYQAAAPgCALIAIAGIAkAbIgKANIgGgEIghgcQgFAKgLAJQgLAJgQAHQgEgEgGgKgAGPAcIAAhBIg0AAIAABBIgQAAIAAhQIAbAAIAEgVIglAAIAAgPIBiAAIAAAPIgrAAIgEAVIAnAAIAABQgAAJAIQAfgKAYgOQAYgNAQgRIAUACIgPgJQAJgKAHgLQAIgLAEgNIATADIgIAQIA6AAIAAAQIhEAAQgBAEgGAGIgGAJIABAAIgFAFQAQAQAWALQAWALAcAGIgJARIgZgJQgLgFgKgFIAAAMIhaAAIAAgLQgNAGgeANQAYgJgbALgACWABQgJgEgKgHQgKgHgLgKQgJAIgKAHIgWANIBRAAIAAAAgAgjgRIhFAEQgKAAgJACIgIgSQAIgEAHgKQANgSATglIAUAIIgJANQgYAlgIAJIA9gCIgQgcIAPgIIAjA6IgRAJgADxgPIAAhLIBIAAIAABLgAEBgdIAoAAIAAgQIgoAAgAEBg6IAoAAIAAgRIgoAAgACVgzIANgJIASAWIgPAJIgQgWgAA0gyIANgJIASATIgOAKgAAJgtQANgLAJgOQAJgNAGgPIATADQgDAJgFAHIA1AAIAAAQIg+AAIgLAQIgPAQg");
	this.shape_1.setTransform(0,54.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.7,-65.5,91.6,130.1);


(lib.monster = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		/* stop();
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// m转
	this.instance = new lib.m转();
	this.instance.parent = this;
	this.instance.setTransform(0,15,1,1,0,0,180);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	// m跑
	this.instance_1 = new lib.m跑();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,15,1,1,0,0,180);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({_off:false},0).to({_off:true},1).wait(1));

	// m转
	this.instance_2 = new lib.m转();
	this.instance_2.parent = this;
	this.instance_2.setTransform(0,15);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({_off:false},0).to({_off:true},1).wait(2));

	// m跑
	this.instance_3 = new lib.m跑();
	this.instance_3.parent = this;
	this.instance_3.setTransform(0,15);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},1).wait(3));

	// 落地点
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#88C997").s().p("AmNALIAAgVIMbAAIAAAVg");
	this.shape.setTransform(0,10.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-144,98,155.5);


(lib.h头像框星mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		/* stop();
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(41));

	// Layer 2
	this.instance = new lib.h头像框星_1();
	this.instance.parent = this;
	this.instance.setTransform(13.3,24.5,0.3,0.3);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({alpha:1},0).to({scaleX:1,scaleY:1},4,cjs.Ease.get(1)).to({scaleX:0.3,scaleY:0.3},5,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},5,cjs.Ease.get(1)).to({scaleX:0.3,scaleY:0.3},5,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},5,cjs.Ease.get(1)).to({scaleX:0.3,scaleY:0.3},5,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},5,cjs.Ease.get(1)).to({scaleX:0.3,scaleY:0.3},4,cjs.Ease.get(1)).to({_off:true},1).wait(1));

	// Layer 1
	this.instance_1 = new lib.h头像框星_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,0,0.3,0.3);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(5).to({_off:false},0).to({scaleX:1,scaleY:1},5,cjs.Ease.get(1)).to({scaleX:0.3,scaleY:0.3},5,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},5,cjs.Ease.get(1)).to({scaleX:0.3,scaleY:0.3},5,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},5,cjs.Ease.get(1)).to({scaleX:0.3,scaleY:0.3},5,cjs.Ease.get(1)).to({_off:true},1).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(9.5,20.5,7.5,8.1);


(lib.h头像框尴尬mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		/* stop();
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(49));

	// Layer 1
	this.instance = new lib.h头像框尴尬();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.2,0.2);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.6,scaleY:0.6,alpha:1},4,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},5,cjs.Ease.get(1)).to({scaleX:0.6,scaleY:0.6},5,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},5,cjs.Ease.get(1)).to({scaleX:0.6,scaleY:0.6},5,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},5,cjs.Ease.get(1)).to({scaleX:0.6,scaleY:0.6},5,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},5,cjs.Ease.get(1)).to({scaleX:0.6,scaleY:0.6},5,cjs.Ease.get(1)).to({scaleX:0.2,scaleY:0.2,alpha:0},3,cjs.Ease.get(1)).to({_off:true},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.2,-3.2,6.5,6.4);


(lib.h头像框_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ⭐️三条线
	this.instance = new lib.h头像框尴尬mc();
	this.instance.parent = this;
	this.instance.setTransform(34.3,-116.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// ⭐️星星
	this.instance_1 = new lib.h头像框星mc();
	this.instance_1.parent = this;
	this.instance_1.setTransform(58.5,-157.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// h头像框.png
	this.instance_2 = new lib.h头像框();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-60.5,-160);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

}).prototype = getMCSymbolPrototype(lib.h头像框_1, new cjs.Rectangle(-60.5,-160,136,160), null);


(lib.human = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		/* stop();
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// h转
	this.instance = new lib.h转();
	this.instance.parent = this;
	this.instance.setTransform(0.2,13.5,1,1,0,0,180);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	// h跑
	this.instance_1 = new lib.h跑();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0.2,13.5,1,1,0,0,180);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({_off:false},0).to({_off:true},1).wait(1));

	// h转
	this.instance_2 = new lib.h转();
	this.instance_2.parent = this;
	this.instance_2.setTransform(0.2,13.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({_off:false},0).to({_off:true},1).wait(2));

	// h跑
	this.instance_3 = new lib.h跑();
	this.instance_3.parent = this;
	this.instance_3.setTransform(0.2,13.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},1).wait(3));

	// 落地点
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F79A9B").s().p("AmNAJIAAgRIMbAAIAAARg");
	this.shape.setTransform(0,12.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.8,-111.5,79.6,125.4);


(lib.p1mmc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.p1m();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.02,scaleY:0.98},5,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},5,cjs.Ease.get(-1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-121,-379.7,242,379.7);


(lib.p1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// p1mmc
	this.instance = new lib.p1mmc();
	this.instance.parent = this;
	this.instance.setTransform(214.6,387.3,1,1,0,0,0,0,-182.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// p1飞船
	this.instance_1 = new lib.p1飞船mc();
	this.instance_1.parent = this;
	this.instance_1.setTransform(533,106);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// p1房子
	this.instance_2 = new lib.p1房子mc();
	this.instance_2.parent = this;
	this.instance_2.setTransform(511,287);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// p1txt
	this.instance_3 = new lib.p1txt();
	this.instance_3.parent = this;
	this.instance_3.setTransform(151.1,95.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// ⭐️p1bt
	this.instance_4 = new lib.p1bt();
	this.instance_4.parent = this;
	this.instance_4.setTransform(318.9,900.8,1,1,0,0,0,0,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// bg1
	this.instance_5 = new lib.bg1();
	this.instance_5.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

}).prototype = getMCSymbolPrototype(lib.p1, new cjs.Rectangle(0,0,640,1029), null);


// stage content:
(lib.game0221 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// logo
	this.instance = new lib.logo();
	this.instance.parent = this;
	this.instance.setTransform(15.8,16.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 广告
	this.instance_1 = new lib.广告();
	this.instance_1.parent = this;
	this.instance_1.setTransform(600,28.5,1,1,0,0,0,23.4,11.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// h头像框
	this.instance_2 = new lib.h头像框_1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-65.5,188.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// human
	this.instance_3 = new lib.human();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-65.2,320.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// monster
	this.instance_4 = new lib.monster();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-69.5,322.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// p1
	this.instance_5 = new lib.p1();
	this.instance_5.parent = this;
	this.instance_5.setTransform(320,514.5,1,1,0,0,0,320,514.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(194,514.5,766,1029);
// library properties:
lib.properties = {
	width: 640,
	height: 1029,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/bg1.png", id:"bg1"},
		{src:"images/h头像框.png", id:"h头像框"},
		{src:"images/h头像框星.png", id:"h头像框星"},
		{src:"images/m跑1.png", id:"m跑1"},
		{src:"images/m跑2.png", id:"m跑2"},
		{src:"images/m跑3.png", id:"m跑3"},
		{src:"images/m跑4.png", id:"m跑4"},
		{src:"images/m跑5.png", id:"m跑5"},
		{src:"images/m转1.png", id:"m转1"},
		{src:"images/m转2.png", id:"m转2"},
		{src:"images/p1m呆毛.png", id:"p1m呆毛"},
		{src:"images/p1m嘴.png", id:"p1m嘴"},
		{src:"images/p1m身.png", id:"p1m身"},
		{src:"images/p1txt.png", id:"p1txt"},
		{src:"images/p1房子.png", id:"p1房子"},
		{src:"images/p1飞船.png", id:"p1飞船"},
		{src:"images/人手1.png", id:"人手1"},
		{src:"images/人手2.png", id:"人手2"},
		{src:"images/人腿1.png", id:"人腿1"},
		{src:"images/人腿2.png", id:"人腿2"},
		{src:"images/人身_.png", id:"人身"},
		{src:"images/人转手1.png", id:"人转手1"},
		{src:"images/人转手2.png", id:"人转手2"},
		{src:"images/人转腿1.png", id:"人转腿1"},
		{src:"images/人转腿2.png", id:"人转腿2"},
		{src:"images/人转身_.png", id:"人转身"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;