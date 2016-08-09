'use strict';

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
};

//TODO: Store a whole link object (id, url etc.) in the storage.
function removeLink(id) {
};

