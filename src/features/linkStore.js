export class LinkStore {

    constructor(){
        this.storageName = "hoard.links";
    }

    store(links){
        chrome.storage.local.set({'links': links});
    }
}
