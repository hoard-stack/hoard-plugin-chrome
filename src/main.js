'use strict';

$( document ).ready(function() {
	var $conversation = $(".conversation");
	var $msgs = $conversation.find("._d97");
	var img_rocket = chrome.extension.getURL('content/images/rakieta.png');

	$msgs.before('<div class="addX"><img src="' + img_rocket + '" class="hoard_add_image">Hoard it!</div>');

	$(".conversation .addX, .conversation ._d97").mouseover( function(){
			$(this).parent().find('.addX').show();
			 $(this).on('click', function(){
				 var $li = $(this).find("a");
				 var url = $li.attr("href");
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
	var timer;

	$(".conversation .addX, .conversation ._d97").mouseleave(function() {
	    timer = setTimeout(doSomething(this), 10);
	}).mouseenter(function() {
	    clearTimeout(timer);
	});

	function doSomething(that) {
		  $(that).parent().find('.addX').hide();
	}
	// $(".conversation .addX").mouseout( function(){
	// 	console.log("poszlo");
	// 		 $(this).css('cursor','normal');
	// 		 $(this).hide();
	// });
	// $(".conversation ._d97").mouseout( function(){
	// 	console.log("poszlo");
	// 		 $(this).parent().find('.addX').hide();
	// });

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
	$(document).on('click', '.addX', function(){
			var $tekst = $(this).parent().find('._5yl5').text();
			chrome.storage.local.get(['links'], function(storage) {
				if(typeof storage.links == 'undefined') {
					storage.links = [];
				};
				console.log ($tekst);
				var $links = $("#links");
				// Write code that finds content of msg
				storage.links.push($tekst);
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
