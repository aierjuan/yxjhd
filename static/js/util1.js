function Util()
{
	//url
	this.baseUrl = 'http://api.shihou.tv';
	
	this.lotteryBaseUrl = 'http://event.m.shihou.tv/shihou_lottery';
}
Util.prototype={
    getUrlParam: function(name, url)
	{
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        url = url || window.location.search.substr(1).match(reg);  //匹配目标参数
        if (url != null) return unescape(url[2]); return null; //返回参数值
    },
    getUrlParams: function()
	{
    	var url = window.location.href;  //匹配目标参数
    	if(url != null)
		{
    		return url.substr(url.indexOf("?"), url.length);
		}
    },
    parseResult:function()//解析结果， 如果不存在则返回''
	{
		var size = arguments.length;
		if(size == 0)
		{
			return '';
		}
		var result = arguments[0];
		for(var i = 1; i < size; i++)
		{
			if(result == undefined)
			{
				return '';
			}
			var argu = arguments[i];
			if(i == size)
			{
				return argu;
			}
			result = result[argu];
		}
		return result;
	},
	getUserId2: function(callback)
	{
		var _this = this;
		setTimeout(function()
		{
			var token = "";
			if(typeof lion == "undefined")
			{
				alert('获取token异常.请重新登陆或者在狮吼APP内打开.以下信息为开发者模式信息.');
				token = 'KEOLJLEPiMDuuYhMW2GnUBFdnj21LI7PkH2RHXuQGAtlxnHDlxfcrK';
			}
			else
			{
				token = JSON.parse(lion.get_token())["X-LION-TOKEN"];
			}
			/*if(token == 'undefined' || token == undefined || token.length < 1)
			{
				window.location.href = 'shihoutv://route?jump_type=120';
				return;
			}*/
			if(token == '')
			{
				return null;
			}
			
			var url = 'http://api.shihou.tv/api/user/info?token=' + token;
			this.requestRemoteDataGetJson(url, null, function(result)
			{
				var user_id = result['data']['user']['id'];
			},false);
		},300);
		return user_id;
	},
	getUserId: function(callback)
	{
		var _this = this;
		var token = this.getCookie('token1');
		if(token == '')
		{
			return null;
		}
		var url =  this.lotteryBaseUrl + '/api/getUidByToken?xLionToken='+token;
		_this.requestRemoteDataGetJson(url,null,callback,false);;
	},
	getCookie:function(name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		{
			return unescape(arr[2]);
		}
		else
		{
			return null;
		}
	},
	setCookie:function(name,value)
	{
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		//测试 TODO
     	//document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/; domain=.test.youxiduo.com";
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/; domain=.event.m.shihou.tv";
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
	//get request
	requestRemoteDataGetJson2: function(url, data, beforeCallback, succCallback, asyn)
	{
		var begin = (new Date()).getTime();
		$.ajax({
	        url: url,
	        type: 'GET',
	        async: asyn,
	        cache: false,
	        dataType: "json",
	        data: data,
	        beforeSend: beforeCallback,
			success: succCallback,
	        error: function (data)
			{
	        	var status = data.status;
	        	console.log(url + "获取数据失败!");
	        }
	    });
	},
	//get request
	requestRemoteDataGetHtml: function(url, data, callback, async)
	{
		var begin = (new Date()).getTime();
		$.ajax({
	        url: url,
	        type: 'GET',
	        async: async || true,
	        dataType: "html",
	        data: data,
	        success: callback,
	        error: function (data)
			{
	        	var status = data.status;
	        	console.log(url + "获取数据失败!");
	        }
	    });
	},
	//post request
	requestRemoteDataPostJson: function(url, data, callback, async)
	{
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
	sharePage:function(from_user_id,share_url,share_icon,share_title,share_desc)
	{
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
	wechatShare:function(imgUrl, title, desc, link)
	{
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
	log:function(data)
	{
		console.log(data);
	},
	logURL:function(url)
	{
		console.log("url --> "+url);
	},
	logParameter:function(data)
	{
		console.log("parameter --> "+JSON.stringify(data));
	},
	logResult:function(result)
	{
		console.log("result --> "+JSON.stringify(result));
	}
	
}
