'use strict';

$( document ).ready(function() {
	var $conversation = $(".conversation");
	var $msgs = $conversation.find("._d97");
	var img_add = chrome.extension.getURL('content/images/black-hole.png');
	var img_added = chrome.extension.getURL('content/images/added.png');

	$(".conversation").on ("mouseover", "._4gx_", function(){
		var that = $(this).find("._d97");
		if ($(that).find("a").length > 0 && $(this).find(".added").length == 0)
		{
			if ($(that).parent().find('.addX').length == 0) {
				if ($(that).parent().parent().parent().parent().attr('data-tooltip-position') == 'right')
				{
					$(that).before('<div class="addX"><img src="' + img_add + '" class="hoard_add_image"><img src="' + img_added + '" class="hoard_added_image"></div>');
				}
				else
				{
					$(that).after('<div class="addX"><img src="' + img_add + '" class="hoard_add_image"><img src="' + img_added + '" class="hoard_added_image"></div>');
				}
			}
				$(that).parent().find('.addX').show("fast");

		}
	});
	var timer;

	$(".conversation").on ("mouseleave", "._4gx_", function() {
	    timer = setTimeout(doSomething(this), 10);
	}).mouseenter(function() {
	    clearTimeout(timer);
	});

	function doSomething(that) {
		  $(that).find('.addX').hide();
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
			$(this).find('.hoard_add_image').css("display","none");
			$(this).find('.hoard_added_image').css("display","block");
			$(this).delay(2000).fadeOut();
			$(this).addClass("added");
			var text = $(this).parent().find('._5yl5').text();
			var that = $(this);
			chrome.storage.local.get(['links'], function(storage) {
				if(typeof storage.links == 'undefined') {
					storage.links = [];
				};
				console.log (text);
				var $links = $("#links");
				// Write code that finds content of msg
				storage.links.push(text);
				chrome.storage.local.set({'links': storage.links});
				appendStorage(storage, $links);
			    var message = {
			        type: "linkAdded",
			        data: {
			            url: text
			        }
			    };
			    chrome.runtime.sendMessage(message);
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
