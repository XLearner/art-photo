$(document).ready(function(){
	// 设置所有input框取消历史记录
	$('input').attr('autocomplete', 'off');

	/* ------------ 个人信息 ----------------- */
	



});


// file 为已查找到的jq li对象
// file: 定位需要查找的范围
// cls: 需要获取其内容的元素类
// name: 判断是否包含的内容
// 返回true: 没有找到
// 	   false: 找到一个以上
var searchFiles = function(file, cls, name){
    var list = [];
    // 记录重复命名次数
    var count = 0;
    file.each(function(key, value){
        list.push($(value).find('.' + cls).text());
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