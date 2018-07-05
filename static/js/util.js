function Util(){
	this.baseUrl = 'http://api.shihou.tv/';
	// this.baseUrl = 'http://test.api.shihou.tv/';

	//event.m.shihou.tv test.youxiduo.com
	this.lotteryBaseUrl = 'http://event.m.shihou.tv/shihou_lottery/';
	//this.lotteryBaseUrl = 'http://test.youxiduo.com/shihou_lottery/';

	//http://event.m.shihou.tv/shihou.forum.service/forum/query
	this.forumUrl = 'http://event.m.shihou.tv/shihou.forum.service';
	//this.forumUrl = 'http://112.124.121.34:8091/shihou.forum.service';//评论的接口
//	http://112.124.121.34:8091/shihou.forum.service/forum/query
	this.reportUrl = "http://event.m.shihou.tv/shihou_report";
	//this.reportUrl = "http://test.youxiduo.com/shihou_report";//

	 
	//收到雪球 圣诞树1151，雪球1152
	this.mvp_receive_url = this.baseUrl+'/api/gift/receive_rank?gift_id=1152 ';
	this.mvp_receive_data_array = [];
	this.mvp_receive_data = {};
	
	//收到圣诞树
	this.ace_receive_url = this.baseUrl + '/api/gift/receive_rank?gift_id=1151';
	this.ace_receive_data_array = [];
	this.ace_receive_data = {};
	
	
	//送出雪球
	this.mvp_send_url = this.baseUrl+'/api/gift/send_rank?gift_id=1152';
	this.mvp_send_data_array = [];
	this.mvp_send_data = {};
	
	//送出圣诞树
	this.ace_send_url = this.baseUrl + '/api/gift/send_rank?gift_id=1151';
	this.ace_send_data_array = [];
	this.ace_send_data = {};

	
	
	this.init();
}
Util.prototype={
	init: function(){
		
	},

		
	setRankList: function(page){
		var self = this;
		var roomSkip = '';
		var min = 0;
		var now = 0;
		//绑定榜单
		//收到雪球
		self.log("收到雪球")
		self.requestRemoteDataJson(self.mvp_receive_url, {}, function(result){
			if(self.parseResult(result, 'error') == 0){
				var resultData = self.parseResult(result, 'data', 'list');
				for (var i = 0;i < resultData.length; i++) {
					var user = resultData[i];
					self.mvp_receive_data_array[i] = user;
					now = i;
					if(i == 9){
						break;
					}
				}
			}
		}, false);
		min = now;
		//收到圣诞树
		self.log("收到圣诞树")
		self.requestRemoteDataJson(self.ace_receive_url, {}, function(result){
			if(self.parseResult(result, 'error') == 0){
				var resultData = self.parseResult(result, 'data', 'list');
				for (var i = 0;i < resultData.length; i++) {
					var user = resultData[i];
					self.ace_receive_data_array[i] = user;
					now = i;
					if(i == 9){
						break;
					}
				}
			}
		}, false);
		if(min > now){
			min = now;	
		}
		var xueqiuHTML = '';
		//排行榜赋值
		for(var i = 0;i < min+1;i++){
			var shihou = self.mvp_receive_data_array[i];
			var rongyao = self.ace_receive_data_array[i];
			console.log(rongyao)
			if(page == 0){
				roomSkip = self.parseResult(shihou, 'user', 'room', 'jump');
				roomSkip2 = self.parseResult(rongyao, 'user', 'room', 'jump');
			}else{
				roomSkip = 'http://event.m.shihou.tv/lion_module_share_temp/share?room_id='+self.parseResult(shihou, 'user', 'room', 'id');
				roomSkip2 = 'http://event.m.shihou.tv/lion_module_share_temp/share?room_id='+self.parseResult(rongyao, 'user', 'room', 'id');
			}
			
			xueqiuHTML += self.setRankListHTML((i+1), 1, roomSkip, self.parseResult(shihou, 'user', 'nick_name'), self.parseResult(shihou, 'user', 'avatar'), self.parseResult(shihou, 'user', 'room', 'vdo_status'), '收到'+self.resetTotal(self.parseResult(shihou, 'total'))/10+'个');
			xueqiuHTML += self.setRankListHTML((i+1), 2, roomSkip2, self.parseResult(rongyao, 'user', 'nick_name'), self.parseResult(rongyao, 'user', 'avatar'), self.parseResult(rongyao, 'user', 'room', 'vdo_status'), '收到'+self.resetTotal(self.parseResult(rongyao, 'total'))/10+'个');	

		}
		$('#xueqiuUl').html(xueqiuHTML);



		//双旦先锋

		self.log("贡献雪球");
		self.requestRemoteDataJson(self.mvp_send_url, {}, function(result){
			if(self.parseResult(result, 'error') == 0){
				var resultData = self.parseResult(result, 'data', 'list');
				for (var i = 0;i < resultData.length; i++) {
					var user = resultData[i];
					self.mvp_send_data_array[i] = user;
					now = i;
					if(i == 9){
						break;
					}
				}
			}
		}, false);
		min = now;
		self.log("贡献圣诞树");
		self.requestRemoteDataJson(self.ace_send_url, {}, function(result){
			console.log("贡献圣诞树"+self.ace_send_url)
			if(self.parseResult(result, 'error') == 0){
				var resultData = self.parseResult(result, 'data', 'list');
				for (var i = 0;i < resultData.length; i++) {
					var user = resultData[i];
					self.ace_send_data_array[i] = user;
					now = i;
					if(i == 9){
						break;
					}
				}
			}
		}, false);
		if(min > now){
			min = now;	
		}
		var shengdanshuHTML = '';
		//排行榜赋值
		for(var i = 0;i < min+1;i++){
			var meili = self.mvp_send_data_array[i];
			var love = self.ace_send_data_array[i];
			/*if(page == 0){
				roomSkip = self.parseResult(meili, 'user', 'room', 'jump');
			}else{
				roomSkip = 'http://event.m.shihou.tv/lion_module_share_temp/share?room_id='+self.parseResult(meili, 'user', 'room', 'id');
			}*/
			shengdanshuHTML += self.setRankListHTML((i+1), 1, 'javascript:void(0);', self.parseResult(meili, 'user', 'nick_name'), self.parseResult(meili, 'user', 'avatar'), self.parseResult(meili, 'user', 'room', 'vdo_status'), '贡献'+self.resetTotal(self.parseResult(meili, 'total'))/10+'个');
			shengdanshuHTML += self.setRankListHTML((i+1), 2, 'javascript:void(0);', self.parseResult(love, 'user', 'nick_name'), self.parseResult(love, 'user', 'avatar'), self.parseResult(love, 'user', 'room', 'vdo_status'), '贡献'+self.resetTotal(self.parseResult(love, 'total'))/10+'个');	
			
		}
		$('#shengdanshuUl').html(shengdanshuHTML);
	},
	setRankListHTML: function(index, num, skipRoom, nick_name, avatar, kaibo_status, value){
		var html = '';
		var liClass = ''; //主播还是用户
		var avatarHTML = '';
		var kaiboHTML = '';
		var rankIcon = '';
		var clas = '';
		
		//序号，用来显示排序图标
		if(index < 4){
			rankIcon = '<a class="icon no'+index+'">'+index+'</a>';
		}else{
			rankIcon = '<a class="icon no4">'+index+'</a>';
		}
		
		if(kaibo_status == 1){//如果开播
			kaiboHTML = '    <em class="liveIcon"></em>'+
						'	 <em class="liveOpacity"></em>'+
                        '    <div class="loader-inner line-scale-pulse-out">'+
                        '        <div></div>'+
                        '        <div></div>'+
                        '        <div></div>'+
                        '        <div></div>'+
                        '        <div></div>'+
                        '    </div>';
		}
		if(num == 1){//第1列
			clas = 'font1';
						
			avatarHTML = '<div class="'+clas+'">'+ 
						'    <span>'+
		               '         <p class="fjh"><a>'+nick_name+'</a></p>'+
		               '         <p class="fjh number"><a>'+value+'</a></p>'+
		               '     </span>'+
		               '     <a href="'+skipRoom+'" class="iconImg">'+
		               '     	<div class="phbWrap">'+
		               				kaiboHTML+
		               '         	 <img src="'+avatar+'"/>'+
		               '         </div>'+
		               '     </a>';
		               '</div>';
			
            html = '<li class="fcb">'+
			   			avatarHTML+   
	           		'</li>';
			   
			   			   
		}else{//第2列
			clas = 'font2';
			avatarHTML = '<div class="'+clas+'">'+
						'     <a href="'+skipRoom+'" class="iconImg">'+
						'     	<div class="phbWrap">'+
									kaiboHTML+
						'         	  <img src="'+avatar+'"/>'+
						'         </div>'+
						'     </a>'+
						'    <span>'+
		               '         <p class="fjh"><a>'+nick_name+'</a></p>'+
		               '         <p class="fjh number"><a>'+value+'</a></p>'+
		               '     </span>'+
		               '</div>'+
					   rankIcon;
						 
            html = '<li class="fcb">'+
			   			avatarHTML+   
	           		'</li>';             
		}
		
		return html;
	},
	setUserRank: function(user_id){
		
		var self = this;
		//绑定用户排名
		//雪球收入榜
		self.requestRemoteDataJson(self.mvp_receive_url, {}, function(result){
			if(self.parseResult(result, 'error') == 0){
				var resultData = self.parseResult(result, 'data', 'list');
				for (var i = 0;i < resultData.length; i++) {
					var user = resultData[i];
					self.mvp_receive_data['"'+self.parseResult(user, 'user', 'id')+'"'] = (i+1);
				}
				$('#xueqiusr').html('雪球收入榜：'+setUR(self.mvp_receive_data, user_id));		
			}
		}, true);
		//圣诞树收入榜
		self.requestRemoteDataJson(self.ace_receive_url, {}, function(result){
			if(self.parseResult(result, 'error') == 0){
				var resultData = self.parseResult(result, 'data', 'list');
				for (var i = 0;i < resultData.length; i++) {
					var user = resultData[i];
					self.ace_receive_data['"'+self.parseResult(user, 'user', 'id')+'"'] = (i+1);
				}
				console.log(setUR(self.ace_receive_url, user_id));
				$('#xueqiugx').html('圣诞树收入榜：'+setUR(self.ace_receive_data, user_id));		
			}
		}, true);
		//雪球贡献榜
		self.requestRemoteDataJson(self.mvp_send_url, {}, function(result){
			if(self.parseResult(result, 'error') == 0){
				var resultData = self.parseResult(result, 'data', 'list');
				for (var i = 0;i < resultData.length; i++) {
					var user = resultData[i];
					self.mvp_send_data['"'+self.parseResult(user, 'user', 'id')+'"'] = (i+1);
				}
				$('#shengdanshusd').html('雪球贡献榜：'+setUR(self.mvp_send_data, user_id));		
			}
		}, true);
		//圣诞树贡献榜
		self.requestRemoteDataJson(self.ace_send_url, {}, function(result){
			if(self.parseResult(result, 'error') == 0){
				var resultData = self.parseResult(result, 'data', 'list');
				for (var i = 0;i < resultData.length; i++) {
					var user = resultData[i];
					self.ace_send_data['"'+self.parseResult(user, 'user', 'id')+'"'] = (i+1);
				}
				$('#shengdanshugx').html('圣诞树贡献榜：'+setUR(self.ace_send_data, user_id));		
			}
		}, true);
		
		function setUR(obj, user_id){
			var resu = obj['"'+user_id+'"'];
			if(resu == undefined){
				return '未上榜';
			}
			return resu;
		}
		
	},
	resetTotal: function(total){
		if(total == undefined)
			return 0;
		return parseInt(total/1);
	},
	//获取url中的参数
    getUrlParam: function(name, url) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        url = url || window.location.search.substr(1).match(reg);  //匹配目标参数
        if (url != null) return unescape(url[2]); return null; //返回参数值
    },
    getUrlParams: function(){
    	var url = window.location.href;  //匹配目标参数
    	if(url != null)
    		return url.substr(url.indexOf("?"), url.length);
    },
    parseResult:function(){//解析结果， 如果不存在则返回''
		var size = arguments.length;
		if(size == 0){
			return '';
		}
		var result = arguments[0];
		for(var i = 1; i < size; i++){
			if(result == undefined){
				return '';
			}
			var argu = arguments[i];
			if(i == size){
				return argu;
			}
			result = result[argu];
		}
		return result;
	},
	requestRemoteDataJson: function(url, data, callback, asyn){
		this.logURL(url);
		this.logParameter(data);
		var begin = (new Date()).getTime();
		$.ajax({
	        url: url,
	        type: 'GET',
	        async: asyn,
	        cache: false, 
	        dataType: "json",
	        data: data,
	        success: callback,
	        error: function (data) {
	        	var status = data.status;
	        	console.log(url + "获取数据失败!");
	        }
	    });
	},
	requestRemoteDataPost: function(url, data, callback, async){
		this.logURL(url);
		this.logParameter(data);
		var begin = (new Date()).getTime();
		$.ajax({
	        url: url,
	        type: 'POST',
	        async: async || true,
	        cache: false, 
	        dataType: "json",
	        data: data,
	        success: callback,
	        error: function (data) {
	        	var status = data.status;
	        	console.log(url + "获取数据失败!");
	        }
	    });
	},
	requestRemoteDataJsonPost: function(url, data, callback, async){
		this.logURL(url);
		this.logParameter(data);
		var begin = (new Date()).getTime();
		$.ajax({
	        url: url,
	        type: 'POST',
	        async: async || true,
	        cache: false, 
	        dataType: "json",
	        contentType: "application/json",
	        data: data,
	        success: callback,
	        error: function (data) {
	        	var status = data.status;

	        	console.log(url + "获取数据失败!");
	        }
	    });
	},
	sendRequest: function(url, data, type, async, successCallBack, errorCallBack){
		this.logURL(url);
		this.logParameter(data);
		$.ajax({
			url: url,
			data: data,
			type: type,
			async: async,
			dataType: "json",
			contentType:"application/json;charset=UTF-8",
			success: successCallBack,
			error: errorCallBack
		});
	},
	requestRemoteDataJson: function(url, data, callback, asyn){
		//this.logURL(url);
		//this.logParameter(data);
		var begin = (new Date()).getTime();
		$.ajax({
	        url: url,
	        type: 'GET',
	        async: asyn,
	        cache: false,
	        dataType: "json",
	        data: data,
	        success: callback,
	        error: function (data) {
	        	var status = data.status;
	        	console.log(url + "获取数据失败!");
	        }
	    });
	},
	getUserId: function(callback){
		 var token = this.getCookie('token1');
		 //var token = window.lion.get_token();//新包token获取方法
		 //this.setCookie("token", token);
		 if(token == ''){
		 	return null;
		 }
		 var url =  this.lotteryBaseUrl + 'api/getUidByToken?xLionToken='+token;
		 
		  var tokenaaaa = this.getCookie('tokenaaaa');
		 this.requestRemoteDataJson(url,null,callback);
	},

	
	getCookie:function(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	},
	setCookie:function(name,value){
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		//测试 TODO
//   	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/; domain=.test.youxiduo.com";
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/; domain=.shihou.tv";
	},
	clickTouch:function ()
	{
		var clickTouch = "touchend";
		var browser = {
			versions: function()
			{
				var u = navigator.userAgent, app = navigator.appVersion;
				return {//移动终端浏览器版本信息
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
					iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
				};
			}(),
			language: (navigator.browserLanguage || navigator.language).toLowerCase()
		}
		if (browser.versions.mobile)
		{
			clickTouch = "touchend";
		}
		else
		{
			clickTouch = "click";
		}
		return clickTouch;
	},
	//分享弹窗
	sharePage:function(from_user_id,share_url,share_icon,share_title,share_desc){
		console.log('from_user_id:'+from_user_id);
		console.log('share_url:'+share_url);
		console.log('share_icon:'+share_icon);
		console.log('share_title:'+share_title);
		console.log('share_desc:'+share_desc);
	    var web_share = {
	        "qq": {
	            "url": share_url,
	            "img": share_icon,
	            "title": share_title,
	            "subtitle": share_desc
	        },
	        "wx_person": {
	            "url": share_url,
	            "img": share_icon,
	            "title": share_title,
	            "subtitle": share_desc
	        },
	        "wx_group": {
	            "url": share_url,
	            "img": share_icon,
	            "title": share_title,
	            "subtitle": share_desc
	        },
	        "wb": {
	            "url": share_url,
	            "img": share_icon,
	            "title": share_title,
	            "subtitle": share_desc
	        }
	    };
	    if (typeof(window.lion) != "undefined" && typeof(window.lion.web_share) == 'function')
	    {
	        window.lion.web_share(JSON.stringify(web_share));
	    } 
	},
	wechatShare:function(imgUrl, title, desc, link){
		 var wxShareConfig = {
                imgUrl: imgUrl,
                title: title,
                desc: desc,
            	link: link
            }
            $.ajax({
            	
//              url: '//event.m.shihou.tv/shihou_kpl_guess/share_api_sign',
              	url: '//test.youxiduo.com/shihou_kpl_guess/share_api_sign',
                type: 'GET',
                async: false,
                dataType: "json",
                data: {'url': encodeURI(encodeURI(location.href.split('#')[0]))},
                success: function (data) {
                    console.log(data.result);
                    wx.config({
//                      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.result.appid, // 必填，公众号的唯一标识
                        timestamp: data.result.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.result.noncestr, // 必填，生成签名的随机串
                        signature: data.result.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function () {
                        wx.onMenuShareTimeline(wxShareConfig);
                        wx.onMenuShareAppMessage(wxShareConfig);
                        wx.onMenuShareQQ(wxShareConfig);
                    });
                  	wx.error(function(res){
				    	console.log('err', res)
				  	});
                },
                faile: function (data) {
                    alert(JSON.stringify(data));
                }
            });
	},
		//get request
	requestRemoteDataGetJson: function(url, data, callback, asyn)
	{
		var begin = (new Date()).getTime();
		$.ajax({
	        url: url,
	        type: 'GET',
	        async: asyn,
	        cache: false,
	        dataType: "json",
	        data: data,
	        success: callback,
	        error: function (data)
			{
	        	var status = data.status;
	        	console.log(url + "获取数据失败!");
	        }
	    });
	},
	log:function(data){
		console.log(data);
	},
	logURL:function(url){
		//console.log("url --> "+url);
	},
	logParameter:function(data){
		//console.log("parameter --> "+JSON.stringify(data));
	},
	logResult:function(result){
		//console.log("result --> "+JSON.stringify(result));
	}
}
