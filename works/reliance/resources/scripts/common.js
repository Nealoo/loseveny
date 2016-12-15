/*!
 * FileName: common.js
 * Date: 2015-02-04
 * Author: lo7y
 * kioo.cn
 *
 * ES项目前端框架使用的通用js文件
 */

/**
 * 新建cookie或者更改cookie的值
 * 
 * @param {String} c_name  cookie名字
 * @param {String} value   cookie值
 * @param {int} expiredays cookie有效期（天）
 */
function setCookie(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

/**
 * 根据cookie的名字获取cookie的值
 * 
 * @param {String} c_name  cookie的名字
 */
function getCookie(c_name){
	if (document.cookie.length>0){
	  c_tar=document.cookie.match(new RegExp('(^|;)\\s*'+c_name + '=[^;]*(;|$)','g'));
	  if (c_tar){
	  	c_tar = String(c_tar).split('=')[1];
	  	c_tar = c_tar.replace(/;/,'');
	    return unescape(c_tar);
	    }
	  }
	return ""
}

/**
 * 根据cookie删除对应的cookie
 * 
 * @param {String} name  cookie的名字
 */
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=; expires=" + exp.toGMTString();
}

/**
 * 写入cookie，记录此菜单又被点击了一次。
 * 
 * @param {String} mid  菜单ID
 */
function RecordBus(mid){
	var num = getCookie("m"+mid)==''?0:parseInt(getCookie("m"+mid));
	setCookie("m"+mid,num+1,300);
}

// 得到全部cookie的名称，以便查询
function getCookiesName(){
	var names = document.cookie.split(';');
	var mName = [];
	for(var i = 0; i < names.length; i++){
		// 得到m开头的mid
		var stra = names[i].match(/m.*=/);
		if(stra){
			var str = stra[0].replace(/=/,'');
			mName.push( str );
		}
	}
	
	return mName;
}
