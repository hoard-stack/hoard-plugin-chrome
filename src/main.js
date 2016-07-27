'use strict';

$( document ).ready(function() {
	var $conversation = $(".conversation");
	var $msgs2 = $conversation.find("._5wd9");

	$.each($msgs2, function(index, msg){
		 var img_add = chrome.extension.getURL('content/images/add.png');
		 $(msg).after( "<div class='hoard_add'><img src='" + img_add + "' class='hoard_add_image'></div>" );
	});
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
	$(document).on('click', '.hoard_add', function(){
			chrome.storage.local.get(['links'], function(storage) {
				if(typeof storage.links == 'undefined') {
					storage.links = [];
				}
				var $links = $("#links");
				console.log(storage);
				// Write code that finds content of msg
				//	var $tekst = $(this).siblings().find('._5yl5').find('span');
				//console.log($tekst);
				storage.links.push("link");
				chrome.storage.local.set({'links': storage.links});
				appendStorage(storage, $links);
		});
	});

});


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
if (request.greeting == "hello")
{
		var linkProcessor = new LinkProcessor();
		linkProcessor.process(function(){
			console.log(this);
		});
		var ReqDat = 'Wczytano linki';
    sendResponse({farewell: ReqDat});
}

else
    sendResponse({}); // snub them.
 });
