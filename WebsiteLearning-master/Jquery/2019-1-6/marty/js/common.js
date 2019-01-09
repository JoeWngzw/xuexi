
function getCookie(name) {
    var arr = document.cookie.split('; ')
    for(var i = 0; i < arr.length; i++) {
        var arr2 =  arr[i].split('=')
        if (arr2[0] == name) {
            return arr2[1]
        }
    }
    return ''
}

function removeCookie(name){
    addCookie(name, '123', -1);
}


$(document).ready(function () {
	var clientW = document.body.clientWidth || document.documentElement.clientWidth

	if (getCookie('token')) {
		$('.islogin').show()
		$('.btn-box').hide()

	} else {
		console.log($('.btn-box'))
		$('.btn-box').show()
		$('.islogin').hide()
	}

	$.ajax({
		url: 'http://b9088.com/member/gamecategory/?mode=tree',
		type: 'get',
		success: function (data) {
			console.log(data)
			handleGamecategory(data)
		}
	})

	function handleGamecategory (data) {
		var arr = []
		for(var i = 0; i < data.length; i++) {

			var arrItems = []
			for(var j = 0; j < data[i].provider.length;j++) {

				var oProvider = data[i].provider[j]
				var name = oProvider.code + oProvider.category_type.substring(0, 2)
				var oItem = '<div data-flag="'+oProvider.code+'" class="item fl">\
					<img src="'+data[i].provider[j].icon+'" alt="">\
					<p>'+name+'</p>\
				</div>'

				arrItems.push(oItem)
			}

			var oS = '<li class="fl">\
				<p>'+data[i].name+'</p>\
				<span class="caret"></span>\
				<div class="drop">\
					<div class="main-w menus clearfix">\
						'+arrItems.join('')+'\
					</div>\
				</div>\
			</li>'

			arr.push(oS)
		}

		$('.list').append(arr.join(''))

		var aDrops = $('.drop')
		aDrops.css('width', clientW)

		$('.list li').hover(function() {
			$(this).find('.drop').show()
		}, function() {
			$('.list li .drop').hide()
		});

		$('.list li').eq(2).find('.item').on('click', function () {

			var oDate = new Date()
			var tody = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDay()

			var oProvider = $(this).data('flag')

			window.open('/WebsiteLearning-master/Jquery/2019-1-6/marty/list.html?date=' + tody + '&provider=' + oProvider , '_self')
		})
	}

	window.onresize = function () {

		var clientW = document.body.clientWidth || document.documentElement.clientWidth

		aDrops.css('width', clientW)

	}
})