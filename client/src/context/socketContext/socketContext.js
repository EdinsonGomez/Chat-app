import { createContext, useContext } from "react";
import io from "socket.io-client";

export const socket = io('/');

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
}