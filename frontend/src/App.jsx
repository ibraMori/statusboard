import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LoginForm from "./components/LoginForm.jsx";
import StatusBoard from "./components/StatusBoard.jsx";
import "./App.css";

const socket = io("http://localhost:5003", {
    transports: ["websocket"],
});

function App() {
    const [pseudo, setPseudo] = useState("");
    const [members, setMembers] = useState([]);
    const [events, setEvents] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        socket.on("connect", () => {
            setConnected(true);
        });

        socket.on("disconnect", () => {
            setConnected(false);
        });

        socket.on("members:update", (updatedMembers) => {
            setMembers(updatedMembers);
        });

        socket.on("events:update", (updatedEvents) => {
            setEvents(updatedEvents);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("members:update");
            socket.off("events:update");
        };
    }, []);

    if (!pseudo) {
        return <LoginForm socket={socket} onJoin={setPseudo} />;
    }

    return (
        <StatusBoard
            socket={socket}
            currentUser={pseudo}
            members={members}
            events={events}
            connected={connected}
        />
    );
}

export default App;