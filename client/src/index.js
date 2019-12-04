import $ from "jquery";
import Sock from "./Sock";

const Game = {
    WIDTH: 40,
    HEIGHT: 40,
    SCALE: 10
}

// CLIENT

const init = room => {
    const canvas = $("#canvas")[0];
    canvas.width = Game.WIDTH * Game.SCALE;
    canvas.height = Game.HEIGHT * Game.SCALE;
    const context = canvas.getContext("2d");

    $("#start").on("click", () => {
        room.emit("start");
    });

    $(window).on("keydown", ({which}) => {
        const playerId = $("#playerId").val();

        const direction = ["left", "up", "right", "down"][which - 37];

        if(direction) room.emit("turn", {direction, playerId});
    });

    room.on("tick", bodies => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for(const {x, y} of bodies) {
            context.fillRect(x * Game.SCALE, y * Game.SCALE, Game.SCALE, Game.SCALE);
        }
    });
}

$(document).ready(async () => {
    const sock = new Sock({url: "ws://localhost:5000"});
    await sock.init();

    $("#button-container").css("visibility", "visible");

    $("#create").on("click", () => {
        sock.emit("create");
    });

    $("#join").on("click", () => {
        const playerId = $("#playerId").val();
        sock.emit("join", playerId);
    });

    sock.on("room", async channel => {
        console.log("Got room");

        const room = new Sock({url: "ws://localhost:5000", channel});
        await room.init();

        console.log("Joined room");

        init(room);
    })
});