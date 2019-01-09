
	// https://b9188.com/member/gametype/?provider=MG&category=2&platform=0
	// https://b9188.com/member/game/?platform=0&opt_expand=1&offset=0&limit=20&category=2&gametype=103&title=MG%20%E7%94%B5%E5%AD%90%E6%B8%B8%E8%89%BA

	$(function(){

		var local = window.location.search.replace('?','');
		var codelist =  local.split('&'); //根据符号分割，字符串转数组
		var obj = {};
		for (var i = 0; i < codelist.length; i++) { //循环拼装
				// var aa = codelist[]
				var aa = codelist[i].split('=');
				obj[aa[0]] = aa[1]
		}

	

		var gameFl = $('.game-fl li');


		var gameIndex = obj.code || 'PT';
		//循环添加选中样式
		for (var i = 0; i < gameFl.length; i++) {
			
			if(gameFl.eq(i).data('falg') == gameIndex){
				gameFl.eq(i).addClass('active');
			}
		}

		// var gameIndex = $('.game-fl li').data('falg');

		var id = '';	//游戏分类的id
		var none = ''; //获取游戏text

		var count = 0;//总记录数
		var pageSize = 16; //一页显示几个
		var pageIndex = 1;//当前页数
		var pageCount = 1;//总页数
		var offset = 0;//开始从第几个开始显示
		var limit = 16;//每次拿几个

		//PT电子游戏------移入移出
		gameFl.hover(function() {
			gameFl.removeClass('active');
			for (var i = 0; i < gameFl.length; i++) {
				if(gameFl.eq(i).data('falg') == gameIndex){
					gameFl.eq(i).addClass('active');
				}
			}
			if($(this).data('falg') != null){
				$(this).addClass('active');
			}

		}, function() {
			gameFl.removeClass('active');
			for (var i = 0; i < gameFl.length; i++) {
				if(gameFl.eq(i).data('falg') == gameIndex){
					gameFl.eq(i).addClass('active');
				}
			}
		});

		//PT电子游戏------点击
		gameFl.click(function(event) {
			if($(this).data('falg') != null){
				gameFl.removeClass('active');
				$(this).addClass('active');
				gameIndex = $(this).data('falg');
				gameType();
				pageIndex=1;
				page(pageIndex);

			}
		});

		gameType(); //调用方法
		function gameType(){
			$.ajax({
				url:"https://b9188.com/member/gametype",
				data:{
				//?provider=MG&category=2&platform=1
				provider:gameIndex,
				category:2,
				platform:1
			},
			type:"get",
			success:function(data){
				console.log(data);
				gameTypeSuccess(data);
			},
			error:function(e){
				console.log(e);
			}

		})	
		}


		function gameTypeSuccess(data){
			var str = '';
			for (var i = 0; i < data.length; i++) {
				if(i==0){
					str += '<li class="active" data-id="'+data[i].id+'">'+data[i].name+'</li>';
					id = data[i].id;
					gameList();

				}else{
					str += '<li data-id="'+data[i].id+'">'+data[i].name+'</li>';
				}
			}
			$('.game-ty').html(str);

			var gameTp = $('.game-ty li');
						//老虎角子机------移入移出
						gameTp.hover(function() {
							gameTp.removeClass('active');
							for (var i = 0; i < gameTp.length; i++) {
								if(gameTp.eq(i).data('id') == id){
									gameTp.eq(i).addClass('active');
								}
							}
							$(this).addClass('active');
						}, function() {
							gameTp.removeClass('active');
							for (var i = 0; i < gameTp.length; i++) {
								if(gameTp.eq(i).data('id') == id){
									gameTp.eq(i).addClass('active');
								}
							}
						});
						console.log(id);

						//PT电子游戏------点击
						gameTp.click(function(event) {
							gameTp.removeClass('active');
							$(this).addClass('active');
							id = $(this).data('id');
							none = $(this).text();
							pageIndex = 1;
							page(pageIndex);
							gameList();

						});
					}



					function gameList(){

						console.log('进来了开始'+offset);
						console.log('进来了结束'+limit);
						$.ajax({
							url:'https://b9188.com/member/game/?platform=1&opt_expand=1&category=2',
							data:{
								gametype:id,
								offset:offset,
								limit:limit,
								title:gameIndex,
							},
							type:"get",
							success:function(data){
								gameListSuccess(data);
								console.log(data);
							},
							error:function(e){
								console.log(e);
							}

						})

					}

					function gameListSuccess(data){
						count = data.count;
						var str = ''
						for (var i = 0; i < data.results.length; i++) {
							str += '<li>\
							<a href="javascript:;">\
							<img src="'+data.results[i].icon+'">\
							<p>'+data.results[i].name+'</p>\
							</a>\
							</li>';
						}


						$('.game-list-ul').html(str);

						$('.game-list-ul li').hover(function(){
							$(this).addClass('active');
						},function(){
							$(this).removeClass('active');
						})
						page(pageIndex);

						console.log(id);

						console.log('当前的总页数：'+pageCount);
						console.log('当前的页数：'+pageIndex);
						console.log('一页显示'+pageSize);
						console.log('从第'+offset+'个开始：');
						console.log('从第'+limit+'个结束：');

						if(data.results.length == 0){
							$('#no-game').text('抱歉, 暂无【'+none+'】类型游戏, 请切换游戏类型');
							$('.alert').css('display','block');
							$('.page-ul').css('display','none');
						}else{
							$('.alert').css('display','none');
							$('.page-ul').css('display','block');

						}
						if(pageCount == 1){
							$('.page-ul').hide();
						}

					}


		//---------分页


		$('.page-ul li').hover(function(){
			$(this).addClass('active');
		},function(){
			$(this).removeClass('active');
		})

		//点击上一页
		$('.page-ul li').eq(1).click(function(){
			pageIndex--;
			if(pageIndex<1){
				pageIndex = 1;
				return;
			}
			page(pageIndex);
			gameList();
		})

		//点击下一页
		$('.page-ul li').eq(3).click(function(){
			pageIndex++;
			if(pageIndex >pageCount){
				pageIndex=pageCount;
				return;
			}
			page(pageIndex);
			console.log(id);
			gameList();
		})

		//首页
		$('.page-ul li').eq(0).click(function(){
			if(pageIndex == 1){
				return;
			}
			pageIndex = 1;
			page(pageIndex);
			gameList();
		})

		//尾页
		$('.page-ul li').eq(4).click(function(){
			if(pageIndex == pageCount){
				return;
			}
			pageIndex = pageCount;
			page(pageIndex);
			gameList();
		})

		//计算分页
		function page(pageIndex){
			pageCount = Math.ceil(count/pageSize); //向上取整 总页数
			offset = (pageIndex - 1) * pageSize; //从第几个开始
			$('.page-ul li').eq(2).text('当前:'+pageIndex+'');
			$('.page-ul li').eq(5).text('共:'+pageCount+'页');	

		}
	})