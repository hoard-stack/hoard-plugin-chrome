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
 		localStorage.setItem(this.storageName, JSON.stringify(links));
	}

	get(){
		var links = localStorage.getItem(this.storageName);

		return JSON.stringify(links);
	}
}

class LinkProcessor {

	process(){
		 var linkFetcher = new LinkFetcher();
		 var linkStore = new LinkStore();
		 var links = linkFetcher.fetch();
		 linkStore.store(links);
		 var storedLinks = linkStore.get();
		 console.log(storedLinks);
	}
}

var linkProcessor = new LinkProcessor();
setInterval(linkProcessor.process, 1000);
