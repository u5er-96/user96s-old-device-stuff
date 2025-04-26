var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u="//apollo.archive.org/";
  var h=window.location.hostname;
  var sMap = {
    'archive.org': '2',
    'web.archive.org': '3'
  };
  var siteId = sMap[h] || '4';
  _paq.push(['setTrackerUrl', u+'matomo.php']);
  _paq.push(['setSiteId', siteId]);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
})();

// tag manager
var _mtm = window._mtm = window._mtm || [];
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
(function() {
  var h=window.location.hostname;
  sMap = {
    'archive.org': 'ZUUaFed2',
    'web.archive.org': 'kzRD6OIl'
  }
  var containerId = sMap[h] || '4';
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src=`//apollo.archive.org/js/container_${containerId}.js`; s.parentNode.insertBefore(g,s);
})();
