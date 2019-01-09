	$(function(){
		$.ajax({
			url:'http://b9088.com/member/gamecategory/?mode=tree',
			type:'get',
			success:function(data){
				console.log(data);
				gameList(data);
			},
			error:function(e){
				console.log(e);
			}

		})

		function gameList(data){
			var date = new Date();
			date = date.getFullYear() + '-' + (date.getMonth()+1) + '-' +date.getDate();
		var gameNav = []; //游戏导航
		for (var i = 0; i < data.length; i++) {
			var gameList = []; //游戏集合
			for (var j = 0; j < data[i].provider.length; j++) {
				var name = '';
				if(data[i].id==4){
					if(data[i].provider[j].id == 8){
						name = '彩票';
					}else {
						name = data[i].provider[j].category_type;
					}
					
				}else {
					name = data[i].provider[j].category_type.substring(0, 2);
				}
				
				var gamelist = '<div class="game">\
				<a href="/Venice/game.html?code='+data[i].provider[j].code+'&time='+date+'">\
				<img src="'+data[i].provider[j].icon+'">\
				<p>'+data[i].provider[j].name+''+name+'</p>\
				</a>\
				</div>';
				gameList.push(gamelist);
			}
			var str = '<li>\
			<a href="javascript:;">'+data[i].name+'</a>\
			<p class="gameP"></p>\
			<div class="gameDiv">\
			<div class="gameList">\
			'+gameList.join('')+'\
			</div>\
			</div>\
			</li>'
			gameNav.push(str);
		}
		$('.nav-fl').append(gameNav);

		$('.nav-fl li').hover(function(){
			$(this).find('.gameDiv').show();
		},function(){
			$(this).find('.gameDiv').hide();
		})
	}
	var index = 1;
	function indexLbt(){
		index++;
		if(index>6){
			index=1;
		}
		$('.lbt').css('background','url("/Venice/image/'+index+'.jpg") center 0px no-repeat')
	}

	$('.prev').click(function(){
		index--;
		if(index<1){
			index=6;
		}
		$('.lbt').css('background','url("/Venice/image/'+index+'.jpg") center 0px no-repeat')
	})


	$('.next').click(function(){
		indexLbt();
	})

	var dsq = setInterval(indexLbt, 3000);

	$('.banner-box').hover(function(){
		$('.container').show();
		clearInterval(dsq);
	},function(){
		$('.container').hide();
		clearInterval(dsq);
		dsq = setInterval(indexLbt, 3000);
	})

	$('.introsUl a').hover(function(){
		$(this).css('color','#e9d77b');
		$(this).find('span').css('color','#e9d77b');
		if($(this).index('a') == 21){
			$('.introsUl i').eq(0).css('background-position','0 -272px');
		}
		if($(this).index('a') == 22){
			$('.introsUl i').eq(1).css('background-position','-58px -272px');
		}
		if($(this).index('a') == 23){
			$('.introsUl i').eq(2).css('background-position','-116px -272px');
		}
		if($(this).index('a') == 24){
			$('.introsUl i').eq(3).css('background-position','-174px -272px');
		}
	},function(){
		$(this).css('color','#ccc');	
		$(this).find('span').css('color','#999');
		if($(this).index('a') == 21){
			$('.introsUl i').eq(0).css('background-position','0 -214px');
		}
		if($(this).index('a') == 22){
			$('.introsUl i').eq(1).css('background-position','-58px -214px');
		}
		if($(this).index('a') == 23){
			$('.introsUl i').eq(2).css('background-position','-116px -214px');
		}
		if($(this).index('a') == 24){
			$('.introsUl i').eq(3).css('background-position','-174px -214px');
		}
	})


	$('.introsUl i').hover(function(){
		if($(this).index('i') == 0){
			$(this).css('background-position','0 -272px');
		}
		if($(this).index('i') == 1){
			$(this).css('background-position','-58px -272px');
		} 
		if($(this).index('i') == 2){
			$(this).css('background-position','-116px -272px');
		} 
		if($(this).index('i') == 3){
			$(this).css('background-position','-174px -272px');
		} 
	},function(){
		if($(this).index('i') == 0){
			$(this).css('background-position','0 -214px');
		} 
		if($(this).index('i') == 1){
			$(this).css('background-position','-58px -214px');
		} 
		if($(this).index('i') == 2){
			$(this).css('background-position','-116px -214px');
		} 
		if($(this).index('i') == 3){
			$(this).css('background-position','-174px -214px');
		} 
	})

})

