'use strict';

class UserManager {

    constructor() {
        this.url = "http://localhost/me";
    }

    isAuthenticated() {
        getUser().then(function (user) {
            return user.email !== "";
        });
    }

    getUser() {
        return $.get(this.url, function (user) {
            return user;
        }).fail(function () {
            alert("There was an error while trying to load the user.");
        });
    }
}