import _ from "lodash";

const init = () => {
    const socket = new WebSocket("ws://localhost:5000");

    // Connection opened
    socket.addEventListener("open", () => {
        socket.send("this is my messig");
    });

    // Listen for messages
    socket.addEventListener("message", ({data}) => {
        console.log("Message from server ", data);
    });
}

window.addEventListener("load", init);