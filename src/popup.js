chrome.storage.local.get(['links'], function(storage) {
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

$(function(){
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
