
$(function(){

	// var local = window.location.search.substr(1);
	var local = window.location.search.replace('?',''); //去掉?符号
	local = local.split('&')
	var obj ={};
	for (var i = 0; i < local.length; i++) {
		var aa = local[i].split('=');
		obj[aa[0]] = aa[1];
	}
	var gameCompany = $('.game-company li');

	var lx = obj.code || 'PT';  //拿到传过来参数 
	//循环添加样式
	for (var i = 0; i < gameCompany.length; i++) {
		if(gameCompany.eq(i).data('flag') == lx){
				gameCompany.eq(i).addClass('active')
		}
	}
	var id = '';
	var text = '';

		var offset = 0;//初始化从0开始
		var pageIndex = 1;//当前第几页
		var limit = 16;//每次拿16条数据
		var title = lx; //游戏标题
		var count = 0; //总数据
		var pageCount = 0;//一共几页
		var gameName = '';
		console.log(lx);
		gameCompany.hover(function() {
			gameCompany.removeClass('active');
			for (var i =0; i<gameCompany.length; i++) {
				if(gameCompany.eq(i).data('flag') == lx){
					gameCompany.eq(i).addClass('active')
				}
			}
			$(this).addClass('active');
		}, function() {
			gameCompany.removeClass('active');
			for (var i =0; i<gameCompany.length; i++) {
				if(gameCompany.eq(i).data('flag') == lx){
					gameCompany.eq(i).addClass('active')
				}
			}
		});
		gameCompany.click(function(event) {
			gameCompany.removeClass('active');
			$(this).addClass('active');
			lx = $(this).data('flag');
			gameType();
			pageIndex = 1;
			page();
		});

		
		function gameType(){
			$.ajax({
				url:"https://b9188.com/member/gametype",
				type:"get",
				data:{
					provider:lx,
					categor:2,
					platform:1,
				},
				success:function(data){
					console.log(data);
					var str = "";
					for (var i = 0; i < data.length; i++) {
						if(data[i].id!=3){
							if(i == 1){
								str +='<li  class="fl" data-id='+data[i].id+'><a class="active" href="javascript:;">'+data[i].name+'</a></li>';
								id = data[i].id;
								game();
							}else{
								str +='<li  class="fl" data-id='+data[i].id+'><a href="javascript:;">'+data[i].name+'</a></li>';
							}
						}

					}

					$('.game-type ul').html(str);

					var gameType = $('.game-type li');
					gameType.hover(function(){
						gameType.removeClass('active');
						for (var i = 0; i < gameType.length; i++) {
							if(gameType.eq(i).data('id') == id){
								gameType.eq(i).find('a').addClass('active');
							}
							$(this).find('a').addClass('active');
						}
					},function(){
						for (var i = 0; i < gameType.length; i++) {
							gameType.eq(i).find('a').removeClass('active');
							if(gameType.eq(i).data('id') == id){
								gameType.eq(i).find('a').addClass('active');
							}
						}
					})

					gameType.click(function(event) {
						gameType.removeClass('active');
						$(this).addClass('active');
						id = $(this).data('id');
						text = $(this).text();
						game();
						pageIndex = 1;
						page();
					});

				},
				error:function(e){
					console.log("error")
					console.log(e)
				}
			})
		}
		gameType();



		function game(){
			console.log('当前游戏ID：'+id);
			console.log('当前页：'+pageIndex);

			$.ajax({
				url:"https://b9188.com/member/game/?platform=1&opt_expand=1&category=2",
				data:{
					gametype:id,
					offset:offset,
					limit:limit,
					title:title,
					name_q:gameName
				},
				type:"get",
				success:function(data){
					console.log("success");
					console.log(data)
					count = data.count; //总条数
					page();
					var str = "";
					for (var i = 0; i < data.results.length; i++) {
						str+='<li class="fl"><a href="javascript:;"></a> <p>'+data.results[i].name+'</p></li>'
					}
					$('.game-img-list ul').html(str);
					for (var i = 0; i < data.results.length; i++) {
						$('.game-img-list li').eq(i).css("background-image",'url('+data.results[i].icon+')');						
					}
					if(data.results.length==0){
						$('#info').html('抱歉, 暂无<span>【'+text+'】</span>类型游戏, 请切换游戏类型');
						$('#info').css('display','block')
						$('.pageDiv').hide();
					}else{
						$('#info').css('display','none')
						$('.pageDiv').show();
					}
					$('.page li').eq(2).text('当前:'+pageIndex+'');
					$('.page li').eq(5).text('共'+pageCount+'页');

					if(pageCount==1){
						$('.pageDiv').hide();
					}

					console.log('总条书:'+count)
				},
				error:function(e){
					console.log("error");
					console.log(e);
				},
			})
		}
		//下一页
		$('.page li').eq(3).click(function(){
			pageIndex++;
			if(pageIndex > pageCount){
				pageIndex=pageCount;
				return;
			}
			page();
			game();
		})
		//上一页
		$('.page li').eq(1).click(function(){
			pageIndex--;
			if(pageIndex < 1){
				pageIndex = 1;
				return;
			}
			page();
			game();
		})
		//首页
		$('.page li').eq(0).click(function(){
			if(pageIndex == 1){return;}
			pageIndex = 1;
			page();
			game();
		})

		//尾页
		$('.page li').eq(4).click(function(){
			if(pageIndex == pageCount){return;}
			pageIndex = pageCount;
			page();
			game();
		})
		//分页方法
		function page(){
			offset = (pageIndex - 1) * limit; //计算从第一个开始拿数据
			pageCount = Math.ceil(count / limit);//一共几页-- 向上取整，有余数+1页
		}


		//点击搜索
		$('.game-bt').click(function(){
			gameName = $('.game-name').val();
			console.log(gameName);
			game();
		})

		//点击回车键
		document.onkeydown = function (e) { // 回车提交表单
		// 兼容FF和IE和Opera
		    var theEvent = window.event || e;
		    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
		    if (code == 13) {
				gameName = $('.game-name').val();
				console.log(gameName);
				game();
		    }
		}
	})


