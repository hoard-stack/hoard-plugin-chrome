import {LinkFetcher} from 'linkFetcher';
import {LinkStore} from 'linkStore';

export class LinkProcessor {

    process(){
        var linkFetcher = new LinkFetcher();
        var linkStore = new LinkStore();
        var links = linkFetcher.fetch();
        linkStore.store(links);
    }
}
