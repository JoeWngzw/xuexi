function json2url (json) {
	var str = ''
	var arr = Object.keys(json)
	var n = 0
	for(var key in json) {
		n++
		str = str + key
		str  = str + '='
		str += json[key]
		if (n != arr.length) {
			str += '&'
		}
	}

	alert(str)
	return str
}


function ajax(json) {

    var json = json


    json.contentType = json.contentType || 'application/x-www-form-urlencoded'
    json.data = json.data || {}
	var type = json.type || 'GET'

	
	if (!json.url) { return }
	// 1. 准备一个ajax对象
	if (window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest()
	} else {
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}


	// 2. 建立连接 和 发送请求



	if (type.toLowerCase() == 'get') {
		oAjax.open('get', json.url + '?' + json2url(json.data), true)
		oAjax.setRequestHeader('Content-Type', json.contentType);
		oAjax.send()
	} else {
		oAjax.open('post', json.url, true)
		oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		oAjax.send(json2url(json.data))
	}


	oAjax.onreadystatechange = function () {
		if(oAjax.readyState==4){
		    if((oAjax.status>=200 && oAjax.status<300) || oAjax.status==304){
		        json.success && json.success(oAjax.responseText);

		    }else{
		        json.error && json.error(oAjax.status);

		    }
		}
	}
}
