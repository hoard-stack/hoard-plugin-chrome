'use strict';

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

        return $.ajax({
            url: this.url,
            type: "POST",
            data: JSON.stringify({ links: data }),
            contentType: "application/json",
            success: function (response) {
                return response;
            }
        });
    }

    remove(id) {
        return $.ajax({
            url: this.url + "/" + id,
            type: "DELETE",
            success: function (response) {
                return response;
            }
        });
    }
}