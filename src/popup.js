'use strict';

chrome.storage.local.get(['links'], function (storage) {
    appendStorage(storage);
});

function appendStorage(storage) {
    var $links = $("#links");
    if (typeof storage.links == 'undefined') {
        $links.empty();
        $links.append("The Hoard is empty");
        return;
    }
	else {
	    $links.empty();
	    //storage.local.set({ 'links': links });
	    //links.forEach(function (link, index) {
		//    appendLinkToList(link, index);
        //});

	    storage.links.forEach(function (link, index) {
	        appendLinkToList(link.url, index);
	    });
	}
}

function appendLinkToList(link, index) {
    var $links = $("#links");
    var item = '<li class="' + index + '"><a href="' + link + '" target="_blank">' + link + '</a><button class="delete">X</button></li>';
    $links.append(item);
}

$(function () {
    loadUser();
    //Amazing piece of code
    function loadUser() {
        var userManager = new UserManager();
        userManager.getUser().then(function (user) {
            if (user.email) {
                $("#user-status-unauthenticated").hide();
                $("#user-status-authenticated").show();
                $("#user-email").text(user.email);
            } else {
                $("#user-status-authenticated").hide();
                $("#user-status-unauthenticated").show();
                $("#user-email").text("");
            }
        });
    };

    function loadLinks() {
        var linkManager = new LinkManager();
        linkManager.getAll().then(function (links) {
            var $linksInfo = $("#links-info");
            $linksInfo.text("[fetched " + links.length + " link(s) from API]");
            links.forEach(function (link, index) {
                appendLinkToList(link.url, index);
            });
        });

        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendRequest(tab.id, { greeting: "hello" }, function (response) {
                chrome.storage.local.get(['links'], function (storage) {
                    //var fixedLinks = links.map(function (link) {
                    //    return link.url;
                    //});
                    //appendStorage(storage, fixedLinks);
                    appendStorage(storage);
                });
            });
        });
    };

    function syncLinks() {
        var linkManager = new LinkManager();
        chrome.storage.local.get(['links'], function (storage) {

            if (typeof storage.links == 'undefined' || storage.links.length === 0) {
                storage.links = [];
                alert("There are no links to be synced. Don't you have any friends on Facebook? :(");
                return;
            }

            linkManager.save(storage.links).then(function (response) {
                    //alert("Links have been synced!");
                });
        });
    };

    $("#sync-links").click(function() {
        syncLinks();
    });

    $("#load-links").click(function () {
        loadLinks();
    });

	$(document).on('click', '.delete', function(){
	  	var $number = $(this).parent().attr('class');
			chrome.storage.local.get(['links'], function(storage) {
				var $links = $("#links");
		    storage.links.splice($number, 1);
				var new_links = storage.links;

				chrome.storage.local.set({'links': new_links}, function() {
		        $links.append(new_links);
						$("#links").empty();
						$links.append('Item number ' + $number + 'deleted!');
						$links.append("<br>After deleting:");
						storage.links.forEach(function(link, index){
					  	var item = '<li class="' + index + '"><a href="' + link + '" target="_blank">' + link + '</a><button class="delete">X</button></li>';
					  	$links.append(item);
						});

				var message = {
					type: "removeLink",
					data: {
						id: ""
					}
				};
				chrome.runtime.sendMessage(message);
		    });

		});
	});

});
