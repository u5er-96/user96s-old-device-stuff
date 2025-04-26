var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

function getCookieVal(name){var ca=document.cookie.split(';');var nameEQ=name+"=";for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length)}return null}
function getRandom(num){var n=1000000000;function ugen(old,a,q,r,m){var t=Math.floor(old/q);
t=a*(old-(t*q))-(t*r);return Math.round((t<0)?(t+m):t);}var m1=2147483563,m2=2147483399,a1=40014,a2=40692,q1=53668,q2=52774,r1=12211,r2=3791,x=67108862;
var g2=(Math.round(((new Date()).getTime()%100000))&2147483647),g1=g2;var shuffle=[32],i=0;
for(;i<19;i++){g1=ugen(g1,a1,q1,r1,m1);}for(i=0;i<32;i++){g1=ugen(g1,a1,q1,r1,m1);
shuffle[31-i]=g1;}g1=ugen(g1,a1,q1,r1,m1);g2=ugen(g2,a2,q2,r2,m2);var s=Math.round((shuffle[Math.floor(shuffle[0]/x)]+g2)%m1);
var rand=Math.floor(s/(m1/(n+1)))/n;if(typeof(num)=="undefined"){return rand;}else{return Math.floor(rand*(num+1));
}}
var SR_url = window.location.toString().toLowerCase();
var _refv = escape(document.referrer);
var _rn = getRandom();

function loadCle(st, freq,_s,_l) {
		_freq = freq;
		checkCle = cleCookie();
		if(getCookieVal("tstCLE")==1){var c='tstCLE=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';	document.cookie=c; checkCle=true; _freq=100;}
		if(checkCle) {
			if( document.cookie.indexOf('msresearch') == -1 && !(/^http(s)?\:\/\/www\.windowsphone\.com/i.test(document.referrer)) ){ 
				if(_rn <= _freq){					
					if(st==1) {
						window.location.href = document.location.protocol +'//web.archive.org/web/20131231214502/http://siterecruit.comscore.com/sr/windowsphone/int_cle.htm?location='+escape(window.location)+'&referrer='+_refv+'&frequency='+_freq+'&weight=100&site='+_s+'&H_SurveyType=1&l='+_l;
					}						
				}
		}
	}
}

function cleCookie() {
		if(document.cookie.indexOf('cleflag') == -1) {
			var c = 'cleflag=1; path=/; domain=.windowsphone.com';
			document.cookie = c;	
			return true;
		}else{
			var _v = getCookieVal('cleflag'); _v++;
			var c = 'cleflag='+_v+'; path=/; domain=.windowsphone.com';
			document.cookie = c;	
			return false;
		}
}

if(!(/iphone|ipad|iphone|android|opera mini|blackberry|windows(phone|ce)|iemobile|htc|nokia/i.test(navigator.userAgent))){

  if(/[\w\.]+\/en-us\/cmpn\/nokia-lumia-1020/i.test(SR_url)) {
		loadCle(1, 0.3152,"2348","9");
	}else if(/[\w\.]+\/en-us\/cmpn\/nokia-lumia-1520/i.test(SR_url)) {
		loadCle(1, 0.5,"2349","9");
	}
}	



}
/*
     FILE ARCHIVED ON 21:45:02 Dec 31, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 18:30:32 Apr 26, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.909
  exclusion.robots: 0.025
  exclusion.robots.policy: 0.01
  esindex: 0.038
  cdx.remote: 17.511
  LoadShardBlock: 393.04 (6)
  PetaboxLoader3.datanode: 243.853 (8)
  PetaboxLoader3.resolve: 363.244 (3)
  load_resource: 367.569 (2)
*/