class LinkManager {

    constructor() {
        this.url = "http://localhost/me/links";
    }

    getAll() {
        return $.get(this.url, function (links) {
            return links;
        }).fail(function () {
            alert("There was an error while trying to load the links.");
        });
    }

    save(links) {
        var data = links.map(function (link) {
            return { url: link };
        });

        return jQuery.ajax({
            url: this.url,
            type: "POST",
            data: JSON.stringify({ links: data }),
            contentType: "application/json",
            success: function (response) {
                return response;
            }
        });
    }
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var type = request.type;
        switch(type) {
            case "linkAdded":
                addLink(request.data);
                break;
            default:
                alert("Unknown message type: " + type);
                break;
        }
    }
);

//TODO: Process link parameter instead of whole storage.links collection. 
function addLink(link) {
    var linkManager = new LinkManager();
    chrome.storage.local.get(['links'], function (storage) {
        if (typeof storage.links == 'undefined' || storage.links.length === 0) {
            storage.links = [];
            alert("There are no links to be synced. Don't you have any friends on Facebook? :(");
            return;
        }
        linkManager.save(storage.links).then(function (response) {
            //alert("Links have been synced!");
        });
    });
}