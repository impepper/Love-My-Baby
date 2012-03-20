// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

Ti.include('baby_kiss.js')

var win_root = Titanium.UI.createWindow({  
    backgroundImage:'image/bg_main.png',
    backgroundColor:'#fff'
});


var btnCamera = Ti.UI.createImageView({
	image:'image/btn_camera.png',
	top:370,
	left:15,
	width:140,
	height:92
});

var btnGallery = Ti.UI.createImageView({
	image:'image/btn_gallery.png',
	top:370,
	right:15,
	width:140,
	height:92
});

btnCamera.addEventListener('click',function(){
	winKissBaby.init();
	winKissBaby.loadfromcamera()
	Titanium.UI.iPhone.hideStatusBar();
	winKissBaby.win.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT})
})

btnGallery.addEventListener('click',function(){
	winKissBaby.init();
	winKissBaby.loadfromgallery();
	Titanium.UI.iPhone.hideStatusBar();
	winKissBaby.win.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT})	
})

win_root.add(btnCamera);
win_root.add(btnGallery);

var imgDataDir = Ti.Filesystem.getApplicationDataDirectory()+ Ti.Filesystem.separator + 'BabyImages'+ Ti.Filesystem.separator;
var imgDir = Ti.Filesystem.getFile(imgDataDir)
if (!imgDir.exists()){
	imgDir.createDirectory();
}

Titanium.UI.iPhone.hideStatusBar();
win_root.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
