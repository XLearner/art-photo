/* ---------------- 相册展示 ------------------*/


$(document).ready(function(){

	// 添加
	$('.add').off('click').click(function(){
		$('.newF').addClass('on').find('.head p').text('新建');
		var that =$(this);

		// 清空表单
		$('input').val('');

		init('edit');

		$('.newF .sure').off('click').click(function(){
			var name = $('[name="name"]').val();
			var result = searchFiles($('.q_photoClassification_box ul li'), 'name', name);
			// 新建分类
			var li_clone = $('.list .under').clone(true).removeClass('under');

			if($.trim(name) != ''){
				if(!result.exist){
					// 重名
					li_clone.find('.num').text('(' + result.count + ')');
				}
				li_clone.find('.name').text(name);
			}
			// 关闭弹出层
			$('.window').removeClass('on');
			$('.list').append(li_clone);
		});

	});

	// 批量删除
	$('.clear_more').off('click').click(function(){
		event.stopPropagation();
		$(this).hide();
		init('edit');

		// 添加隐藏
		$('.add').hide();

		// 编辑隐藏
		$('.edit').hide();

		// 底部控件
		$('.footer').show();

		// 选择框显示
		$('.select').show();


		// 取消
		$('.clear_cancel').click(function(){
			$('.clear_more').show();
			$('.clear_more_btn .footer').hide();
			$('.select').hide();
			$('.add').show();
			$('.edit').show();

			var del_pic = $('input[value="1"]');
			del_pic = $(del_pic).parents('li');
			$(del_pic).find('i').css({'backgroundImage': 'url("images/select_icon.png")'});
	 		$(del_pic).find('input').attr('value', '0');
		});

		// 确认 批量删除
		$('.sure').off('click').click(function(){
			// 找到已选中的需要删除的li标签
			var del_pic = $('input[value="1"]');
			del_pic = $(del_pic).parents('li');

			// 删除
			if(del_pic.length != 0){
				layer.open({
					type: 1,
					btn: ['确定', '取消'],
					content: '是否确认删除选中 '+ del_pic.length +' 项?',
					yes: function(index){
						del_pic.remove();

						$('.clear_more').show();
						$('.clear_more_btn .footer').hide();
						$('.select').hide();
						$('.add').show();
						$('.edit').show();

						layer.close(index);
					}
				});
			}
		});

	});




	// 选择框
	var select = $('.select');
	select.click(function(){
	 	if ($(this).find('input').attr('value') == 0) {
	 		$(this).find('i').css({'backgroundImage': 'url("images/selected_icon.png")'});
	 		$(this).find('input').attr('value', '1');
	 	}else{
	 		$(this).find('i').css({'backgroundImage': 'url("images/select_icon.png")'});
	 		$(this).find('input').attr('value', '0');
	 	}
	});


	// 打开编辑
	$('.edit').click(function(){
		var that = $(this);
		that.parents('.list').find('.cover2').addClass('hide');
		that.parents('.list').find('.q_btnBox').addClass('hide');

		if(!that.hasClass('on')){
			that.parents('.list').find('.edit').removeClass('on');
			that.addClass('on');
			that.parents('li').find('.q_btnBox').removeClass('hide');
			that.parents('li').find('.cover2').removeClass('hide');
		}else{
			that.removeClass('on');
			that.parents('li').find('.q_btnBox').addClass('hide');
			that.parents('li').find('.cover2').addClass('hide');
		}
	});

	// 编辑
	$('.redit').off('click').click(function(){
		var that =$(this);
		// 显示弹出层
		$('.newF').addClass('on').find('.head p').text('编辑');

		var originName = that.parents('li').find('.name').text();
		// 清空表单
		$('input').val(originName);


		/*
		   =====================
					弹窗
		   =====================
		 */
		// 确认编辑
		$('.sure').off('click').click(function(){
			var name = $('[name="name"]').val();
			var result = searchFiles($('.q_photoClassification_box ul li'), 'name', name);

			if($.trim(name) != ''){
				if(!result.exist && originName != name){
					// 重名
					that.parents('li').find('.num').text('(' + result.count + ')');
				}
				that.parents('li').find('.name').text(name);
			}
			// 关闭弹出层
			$('.newF').removeClass('on');
		});


		that.parents('li').find('.edit').removeClass('on');
		that.parents('li').find('.q_btnBox').addClass('hide');
		that.parents('li').find('.cover2').addClass('hide');

	});


	// 删除
	$('.del').click(function(){
		var that = $(this);
		init('edit');

		layer.open({
			type: 1,
			btn: ['确定', '取消'],
			content: '是否确认删除?',
			yes: function(index){
				that.parents('li').remove();
				if(typeof(initS) != 'undefined'){
					initS();
				}
				layer.close(index);
			}
		});
	});

	/*
	   =====================
				弹窗
	   =====================
	 */
	// 弹窗消失
	$('.cancel').click(function(){
		$('.window').removeClass('on');
		init('edit');
	});


	// 移动
	$('.move').click(function(){
		var that =$(this);
		// 显示弹出层
		$('.collectF').addClass('on').find('.head p').text('编辑');
		// 游客界面
		if($('.window').attr('c') == '1'){
			$('.window').addClass('on').find('.head p').text('收藏');
			$('.moveF').find('p').text('收藏至');
		}

		// 初始化
		$('.moveF select').val('0');
		// 移除已有二级选项
		$('.moveF .under').nextAll().remove();

		/*
		   =====================
					弹窗
		   =====================
		 */
		// 确认移动
		$('.sure').off('click').click(function(){
			var v = $('.moveF select').val();

			// 有值才能关闭弹出层
			if (v != 0) {
				$('.window').removeClass('on');
			}else{
				layer.open({
					skin: 'msg',
					content: '请选择移动位置',
					time: 2
				});
			}
			init('edit');
		});

	});




	// --------------------------------------------------------- photoShow -- 3
	$('.ptShow_3 .add').off('click').click(function(){
		$('.newF3').addClass('on').find('.head p').text('新建');
		var that =$(this);

		// 清空表单
		$('input').val('');
		// 清除星星
		$('.icons').find('i').removeClass('on');

		init('edit');


		// 新建相册 确定 回调
		$('.newF3 .sure').off('click').on('click', function(){
			// 初始化
			$('.error span').hide();
			$('.error .tip').show();
			// 相册名不为空
			var name = $('[name="name"]').val();
			// 等级不为空，且必须有两个字母
			var level = $('[name="level"]').val();
			// 判断是否重名
			var searchF = searchFiles($('.imgBox'), 'name', name);
			// 新建分类
			var li_clone = $('.list .under').clone(true).removeClass('under');



			if(judgeLevel(name, level, blings)){
				// 名字
				li_clone.find('.name').text(name);
				// 等级
				li_clone.find('.stit span').text(level);
				// 判断是否重名
		        if(!searchF.exist){
		            li_clone.find('.tit .num').text('(' + searchF.count + ')');
		        }
		        li_clone.find('.blings').html('').append(blings);

		        $('.list').append(li_clone);

				// 关闭弹出层
				$('.newF3').removeClass('on');
			}else if(name == ''){
				$('.name-error').show();
				$('.name-error').siblings().hide();
			}else if(level == '' || level.length > 2){
				$('.password-error').show();
			}
		});
	});

	// 编辑
	$('.ptShow_3 .redit').off('click').click(function(){
		$('.newF3').addClass('on').find('.head p').text('编辑');
		var that =$(this);
		// 初始化表单
		var originN = that.parents('li').find('.name').text();
		var originL = $(that).parents('li').find('.stit span').text();
		$('[name="name"]').val(originN);
		$('[name="level"]').val(originL);
		// 清除星星
		$('.icons').find('i').removeClass('on');

		init('edit');


		// 编辑确认 回调
		$('.newF3 .sure').off('click').on('click', function(){
			// 初始化
			$('.error span').hide();
			$('.error .tip').show();
			// 相册名不为空
			var name = $('[name="name"]').val();
			// 等级不为空，且必须有两个字母
			var level = $('[name="level"]').val();
			// 判断是否重名
			var searchF = searchFiles($('.imgBox'), 'name', name);
			if(judgeLevel(name, level, blings)){
				// 名字
				that.parents('li').find('.name').text(name);
				// 等级
				that.parents('li').find('.stit span').text(level);
				// 判断是否重名
		        if(!searchF.exist && name != originN){
		            that.parents('li').find('.tit .num').text('(' + searchF.count + ')');
		        }
		        that.parents('li').find('.blings').html('').append(blings);
		        // 关闭弹出层
				$('.newF3').removeClass('on');
		    }
		});
	});


	// --------------------------------------------------------- photoShow -- 4
	/*
		1. 上传照片 缩略图
		2. 上传视频
		3. 图片查看
		4. 视频播放
	 */
	// 上传
	$('.ptShow_4 .add').off('click').click(function(){
		var that = $(this);
        // 区分文件类型
        var kind = '';
        if(that.hasClass('upPic')){
            kind = 'kind1';
        }else if(that.hasClass('upMov')){
            kind = 'kind2';
        }
        // 打开弹出层
        $('.shadow').show();
		$('.upWin').addClass('on');
		// 初始化表单
		$('.upload').removeClass('on');
		$('[type="file"]').val('');
		$('.upWin .img p').show();
		$('.upWin .img img').attr('src', './images/add_icon.png').height('auto').width('auto');
		$('.upWin .upload').off('click');


		// 上传图片预览
		$('[type="file"]').off('change').on('change', function(){
			if ($(this).val() != '') {
				$('.upWin .img p').hide();
				$('.upWin .upload').addClass('on');

			}
		    // var url = window.URL.createObjectURL(this.files[0]);
		    // 多文件上传时，将路径添加进数组中保存
		    var urlArr = [];
		    for (var i = 0; i < this.files.length; i++) {
		        urlArr.push(window.URL.createObjectURL(this.files[i]));
		    }

		    var r = new RegExp(/\.(mp4)|(MOV)|(m4v)$/);
		    var pan = r.test(this.files[0].name);
		    if(this.files.length != '0' && pan){
		        window.mp4url = urlArr;
		    }

		    var imgArr = [];
		    for(var i in urlArr){
		        var img = new Image();
		        img.src = urlArr[i];
		        imgArr.push(img);
		    }


	        $(imgArr).on('load', function(){
	            var imgH = imgArr[0].height;
	            var imgW = imgArr[0].width;
	            // 图片预览
	            $('.upWin .img img').attr('src', imgArr[0].src);


	            if(imgH / imgW > 160 / 240){
	                $('.upWin .img img').css({'width':'auto', 'height':'100%'});
	            }else{
	                $('.upWin .img img').css({'height':'auto', 'width':'100%'});
	            }
	        });

	        // 开始上传
	        $('.upWin .upload').off('click').click(function(){
				layer.open({
					type: 2,
					content: '加载中',
					time: 2,
					end: function(index){
						var li_clone = $('.ptShow_4 .under').clone(true).removeClass('under');
						li_clone.find('.img img').attr('src', imgArr[0].src);
						li_clone.addClass(kind);
						if(kind == 'kind2'){
                            $(li_clone).find('img').hide();
                            $(li_clone).find('video').attr('src', mp4url).show();
                            $(li_clone).find('.tit').addClass('video');
                        }
                        // 添加新建
						$('.list').append(li_clone);

						// 判断是否还能再添加
						if($('.kind1').length > 7){
							$('.upPic').attr('on', '0').hide();
							$('.ban_upPic').attr('on', '1').css('display', 'inline-block');
						}
						if($('.kind2').length >= 1){
							$('.upMov').attr('on', '0').hide();
							$('.ban_upMov').attr('on', '1').css('display', 'inline-block');
						}

						initS();
						// 关闭弹出层
						$('.shadow').hide();
						$('.upWin').removeClass('on');
					}
				});
				$('.list .tit').click(function(){
					$(this).siblings().click();
				});
			});

		});
	});


	if($('.kind1').length > 7){
		$('.upPic').hide();
		$('.ban_upPic').show();
	}

	// 取消
	$('.upWin .cancel').off('click').click(function(){
		$('.shadow').hide();
		$('.upWin').removeClass('on');
	});

	$('.upWin .img').click(function(){
		$('[type="file"]').click();
	});

	// 禁止上传提示
	$('.ban_upPic').click(function(){
		layer.open({
			skin: 'msg',
			content: '最多上传8张照片',
			time: 2
		});
	})

	$('.ban_upMov').click(function(){
		layer.open({
			skin: 'msg',
			content: '最多上传1个视频',
			time: 2
		});
	})

	/* ------------------ photoShow - 4 --------------------- */
	// 批量删除
	$('.ptShow_4 .clear_more').off('click').click(function(){
		event.stopPropagation();
		var that = $(this);

		$(this).hide();
		init('edit');

		// 添加隐藏
		$(this).siblings().hide();

		// 编辑隐藏
		$('.edit').hide();

		// 底部控件
		$('.footer').show();

		// 选择框显示
		$('.select').show();


		// 取消
		$('.clear_cancel').click(function(){
			$('.clear_more').show();
			$('.clear_more_btn .footer').hide();
			$('.select').hide();
			that.siblings('[on="1"]').css('display', 'inline-block');
			$('.edit').show();

			var del_pic = $('input[value="1"]');
			del_pic = $(del_pic).parents('li');
			$(del_pic).find('i').css({'backgroundImage': 'url("images/select_icon.png")'});
	 		$(del_pic).find('input').attr('value', '0');
		});

		// 确认 批量删除
		$('.sure').off('click').click(function(){
			// 找到已选中的需要删除的li标签
			var del_pic = $('input[value="1"]');
			del_pic = $(del_pic).parents('li');

			// 删除
			if(del_pic.length != 0){
				layer.open({
					type: 1,
					btn: ['确定', '取消'],
					content: '是否确认删除选中 '+ del_pic.length +' 项?',
					yes: function(index){
						del_pic.remove();

						$('.clear_more').show();
						$('.clear_more_btn .footer').hide();
						$('.select').hide();
						$('.add').show();
						$('.edit').show();

						layer.close(index);
					}
				});
			}
		});

	});







});


// 初始化相册展示 单项编辑框
function init(e){
	var edit = $('.edit');
	edit.removeClass('on');
	edit.parents('li').find('.q_btnBox').addClass('hide');
	edit.parents('li').find('.cover2').addClass('hide');
}


// 判断等级
// $.trim(name) != '' && ($.trim(level).length <= 1 || blings != '') && $.trim(level).length <= 1
function judgeLevel(name, level, blings){
	var result = false;
	if($.trim(name) != '' && ($.trim(level).length <= 2 || blings != '') && $.trim(level).length <= 2){
		result = true;
	}
	var r = new RegExp(/^[a-zA-Z]{1,2}$/);
	if($.trim(level).length <= 2){
		result = r.test(level);
	}

	return result;
}

