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

/*
 This js is included directly by Feedback partners.
 This is NOT used by feedback form pages.
*/

var FeedbackGlobalVar =
{
    navigateLoc: "",
    surveyCookieTtl: 0,
    openFeedback: false,
    feedbackLoaded: false,
    surveyLoaded: false
}

$(document).ready(function () {
    jQuery.support.cors = true;
    $('<div id="feedbackPopUp"><div id="feedbackContentDiv" class="window"/><div id="mask" /></div>').appendTo(document.body);
    $('#mask').hide();
    $('#feedbackPopUp').hide();

    var xdr = null;

    // feedbackLink need to exist in our clients to add the click binding.
    $('#feedbackLink').click(function () {
        showFeedbackPopUp(
            FeedbackSettings.feedbackBaseUrl,
            FeedbackSettings.feedbackClientId,
            FeedbackSettings.feedbackuserloggedIn,
            FeedbackSettings.feedbackMarket);
    });

    // Get jqueryUI dynamically
    if (typeof jQuery.ui == 'undefined' || (typeof $('#feedbackContentDiv').dialog) == 'undefined') {
        $.getScript("//web.archive.org/web/20131231214507/http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.22/jquery-ui.min.js", function () { });
    }
    
    // Get main css dynamically

    $("head").append("<link>");
    stylesheet = $("head").children(":last");
    var cssFile = "css/mainPage.css";
    stylesheet.attr({ rel: "stylesheet", type: "text/css", href: FeedbackSettings.feedbackCdn + cssFile });


    if (FeedbackSettings.feedbackUseSurvey || FeedbackSettings.feedbackUseSurvey == undefined) {
        checkFeedbackSurveyGoals(FeedbackSettings.feedbackClientId, FeedbackSettings.feedbackMarket);
    }
});

function setMainDomain() {

    var splitDomain = window.document.domain.split('.');
    if (splitDomain.length > 2) {
        var subDomain = splitDomain[splitDomain.length - 2] + "." + splitDomain[splitDomain.length - 1];
        window.document.domain = subDomain;
    }
}

function showSurveyPopUp(serviceUrl, clientId, sid, ulogged, market) {

    var endpoint = serviceUrl.substring(0, serviceUrl.indexOf("FeedbackService.svc/"));
    var dialogWidth = 700;
    var dialogHeight = 650;
    if (jQuery.ui.version == "1.9.0") {
        dialogHeight += 15;
    }

    var iFrameEndpoint = endpoint + "ExitSurveyFormPage.aspx?cid=" + clientId + "&sid=" + sid + "&ulogged=" + ulogged + "&market=" + market + "&curl=" + escape(document.URL) + "&dir=" + $("html").attr("dir");
    
    if (!FeedbackGlobalVar.surveyLoaded) {
        $('#feedbackContentDiv').dialog({ modal: true, width: dialogWidth, height: dialogHeight, draggable: false, autoOpen: false, resizable: false });
        $('#feedbackContentDiv').html('<iframe id="modalIframeId" width="700px" height="650px" marginWidth="0" marginHeight="0" frameBorder="0" scrolling="no" />');
        $("#modalIframeId").attr("src", iFrameEndpoint);

        FeedbackGlobalVar.openFeedback = true;
        $("#modalIframeId").bind("load", iframeUrlChanged);

        setMainDomain();
        bindMessageHandler();

        FeedbackGlobalVar.surveyLoaded = true;
    }
    else {
        // this call will reload the iframe
        $("#modalIframeId").attr("src", iFrameEndpoint);
        $('#feedbackContentDiv').dialog('open');
    }

    addCloseButton(dialogWidth, "Action=cancel_survey");
}


function showFeedbackPopUp(serviceUrl, clientId, ulogged, market) {

    var endpoint = serviceUrl.substring(0, serviceUrl.indexOf("FeedbackService.svc/"));
    var dialogWidth = 500;
    var dialogHeight = 355;
    if (jQuery.ui.version == "1.9.0") {
        dialogHeight += 15;
    }

    var iFrameEndpoint = endpoint + "UserFeedbackFormPage.aspx?cid=" + clientId + "&ulogged=" + ulogged + "&market=" + market + "&curl=" + escape(document.URL) + "&dir=" + $("html").attr("dir");
    
    if (!FeedbackGlobalVar.feedbackLoaded) {
        $('#feedbackContentDiv').dialog({ modal: true, height: dialogHeight, width: dialogWidth, draggable: false, autoOpen: false, resizable: false });
        $('#feedbackContentDiv').html('<iframe id="modalIframeId" width="490px" height="350px" marginWidth="0" marginHeight="0" frameBorder="0" scrolling="no" />');
        $("#modalIframeId").attr("src", iFrameEndpoint);

        FeedbackGlobalVar.openFeedback = true;
        $("#modalIframeId").bind("load", iframeUrlChanged);

        setMainDomain();
        bindMessageHandler();
        FeedbackGlobalVar.feedbackLoaded = true;
    }
    else {
        // this call will reload the iframe
        $("#modalIframeId").attr("src", iFrameEndpoint);
        $('#feedbackContentDiv').dialog('open');
    }   

    addCloseButton(dialogWidth, "Action=cancel_feedback");
}

function addCloseButton(dialogWidth, closeAction) {
    //check if there's a close button already
    if ($('#feedbackCloseButton').size() == 0) {
        var closeImgSrc = FeedbackSettings.feedbackCdn + "img/close_button.png"
        $('<div id="feedbackCloseButton"><img src="' + closeImgSrc + '" /></div>').appendTo('#feedbackContentDiv');

        if ($("html").attr("dir") == "rtl") {
            $('#feedbackCloseButton').css("left", "-35px");
        }
        else {
            $('#feedbackCloseButton').css("left", dialogWidth + 65 + "px");
        }

        $('#feedbackCloseButton').click(function () {
            executeAction(closeAction);
        });
    }
}

function iframeUrlChanged() {

    if (FeedbackGlobalVar.openFeedback) {
        // This is used to only open the pop up when the iframe is loaded and avoid show a white dialog.
        $('#feedbackContentDiv').dialog('open');
        FeedbackGlobalVar.openFeedback = false;
    }
    else {
        var newUrl = $("#modalIframeId").attr("src");
        executeAction(newUrl);
    }
}

function executeAction(actionString) {
    if (actionString.indexOf("Action=cancel_survey") >= 0) {
        closeFeedbackIframe();
        cancelSurveyForm();
    }
    else if (actionString.indexOf("Action=submit_survey") >= 0) {
        closeFeedbackIframe();
        surveySubmitLoad();
    }
    else if (actionString.indexOf("Action=cancel_feedback") >= 0) {
        closeFeedbackIframe();
    }
    else if (actionString.indexOf("Action=submit_feedback") >= 0) {
        closeFeedbackIframe();
    }
}

function closeFeedbackIframe() {
    // Close Iframe
    $("#modalIframeId").unbind("load", iframeUrlChanged);
    $('#modalIframeId').empty();
    $('#feedbackContentDiv').dialog('close');

    $('#feedbackCloseButton').remove();
}

function cancelSurveyForm() {

    setFeedbackCookie("Feedback_Cancel_Survey_Cookie", "1", 24);

    deleteFeedbackCookie("Feedback_Show_Survey_Session_Cookie");

    // Send user to the site they wanted to visit.
    if (FeedbackGlobalVar.navigateLoc != "") {
        window.location.href = FeedbackGlobalVar.navigateLoc;
    }
}

function surveySubmitLoad() {

    // Set cookie so user is not shown survey again
    if (FeedbackGlobalVar.surveyCookieTtl != 0)
        setFeedbackCookie("Feedback_Survey_Cookie", "1", FeedbackGlobalVar.surveyCookieTtl);

    deleteFeedbackCookie("Feedback_Show_Survey_Session_Cookie");

    // Send user to the site they wanted to visit.
    if (FeedbackGlobalVar.navigateLoc != "") {
        window.location.href = FeedbackGlobalVar.navigateLoc;
    }
}


function getRand() {
    return Math.floor(Math.random() * 100) + 1;
}


function checkFeedbackSurveyGoals(clientId, market) {

    if (readFeedbackCookie("Feedback_Cancel_Survey_Cookie") != null || readFeedbackCookie("Feedback_Survey_Cookie") != null) {
        return;
    }

    // For test check if force show cookie exists.
    if (readFeedbackCookie("Feedback_Force_Show_Survey") != null || readFeedbackCookie("Feedback_Show_Survey_Session_Cookie") != null) {
        if (readFeedbackCookie("Feedback_Internal_Domains_Cookie") == null) {
            getFeedbackSurveyGoals(clientId, market);
        }
        else {
            addFeedbackExitDomainCheck();
        }
        return;
    }

    if (readFeedbackCookie("Feedback_No_Survey_Session_Cookie") != null) {
        return;
    }


    var goal = readFeedbackCookie("Feedback_Goal_Expiration_Cookie");

    if (goal == null || readFeedbackCookie("Feedback_Internal_Domains_Cookie") == null) {
        getFeedbackSurveyGoals(clientId, market);
    }
    else {

        surveyOnExit = (getRand() <= goal);

        if (surveyOnExit) {
            //We want to show survey for this session so set cookie that expires in 1 hour
            setFeedbackCookie("Feedback_Show_Survey_Session_Cookie", "", 1);
            addFeedbackExitDomainCheck();
        }
        else {
            //Do not want to show survey for this session so set cookie that expires in 1 hour
            setFeedbackCookie("Feedback_No_Survey_Session_Cookie", "", 1);
        }
    }
}

function getFeedbackSurveyGoals(clientId, market) {

    var goalData = "cid=" + clientId + "&market=" + market;

    try {
        if ($.browser.msie) {
            xdr = new XDomainRequest();
            xdr.onload = processSurveyGoalsXdrResponse;
            xdr.open("get", FeedbackSettings.feedbackBaseUrl + "GetSurveyGoal" + "?" + goalData);
            xdr.send();
        }
        else {
            $.ajax({
                url: FeedbackSettings.feedbackBaseUrl + "GetSurveyGoal",
                cache: false,
                crossDomain: true,
                dataType: "json",
                data: goalData,
                success: function (goals) {
                    processSurveyGoalsResponse(goals);
                },
                error: function (request) {
                }
            });
        }
    }
    catch (e) { }
}

function processSurveyGoalsXdrResponse() {
    processSurveyGoalsResponse($.parseJSON(xdr.responseText));
}

function processSurveyGoalsResponse(goals) {
    var i = goals.Cookies.length - 1;
    
    if (i == -1) {
        // there's no cookies for this client.
        // Set Cancel cookie to avoid call survey goals again in the next month (720h)
        setFeedbackCookie("Feedback_Cancel_Survey_Cookie", "1", 720);
        return;
    }

    for (i; i >= 0; i--) {
        if (goals.Cookies[i].Name == "Feedback_Goal_Expiration_Cookie") {
            setFeedbackCookie(goals.Cookies[i].Name, goals.Goal, goals.Cookies[i].Ttl);
            break;
        }
    }

    setFeedbackCookie("Feedback_Internal_Domains_Cookie", goals.InternalDomains.join(","), goals.Cookies[i].Ttl);


    if (readFeedbackCookie("Feedback_Force_Show_Survey") != null) {
        addFeedbackExitDomainCheck();
        return;
    }

    surveyOnExit = (getRand() <= goals.Goal);

    i = goals.Cookies.length - 1;

    for (i; i >= 0; i--) {
        if (goals.Cookies[i].Name == "Feedback_Show_Survey_Session_Cookie" && surveyOnExit) {
            setFeedbackCookie(goals.Cookies[i].Name, "", goals.Cookies[i].Ttl);
            addFeedbackExitDomainCheck();
            break;
        }

        if (goals.Cookies[i].Name == "Feedback_No_Survey_Session_Cookie" && !surveyOnExit) {
            setFeedbackCookie(goals.Cookies[i].Name, "", goals.Cookies[i].Ttl);
            break;
        }
    }
}

function addFeedbackExitDomainCheck() {
    $("a").each(function () {
        $(this).click(function () {

            var domainStrings = readFeedbackCookie("Feedback_Internal_Domains_Cookie").split(/,/);

            var i = domainStrings.length - 1;

            var linkHref = $(this).attr('href');

            for (i; i >= 0 && linkHref != null; i--) {
                if (linkHref.indexOf(domainStrings[i]) >= 0)
                    return true;
            }

            if (linkHref == null || linkHref.indexOf(document.domain) >= 0 || linkHref.indexOf("javascript") >= 0 || linkHref.indexOf("http") != 0)
            { }
            else {
                FeedbackGlobalVar.navigateLoc = $(this).attr('href');
                showSurveyPopUp(FeedbackSettings.feedbackBaseUrl, FeedbackSettings.feedbackClientId, FeedbackSettings.feedbackExitSurveyId, FeedbackSettings.feedbackuserloggedIn, FeedbackSettings.feedbackMarket);
                return false;
            }
        });
    });
}


function setFeedbackCookie(name, value, ttlInHours) {
    var date = new Date();
    date.setTime(date.getTime() + (ttlInHours * 60 * 60 * 1000));

    var expires = "; expires=" + date.toGMTString();

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readFeedbackCookie(name) {
    var nameEQ = name;
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length + 1, c.length);
    }
    return null;
}

function deleteFeedbackCookie(name) {
    setFeedbackCookie(name, "", -100)
}

function bindMessageHandler() {
    $(window).bind('message', function (e) {
        executeAction(e.originalEvent.data);
    });
}


}
/*
     FILE ARCHIVED ON 21:45:07 Dec 31, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 18:30:34 Apr 26, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.599
  exclusion.robots: 0.018
  exclusion.robots.policy: 0.009
  esindex: 0.011
  cdx.remote: 14.514
  LoadShardBlock: 297.62 (6)
  PetaboxLoader3.datanode: 281.415 (8)
  PetaboxLoader3.resolve: 253.018 (3)
  load_resource: 280.283 (2)
*/