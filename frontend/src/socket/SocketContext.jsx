import { createContext } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003");

export const SocketContext = createContext(socket);

export default socket;