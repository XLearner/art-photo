//  该 js 文件只用于self.html

$(document).ready(function(){
	// 输入框选中状态
	var username = $('.login_main form input');
	$(username).focus(function(){
		$(this).parent().css({'borderColor':'#60a5e8'});
	});
	$(username).blur(function(){
		$(this).parent().css({'borderColor':'#ddd'});
	});

	// 头像修改
	$('.modify').click(function(){
		$('[type="file"]').click();
	});

	var img = new Image();


	// }
	$('[type="file"]').change(function(event){

		var index = layer.load(1, {
		  shade: [0.3,'#000']
		});

		img.src = getFileUrl('img');
		$(img).on('load', function(){
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');

			// 原图片大小
			var originWidth = img.width;
			var originHeight = img.height;
			// 画布大小
			var canWidth = 84;
			var canHeight = 84;
			// 目标图像大小
			var targetWidth = canWidth;
			var targetHeight = canHeight;

			if(originHeight / originWidth > targetHeight / targetWidth){
				// 高度偏大 宽度偏小
				targetHeight = canHeight;
				targetWidth = (targetHeight * originWidth) / originHeight;
			}else{
				// 宽度偏大 高度偏小
				targetWidth = canWidth;
				targetHeight = (targetWidth * originHeight) / originWidth;
			}

			canvas.width = targetWidth;
			// var sh = (84 * img.height) / img.width;
			// console.log(sh);
			canvas.height = targetHeight;
			// 清除画布
			context.clearRect(0, 0, 84, 84);
			// 压缩图像
			context.drawImage(img, 0, 0, targetWidth, targetHeight);
			// 转化为图像
			setTimeout("layer.closeAll('loading')", 500);
			$('.img img').attr('src', canvas.toDataURL());
		});
	});

});


function getFileUrl(sourceId) {
    var url;
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
        url = document.getElementById(sourceId).value;
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    return url;
}