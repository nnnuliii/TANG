var publicRemPageTool = function(dsize,type){
	this.dsize = dsize;
	this.type = type;
}

publicRemPageTool.prototype = {
    isCMSNEWPage:function(){
        var _CMSNEWPage = false;
        if(location.href.indexOf('CMSNEW/pageModule/edit')!= -1 || location.href.indexOf('CMSNEW/previewPage?pageId')!= -1 || location.href.indexOf('CMSNEW/editPage?pageId')!= -1 || location.href.indexOf('CMS/mvc/page/view')!= -1){
          _CMSNEWPage = true
        }
        return _CMSNEWPage;
    },
    isCMSNEWPageWidth:function(dsize,type){
        var _w = '';
        if($('#H5EditPage').length > 0 ){
          _w = $('#H5EditPage').width();
		}
        return _w;
    },
	 setbaseFont:function(dsize,type){
		var timerNum = 0;
		var timer = null;
		var ua = navigator.userAgent.toLowerCase();
		var isWeixin = ua.indexOf('micromessenger') != -1;

		var isGrounds = function () {
			return typeof grounds !== 'undefined' && typeof grounds.getDeviceInfo === 'function';
		}
		var getGroundsWidth = function () {
			var deviceInfo = grounds.getDeviceInfo();
			var screen = deviceInfo.getScreen();
			return screen.split('x')[0] / window.devicePixelRatio;
		}
		var getWidth = function () {
				if (isGrounds()) {
					return getGroundsWidth();
				} else {
					return window.innerWidth;
				}
			}

		function getBigFont() {
			var docEl = document.documentElement;
			var docWidth = getWidth();
			var fakeBody = document.createElement('body');
			var rem = docWidth / 7.5;
			docEl.style.fontSize = rem + 'px';
			var d = document.createElement('div');
			d.style.cssText =
				'width:1rem;height:0;overflow: hidden;position:absolute;z-index:-1;visibility: hidden;';
			fakeBody.appendChild(d);
			docEl.appendChild(fakeBody);
			// var realRem = (window.getComputedStyle(d, null).width.split('px')[0]/1).toFixed(1)/1;
			var realRem = isGrounds() ?  getGroundsWidth() / 7.5 : d.getBoundingClientRect().width.toFixed(1) / 1;
			// var realRem = d.offsetWidth;
			docEl.removeChild(fakeBody);
			//docEl.style.cssText = '';
			return {
				realRem: Math.floor(realRem),
				rem: Math.floor(rem)
			};
		}

		function _setweixinfont_szie(){
            var __fontDiff = getBigFont();
            if(type){
                    var t = 100, o = dsize, 
                    e = document.documentElement.clientWidth || window.innerWidth, 
                    n = Math.max(Math.min(e, 480), 320), 
                    h = 50;
                    320 >= n && (h = Math.floor(n / o * t * .99)), 
                    n > 320 && 362 >= n && (h = Math.floor(n / o * t * 1)), 
                    n > 362 && 375 >= n && (h = Math.floor(n / o * t * 1)), 
                    n > 375 && (h = Math.floor(n / o * t * .97));
                
                
                    if(__fontDiff.realRem!=__fontDiff.rem){
                        document.documentElement.style.fontSize = h/(__fontDiff.realRem/__fontDiff.rem) + "px"
                    }else{
                        document.documentElement.style.fontSize = h + "px"
                    }
            }else{
                    var width = dsize;
                    var deviceWidth = document.documentElement.clientWidth;
                    deviceWidth = deviceWidth>320?deviceWidth:320;
            
                    if(__fontDiff.realRem!=__fontDiff.rem){
                    
                    if(deviceWidth>width){
                        document.documentElement.style.fontSize=Math.floor(width/(width/100))/(__fontDiff.realRem/__fontDiff.rem)+"px";
                    }else{
                        document.documentElement.style.fontSize=Math.floor(deviceWidth/(width/100))/(__fontDiff.realRem/__fontDiff.rem)+"px";
                    }
                }else{
                    if(deviceWidth>width){
                        document.documentElement.style.fontSize=Math.floor(width/(width/100))+"px";
                    }else{
                        document.documentElement.style.fontSize=Math.floor(deviceWidth/(width/100))+"px";
                    }
                }
            }
        }

		if(isWeixin){
			 _setweixinfont_szie();
			timer = setInterval(function(){
				timerNum++;
				if(timerNum == 10){
					clearInterval(timer);
					return;
				}
				_setweixinfont_szie();
			}, 10);
		}else{
			if(type){
				var t = 100, o = dsize, 
				e = this.isCMSNEWPage() ? this.isCMSNEWPageWidth() : (document.documentElement.clientWidth || window.innerWidth), 
				n = Math.max(Math.min(e, 480), 320), 
				h = 50;
				320 >= n && (h = Math.floor(n / o * t * .99)), 
				n > 320 && 362 >= n && (h = Math.floor(n / o * t * 1)), 
				n > 362 && 375 >= n && (h = Math.floor(n / o * t * 1)), 
				n > 375 && (h = Math.floor(n / o * t * .97)), 
        document.documentElement.style.fontSize = h + "px";
			}else{
				var width = dsize;
        var deviceWidth = this.isCMSNEWPage() ? this.isCMSNEWPageWidth() : document.documentElement.clientWidth;
				deviceWidth = deviceWidth>320?deviceWidth:320;
				if(deviceWidth>width){
					document.documentElement.style.fontSize=Math.floor(width/(width/100))+"px";
				}else{
					document.documentElement.style.fontSize=Math.floor(deviceWidth/(width/100))+"px";
				}
			}
		}
		



	 },
	 showProper:function(dsize,type){
		 this.setbaseFont(dsize,type);
		 var L = this;
		 $(window).bind('resize', function (e) {
			 setTimeout(function(){
				 L.setbaseFont(dsize,type);
			 },300)
		 });

		 if(L.isCMSNEWPage() && $('#H5EditPage').length > 0 ){
			var _t = this;
			var observer = new MutationObserver(function (mutations, observer) {
				mutations.forEach(function (mutation) {
					L.setbaseFont(dsize,type);
				});
			});
			var config = {
				attributes: true,
				attributeOldValue: true,
				attributeFilter: [
					'style'
				]
			};
			var el = document.getElementById('H5EditPage');
			observer.observe(el, config);
		}

		 L.callbackOnpageshow(dsize,type);
	 },
	 callbackOnpageshow:function(dsize,type){
		 var L = this;
		 window.onpageshow = function(event) {
			 if (event.persisted || navigator.userAgent.indexOf('iPhone') > -1) {
				 setTimeout(function(){
					 L.setbaseFont(dsize,type);
					 L.setCallbackFactory();
				 },200)
			 }
		 }
	 },
	 setCallbackFactory:function(){
	 }
}

/*楠岃瘉鏂规硶 */
function verificationfu(v){
	try{
		v = eval('(' + v + ')');
		if(v&&typeof(v)=="function"){
			return true;
		}else{
			return false;
		}
	}catch(e){}
}

/* 绉诲姩璺宠浆PC*/
function publicJump(l){
	var wh =window.location.href;
	if(/AppleWebKit.*mobile/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)|| (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
		
	}else if(wh.indexOf('CMSNEW/pageModule/edit')!= -1 || wh.indexOf('CMSNEW/previewPage?pageId')!= -1 || wh.indexOf('CMSNEW/editPage?pageId')!= -1 || wh.indexOf('CMS/mvc/page/view')!= -1 || wh.indexOf('CMS/producePage')!= -1){
		
	}else{
		window.location.href=l;
	}
}

/* 鍒ゆ柇鏄惁鏄Щ鍔�,鏄繑鍥瀟rue,鍚﹁繑鍥瀎alse*/
function judgeisMobile(){
	if(/AppleWebKit.*mobile/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)|| (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
		return true;
	}else{
		return false;
	}
}
/* 鍒ゆ柇鏄睆骞曟瘮渚嬪拰璁捐姣斾緥*/
function judgeScreenBlSize(){
	var windowWidth = document.documentElement.clientWidth > 750 ? 750 : document.documentElement.clientWidth;  
	var windowHeight = document.documentElement.clientHeight > 1334 ? 1334 : document.documentElement.clientHeight;
	var shijibl = 750/1334;
	var zhenshibi = windowWidth / windowHeight; 
	if(zhenshibi > shijibl){
		return true;
	}else{
		return false;
	}
}

var _videoObj = { 
	_ajax:function(url,cb,jcb,cFun){   //u 鍦板潃 cb鍥炶皟鍑芥暟鍚�  jsoncb閲嶅啓鍥炶皟鍑芥暟鍚�  cFun鎵ц鏂规硶 
		$.ajax({
			url: url,
			type:"get",
			dataType:"jsonp",
			cache:true,
			jsonp:cb,// 閲嶅啓鍥炶皟鍑芥暟鍚嶅瓧
			jsonpCallback:jcb,
			error:function(){
				//alert('鏁版嵁寮傚父,璇风◢鍚庡啀璇�')
			},
			success:function(data){
				cFun(data);
			}
		});
	},
	_getAjaxScript:function(url){  //鍔ㄦ€佸姞杞絡s
		var el = document.createElement("script");
		el.type="text/javascript";
		el.lang="javascript";
		el.src = url;
		document.getElementsByTagName("body")[0].appendChild(el);
	},
	_add0:function(m){
		return m<10?'0'+m:m 
	},
	_formatSeconds:function(value){//杞寲涓哄垎閽熺
	    var theTime = parseInt(value);// 绉�
	    var theTime1 = 0;// 鍒�
	    var theTime2 = 0;// 灏忔椂
	    if(theTime >= 60) {
	        theTime1 = parseInt(theTime/60);
	        theTime = parseInt(theTime%60);
	        if(theTime1 >= 60) {
	        theTime2 = parseInt(theTime1/60);
	        theTime1 = parseInt(theTime1%60);
	        }
	    }
	    var result = this._add0(parseInt(theTime));
	    if(theTime1 > 0) {
			result = ""+this._add0(parseInt(theTime1))+':'+result;
		}else{
			result = "00"+':'+result;
		}
		if(theTime2 > 0) {
			result = this._add0(parseInt(theTime2))+':'+result;
		}else{
			result = "00"+':'+result;
		}
	    return result;
	},
	_format:function(timestamp){//杞寲涓哄垎閽熺
		var time = new Date(timestamp);
		var year = time.getFullYear();
		var month = time.getMonth()+1;
		var date = time.getDate();
		var num =  year+'-'+this._add0(month)+'-'+this._add0(date);
		return num;
	},
	_RandomNum:function(Min, Max) { //闅忔満鏁版柟娉�
      	var Range = Max - Min;
      	var Rand = Math.random();
      	if(Math.round(Rand * Range)==0){      
      	  return Min + 1;
      	}
      	var num = Min + Math.round(Rand * Range);
     	 return num;
	}
}



/*寮傛鍔犺浇*/
window.Echo = (function(window, document, undefined) {
	'use strict';
	var store = [],
	offset,
	throttle,
	poll;
	var _inView = function(el) {
		var coords = el.getBoundingClientRect();
		return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
	};
	var _pollImages = function() {
		for (var i = store.length; i--;) {
			var self = store[i];
			if (_inView(self)) {
				self.src = self.getAttribute('data-echo');
				store.splice(i, 1);
			}
		}
	};
	var _throttle = function() {
		clearTimeout(poll);
		poll = setTimeout(_pollImages, throttle);
	};
	var init = function(obj) {
		var nodes = $('[data-echo]');
		var opts = obj || {};
		offset = opts.offset || 0;
		throttle = opts.throttle || 250;
		for (var i = 0; i < nodes.length; i++) {
			store.push(nodes[i]);
		}
		_throttle();
		if (document.addEventListener) {
			window.addEventListener('scroll', _throttle, false);
		} else {
			window.attachEvent('onscroll', _throttle);
		}
	};
	return {
		init: init,
		render: _throttle
	};
})(window, document);



function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}



/*鍒嗕韩*/
function WeixinShareFun(title,desc){
	config = {
		title:title,											//鍒嗕韩鏍囬
		desc:desc,		//鍒嗕韩鎻忚堪
		url:window.location.href,						//鍒嗕韩閾炬帴
		img:"https://news.cgtn.com/event/2022/The-Song-Painted/images/wx.jpg"			// 鍒嗕韩鍥剧墖
	};
	wx.ready(function(){
		//鑷畾涔夆€滃垎浜埌鏈嬪弸鍦堚€濆強鈥滃垎浜埌 QQ 绌洪棿鈥濇寜閽殑鍒嗕韩鍐呭锛�1.4.0锛�
		wx.updateTimelineShareData({
			title: config.title,	// 鍒嗕韩鏍囬
			link: config.url,
			imgUrl: config.img,		// 鍒嗕韩鍥炬爣
			success: function () {
				//console.log("璁剧疆鎴愬姛锛屽垎浜埌鏈嬪弸鍦�");
			}
		});
		//鑷畾涔夆€滃垎浜粰鏈嬪弸鈥濆強鈥滃垎浜埌QQ鈥濇寜閽殑鍒嗕韩鍐呭锛�1.4.0锛�
		wx.updateAppMessageShareData({
			title: config.title,	// 鍒嗕韩鏍囬
			desc: config.desc,		// 鍒嗕韩鎻忚堪
			link: config.url,
			imgUrl: config.img,		// 鍒嗕韩鍥炬爣
			success: function () {
				//console.log("璁剧疆鎴愬姛锛屽垎浜粰鏈嬪弸");
			}
		});
	});
}
$.ajax({
	type: 'GET',
	url: 'https://wechat.cgtn.com/socialweb/social/weixin/getKeys.do?url=' + encodeURIComponent(location.href.split('#')[0]),
	contentType: 'application/json',
	dataType: 'json',
	success: function(data){
		wx.config({
			debug: false,
			appId: 'wxd61ff47456d31b8e', // 蹇呭～锛屽叕浼楀彿鐨勫敮涓€鏍囪瘑
			timestamp: data.data.timestamp, // 蹇呭～锛岀敓鎴愮鍚嶇殑鏃堕棿鎴�
			nonceStr: data.data.nonceStr, // 蹇呭～锛岀敓鎴愮鍚嶇殑闅忔満涓�
			signature: data.data.signature,// 蹇呭～锛岀鍚嶏紝瑙侀檮褰�1
			jsApiList: ['updateTimelineShareData','updateAppMessageShareData'] // 鍔熻兘鍒楄〃锛屾垜浠浣跨敤JS-SDK鐨勪粈涔堝姛鑳�
		});
	},
	fail: function(e){
		console.error('Get jssdk api fail!!!')
	}
})


//config淇℃伅楠岃瘉鍚庝細鎵цready鏂规硶锛屾墍鏈夋帴鍙ｈ皟鐢ㄩ兘蹇呴』鍦╟onfig鎺ュ彛鑾峰緱缁撴灉涔嬪悗锛宑onfig鏄竴涓鎴风鐨勫紓姝ユ搷浣滐紝鎵€浠ュ鏋滈渶瑕佸湪 椤甸潰鍔犺浇鏃跺氨璋冪敤鐩稿叧鎺ュ彛锛屽垯椤绘妸鐩稿叧鎺ュ彛鏀惧湪ready鍑芥暟涓皟鐢ㄦ潵纭繚姝ｇ‘鎵ц銆傚浜庣敤鎴疯Е鍙戞椂鎵嶈皟鐢ㄧ殑鎺ュ彛锛屽垯鍙互鐩存帴璋冪敤锛屼笉闇€瑕佹斁鍦╮eady 鍑芥暟涓€�
wx.ready(function(){
	//鑷畾涔夆€滃垎浜埌鏈嬪弸鍦堚€濆強鈥滃垎浜埌 QQ 绌洪棿鈥濇寜閽殑鍒嗕韩鍐呭锛�1.4.0锛�
	wx.updateTimelineShareData({
		title: config.title,	// 鍒嗕韩鏍囬
		link: config.url,
		imgUrl: config.img,		// 鍒嗕韩鍥炬爣
		success: function () {
			//console.log("璁剧疆鎴愬姛锛屽垎浜埌鏈嬪弸鍦�");
		}
	});
	//鑷畾涔夆€滃垎浜粰鏈嬪弸鈥濆強鈥滃垎浜埌QQ鈥濇寜閽殑鍒嗕韩鍐呭锛�1.4.0锛�
	wx.updateAppMessageShareData({
		title: config.title,	// 鍒嗕韩鏍囬
		desc: config.desc,		// 鍒嗕韩鎻忚堪
		link: config.url,
		imgUrl: config.img,		// 鍒嗕韩鍥炬爣
		success: function () {
			//console.log("璁剧疆鎴愬姛锛屽垎浜粰鏈嬪弸");
		}
	});
});
wx.error(function(res){
	//ajaxErro(res);
	//console.log("寰俊鎺堟潈澶辫触锛岄噸鏂板埛鏂伴〉闈�");
});
