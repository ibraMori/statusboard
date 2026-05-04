import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let members = [];
let events = [];

function getTime() {
    return new Date().toLocaleTimeString("fr-CA", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function addEvent(text, status = "En ligne") {
    events.push({
        text,
        status,
        time: getTime()
    });

    io.emit("events:update", events);
}

app.get("/", (req, res) => {
    res.send("StatusBoard backend running");
});

io.on("connection", (socket) => {
    console.log("Socket connecté :", socket.id);

    socket.emit("members:update", members);
    socket.emit("events:update", events);

    socket.on("user:join", ({ pseudo }) => {
        if (!pseudo || !pseudo.trim()) return;

        const member = {
            id: socket.id,
            name: pseudo.trim(),
            status: "En ligne"
        };

        members.push(member);

        io.emit("members:update", members);
        addEvent(`${member.name} a rejoint le board`, "En ligne");
    });

    socket.on("status:change", ({ status }) => {
        const member = members.find((m) => m.id === socket.id);
        if (!member) return;

        member.status = status;

        io.emit("members:update", members);
        addEvent(`${member.name} → ${status}`, status);
    });

    socket.on("disconnect", () => {
        const member = members.find((m) => m.id === socket.id);

        if (member) {
            members = members.filter((m) => m.id !== socket.id);
            io.emit("members:update", members);
            addEvent(`${member.name} a quitté le board`, "Occupé");
        }
    });
});

server.listen(5003, "0.0.0.0", () => {
    console.log("Server listening on port 5003");
});