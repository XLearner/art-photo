
;(function($){
	jQuery.fn.extend({
		//检测手机
		"check_phone":function(){
            var r=new RegExp(/^(((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8})|(170[059]\d{7}))$/);
            var value=$(this).val();
            var result=r.test(value);
            if(result==true){
                return result;
            }else if(result==false){
               return result;
            }
		},
		//检测邮箱
		"check_email":function(){
            var r=new RegExp(/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/);
            var value=$(this).val();
            var result=r.test(value);
            if(result==true){
                return result;
            }else if(result==false){
               return result;
            }
		},
		//检测身份证
		"check_idcard":function(){
            var r=new RegExp(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/);
            var value=$(this).val();
            var result=r.test(value);
            if(result==true){
                return result;
            }else if(result==false){
                return result;
            }
		},
		//检测姓名
		"check_name":function(){
            var r=new RegExp(/^([\u4e00-\u9fa5]){2,7}$/);
            var value=$(this).val();
            var result=r.test(value);
            if(result==true){
                return result;
            }else if(result==false){
                return result;
            }
		},
		//检测用户名
		"check_username":function(){
            var r=new RegExp(/^[a-z0-9_-]{3,16}$/);
            var value=$(this).val();
            var result=r.test(value);
            if(result==true){
                return result;
            }else if(result==false){
               return result;
            }
		},
		//检测url
		"check_url":function(){
            var r=new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
            var value=$(this).val();
            var result=r.test(value);
            if(result==true){
                return result;
            }else if(result==false){
                return result;
            }
		},
		//检测密码(以字母开头，长度在6~18之间，只能包含字符、数字和下划线)
        "check_password":function(){
            var r=new RegExp(/^[a-zA-Z]\w{5,17}$/);
            var value=$(this).val();
            var result=r.test(value);
            if(result==true){
                return result;
            }else if(result==false){
                return result;
            }
        },
		// 检测密码一致
		"check_password_alike":function(className){
            var thisvalue=$(this).val();
            var formervalue=$(className).val();
            if(thisvalue==formervalue){
                return true;
            }else if(thisvalue!==formervalue){
                return false;
            }
		},
		//检测ip地址
		"check_ip":function(){
            var r=new RegExp(/^[a-z0-9_-]{6,18}$/);
            var value=$(this).val();
            var result=r.test(value);
            if(result==true){
               return result;
            }else if(result==false){
                return result;
            }
		},
		// ***********************
		// ***********************
		// 验证码按钮事件
		// 默认为60秒后重新发送
		// $(".verification-code").verify();
		// ***********************
		// ***********************
		"verify":function(wait_s){
			 // 验证码按钮事件
	        var wait=wait_s;
            var ojc=this;

	        $(this).click(time_if);
            function time_if(){
                if(!($(ojc).hasClass("on"))){
                    time();
                }
            }
	        function time(){

	            if(wait<wait_s){

	                clearInterval(times);
	            }
	            if(wait===0){
                    $(ojc).removeClass("on");
	                $(ojc).text("重新发送");
	                $(ojc).click(time);
	                wait=wait_s;

	            }else{
	           
                    $(ojc).addClass("on");
	                $(ojc).text("重新发送("+wait+"s)");
	                wait--;

	                times=setInterval(time,1000);
	            }
	        };
		},
	});
})(jQuery);
