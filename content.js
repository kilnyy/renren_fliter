$(".feed-list").bind("DOMSubtreeModified", function() {
    console.log("change");
    refreshHide();
});

function refreshHide(){
    if($("#hideToggle").is(':checked')){
        var url = chrome.extension.getURL("on.png");
        $("label[for='hideToggle'] img").attr("src", url);
        chrome.extension.sendRequest({method: "getRules"}, function(rules) {
            if (!rules) return;
            $(".feed-list article h3,.feed-list article .content").each(function(){
                for (i=0; i<rules.length; i++) {
                    var reg = new RegExp(rules[i]);
                    if (this.innerHTML.search(reg) != -1) {
                        $(this.parentNode).css("display", "none");
                        break;
                    };
                }
            });
        });
    } else {
        var url = chrome.extension.getURL("off.png");
        $("label[for='hideToggle'] img").attr("src", url);
        $(".feed-list article").css("display", "block");
    }
}

$(document).ready(function(){
    refreshHide();
    url = chrome.extension.getURL("hint.css");
    $("head").append('<link rel="stylesheet" type="text/css" href="' + url + '" />');
    $("#navMessage").append('<label for="hideToggle"><img /></label>');

    $("#navMessage").css("padding-right", "30px");
    var label = $("label[for='hideToggle']");
    label.height("31");
    label.width("31");
    label.css("position", "absolute");
    label.css("float", "left");
    label.attr("data-hint", "在这里切换是否进行过滤");
    label.addClass("hint--bottom hint--rounded");
    
    if (!localStorage.hide) {
        label.addClass("hint--always");
        localStorage.hide = "true";
    } else {
        if (localStorage.hide=="true") {
            $("#navMessage").append('<input type="checkbox" id="hideToggle" style="display:none" checked/>');
        } else {
            $("#navMessage").append('<input type="checkbox" id="hideToggle" style="display:none"/>');
        }
    }

    label.hover(
        function(){
            $(this).removeClass("hint--always");
            $(this).addClass("on");
        },
        function(){
            $(this).removeClass("on");
        }
    );
        $("label[for='hideToggle'] img").css("margin", "7px 6px 0 4px");
    $("#hideToggle").click(function(){
        if (localStorage.hide == "true") {
            localStorage.hide = "false";
        } else {
            localStorage.hide = "true";
        };
        refreshHide();    
    });
});

if (window == top) {
    chrome.extension.onRequest.addListener(
        function(req, sender, sendResponse) {
            sendResponse(checkURL());
    });
}

var checkURL = function() {
    var url = document.URL;
    if (url.match("www.renren.com")) return true;
    else return null;
}
