//旋转图片
var ImgClipUpload = function(){
	var __getBitmap;
	var img = new Image();
	var simgWidth = 120,simgHeight=120;
	var fr = new FileReader();
	var init = function(){
		$(document.body).append('<input style="display: none;" id="file-input" accept="image/*"  name="pic" type="file" />');
		$("#file-input").on('change', fileChangHaner);
	}
		//fr.onloadend = onFileLoaded;

		// $(document.body).append('<div style="width: 600px;height: 200px;background-color: white;color: black;font-size: 16px;z-index: 99999; position: absolute;" id="infoBox">info</div>');

	// var onFileLoaded = function(e){
	// 	console.log("onFileLoaded---->",e);
	// 	__getBitmap.call(self, loadImgInfo);
	// }
	var browse = function(){
		if(!$("#file-input")) return;
		$("#file-input").click();
	}

	function fileChangHaner(evt) {
		console.log("file-change");
		if(typeof FileReader == 'undefined') {
			alert("你的浏览器不支持FileReader接口");
			return false;
		}

		var file = this.files[0];
		// 限制上传图片文件

		// if(file.type && !/image\/\w+/.test(file.type)) {
		// 	alert('请选择图片文件！');
		// 	return false;
		// }


		fr.readAsDataURL(file);

		// EXIF.getData(file,function(){
		// 	var _dataTxt = EXIF.pretty(this);
		// 	var _dataJson = JSON.stringify(EXIF.getAllTags(this));
		// 	console.log(_dataTxt);
		// 	console.log(_dataJson);
		// 	$("#infoBox").html(_dataTxt);
		// })
        //

		fr.onload = function(fe) {
			//console.log("this.result-->",this.result);
			var result = this.result;
			var imgScale = 1;

			var exif;
			img.onload = function() {
				EXIF.getData(file, function() {
					exif = EXIF.getAllTags(this);

					console.log('exif-->',exif);
					loadImgInfo = addImageHander({
						img: img,
						exif: exif
					});


					var tempBitMap = backImage(loadImgInfo, simgWidth, simgHeight);
					loadImgInfo.bitmap = tempBitMap;
					__getBitmap.call(self, loadImgInfo);
				});
			};
			img.src = result;
			//$(document.body).append(img)
		};
	}

	//返回变形后的图片ƒƒ
	function backImage(imgInfo, targetImgWidth, targetImgHeight) {
		if(imgInfo.imgWidth > imgInfo.imgHeight) {
			imgScale = (targetImgHeight / imgInfo.imgHeight);
		} else {
			imgScale = (targetImgWidth / imgInfo.imgWidth);
			if((imgInfo.imgHeight * imgScale) < targetImgHeight) {
				imgScale = targetImgHeight / (imgInfo.imgHeight * imgScale) * imgScale;
			}
		}
		//alert("imgScale:"+imgScale)
		//photoMc.upImgContainerMc.removeAllChildren();
		var bitmap = new createjs.Bitmap(imgInfo.img);
		bitmap.setTransform((targetImgWidth - imgInfo.imgWidth * imgScale) / 2, 0,
								imgScale, imgScale,
								imgInfo.imgRotation, 0, 0,
			                    imgInfo.imgRegX, imgInfo.imgRegY);
		// console.log('sssss=',(targetImgWidth - imgInfo.imgWidth * imgScale) / 2, 0,
		// 						imgScale, imgScale,
		// 						imgInfo.imgRotation, 0, 0,
		// 						imgInfo.imgRegX, imgInfo.imgRegY);
		//photoMc.upImgContainerMc.addChild(bitmap);
		return bitmap;

	}

	function addImageHander(info) {
		var img = info.img;
		var obj = new Object();
		var exif = info.exif;
		var imgWidth = img.width;
		var imgHeight = img.height;
		var imgRotation = 0;
		var imgRegX = 0;
		var imgRegY = 0;
		var imgScale = 1;


		//alert("orientation==="+exif.Orientation);
		var orientation = exif ? exif.Orientation : 1;
		//获取图片实际比例，重置图片的比例
		var getRatio = function(img) {
			//ratio的获取是通过检测像素alpha，需要过滤png图片
			if(/png$/i.test(img.src)) {
				return 1;
			}
			var iw = img.naturalWidth,
				ih = img.naturalHeight;
			//console.log("imgWidth:" + imgWidth, "imgHeight:" + imgHeight, "iw:" + iw, "ih:" + ih)
			var canvas = document.createElement('canvas');
			canvas.width = 1;
			canvas.height = ih;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);
			var data = ctx.getImageData(0, 0, 1, ih).data;
			var sy = 0;
			var ey = ih;
			var py = ih;
			while(py > sy) {
				var alpha = data[(py - 1) * 4 + 3];
				if(alpha === 0) {
					ey = py;
				} else {
					sy = py;
				}
				py = (ey + sy) >> 1;
			}
			var ratio = (py / ih);
			return(ratio === 0) ? 1 : ratio;
		}
		//获取重新取得的比例，防止ios下大图压扁
		var ratio = getRatio(img);

		// 判断拍照设备持有方向调整照片角度
		//alert("orientation:"+orientation)
		// 旋转角度	参数
		// 0°	    1     -->6
		// 顺时针90°	6     -->3
		// 逆时针90°	8	  -->1
		// 180°	    3     -->8
		switch(orientation) {
			case 3:
				imgRotation = 180;
				imgRegX = imgWidth;
				imgRegY = imgHeight * ratio;
				// imgRegY -= imgWidth * (1-ratio);
				break;
			case 6:
				imgRotation = 90;
				imgWidth = img.height;
				imgHeight = img.width;
				imgRegY = imgWidth * ratio;
				// imgRegY -= imgWidth * (1-ratio);
				break;
			case 8:
				imgRotation = 270;
				imgWidth = img.height;
				imgHeight = img.width;
				imgRegX = imgHeight * ratio;

				//if (/iphone|ipod|ipad/i.test(navigator.userAgent)) {
				//  alert('苹果系统下暂不支持你以这么萌！萌！达！姿势拍照！');
				//  return;
				//}

				break;
			default:
				break;

		}
		imgWidth *= ratio;
		imgHeight *= ratio;
		return {
			img: img,
			imgWidth: imgWidth,
			imgHeight: imgHeight,
			imgRotation: imgRotation,
			imgRegX: imgRegX,
			imgRegY: imgRegY
		};

	}

	var setConfig = function(option){
		__getBitmap = option.getBitmap || null;
		simgWidth = option.width || simgWidth;
		simgHeight = option.height || simgHeight;
	}


	return {
		init:init,
		setConfig:setConfig,
		browse:browse
	};
}()
