'use strict';

$( document ).ready(function() {
	var $conversation = $(".conversation");
	var $msgs = $conversation.find("._d97");


	$(".conversation").on("mouseenter", '._d97', function(){
			$(this).css('background-color','#81bb81');
			$(this).css('cursor','pointer');
			 var img_add = chrome.extension.getURL('content/images/add.png');
			 $(this).on('click', function(){
				 var $li = $(this).find("a");
				 var url = $li.attr("href");
				 console.log(url);
					chrome.storage.local.get(['links'], function(storage) {
						if(typeof storage.links == 'undefined') {
							storage.links = [];
						}
						var $links = $("#links");
						storage.links.push(url);
						chrome.storage.local.set({'links': storage.links});
						appendStorage(storage, $links);
				});
			});

			// $(this).after( "<div class='hoard_add'><img src='" + img_add + "' class='hoard_add_image'></div>" );
	});
	$(".conversation").on("mouseleave", '._d97', function(){
			 $(this).css('background-color', 'initial');
			 $(this).css('cursor','normal');
		//	 $(this).parent().find('.hoard_add').remove();
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
