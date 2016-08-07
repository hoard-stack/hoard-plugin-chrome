'use strict';

class LinkFetcher {

    fetch() {
        var $conversation = $(".conversation");
        var $links = $conversation.find("a");
        var savedLinks = [];
        var parser = new LinkParser();

        $.each($links,
            function(index, link) {
                var url = $(link).attr("href");
                var target = $(link).attr("target");
                if (!target || target !== "_blank")
                    return;
                if (!parser || !parser.parse)
                    return;

                var parsedLink = parser.parse(url);
                savedLinks.push(parsedLink);
            });

        return savedLinks;
    }
};
