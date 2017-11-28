// show_4 js 文件


$(document).ready(function() {

    // 上传
    var upload = $('.login_btn');
    $(upload).bind('click', function() {
        var that = $(this);
        // 区分文件类型
        var kind = '';
        if(that.hasClass('upPic')){
            kind = 'kind1';
        }else if(that.hasClass('upMov')){
            kind = 'kind2';
        }
        // 清空上传选项框的值
        $('[name="name"]').val('');
        $('.window .question-error').hide();
        $('.window .name-error').hide();
        $('.file .img img').attr('src', 'images/first/need_add_icon.png').css({
            'width': 'auto',
            'height': 'auto'
        });;
        $('[type="file"]').val('');
        window.mp4url = '';

        // 上传图片预览
        /* --- 非IE --- */
        if(navigator.userAgent.indexOf('MSIE') < 0){
            $('[type="file"]').unbind('change').bind('change', function(){
                // var url = window.URL.createObjectURL(this.files[0]);
                // 多文件上传时，将路径添加进数组中保存
                var urlArr = [];
                for (var i = 0; i < this.files.length; i++) {
                    urlArr.push(window.URL.createObjectURL(this.files[i]));
                }


                var r = new RegExp(/\.mp4$/);
                if(r.test(this.files[0].name)){
                    window.mp4url = urlArr;
                }
                // img.src = url;
                var imgArr = [];
                for(var i in urlArr){
                    var img = new Image();
                    img.src = urlArr[i];
                    imgArr.push(img);
                }

                // 若用户选择多文件上传
                if(imgArr.length > 1){
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');

                    // 初始化画布
                    canvas.width = 240;
                    canvas.width = 160;
                    context.clearRect(0, 0, 240, 160);

                    // 每张图片所占空间
                    var maxWidth = 50;
                    var maxHeight = 50;

                    // 目标图大小
                    var targetWidth, targetHeight;

                    // 原图大小
                    var originW , originH;
                    var count = 0 , Harr = [];
                    $(imgArr).on('load', function(){
                        count++;
                        if(count == imgArr.length){
                            for (var i = 0; i < imgArr.length; i++) {
                                originW = imgArr[i].width;
                                originH = imgArr[i].height;

                                if (originW / originH >= 1) {
                                    targetWidth = maxWidth;
                                    targetHeight = targetWidth * originH / originW;
                                }else{
                                    targetWidth = maxWidth;
                                    targetHeight = targetWidth * originH / originW;
                                }

                                if(i < 3){
                                    context.drawImage(imgArr[i], i * 55, 0, targetWidth, targetHeight );
                                    targetHeight = Math.ceil(targetHeight);
                                    Harr.push(targetHeight);
                                }else{
                                    var minHeight = Math.min.apply(null, Harr);
                                    var minIndex = $.inArray(minHeight, Harr);
                                    minHeight = Math.ceil(minHeight) + 5;
                                    context.drawImage(imgArr[i], minIndex * 55, minHeight, targetWidth, targetHeight );
                                    Harr[minIndex] = minHeight + targetHeight;
                                }

                            }

                            $('.file .img img').attr('src', canvas.toDataURL());
                        }

                    })
                }else{
                    $(imgArr).on('load', function(){
                        var imgH = imgArr[0].height;
                        var imgW = imgArr[0].width;
                        // 图片预览
                        $('.file .img img').attr('src', imgArr[0].src);


                        if(imgH / imgW > 160 / 240){
                            $('.file .img img').css({'width':'auto', 'height':'100%'});
                        }else{
                            $('.file .img img').css({'height':'auto', 'width':'100%'});
                        }
                    });
                }

            });
        }
        /* --- IE --- */
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            $('[type="file"]').unbind('input propertychange').bind('input propertychange', function(){
                console.log(1);
                var url = this.value;

                var r = new RegExp(/\.mp4$/);
                if(r.test(this.value)){
                    window.mp4url = this.value;
                }
                img.src = url;

                $(img).on('load', function(){
                    var imgH = img.height;
                    var imgW = img.width;
                    // 图片预览
                    $('.file .img').html(img);

                    if(imgH / imgW > 160 / 240){
                        $('.file .img img').css({'width':'auto', 'height':'100%'});
                    }else{
                        $('.file .img img').css({'height':'auto', 'width':'100%'});
                    }
                });
            });
        }
        // 触发上传文件事件
        var img = new Image();
        $('.upload .file .img').unbind('click').bind('click', function(event){
            event.stopPropagation();
            $('[type="file"]').click();
        });

        // 新建
        var li_clone = $('.wrap .menu .under').clone(true);
        $(li_clone).removeClass('under');
        layer.open({
            title: ' ',
            type: 1,
            btn: ['开始上传', '取消'],
            area: ['300px', '320px'],
            content: $('.upload'),
            yes: function(index, layero) {
                var name = $('.file [type="file"]').val();
                var searchF = searchFiles($('.pic'), name);
                if ($.trim(name) != '') {
                    $(li_clone).find('.tit .stit').text(name);
                    //加载层-风格3
                    layer.load(2);
                    // 判断是否重名
                    if(!searchF.exist){
                        $(li_clone).find('.tit .stit').text(name);
                        $(li_clone).find('.tit .num').text('(' + searchF.count + ')');
                    }
                    //此处演示关闭
                    setTimeout(function() {
                        li_clone.addClass(kind);
                        layer.closeAll('loading');
                        $('.wrap .menu').append(li_clone);

                        if(kind == 'kind2'){
                            $(li_clone).find('img').hide();
                            $(li_clone).find('video').attr('src', mp4url).show();
                        }

                        // 判断是否可上传
                        var kind1 = $('.show_forth_box .kind1');
                        var kind2 = $('.show_forth_box .kind2');
                        if ($(kind1).length >= 8) {

                            $('.box .upPic').hide();
                            $('.box .ban_upPic').show();
                            $('.forbit').unbind('click').bind('click', function() {
                                layer.msg('相册最多上传8张图片和一个视频');
                            });
                        }
                        if ($(kind2).length >= 1) {

                            $('.box .upMov').hide();
                            $('.box .ban_upMov').show();
                            $('.forbit').unbind('click').bind('click', function() {
                                layer.msg('相册最多上传8张图片和一个视频');
                            });
                        }

                    	$('.upload .question-error').hide();
                        layer.close(index);
                    }, 500);
                } else {
                    // 没有上传文件则不进行操作
                }
            }
        });
    });


// 判断是否可上传
    var kind1 = $('.show_forth_box .kind1');
    var kind2 = $('.show_forth_box .kind2');
    if ($(kind1).length >= 8) {
        $('.box .upPic').hide();
        $('.box .ban_upPic').show();
        $('.forbit').unbind('click').bind('click', function() {
            layer.msg('相册最多上传8张图片和一个视频');
        });
    }
    if ($(kind2).length >= 1) {
        $('.box .upMov').hide();
        $('.box .ban_upMov').show();
        $('.forbit').unbind('click').bind('click', function() {
            layer.msg('相册最多上传8张图片和一个视频');
        });
    }

    // 删除
    var del = $('.btn .del');
    $(del).click(function() {
        var that = $(this);
        layer.open({
            title: ' ',
            type: 1,
            btn: ['确定', '取消'],
            skin: 'layui-layer-rim', //加上边框
            area: ['300px', '192px'], //宽高
            content: $('.del_fri'),
            yes: function(index, layero) {
                that.parents('li').remove();
                // 判断是否可上传
                var kind1 = $('.show_forth_box .kind1');
                var kind2 = $('.show_forth_box .kind2');

                if (that.parents('li').hasClass('kind1')) {
                    $('.box .upPic').show();
                    $('.box .ban_upPic').hide();
                }else if(that.parents('li').hasClass('kind2')){
                    $('.box .upMov').show();
                    $('.box .ban_upMov').hide();
                }
                layer.close(index);
            }
        });
    });
    // 选择框
    var select = $('.select');
    $(select).click(function() {
        if ($(this).find('input').attr('value') == 0) {
            $(this).find('i').css({ 'backgroundImage': 'url("images/first/selected_icon.png")' });
            $(this).find('input').attr('value', '1');
        } else {
            $(this).find('i').css({ 'backgroundImage': 'url("images/first/select_icon.png")' });
            $(this).find('input').attr('value', '0');
        }
    });

    // 批量删除
    var clear_more = $('.clear_more');
    var clear_cancel = $('.cancel');
    var clear_del = $('.box .clear .del');
    $(clear_more).click(function(){
        $('.select').show();
        $(this).siblings('.fr').show();
        $(this).siblings('a').css('visibility', 'hidden');
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
        $(that).parent().siblings('.clear_more').show();
        $(that).parent().siblings('a').css('visibility', 'visible');

        $('.pic').hover(function(){
            $(this).find('.btn').removeClass('hide');
        },function(){
            $(this).find('.btn').removeClass('hide');
        });
    });
    $(clear_del).click(function(){
        var that = $(this);
        var kind1 = $('.show_forth_box .kind1');
        var kind2 = $('.show_forth_box .kind2');
        var picNum = false , movNum = false;
        if(kind1.length >= 8){
            picNum = true;
        }
        if(kind2.length >= 1){
            movNum = true;
        }
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

                    $(that).parent().siblings('a').css('visibility', 'visible');
                    // 判断是否可上传
                    /*if (picNum) {
                        $('.box .upPic').replaceWith(login_c);
                    }else if(movNum){
                        $('.box .upMov').replaceWith(login_b);
                    }*/
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
            // 获取第一个选项模板
            for (var i = 0; i < 3; i++) { // 此处长度可更换
                var selEle = div_clone.find('option').eq(0).clone();
                $(selEle).html('一级相册展示');
                $(selEle).attr('value', i+1);
                div_clone.find('.first_file').append(selEle);
            }

            div_clone.find('.first_file').css('display', 'block');
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

            div_clone.find('.first_file').css('display', 'block');
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

            div_clone.find('.first_file').css('display', 'block');
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

            div_clone.find('.first_file').css('display', 'block');
            // 移除已有二级选项
            formL.find('.x'+(--count)).remove();
            // 设置默认值
            div_clone.find('.first_file').attr("value", '2');
            formL.append(div_clone);
        }
    });

    // 图片查看
    var pic = $('.show_forth_box .menu li');
    var prev = $('.scanf .prev');
    var next = $('.scanf .next');

    var viewH = $('.scanf .view');
    $(window).resize(function(){
        if (viewH.children('img').css('display') == 'none') {
            // 获取当前窗口的宽高
            var size = getSize($('.scanf .view video'));
            // 设置图片位置
            $(viewH).css({'lineHeight': size.setHeight + 'px'});
        }else{
            // 获取当前窗口的宽高
            var size = getSize($('.scanf .view img'));
            // 设置图片位置
            $(viewH).css({'lineHeight': size.setHeight + 'px'});
        }
    });
    // 获取窗口的高度后，
    // 给左右两个按键设置行高，行高值 = 窗口高度值
    // 图片的外包设置行高， 行高值 = (当前窗口宽 - 1100) / 100 *50 + 1500 + 'px'


    $(pic).find('.img').unbind('click').bind('click', function(event) {
        event.stopPropagation();
        var that = $(this).parents('li');
        var img = $(that).find('img').attr('src');
        $('.scanf .view img').attr('src', img);
        $('.scanf').show();
        $('.shadow').show();

        $('.scanf .view').unbind('click').bind('click', function() {
            $('.scanf').hide();
            $('.shadow').hide();
            that = null;
        });

        // 判断是图片还是视频
        if(that.hasClass('kind2')){
            var src = $(that).find('video').attr('src');
            $('.scanf .view img').hide();
            $('.scanf .view video').show();
            $('.scanf .view video').attr('src', src);
            // 获取当前窗口的宽高
            var size = getSize($('.scanf .view video'));
            // 设置图片位置
            $(viewH).css({'lineHeight': size.setHeight + 'px'});
        }else{
            img = $(that).find('img').attr('src');
            $('.scanf .view img').attr('src', img);
            $('.scanf .view img').show();
            $('.scanf .view video').hide();
            // 获取当前窗口的宽高
            var size = getSize($('.scanf .view img'));
            // 设置图片位置
            $(viewH).css({'lineHeight': size.setHeight + 'px'});
        }

        $(prev).unbind('click').bind('click', function(event) {
            event.stopPropagation();

            if (that == null) {} else {
                event.stopPropagation();
                if ($(that).prev().length == 0) {
                    layer.msg("已是第一张");
                } else {
                    that = $(that).prev();

                    // 判断是图片还是视频
                    if(that.hasClass('kind2')){
                        var src = $(that).find('video').attr('src');
                        $('.scanf .view img').hide();
                        $('.scanf .view video').show();
                        $('.scanf .view video').attr('src', src);
                        // 获取当前窗口的宽高
                        var size = getSize($('.scanf .view video'));
                        // 设置图片位置
                        $(viewH).css({'lineHeight': size.setHeight + 'px'});
                    }else{
                        img = $(that).find('img').attr('src');
                        $('.scanf .view img').attr('src', img);
                        $('.scanf .view img').show();
                        $('.scanf .view video').hide();
                        // 获取当前窗口的宽高
                        var size = getSize($('.scanf .view img'));
                        // 设置图片位置
                        $(viewH).css({'lineHeight': size.setHeight + 'px'});
                    }
                }
            }


        });
        $(next).unbind('click').bind('click', function(event) {

            if (that == null) {

            } else {
                event.stopPropagation();
                if ($(that).next().length == 0) {
                    layer.msg("已是最后一张");
                } else {
                    that = $(that).next();

                    // 判断是图片还是视频
                    if(that.hasClass('kind2')){
                        var src = $(that).find('video').attr('src');
                        $('.scanf .view img').hide();
                        $('.scanf .view video').show();
                        $('.scanf .view video').attr('src', src);
                        // 获取当前窗口的宽高
                        var size = getSize($('.scanf .view video'));
                        // 设置图片位置
                        $(viewH).css({'lineHeight': size.setHeight + 'px'});
                    }else{
                        img = $(that).find('img').attr('src');
                        $('.scanf .view img').attr('src', img);
                        $('.scanf .view img').show();
                        $('.scanf .view video').hide();
                        // 获取当前窗口的宽高
                        var size = getSize($('.scanf .view img'));
                        // 设置图片位置
                        $(viewH).css({'lineHeight': size.setHeight + 'px'});
                    }
                }
            }
        });
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

// 获取当前窗口的宽高 和 当前图片的宽高
var getSize = function(ele){
    // 当前窗口高
    var winHeight = $(window).height();
    // 当前窗口宽
    var winWidth = $(window).width();
    // 当前元素的高
    var picHeight = $(ele).css('height');
    // 需要设置的图片位置
    var setHeight = winHeight + parseInt(picHeight);
    return {
        'winHeight': winHeight,
        'winWidth': winWidth,
        'setHeight': setHeight - 10
    };
};



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