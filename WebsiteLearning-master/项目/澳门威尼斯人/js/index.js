

$(function(){


$.ajax({
	url:'http://b9088.com/member/gamecategory/?mode=tree',
	type:'get',
	success:function(data){
		console.log(data);
		gameNavList(data);
	},
	error:function(e){
		console.log(e);
	}
})

function gameNavList(data){

	var nav = [];
	for (var i = 0; i < data.length; i++) {
		var gamelist = [];
		for (var j = 0; j < data[i].provider.length; j++) {
			var date = new Date();
			date = date.getFullYear() +'-'+(date.getMonth()+1)+'-'+ date.getDate();
			if( data[i].id==4){
				var name = data[i].provider[j].category_type.substr(0,3);
			}else{
				var name = data[i].provider[j].category_type.substr(0,2);
			}
			var game = '<div>\
							<a href="/WebsiteLearning/项目/澳门威尼斯人/list.html?time='+date+'&code='+data[i].provider[j].code+'">\
							<img src="'+data[i].provider[j].icon+'">\
							<p>'+data[i].provider[j].name+''+name+'</p>\
							</a>\
						</div>';
			gamelist.push(game);

		}

		var str = '<li>\
					<a class="arrow-down" href="javascript:;">'+data[i].name+'</a>\
					<p class="triangle"></p>\
					<div class="categoryNav">\
						<div class="categoryList">\
						'+gamelist.join('')+'\
					</div>\
					</div>\
				</li>';
		nav.push(str);


	}

	$('.game-nav').append(nav.join(''));

		$('.game-nav li').hover(function(){
			$(this).find('.categoryList').css('display','block');
		},function(){
			$(this).find('.categoryList').css('display','none');
		});


}



})