/**
 * Unsupported Transport Error
 */
class WebSocketError extends Error {

    /**
     * Creates WebSocketError
     */
    constructor(error) {
        super();

        this.message = `Error using WebSocket.\nPlease, check server URL or try again later.\n${error.message}`;
    }
}

module.exports = WebSocketError;