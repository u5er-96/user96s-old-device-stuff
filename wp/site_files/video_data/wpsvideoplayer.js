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

// Global vars
var pauseRequestBeforeReady = false;

(function ($) {
    $.fn.wpsVideoPlayer = function (options) {
        var defaults = {
        };
        var options = $.extend(defaults, options);

        if (wpsVideoPlayerFunctionInstance != null) {
            wpsVideoPlayerFunctionInstance.set_TargetOrigin(options["targetOrigin"]);
        }

        var initializeWpsVideoControl = function (dVideo, retryCount) {
            if (!jQuery.isFunction(dVideo.play)) {
                return;
            }

            if (dVideo.readyState < 1) {
                if (retryCount > 0) {
                    setTimeout(function () { initializeWpsVideoControl(dVideo, retryCount - 1) }, 10);
                }
                return;
            }

            var jVideo = $(dVideo);
            var jVideoParent = jVideo.parent();
            var jTime;

            var videoClass = "pf-video";
            if (!jVideo.hasClass(videoClass)) {
                jVideo.addClass(videoClass);
            }

            if (jVideoParent.hasClass("pf-container")) {
                return;
            }

            var formatTime = function (seconds) {
                var result;
                var m = Math.floor(seconds / 60);
                result = (m < 10 ? '0' + m : m);
                var s = Math.floor(seconds - m * 60);
                result += ":" + (s < 10 ? "0" + s : s);
                return result;
            };

            var player;
            var initPlayer = function () {
            var hideControls = options["hideControls"] ? true : false;
            
            player = new PlayerFramework.Player(dVideo.id, {
                    overlayPlayButton: false,
                    overlayControls: !hideControls
                });

                if (hideControls) {
                    $('.pf-throbber-control').addClass('wps-pf-throbber-control');
                }
            };            
            
            if (PlayerFramework.debug) {
                PlayerFramework.loadDebugFiles(initPlayer);
            }
            else {
                initPlayer();
            }

            player.trackStatus = new wpsVideoPlayerTrackStatus();

            var showControls = function (jVideoParent) {
                $(".pf-controls", jVideoParent).show();
                player.trackStatus._mouseMoveTime = new Date();
                setTimeout(function () {
                    if (((new Date()).getTime() - player.trackStatus._mouseMoveTime.getTime()) > 1900) {
                        $(".pf-controls", jVideoParent).hide();
                    }
                }, 2000);
            };

            player.addEventListener("play", function () {
                $(".wpspf-play-control", jVideoParent).removeClass("wpspf-play").addClass("wpspf-pause");
                if (player.trackStatus._track0) {
                    player.trackStatus._track0 = false;
                    if (parent && jQuery.isFunction(parent.postMessage)) {
                        parent.postMessage("video.start." + dVideo.id, options["targetOrigin"]);
                    }
                }
            });

            player.addEventListener("pause", function () {
                $(".wpspf-play-control", jVideoParent).removeClass("wpspf-pause").addClass("wpspf-play");
            });

            player.addEventListener("error", function (e) {
				wpsVideoPlayerFunctionInstance.postMessageToParent("video.error." + dVideo.id);
            });

            player.addEventListener("ended", function (e) {
                if (!options["pauseEnd"])
                {
                    player.currentTime(0);
                }

                // turn off fullscreen
                if ($(".wpspf-fullscreen-control", jVideoParent).hasClass("wpspf-fullscreen-on")) {
                    $(".wpspf-fullscreen-control", jVideoParent).removeClass("wpspf-fullscreen-on").addClass("wpspf-fullscreen-off");
                    wpsVideoPlayerFunctionInstance.postMessageToParent("video.fullscreen-off." + dVideo.id);
                    $(".pf-full-browser-control button", jVideoParent).click();
                }

                if (player.trackStatus._track100) {
                    player.trackStatus._track100 = false;
                    if (parent && jQuery.isFunction(parent.postMessage)) {

                        parent.postMessage("video.end." + dVideo.id, options["targetOrigin"]);
                    }
                }
                if (!options["autoplay"]) {
                    $(".pf-poster", jVideoParent).css('display', '');
                }
            });

            $(document).keydown(function (e) {
                if (e.keyCode == 27) {
                    if ($(".wpspf-fullscreen-control", jVideoParent).hasClass("wpspf-fullscreen-on")) {
                        $(".wpspf-fullscreen-control", jVideoParent).removeClass("wpspf-fullscreen-on").addClass("wpspf-fullscreen-off");
                        wpsVideoPlayerFunctionInstance.postMessageToParent("video.fullscreen-off." + dVideo.id);
                    }
                    else {
                        player.pause();
                    }
                    return false;
                }
            });

            player.addEventListener("timeupdate", function () {
                var cueEle = $(".cue", jVideoParent);
                if (cueEle.length > 0) {
                    var cueEleFontSize = Math.floor((jVideoParent.width() / 540 * 14)) + "px";
                    if (cueEle.css("font-size") != cueEleFontSize) {
                        cueEle.css("font-size", cueEleFontSize);
                    }

                    var cueEleLeft = Math.floor((jVideoParent.width() - cueEle.width()) / 2) + "px";
                    if (cueEle.css("left") != cueEleLeft) {
                        cueEle.css("left", cueEleLeft);
                    }
                }

                var currentTime = player.currentTime();
                var duration = player.duration();
                if (currentTime > duration) {
                    duration = currentTime;
                }

                var progressRatio = currentTime / duration;
                if (player.trackStatus._track75 && progressRatio > 0.75) {
                    player.trackStatus._track75 = false;
                    if (parent && jQuery.isFunction(parent.postMessage)) {
                        parent.postMessage("video.progress.75." + dVideo.id, options["targetOrigin"]);
                    }
                }
                if (player.trackStatus._track50 && progressRatio > 0.50) {
                    player.trackStatus._track50 = false;
                    if (parent && jQuery.isFunction(parent.postMessage)) {
                        parent.postMessage("video.progress.50." + dVideo.id, options["targetOrigin"]);
                    }
                }

                if (player.trackStatus._track25 && progressRatio > 0.25) {
                    player.trackStatus._track25 = false;
                    if (parent && jQuery.isFunction(parent.postMessage)) {
                        parent.postMessage("video.progress.25." + dVideo.id, options["targetOrigin"]);
                    }
                }

                $(jTime).text(formatTime(currentTime) + " / " + formatTime(duration));
            });

            var playPause = function () {
                if (player.paused()) {
                    player.play();
                    wpsVideoPlayerFunctionInstance.postMessageToParent("video.play." + dVideo.id);
                }
                else {
                    player.pause();
                    wpsVideoPlayerFunctionInstance.postMessageToParent("video.pause." + dVideo.id);
                }
            };

            player.ready(function () {
                jVideoParent = jVideo.parent();
                
                $(".pf-video", jVideoParent).mousedown(function () {
                    playPause();
                });
                $(".pf-poster", jVideoParent).mousedown(function () {
                    playPause();
                });

                if ($.browser.msie || ($.browser.webkit && !player.options.overlayControls)){
                    $(".pf-video", jVideoParent).css('background-color', 'transparent');
                    $(".pf-container").css('background-color', 'transparent');
                }

                if (player.options.overlayControls) {
                    $(jVideoParent).mouseover(function () { showControls(jVideoParent) });
                    $(jVideoParent).mouseout(function () { $(".pf-controls", jVideoParent).hide(); });
                    $(jVideoParent).mousemove(function () { showControls(jVideoParent) });
                
                    $(".pf-play-control button", jVideoParent).hide();
                    $(".pf-track-selector-control", jVideoParent).hide();
                    $(".pf-mute-control", jVideoParent).hide();
                    $(".pf-full-browser-control", jVideoParent).hide();
                    $(".pf-play-control", jVideoParent).append("<div class='wpspf-play-control wpspf-play' onclick='javascript:wpsVideoPlayerFunctionInstance.play_click(\"" + dVideo.id + "\");'></div>");
                    $(".pf-controls", jVideoParent).append("<div class='wpspf-track-selector-control wpspf-caption-off' onclick='javascript:wpsVideoPlayerFunctionInstance.track_click(\"" + dVideo.id + "\");'></div>");
                    $(".pf-controls", jVideoParent).append("<div class='wpspf-speaker-control wpspf-speaker-on' onclick='javascript:wpsVideoPlayerFunctionInstance.speaker_click(\"" + dVideo.id + "\");'></div>");
                    $(".pf-controls", jVideoParent).append("<div class='wpspf-fullscreen-control wpspf-fullscreen-off' onclick='javascript:wpsVideoPlayerFunctionInstance.fullscreen_click(\"" + dVideo.id + "\");'></div>");
                    $(".pf-controls", jVideoParent).append("<div class='wpspf-time'>00:00 / 00:00</div>");
                    jTime = $(".wpspf-time", jVideoParent);
                }
                
                if (options["autoplay"] && !pauseRequestBeforeReady) {
                    player.play();
                    $(".pf-poster", jVideoParent).css('display', 'none');
                }                
            });

            dVideo.wpsPlayer = player;
        };

        return this.each(function () {
            initializeWpsVideoControl(this, 500);
        });
    };

    $.fn.play = function () {
        return this.each(function () {
            var jVideoParent = $(this).parent();
            if (jVideoParent.hasClass("pf-container")) {
                if ($(this)[0].wpsPlayer.paused()) {
                    $(".pf-play-control button", jVideoParent).click();
                }
            }
            else if (jQuery.isFunction(this.play)) {
                this.play();
            }
            wpsVideoPlayerFunctionInstance.postMessageToParent("video.play." + $(".pf-video").attr("id"));
        });
    };

    $.fn.pause = function () {
        return this.each(function () {
            var jVideoParent = $(this).parent();
            if (jVideoParent.hasClass("pf-container")) {
                if (!$(this)[0].wpsPlayer.paused()) {
                    $(".pf-play-control button", jVideoParent).click();
                }
            }
            else if (jQuery.isFunction(this.play)) {
                this.pause();
            }
            wpsVideoPlayerFunctionInstance.postMessageToParent("video.pause." + $(".pf-video").attr("id"));
            pauseRequestBeforeReady = true;
        });
    };

    $.fn.isPaused = function () {
        return this.each(function () {
            var jVideoParent = $(this).parent();
            if (jVideoParent.hasClass("pf-container")) {
                return $(this)[0].wpsPlayer.paused();
            }
            else if (jQuery.isFunction(this.play)) {
                this.paused();
            }
        });
    };

    $.fn.fullscreen = function (id) {
        return this.each(function () {
            wpsVideoPlayerFunctionInstance.fullscreen_click(id);
        });
    };

})(jQuery);

function wpsVideoPlayerTrackStatus() {
    this._track0 = this._track25 = this._track50 = this._track75 = this._track100 = true;
    this._mouseMoveTime = new Date();
};

function wpsVideoPlayerFunction() {
    this._targetOrigin = null;
};

wpsVideoPlayerFunction.prototype =
{
    play_click: function (videoId) {
        var jVideoParent = $("#" + videoId).parent();
        $(".pf-play-control button", jVideoParent).mousedown();
        if ($(".wpspf-play-control", jVideoParent).hasClass("wpspf-pause")){
            wpsVideoPlayerFunctionInstance.postMessageToParent("video.pause." + videoId);
        }
        else{
            wpsVideoPlayerFunctionInstance.postMessageToParent("video.play." + videoId);
        }
    },

    track_click: function (videoId) {
        var jVideoParent = $("#" + videoId).parent();
        $(".pf-track-selector-control button", jVideoParent).click();

        wpsVideoPlayerFunctionInstance.selectCaption(jVideoParent, 100);
    },

    selectCaption: function (jVideoParent, retryCount) {
        var a = $(".pf-popup-track-selector-option", jVideoParent);
        if (a.length == 0) {
            if (retryCount > 0) {
                setTimeout(function () { wpsVideoPlayerFunctionInstance.selectCaption(jVideoParent, retryCount - 1); }, 10);
            }
        }
        else {
            if ($(a[0]).hasClass("selected")) {
                $("button", a[1]).click();
                $(".wpspf-track-selector-control", jVideoParent).removeClass("wpspf-caption-on").addClass("wpspf-caption-off");
            }
            else {
                $("button", a[0]).click();
                $(".wpspf-track-selector-control", jVideoParent).removeClass("wpspf-caption-off").addClass("wpspf-caption-on");
            }
        }
    },

    speaker_click: function (videoId) {
        var jVideoParent = $("#" + videoId).parent();

        if ($(".pf-mute-control", jVideoParent).hasClass("pf-sound")) {
            $(".wpspf-speaker-control", jVideoParent).removeClass("wpspf-speaker-on").addClass("wpspf-speaker-off");
            $(".pf-volume-control", jVideoParent).hide();
        }
        else {
            $(".wpspf-speaker-control", jVideoParent).removeClass("wpspf-speaker-off").addClass("wpspf-speaker-on");
            $(".pf-volume-control", jVideoParent).show();
        }

        $(".pf-mute-control button", jVideoParent).click();
    },

    fullscreen_click: function (videoId) {
        var jVideoParent = $("#" + videoId).parent();

        var a = $(".pf-full-browser-control", jVideoParent);
        if ($(".wpspf-fullscreen-control", jVideoParent).hasClass("wpspf-fullscreen-on")) {
            $(".wpspf-fullscreen-control", jVideoParent).removeClass("wpspf-fullscreen-on").addClass("wpspf-fullscreen-off");
            wpsVideoPlayerFunctionInstance.postMessageToParent("video.fullscreen-off." + videoId);
        }
        else {
            $(".wpspf-fullscreen-control", jVideoParent).removeClass("wpspf-fullscreen-off").addClass("wpspf-fullscreen-on");
            wpsVideoPlayerFunctionInstance.postMessageToParent("video.fullscreen-on." + videoId);
        }

        $(".pf-full-browser-control button", jVideoParent).click();
    },

    postMessageToParent: function (message) {
        if (parent && jQuery.isFunction(parent.postMessage) && this._targetOrigin != null) {
            parent.postMessage(message, this._targetOrigin);
        }
    },

    get_TargetOrigin: function () {
        return this._targetOrigin;
    },

    set_TargetOrigin: function (targetOrigin) {
        if (targetOrigin != null) {
            targetOrigin = jQuery.trim(targetOrigin);
            if (targetOrigin != "") {
                this._targetOrigin = targetOrigin;
            }
        }
    }
}

var wpsVideoPlayerFunctionInstance = new wpsVideoPlayerFunction();

}
/*
     FILE ARCHIVED ON 15:51:08 May 22, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 18:30:48 Apr 26, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.454
  exclusion.robots: 0.018
  exclusion.robots.policy: 0.008
  esindex: 0.009
  cdx.remote: 64.747
  LoadShardBlock: 453.315 (3)
  PetaboxLoader3.datanode: 302.16 (5)
  PetaboxLoader3.resolve: 480.556 (3)
  load_resource: 414.925 (2)
*/