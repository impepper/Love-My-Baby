(function(){
	winKissBaby={};
	winKissBaby.target=null;
	winKissBaby.obj=[];
	winKissBaby.objFlower=[];
	winKissBaby.objPen=[];
	winKissBaby.objKiss=null;
	winKissBaby.objIndex=null;
	winKissBaby.size=0;
	
	winKissBaby.selectedBabyTools= null;
	
	winKissBaby.lastAngle = 0.0;
	winKissBaby.currentAngle = 0.0;
	
	winKissBaby.lastScale = 1.0;
	winKissBaby.currentScale = 1.0;
	
	winKissBaby.currentTranslation = {x:0.0, y:0.0};
	winKissBaby.lastTranslation = {x:0.0, y:0.0};	
	
	winKissBaby.switchBabyTools=function(BabyTools){
		winKissBaby.ivFlower.objSelected=false;
		winKissBaby.ivKiss.objSelected=false;
		winKissBaby.ivPen.objSelected=false;
		winKissBaby.ivFlower.opacity=0.5
		winKissBaby.ivKiss.opacity=0.5
		winKissBaby.ivPen.opacity=0.5
		BabyTools.objSelected=true;
		winKissBaby.selectedBabyTools=BabyTools.objName;
	}
	
	winKissBaby.updateTransform=function(image){
	    var transform = Ti.UI.create2DMatrix()
			.scale(winKissBaby.lastScale*winKissBaby.currentScale)
	        .rotate(winKissBaby.lastAngle+winKissBaby.currentAngle);
	        
	    transform.tx = winKissBaby.lastTranslation.x+winKissBaby.currentTranslation.x;
	    transform.ty = winKissBaby.lastTranslation.y+winKissBaby.currentTranslation.y;
	
		image.transform = transform;
	};
		
	winKissBaby.fncCreateObj = function(BabyToolName,posKissX,posKissY){
		winKissBaby.obj[winKissBaby.obj.length]=Ti.UI.createImageView({
			image:'image/'+BabyToolName+'.png',
			zIndex:10+winKissBaby.obj.length,
			top:posKissY-20,
			left:posKissX-20,
			width:100,
			height:100,
			type:BabyToolName,
			objIndex:winKissBaby.obj.length,
		    panGesture:true			
		})

		winKissBaby.lastAngle = 0.0;
		winKissBaby.currentAngle = 0.0;
		
		winKissBaby.lastScale = 1.0;
		winKissBaby.currentScale = 1.0;
		
		winKissBaby.currentTranslation = {x:0.0, y:0.0};
		winKissBaby.lastTranslation = {x:0.0, y:0.0};		
	
		winKissBaby.obj[winKissBaby.obj.length-1].addEventListener('pan', function(e){
			winKissBaby.currentTranslation.x = e.translation.x;
			winKissBaby.currentTranslation.y = e.translation.y;
			winKissBaby.updateTransform(winKissBaby.obj[winKissBaby.objIndex]);
		});
		
		winKissBaby.obj[winKissBaby.obj.length-1].addEventListener('panend', function(e){
		    winKissBaby.lastTranslation.x = winKissBaby.lastTranslation.x + winKissBaby.currentTranslation.x;
		    winKissBaby.lastTranslation.y = winKissBaby.lastTranslation.y + winKissBaby.currentTranslation.y;
		    winKissBaby.currentTranslation.x = 0.0;
		    winKissBaby.currentTranslation.y = 0.0;
		});
		
		winKissBaby.obj[winKissBaby.obj.length-1].addEventListener('dblclick', function(e){
		    winKissBaby.objIndex=e.source.objIndex
			winKissBaby.lastAngle = 0.0;
			winKissBaby.currentAngle = 0.0;
			
			winKissBaby.lastScale = 1.0;
			winKissBaby.currentScale = 1.0;
		});

		winKissBaby.objIndex=winKissBaby.obj.length-1

		winKissBaby.win.add(winKissBaby.obj[winKissBaby.obj.length-1])		
	} 
	
	winKissBaby.loadfromgallery=function(){
		var popoverView;
		var arrowDirection;
		Titanium.Media.openPhotoGallery({
			success:function(event){
				var cropRect = event.cropRect;
				var image = event.media;
				
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
					winKissBaby.ivBaby.image = image;
				} else {
					// is this necessary?
				}
			},
			cancel:function(){winKissBaby.btnBack.fireEvent('click')},
			error:function(error){},
			allowEditing:true,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}

		
	winKissBaby.loadfromcamera=function(){
		var popoverView;
		var arrowDirection;
		Titanium.Media.showCamera({
			success:function(event){
				var cropRect = event.cropRect;
				var image = event.media;
				
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
					winKissBaby.ivBaby.image = image;
				} else {
					// is this necessary?
				}
			},
			cancel:function(){winKissBaby.btnBack.fireEvent('click')},
			error:function(error){},
			allowEditing:true,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
	
	winKissBaby.savetolibrary=function(){
		
		var filename = new Date().getTime() + "-baby.jpg";
		var bgImage = Titanium.Filesystem.getFile(imgDataDir, filename);
		bgImage.write(winNewBaby.ivBaby.image);
		return filename
	}
		
	winKissBaby.init=function(BabyName){
		winKissBaby.win=Ti.UI.createWindow({
			backgroundImage:'image/bg_frame.png',
			backgroundColor:'#069'
		})

		winKissBaby.obj=[];
		winKissBaby.objFlower=[];
		winKissBaby.ObjStick=[];
		winKissBaby.objPen=[];
		winKissBaby.objKiss=[];
		
		winKissBaby.ivBaby=Ti.UI.createImageView({
			backgroundColor:'#000',
			zIndex:5,
			top:92,
			left:38,
			width:238,
			height:234,
			transform:Ti.UI.create2DMatrix()
	        	.rotate(-6.2)
			
		})
		winKissBaby.win.add(winKissBaby.ivBaby)

		winKissBaby.viewKiss=Ti.UI.createView({
			zIndex:9,
		    rotateGesture:true,
		    pinchGesture:true
		})

		winKissBaby.viewKiss.addEventListener('rotate', function(e){
		    winKissBaby.currentAngle = e.rotation / Math.PI * 180.0;
			winKissBaby.updateTransform(winKissBaby.obj[winKissBaby.objIndex]);
		});
		
		winKissBaby.viewKiss.addEventListener('rotateend', function(e){
		    winKissBaby.lastAngle = (winKissBaby.lastAngle + winKissBaby.currentAngle) % 360.0;
		    winKissBaby.currentAngle = 0.0;
		});
		
		winKissBaby.viewKiss.addEventListener('pinch', function(e){
		    winKissBaby.currentScale = e.scale;
		    winKissBaby.updateTransform(winKissBaby.obj[winKissBaby.objIndex]);
		});
		
		winKissBaby.viewKiss.addEventListener('pinchend', function(e){
		    winKissBaby.lastScale = (winKissBaby.lastScale * winKissBaby.currentScale);
		    winKissBaby.currentScale = 1.0;
		    winKissBaby.Ti.API.debug("pinchend event occurred.");
		});
		
		winKissBaby.win.add(winKissBaby.viewKiss)
						
		winKissBaby.viewObj=Ti.UI.createView({
			width:320,
			height:50,
			left:0,
			bottom:0,
			backgroundColor:'#fff',
			opacity:0.8,
			zIndex:101
		})
		winKissBaby.ivFlower=Ti.UI.createImageView({
			image:'image/flower_s.png',
			width:40,
			height:40,
			left:10,
			objSelected:false,
			opacity:0.5,
			objName:'flower'
		})
		winKissBaby.ivFlower.addEventListener('click',function(e){
			winKissBaby.switchBabyTools(winKissBaby.ivFlower)
			winKissBaby.ivFlower.opacity=1
			winKissBaby.fncCreateObj(winKissBaby.selectedBabyTools,e.x,e.y)
		})
		winKissBaby.viewObj.add(winKissBaby.ivFlower);

		winKissBaby.ivKiss=Ti.UI.createImageView({
			image:'image/kiss_s.png',
			width:40,
			height:40,
			left:60,
			objSelected:false,
			opacity:0.5,
			objName:'kiss'
		})

		winKissBaby.ivKiss.addEventListener('click',function(e){
			winKissBaby.switchBabyTools(winKissBaby.ivKiss)
			winKissBaby.ivKiss.opacity=1
			winKissBaby.fncCreateObj(winKissBaby.selectedBabyTools,e.x,e.y)
		})
		winKissBaby.viewObj.add(winKissBaby.ivKiss);

		winKissBaby.ivPen=Ti.UI.createImageView({
			image:'image/heart_s.png',
			width:40,
			height:40,
			left:110,
			objSelected:false,
			opacity:0.5,
			objName:'heart'
		})
		winKissBaby.ivPen.addEventListener('click',function(e){
			winKissBaby.switchBabyTools(winKissBaby.ivPen)
			winKissBaby.ivPen.opacity=1
			winKissBaby.fncCreateObj(winKissBaby.selectedBabyTools,e.x,e.y)
		})
		winKissBaby.viewObj.add(winKissBaby.ivPen);

		winKissBaby.lblSave=Ti.UI.createLabel({
			text:'Save',
			left:200,
			top:5,
			width:40,
			height:40
		})
		winKissBaby.lblSave.addEventListener('click',function(e){
			 winKissBaby.viewObj.hide();
			Titanium.Media.takeScreenshot(function(event)
			{
				Titanium.Media.saveToPhotoGallery(event.media);
			})			
			winKissBaby.viewObj.show();
			var dlgSaved=Ti.UI.createAlertDialog({
				title:'Photo Saved'
			})
			dlgSaved.show();			
		})
		winKissBaby.viewObj.add(winKissBaby.lblSave);
		
		winKissBaby.lblBack=Ti.UI.createLabel({
			text:'Back',
			left:275,
			top:5,
			width:40,
			height:40
		})
		winKissBaby.lblBack.addEventListener('click',function(){
			Titanium.UI.iPhone.hideStatusBar();
			winKissBaby.win.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
		})
		winKissBaby.viewObj.add(winKissBaby.lblBack)
		
		winKissBaby.win.add(winKissBaby.viewObj);
	}
})()
