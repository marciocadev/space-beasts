import { useAtom, atom } from "jotai";
import { w3cwebsocket } from "websocket";
import { useEffect } from "react";

const URL = "wss://674yswgfv2.execute-api.us-east-1.amazonaws.com/prod/";
export const socket = new w3cwebsocket(URL);
export const charactersAtom = atom([]);

export const SocketManager = () => {
  const [characters, setCharacters] = useAtom(charactersAtom);

  useEffect(() => {
    const handleSocketMessage = (e) => {
      setCharacters(JSON.parse(e.data));
    };

    const handleSocketOpen = (e) => {
      console.log("connected");
      if (socket.readyState === socket.OPEN) {
        socket.send("characters");
      }
    };

    const handleSocketClose = () => {
      console.log("disconnected");
    };

    socket.onopen = handleSocketOpen;
    socket.onclose = handleSocketClose;
    socket.onmessage = handleSocketMessage;

    return () => {
      // Cleanup: Unsubscribe from socket events when the component unmounts
      socket.onopen = null;
      socket.onclose = null;
      socket.onmessage = null;
    };
  }, [setCharacters]);
}