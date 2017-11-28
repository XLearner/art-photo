// 实现了移动，批量删除，单项删除，选择框的功能


$(document).ready(function(){
// 编辑
	var edit = $('.edit');
	edit.click(function(){
		var that = $(this).parents('li');
        var originN = that.find('.stit').text();
        $('[name="name"]').val(originN);
		$('.window .question-error').hide();
		$('.window .name-error').hide();
		layer.open({
			title: ' ',
			type: 1,
			btn: ['确定', '取消'],
			skin: 'layui-layer-rim', //加上边框
			area: ['300px', '192px'], //宽高
			content: $('.show_tip'),
			yes: function(index, layero){
				var name = $('[name="name"]').val();
                var searchF = searchFiles($(that).siblings(), name);
                // 隐藏不需要的提示
				$('.show_tip .password-error').hide();
				$('.show_tip_third .question-error').hide();
				if($.trim(name) != ''){
					that.find('.tit .stit').text(name);
                	// that.find('.tit .num').text('');
					// 判断是否重名
					if(!searchF.exist && originN != name){
                    	that.find('.tit .num').text('(' + searchF.count + ')');
					}
					$('.window .question-error').hide();
					layer.close(index);
				}else{
					$('.window .question-error').show();
				}
			}
		});
	});
// 添加分类
	var add = $('.add');
	$(add).click(function() {
		$('[name="name"]').val('');
		// 隐藏提示
		$('.window .question-error').hide();
		$('.show_tip .name-error').hide();
		// 新建文件夹
		var li_clone = $('.menu .under').clone(true);
		$(li_clone).removeClass('under');
		layer.open({
			title: ' ',
			type: 1,
			btn: ['确定', '取消'],
			skin: 'layui-layer-rim', //加上边框
			area: ['300px', '192px'], //宽高
			content: $('.show_tip'),
			yes: function(index, layero){
				$('.window .question-error').hide();
				$('.show_tip .password-error').hide();
				var name = $('[name="name"]').val();
				var searchF = searchFiles($('.pic'), name);
				if($.trim(name) != ''){
					$(li_clone).find('.tit .stit').text(name);
					// 判断是否重名
                    if(!searchF.exist){
                        $(li_clone).find('.tit .num').text('(' + searchF.count + ')');
                    }
					
					$('.wrap .menu').append(li_clone);
					layer.close(index);
				}else{
					$('.show_tip .question-error').show();
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
	$(clear_more).click(function(event){
		if (event && event.stopPropagation) {
	     // this code is for Mozilla and Opera
	     event.stopPropagation();
	     } else if (window.event) {
	     // this code is for IE
	      window.event.cancelBubble = true;
	     }
		event.stopPropagation();
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
		$(del_pic).find('i').css({'backgroundImage': 'url("images/first/select_icon.png")'});
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
			area: 'auto', //宽高
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
		}else if($(this).val() == 2){
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


});

// 查找已有文件名
// file 为已查找到的jq li对象
// 返回true: 没有找到
// 	   false: 找到一个以上
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