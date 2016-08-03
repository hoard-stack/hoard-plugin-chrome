'use strict';

class UserManager {

    constructor() {
    }

    isAuthenticated() {
        getUser().then(function (user) {
            return user.email !== "";
        });
    }

    getUser() {
        return $.get("http://localhost/authinfo", function (user) {
            return user;
        }).fail(function () {
            alert("There was an error while trying to load the user.");
        });
    }
}


chrome.storage.local.get(['links'], function (storage) {
		var $links = $("#links");
		appendStorage(storage, $links);
});

function appendStorage(storage, $links){
	if (typeof storage.links == 'undefined')
	{
		$links.empty();
		$links.append("The Hoard is empty");
		return;
	}
	else {
		$links.empty();
		storage.links.forEach(function(link, index){
			var item = '<li class="' + index + '"><a href="' + link + '" target="_blank">' + link + '</a><button class="delete">X</button></li>';
			$links.append(item);
		});
	
	}
}

$(function () {
    //Amazing piece of code
    loadUser();
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

	$("#load-links").click(function(){
		 chrome.tabs.getSelected(null, function(tab) {
		    chrome.tabs.sendRequest(tab.id, {greeting: "hello"}, function(response) {
					chrome.storage.local.get(['links'], function(storage) {
			 		 	  var $links = $("#links");
							appendStorage(storage, $links);
					});

		    });
		  });
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
		    });

		});
	});

});
