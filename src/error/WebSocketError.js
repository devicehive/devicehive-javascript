/**
 * Unsupported Transport Error
 */
class WebSocketError extends Error {

    /**
     * Creates WebSocketError
     */
    constructor() {
        super();

        this.message = `Error using WebSocket.\nPlease, check server URL or try again later.`;
    }
}

module.exports = WebSocketError;