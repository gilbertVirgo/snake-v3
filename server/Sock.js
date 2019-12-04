const WebSocket = require("ws");

const Sock = function({socket, url, channel}) {
    if(socket) {
        this.socket = socket;
    } else {
        this.url = url;
        this.channel = channel;

        this.socket = new WebSocket(this.channel ? `${this.url}/${this.channel}` : this.url);
    }

    // I've just realised that you don't need to create a new socket for every room on the server,
    // but you do on the client. Need to adjust for this!

    this.listeners = {error: error => console.error(error)};

    this.messageHandler = function(data) {
        const [func, args] = JSON.parse(data);

        if(typeof this.listeners[func] === "function") {
            this.listeners[func](...args);
        } else {
            console.log(`There is no function ${func} bro`, this.listeners);
        }
    }

    this.init = async function() {
        await new Promise(resolve => {
            if(!this.socket.OPEN) {
                this.socket.on("open", resolve);
            } else resolve();
        });

        this.socket.on("message", this.messageHandler.bind(this));

        return this;
    }

    this.on = function(event, cb) {
        console.log(`New event listener for ${event}`)
        this.listeners = {[event]: cb, ...this.listeners};
    }

    this.emit = function(func) {
        let args = [...arguments].slice(1);
        
        this.socket.send(JSON.stringify([func, args]));
    }
}

module.exports = Sock;