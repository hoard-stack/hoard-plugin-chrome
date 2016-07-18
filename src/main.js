class LinkFetcher {

	fetch(){
		 var $conversation = $(".conversation");
		 var $links = $conversation.find("a");
		 var savedLinks = [];

		 $.each($links, function(index, link){
		 	var url = $(link).attr("href");
		 	var target = $(link).attr("target");
			if(!target || target !== "_blank")
				return;

		 	savedLinks.push(url);
		 });

		 return savedLinks;
	}
};

class LinkStore {

	constructor(){
		this.storageName = "hoard.links";
	}

	store(links){
 		chrome.storage.local.set({'links': links});
	}
}

class LinkProcessor {

	process(){
		 var linkFetcher = new LinkFetcher();
		 var linkStore = new LinkStore();
		 var links = linkFetcher.fetch();
		 linkStore.store(links);
	}
}

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
