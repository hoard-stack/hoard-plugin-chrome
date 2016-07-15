$(function(){
	$("#load-links").click(function(){
		chrome.storage.sync.get(['links'], function(storage) {
 		 	  var $links = $("#links");
			  storage.links.forEach(function(link){
			  	var item = '<li><a href="' + link + '" target="_blank">' + link + '</a></li>';
			  	$links.append(item);
			});
		});
	});
});



