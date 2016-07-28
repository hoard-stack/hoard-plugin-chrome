'use strict';

class LinkParser {

    resolve(link) {
        var parser = new DefaultLinkParser();
        if (!link || link.length === 0 || !link.trim())
            parser = new EmptyLinkParser();
        else if (link.indexOf("faceboook") >= 0)
            parser = new FacebookLinkParser();
        else if (link.indexOf("instagram") >= 0)
            parser = new InstagramLinkParser();
            
        return parser.parse(link);
    }
}
