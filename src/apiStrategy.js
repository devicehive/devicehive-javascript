/**
* @event onMessage
*/
class APIStrategy extends EventEmitter {

    /**
     * APIStrategy
     */
    constructor(urls) {
        this.strategy = getType(urls.mainServiceURL);
    }
    
    /**
     * Returns current API
     * 
     * @returns 
     */
    getType(url) {
        let parsedURL;
        if (url) parsedURL = url.match(/^([a-z]{1,5}):\/\//);
        if (!parsedURL || !parsedURL[1]) return;
        const protocol = parsedURL[1].toLowerCase();
        switch (protocol) {
            case url.startsWith('http'): {
                return Rest;
                break;
            }

            case url.startsWith('https'): {
                return Rest;
                break;
            }

            case url.startsWith('ws'): {
                return WS;
                break;
            }

            default: {
                return;
                break;
            }
        }
    }

    /**
     * Sending data
     * @param {object} data 
     */
    send(data) {
        return this.strategy.send(data);
    }

}