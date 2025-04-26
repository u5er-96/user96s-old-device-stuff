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

function WebMetricsData(n){this.dataIsValid=!1,this.properties={eventId:n,url:"",activityId:""},this.uploadPageLoadTimeWebMetrics=function(){this.dataIsValid&&(this.properties.url=WebMetricsSettings.urls.currentUrl,this.properties.activityId=WebMetricsSettings.activityId,this.properties.experimentContextString=WebMetricsSettings.experimentContextString,$.ajax({type:"POST",url:WebMetricsSettings.urls.trackingUrl,data:JSON.stringify(this.properties),contentType:"application/json; charset=utf-8",cache:!1,dataType:"json"}))}}function PageLoadTimeData(){this.properties=$.extend({},this.properties,{userAgent:"None",locale:"en-US",isUserSignedIn:!1,numberOfUserDevices:-1,overallPlt:-1,redirectLatency:-1,unloadPreviousDocumentLatency:-1,dnsLatency:-1,connectionRequestLatency:-1,requestLatency:-1,responseLatency:-1,htmlLatency:-1,assetLatency:-1,windowLoadEventLatency:-1,isRecurrentUser:!1,experimentContextString:"",msFirstPaintLatency:-1})}function ResourceLoadTimeData(){this.dataIsValid=!1,this.properties=$.extend({},this.properties,{resources:""})}var WebMetricsSettings={};PageLoadTimeData.prototype=new WebMetricsData(1),PageLoadTimeData.prototype.calculatePageLoadTimeMetrics=function(){try{var n=window.performance.timing;this.properties.overallPlt=n.navigationStart>0?n.loadEventEnd-n.navigationStart:n.loadEventEnd-n.fetchStart,n.msFirstPaint!==undefined&&(this.properties.msFirstPaintLatency=n.navigationStart>0?n.msFirstPaint-n.navigationStart:n.msFirstPaint-n.fetchStart),this.properties.unloadPreviousDocumentLatency=n.unloadEventEnd-n.unloadEventStart,this.properties.redirectLatency=n.redirectEnd-n.redirectStart,this.properties.dnsLatency=n.domainLookupEnd-n.domainLookupStart,this.properties.connectionRequestLatency=n.connectEnd-n.connectStart,this.properties.requestLatency=n.responseStart-n.requestStart,this.properties.responseLatency=n.responseEnd-n.responseStart,this.properties.htmlLatency=n.domInteractive-n.domLoading,this.properties.assetLatency=n.domComplete-n.domInteractive,this.properties.windowLoadEventLatency=n.loadEventEnd-n.loadEventStart,this.properties.userAgent=navigator.userAgent,this.properties.locale=WebMetricsSettings.locale,this.properties.isUserSignedIn=WebMetricsSettings.isUserSignedIn,this.properties.numberOfUserDevices=WebMetricsSettings.numberOfUserDevices,this.properties.isRecurrentUser=WebMetricsSettings.isRecurrentUser,this.dataIsValid=!0}catch(t){}},ResourceLoadTimeData.prototype=new WebMetricsData(2),ResourceLoadTimeData.prototype.calculatePageLoadTimeMetrics=function(){var t,i,n;try{for(t=window.performance.getEntries(),i=new RegExp("img|subdocument|embed"),n=0;n<t.length;n++)t[n].initiatorType!==undefined&&t[n].initiatorType.toString().match(i)&&(this.properties.resources+=t[n].initiatorType+"@@"+t[n].name+"@@"+t[n].duration,this.properties.resources+="##");this.dataIsValid=!0}catch(r){}},$(window).load(function(){setTimeout(function(){var n,t;try{window.performance!==undefined&&(n=new PageLoadTimeData,n.calculatePageLoadTimeMetrics(),n.uploadPageLoadTimeWebMetrics(),window.performance.getEntries!==undefined&&(t=new ResourceLoadTimeData,t.calculatePageLoadTimeMetrics(),t.uploadPageLoadTimeWebMetrics()))}catch(i){}},100)})

}
/*
     FILE ARCHIVED ON 21:45:17 Dec 31, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 18:30:34 Apr 26, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.65
  exclusion.robots: 0.02
  exclusion.robots.policy: 0.009
  esindex: 0.012
  cdx.remote: 11.878
  LoadShardBlock: 275.503 (6)
  PetaboxLoader3.datanode: 271.992 (8)
  PetaboxLoader3.resolve: 188.796 (3)
  load_resource: 222.521 (2)
*/