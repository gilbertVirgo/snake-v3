const Sock = function({url, channel}) {
    this.url = url;
    this.channel = channel;
    this.listeners = {error: console.error};

    this.messageHandler = function({data}) {
        console.log("Recieved", {data});

        const [func, args] = JSON.parse(data);

        this.listeners[func](...args);
    }

    this.init = function() {
        return new Promise(resolve => {
            this.socket = new WebSocket(this.channel ? `${this.url}/${this.channel}` : this.url);

            this.socket.addEventListener("message", this.messageHandler.bind(this));
            this.socket.addEventListener("open", resolve);
        });
    }

    this.on = function(event, cb) {
        this.listeners = {...this.listeners, [event]: cb};
    }

    this.emit = function(func) {
        let args = [...arguments].slice(1);
        
        this.socket.send(JSON.stringify([func, args]));
    }

    this.close = function() {
        this.socket.close();
    }
}

export default Sock;