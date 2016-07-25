export class LinkFetcher {

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
