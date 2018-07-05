// JavaScript Document

function Index()
{
	this.init();
}

Index.prototype={
	remoteUrls:{
		//收礼
		receiveUrl:'http://api.shihou.tv/api/gift/receive_rank',
		//送礼
		sendUrl:'http://api.shihou.tv/api/gift/send_rank',
		//总收礼榜
		receiveTotalUrl:'http://api.shihou.tv/api/gift/common_receive_rank',
		//总送礼榜
		sendTotalUrl:'http://api.shihou.tv/api/gift/common_send_rank',
	},
	remoteData:{
		yxbReceiveData : [],
		yxbSendData    : [],
		hdbReceiveData : [],
		hdbSendData    : [],
		gxfcReceiveData : [],
		gxfcSendData    : [],
		yshbReceiveData : [],
		yshbSendData    : [],
		jxryReceiveData : [],
		djdlSendData    : []
		 
	},
	init:function()
	{
		var _this = this;
		var util  = new Util();
		//_this.autoScroll($(".Carousel"))
		_this.loadUserInfo(util);//用户加载
		_this.tab();
		_this.initData(util);
		_this.lovePage(util);
		_this.choujiang(util);//抽奖
		_this.loadRecord(util);//中奖纪录
	},
	initData:function(util)
	{
		var _this = this;
		var yxbReceiveUrl = _this.remoteUrls.receiveUrl+"?gift_id=1169&start_date=2018-03-02&end_date=2018-03-05"; //元宵收入榜---收礼URL 12-15
		var yxbfSendUrl   = _this.remoteUrls.sendUrl+"?gift_id=1169&start_date=2018-03-02&end_date=2018-03-05"    //元宵赠送榜---送礼URL 12-15
		var hdbReceiveUrl = _this.remoteUrls.receiveUrl+"?gift_id=1170&start_date=2018-03-02&end_date=2018-03-05" //花灯收入榜---收礼URL 12-15
		var hdbSendUrl    = _this.remoteUrls.sendUrl+"?gift_id=1170&start_date=2018-03-02&end_date=2018-03-05"    //花灯贡献榜---送礼URL 12-15

		//收礼-元宵收入榜
		util.requestRemoteDataGetJson(yxbReceiveUrl, {}, function(result)
		{
			if(util.parseResult(result, 'error') == 0)
			{
				_this.remoteData.yxbReceiveData = util.parseResult(result, 'data', 'list');
			}
		}, false);
		
		//送礼-元宵赠送榜
		util.requestRemoteDataGetJson(yxbfSendUrl, {}, function(result)
		{
			if(util.parseResult(result, 'error') == 0)
			{
				_this.remoteData.yxbSendData = util.parseResult(result, 'data', 'list');
			}
		}, false);
		
		//收礼-花灯收入榜
		util.requestRemoteDataGetJson(hdbReceiveUrl, {}, function(result)
		{
			if(util.parseResult(result, 'error') == 0)
			{
				_this.remoteData.hdbReceiveData = util.parseResult(result, 'data', 'list');
			}
		}, false);
		
		//送礼-花灯贡献榜
		util.requestRemoteDataGetJson(hdbSendUrl, {}, function(result)
		{
			if(util.parseResult(result, 'error') == 0)
			{
				_this.remoteData.hdbSendData = util.parseResult(result, 'data', 'list');
			}
		}, false);		
	},
	//用户加载
	loadUserInfo:function(util)
	{
		var _this = this;
		var util = util;
		var url =  window.location.pathname;
		
		util.getUserId(function(data)
		{
			util.setCookie("ndsd_userId",data);
			uid = data;
			if(uid != '' || uid != null || uid != 0)
			{
				_this.loadFreeTimes(util);
				_this.lovePage(util);
			}
		})
		
	},

	//加载免费次数
	loadFreeTimes:function(util)
	{
		var linkSchemeId = "ada1f02087e54a09a20c3678f1c2a6ea";
		var uid = util.getCookie("ndsd_userId");//通过key获得值--->通过解析token获得uid
		//var uid = 244269;

		var freeTimesUrl = util.lotteryBaseUrl+"api/getFreeTimes?schemeId="+linkSchemeId+"&uid="+uid+"&platform=shihou";
		var freeTimesCount = 0;
	  	util.requestRemoteDataJson(freeTimesUrl,{},function(result)
		{
			
	  		util.logResult(result);
	  		if(util.parseResult(result,'errorCode')==0)
			{
	  			freeTimesCount = util.parseResult(result,'result');//得到免费次数
		        $('.cjText em').html(freeTimesCount);
	  		}

	  	});
	},
	choujiang:function(util)
	{
		var _this = this;
		var istrue = false;
		var $btn = $('.playbtn');
		var playnum = 1; //初始次数，由后台传入
		//$('.cjText em').html(playnum);
		var lotReult=[
			{"b36fc37120fa41be8f1d745f67390035":1},
			{"fdb9116ae51b4a0fa6123f95f53f3afa":2},
			{"e33d64d06f67412eac8c64a9a8fc3861":3},
			{"b3ae5e4634644d6cb3ac9ab0b3c56e2e":4},
			{"08603a7b3e6b44a29fe9cace7799832e":5},
			{"4519e4ac31bf4a7aaab46cdfafcd0839":6},
			{"e8d86c9c8a354553a40ba67942f11fc8":7},
			{"f5a105f9566444548f517b40d8204466":8}
		];

		$(".cjText").on(util.clickTouch(),function()
		{
			var time = 3;
			var uid = util.getCookie("ndsd_userId");		
			if(istrue)
			{
				return false;
			}
			istrue=true;
			playnum = $('.cjText em').html();
			//判断登录-未登录
			if(uid == '' || uid == null || uid == 0)
			{
				window.location.href = 'shihoutv://route?jump_type=120';
				istrue = false;
				return;
			}
			else
			{
				//抽奖次数-没有次数
				if(playnum <= 0)
				{
					//没有抽奖次数弹框
					$(".number").fadeIn()
					setTimeout('$(".number").hide()', time*1000);
					$('.cjText em').html(0);
					istrue = false;
				}
				else
				{
					playnum = playnum - 1; //剩余抽奖次数
					if(playnum <= 0)
					{
						playnum = 0;
					}
					
					$('.cjText em').html(playnum);
					//正式抽奖
					lotteryFn();
				}
			}
		});

		//抽奖结果
		var lotteryFn = function()
		{
			var lotteryUrl   = util.lotteryBaseUrl+"/wheel/run";
			var lotteryToken = util.getCookie("token1");
			    //lotteryToken='2pLpiMeOLXIm4TmBbeuhY8FAlk4nGJWDZE5KNXGttN5sMnG0kd5SFJ'
			var lotteryData  = {"number":1, "token":lotteryToken, "platform":"shihou","linkId":"ada1f02087e54a09a20c3678f1c2a6ea"};
			util.requestRemoteDataJson(lotteryUrl,lotteryData,function(lotteryResult)
			{
				var data = 0;
				for(var i = 0; i<lotReult.length; i++)
				{
					for(var a in lotReult[i])
					{
						if(a==lotteryResult["result"][0]["prize"]["detailId"])
						{
							data = lotReult[i][a];
						}
					}
				}
				//var data = [1, 2, 3, 4, 5, 6,7,8];
				//data为随机出来的结果，根据概率后的结果
				//data = data[Math.floor(Math.random() * data.length)];
				var angle = data*45 + 360*1-25 ;//40=360/9;分了九格，360*2转了2圈
				switch(data)
				{
					case 1:
						rotateFunc(1,angle, 'jp1');
						break;
					case 2:
						rotateFunc(2,angle, 'jp2');
						break;
					case 3:
						rotateFunc(3,angle, 'jp3');
						break;
					case 4:
						rotateFunc(4,angle,  'jp4');
						break;
					case 5:
						rotateFunc(5,angle,  'jp5');
						break;
					case 6:
						rotateFunc(6,angle,  'jp6');
						break;
					case 7:
						rotateFunc(7,angle,  'jp7');
						break;
					case 8:
						rotateFunc(8,angle,  'jp8');
						break;
				}
			},false);
		}

		var rotateFunc = function(awards, angle, text)
		{
			istrue = true;
			$btn.stopRotate();
			$btn.rotate({
				angle: 0,
				duration: 6000, //旋转时间
				animateTo: angle + 360, //让它根据得出来的结果加上1440度旋转
				callback: function()
				{
					istrue = false;
					if(awards == 2||awards == 4)//勋章奖励
					 {
					  	$(".zjTitle").html('<img src="http://resource.youxiduo.com/special/shihou/promoter/yxjhd/static/img/'+text+'.jpg" />');
					    $(".xz,.vmask").fadeIn(200);  
					 }
					 else
					 {
					  	$(".zjTitle").html('<img src="http://resource.youxiduo.com/special/shihou/promoter/yxjhd/static/img/'+text+'.jpg" />');
					    $(".zj,.vmask").fadeIn(200);
					}
				}
			});
		};
	},
	//加载中奖记录
	loadRecord:function(util)
	{
		var _this = this;
		var url  = util.lotteryBaseUrl+ "prize/list";
		// var data = '{"pageNow":1,"pageSize":50,"schemeId":"6a2d7f21f5f8491fb131c72e6d6759bf"}';//测试服务
		var data = '{"pageNow":1,"pageSize":50,"schemeId":"ada1f02087e54a09a20c3678f1c2a6ea"}';//正式服务服务
		util.requestRemoteDataJsonPost(url,data,function(result)
		{
			
			if(util.parseResult(result, 'errorCode') == 0)
			{
				var resultData = util.parseResult(result,'result');
				for(var i = 0;i < resultData.length; i++)
				{
					var user = resultData[i];
					//用户名
					var userName= user['userName'];
					//奖品名称
					var prizeName = user['prizeName'];
					
					var pageSize = user['pageSize'];
					var html ='<li><a><span>'+userName+'</span><em>抽到</em><p>'+prizeName+'</p></a></li>';
					if(prizeName != '再接再厉')
					{
						$('.bd ul').append(html);
					}
				}
				_this.autoScroll($(".Carousel"));
			}
		});
	},	
	//弹窗
	tab:function(){
		//排行版规则
		$(".phbgz").on("click",function()
		{
			$(".phbRule,.vmask").fadeIn();

		});
		//大转盘规则
		$(".reward").on("click",function()
		{
			$(".dzprule,.vmask").fadeIn();

		});
		//关闭
		$(".close").on("click",function()
		{
			$(".phbRule,.dzprule,.vmask,.zjtc").fadeOut(200);

		});
	},
	autoScroll:function (obj)
	{
		var iStage  = obj.find(".bd"),
			aUl   = iStage.find("ul"),
			aList  = aUl.find("li"),
			aListHeight = aList.height();

		if((aListHeight)*aList.length>iStage.height())//如果内容的宽度小于舞台的宽度，不复制元素进行滚动
		{ 
			aUl.append(aUl.children().clone());
			var aList=aUl.find("li");
			aUl.height((aListHeight)*aList.length);
			var iNum=0;
			var timer=null;
			function moving()
			{
				aUl.stop().animate({"marginTop":-(aListHeight)*iNum},1000);
			}
			
			timer=setInterval(function()
			{
				if(iNum>=aList.length/2)
				{
					iNum=0;
					aUl.css({"marginTop":"0px"});
				}
				iNum++;
				moving();
			},2000);
		}
	},
	lovePage:function(util)
	{
		var _this = this;
		//元宵节榜
		var userId = util.getCookie("ndsd_userId");

		//var userId = 244269;
		if(userId == '' || userId == null || userId == 0){
			$(".Nenroll").show();
			$(".enroll").hide();
		} else {
			$(".enroll").show();
			$(".Nenroll").hide();
		}
		_this.loadGiftRank(util,userId,_this.remoteData.yxbReceiveData,_this.remoteData.yxbSendData,$("#loginLoveQybf"),$("#phbQybf"),10);
		//花灯榜 测试：狮牙数/5000 正式：狮牙数/3344
		_this.loadGiftRank(util,userId,_this.remoteData.hdbReceiveData,_this.remoteData.hdbSendData,$("#loginLoveQgqc"),$("#phbQgqc"),10);
	},
	//收送礼排行榜
	loadGiftRank: function(util,userId,receiveData,sendData,pmLoginObj,rankObj,giftNum)
	{
		/*
			参数说明
			util        公用方法
			userId      用户id
			receiveUrl  收礼URL
			sendUrl     送礼URL
			pmLoginObj  登录后收送礼jquery对象
			rankObj     排行榜列表ul的ID
		*/
		var _this       = this;
		var giftRankHtml= "";
		
		//渲染排行榜html
		for(var i=0; i<receiveData.length && i<sendData.length; i++)
		{
			if(i<10)
			{
				giftRankHtml+=_this.setRankListHtml((i+1),1,receiveData[i]["user"]["room"]["jump"],receiveData[i]["user"]["nick_name"],receiveData[i]["user"]["avatar"],receiveData[i]["user"]["room"]["vdo_status"],parseInt(receiveData[i]["total"])/giftNum);
				giftRankHtml+=_this.setRankListHtml((i+1),2,'',sendData[i]["user"]["nick_name"],sendData[i]["user"]["avatar"],'',parseInt(sendData[i]["total"])/giftNum);
			}
		}
		rankObj.html(giftRankHtml);
		
		//判断登录
		if(userId == '' || userId == null || userId == 0)
		{
			return;
		}
		
		//个人收礼排名
		pmLoginObj.find(".sr").html(_this.getCurrUserRank(userId,receiveData));
		//个人送礼排名
		pmLoginObj.find(".gx").html(_this.getCurrUserRank(userId,sendData));	
	},
	//获取当前用户排名
	getCurrUserRank:function(userId,dataArr)
	{
		var currPm = "";
		for(var i=0; i<dataArr.length; i++)
		{
			if(userId == dataArr[i]["user"]["id"])
			{
				currPm = (i+1);
				return currPm;
			}else
			{
				currPm = "未上榜"	;
			}
		}
		return currPm;
	},
	//html phb
	setRankListHtml:function(rankCount, userType, roomLink, nickName, avatarLink, liveState, lwTotal)
	{
		/*
			参数说明
			rankCount   排名
			userType    1为主播(收礼)，2为用户(送礼)
			roomLink    房间链接
			nickName    用户昵称
			avatarLink  用户头像
			liveState   直播状态
			lwTotal     礼物总数
		*/
		var rankHtml = '';
		var liveHtml = '';
		var rankIcon = '';
		var liClass  = 'fcb hide';
		var lwCount  = '';
		var rlHtml   = '';
		var pmHtml   = '';
		
		//排名
		if(rankCount < 4)
		{
			liClass = 'fcb';
			pmHtml = '<a class="icon"><img src="http://resource.youxiduo.com/special/shihou/promoter/yxjhd/static/img/icon'+rankCount+'.png"/></a>';
		} else {
			pmHtml = '<a class="icon lowpm">'+rankCount+'</a>';
			liClass  = 'fcb hide';
		}
		
		//第1排
		if(userType == 1)
		{
			divClass = 'font1';
			avatarRhtml  =  '<a class="iconImg no1" href="'+roomLink+'"><img src="'+avatarLink+'"/></a>';
			avatarLhtml  =  '';
			lwCount = '收到'+lwTotal+'个';
			pmHtml = '';
			//开播
			if(liveState == 1)
			{
				avatarRhtml = '<a class="iconImg no1" href="'+roomLink+'"><div class="phbWrap"><em></em><span></span><div class="loader-inner line-scale-pulse-out">'+
											'<div></div><div></div><div></div><div></div><div></div></div>'+
										'<img src="'+avatarLink+'"/>'+
									'</div></a>';
			}
		}
		else if(userType == 2) //第2排
		{
			divClass = 'font2';
			avatarRhtml  =  '';
			avatarLhtml  =  '<a class="iconImg no1"><img src="'+avatarLink+'"/></a>';
			lwCount = '贡献'+lwTotal+'个';
		}
		
		rankHtml = '<li class="'+liClass+'"><div class="'+divClass+'">'+avatarLhtml+'<span>'+
						'<p class="fjh"><a>'+nickName+'</a></p>'+
                        '<p class="fjh num"><a>'+lwCount+'</a></p>'+
					'</span>'+avatarRhtml+'</div>'+pmHtml+'</li>';
		return rankHtml;
	},

};

$(function()
{
	var index = new Index();
});







































