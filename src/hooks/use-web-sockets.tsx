import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ulid } from "ulid";

export const useWS = () => {
  const socketUrl = "wss://echo.websocket.org";
  const [messageHistory, setMessageHistory] = useState<MessageEvent<unknown>[]>(
    []
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return {
    connectionStatus,
    sendMessage,
    messageHistory: messageHistory.map((message: any) => {
      if (!message.id) message.id = ulid();
      return message;
    }),
    setMessageHistory,
  };
};
