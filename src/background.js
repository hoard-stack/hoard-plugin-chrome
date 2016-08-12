'use strict';

var linkManager = null;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var type = request.type;
        switch(type) {
            case "addLink":
                addLink(request.data);
                break;
            case "removeLink":
                removeLink(request.data);
                break;
            default:
                alert("Unknown message type: " + type);
                break;
        }
    }
);

function addLink(link) {
    var linkManager = getLinkManager();
    chrome.storage.local.get(['links'], function (storage) {
        if (typeof storage.links == 'undefined' || storage.links.length === 0) {
            storage.links = [];
        };
        var linkData = { id: uuid.v4(), url: link.url };
        storage.links.push(linkData);
        chrome.storage.local.set({ 'links': storage.links });
        linkManager.save([linkData]).then(function (response) {
        });
    });
};

function removeLink(link) {
    var linkManager = getLinkManager();
    linkManager.remove(link.id).then(function (response) {
    });
};

function getLinkManager() {
    if (linkManager === null) {
        linkManager = new LinkManager();
    }

    return linkManager;
}

