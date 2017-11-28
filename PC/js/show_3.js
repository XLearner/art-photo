// 实现了移动，批量删除，单项删除，选择框的功能


$(document).ready(function(){
// 添加分类
		var add = $('.add');
		$(add).click(function(){
			// 清除输入框
			$('[name="name"]').val('');
			$('[name="level"]').val('');
			$('.show_tip').find('[name="level"]').attr('disabled', false);
			// 隐藏提示
			$('.window .question-error').hide();
			$('.show_tip .password-error').hide();
			$('.show_tip .password_alike-error').hide();
			// 清除星星
			// $('.icons div').parent().find('i').css({'backgroundPosition' : '0 0'});
			$('.icons').find('i').removeClass('on');
			// 新建
			var li_clone = $('.menu .under').clone(true);
			$(li_clone).removeClass('under');
			$(li_clone).find('.img img').attr('src', 'images/first/need_add_icon.png').css({'width':'50px','height':'44px', 'marginTop':'50px'});
			// 等级选定
			var star = $('.icons div');
			var blings = '';
			$(star).find('i').unbind('click').bind('click', function(){
				var level = $(this).parents('form').find('[name="level"]').val();
				// 星星长度
				var long = 7;

				$(this).nextAll().removeClass('on');
				var prevLi = $(this).prevAll();
				var hasBling = $(this).parents('.icons').find('.on').length;
				if($(this).hasClass('on')){
					$(this).removeClass('on');
				}else{
					// 点亮前面的星星
					for (var i = prevLi.length - 1; i >= 0; i--) {
						if(hasBling < long){
							if ($(prevLi[i]).hasClass('on')) {continue;}
							$(prevLi[i]).addClass('on');
							hasBling++;
						}
					}
					// 判断能否点亮自己
					if(hasBling < long){
						$(this).addClass('on');
						hasBling++;
					}
				}
				blings = $('.icons').find('.on').clone();
			});
			// 等级失去焦点时弹出提示
			$('[name="level"]').blur(function(){
				$('.show_tip .password-error').hide();
			});
			$('[name="level"]').bind('input propertychange', function(){
				if($(this).val().length > 1){
					$('.show_tip .password-error').hide();
				}
			});
			layer.open({
				title: ' ',
				type: 1,
				btn: ['确定', '取消'],
				skin: 'layui-layer-rim', //加上边框
				area: ['300px', '439px'], //宽高
				content: $('.show_tip'),
				yes: function(index, layero){
					var r = new RegExp(/^[a-zA-Z]$/);
					// 隐藏提示
					$('.window .question-error').hide();
					$('.show_tip .password-error').hide();
					var name = $('[name="name"]').val();
					var level = $('[name="level"]').val();
					var result = r.test(level);
					var searchF = searchFiles($('.pic'), name);
					if(judgeLevel(name, level, blings)){
						$(li_clone).find('.tit .stit').text(name);
						$(li_clone).find('.level span').text(level);
						// 判断是否重名
	                    if(!searchF.exist){
	                        $(li_clone).find('.tit .stit').text(name);
	                        $(li_clone).find('.tit .num').text('(' + searchF.count + ')');
	                    }
						
						$(li_clone).find('.bling').html('').append(blings);
						$('.wrap .menu').append(li_clone);
						layer.close(index);
					}else if($.trim(name) == ''){
						$('.show_tip .question-error').show();
					}else if (!result) {
					}else if($.trim(level) == '' || blings == ''){
						$('.show_tip .password-error').show();
					}else if($.trim(level).val().length != 1){
						$('.show_tip .password-error').hide();
					}
				}
			});
		});

// 删除
	var del = $('.btn .del');
	$(del).click(function(){
		var that = $(this);
		layer.open({
			title: ' ',
			type: 1,
			btn: ['确定', '取消'],
			skin: 'layui-layer-rim', //加上边框
			area: ['300px', '192px'], //宽高
			content: $('.del_fri'),
			yes: function(index, layero){
				that.parents('li').remove();
				layer.close(index);
			}
		});
	});
 // 选择框
	var select = $('.select');
	$(select).click(function(){
	 	if ($(this).find('input').attr('value') == 0) {
	 		$(this).find('i').css({'backgroundImage': 'url("images/first/selected_icon.png")'});
	 		$(this).find('input').attr('value', '1');
	 	}else{
	 		$(this).find('i').css({'backgroundImage': 'url("images/first/select_icon.png")'});
	 		$(this).find('input').attr('value', '0');
	 	}
	});

	// 批量删除
	var clear_more = $('.clear_more');
	var clear_cancel = $('.cancel');
	var clear_del = $('.box .clear .del');
	$(clear_more).click(function(){
		$('.select').show();
		$(this).siblings().show();
		$(this).hide();
		$('.add').addClass('hide');
		$('.pic').hover(function(){
			$(this).find('.btn').addClass('hide');
		},function(){
			$(this).find('.btn').addClass('hide');
		});
	});
	$(clear_cancel).click(function(){
		var that = $(this);
		// 取消时清除已选记录
		var del_pic = $('input[value="1"]');
		del_pic = $(del_pic).parents('li');
		$(del_pic).find('.select i').css({'backgroundImage': 'url("images/first/select_icon.png")'});
 		$(del_pic).find('input').attr('value', '0');
 		
		$(that).parent().hide();
		$('.select').hide();
		$('.add').removeClass('hide');
		$(that).parent().siblings().show();
		$('.pic').hover(function(){
			$(this).find('.btn').removeClass('hide');
		},function(){
			$(this).find('.btn').removeClass('hide');
		});
	});
	$(clear_del).click(function(){
		// 找到已选中的需要删除的li标签
		var del_pic = $('input[value="1"]');
		del_pic = $(del_pic).parents('li');
		layer.open({
			title: ' ',
			type: 1,
			btn: ['确定', '取消'],
			skin: 'layui-layer-rim', //加上边框
			area: ['300px', '192px'], //宽高
			content: $('.del_fri'),
			yes: function(index, layero){
				var name = $('[name="name"]').val();
				if(del_pic.length != 0){
					del_pic.remove();
					$(clear_more).next().hide();
					$('.select').hide();
					$(clear_more).show();
					$('.add').removeClass('hide');
					$('.pic').hover(function(){
						$(this).find('.btn').removeClass('hide');
					},function(){
						$(this).find('.btn').removeClass('hide');
					});
					layer.close(index);
				}
			}
		});
	});
// 移动
	var move = $('.move');
	$(move).click(function(){
		$(move_where).val('0').parent().nextAll().not('.under').remove();

		layer.open({
			title: ' ',
			type: 1,
			btn: ['确定', '取消'],
			skin: 'layui-layer-rim', //加上边框
			area: ['300px', '192px'], //宽高
			content: $('.move_win'),
			yes: function(index, layero){
				if($(move_where).val() != 0){
					layer.close(index);
				}
			},
			success: function(layero, index){
				$('.layui-layer-page').height('auto');
				$('.layui-layer-content').height('auto').css('min-height', '92px');
			},
		});
	});

	// 移动至
	var move_where = $('.where');
	// 记录添加次数
	var count = 0;
	// 主菜单选择监听
	$('.where').change(function(){
		$(this).parent().nextAll().not('.under').remove();
		var div_clone = $('.move_win .under').clone(true).removeClass('under').addClass('w' + count++);
		if($(this).val() == 1){
			// 一级菜单选项
			for (var i = 0; i < 3; i++) { // 此处长度可更换
			// 获取第一个选项模板
				var selEle = div_clone.find('option').eq(0).clone();
				$(selEle).html('一级相册展示');
				$(selEle).attr('value', i+1);
				div_clone.find('.first_file').append(selEle);
			}

			div_clone.find('.first_file').css('display', 'block').attr('name', 'sel_first');
			// 移除已有二级选项
			$(this).parents('form').find('.w'+(--count)).remove();
			// 添加二级选项卡
			$(this).parents('form').append(div_clone);
		}else if($(this).val() == 2){
			// 一级菜单选项
			// 获取第一个选项模板
			for (var i = 0; i < 3; i++) { // 此处长度可更换
				var selEle = div_clone.find('option').eq(0).clone();
				$(selEle).html('一级相册展示');
				$(selEle).attr('value', i+1);
				div_clone.find('.first_file').append(selEle);
			}

			div_clone.find('.first_file').css('display', 'block').attr('name', 'sel_first');
			// 移除已有二级选项
			$(this).parents('form').find('.w'+(--count)).remove();
			// 添加二级选项卡
			$(this).parents('form').append(div_clone);
		}
	});

	// 二级选项卡监听事件
	$('.first_file').change(function(){
		// debugger;
		var that = $(this);
		that.parent().nextAll().not('.under').remove();
		var formL = that.parents('form');
		var div_clone = $('.move_win .under').clone().removeClass('under').addClass('x' + count++);
		if($(this).val() == 1){
			// 二级菜单选项
			// 获取第一个选项模板
			for (var i = 0; i < 3; i++) { // 此处长度可更换
				var selEle = div_clone.find('option').eq(0).clone();
				$(selEle).html('二级相册展示');
				$(selEle).attr('value', i+1);
				div_clone.find('.first_file').append(selEle);
			}

			div_clone.find('.first_file').css('display', 'block').attr('name', 'sel_sec');
			// 移除已有二级选项
			formL.find('.x'+(--count)).remove();
			// 设置默认值
			div_clone.find('.first_file').attr("value", '1');

			formL.append(div_clone);
		}else if($(this).val() == 2){
			// 二级菜单选项
			// 获取第一个选项模板
			for (var i = 0; i < 3; i++) { // 此处长度可更换
				var selEle = div_clone.find('option').eq(0).clone();
				$(selEle).html('二级相册展示');
				$(selEle).attr('value', i+1);
				div_clone.find('.first_file').append(selEle);
			}

			div_clone.find('.first_file').css('display', 'block').attr('name', 'sel_sec');
			// 移除已有二级选项
			formL.find('.x'+(--count)).remove();
			// 设置默认值
			div_clone.find('.first_file').attr("value", '2');
			formL.append(div_clone);
		}
	});

});

// 查找已有文件名
// file 为已查找到的jq li对象
var searchFiles = function(file, name){
    var list = [];
    // 记录重复命名次数
    var count = 0;
    file.each(function(key, value){
        list.push($(value).find('.tit .stit').text());
    });
    for(var i in list){
        if (list[i] == name) {
            count++;
        }
    }
    if(count == 0){
        return {exist: true, count: count};
    }else{
        return {exist: false, count: count};
    }
};

// 判断等级
// $.trim(name) != '' && ($.trim(level).length <= 1 || blings != '') && $.trim(level).length <= 1
function judgeLevel(name, level, blings){
	var result = false;
	if($.trim(name) != '' && ($.trim(level).length <= 2 || blings != '') && $.trim(level).length <= 2){
		result = true;
	}
	var r = new RegExp(/^[a-zA-Z]{2}$/);
	if($.trim(level).length <= 2){
		result = r.test(level);
	}
	return result;
}