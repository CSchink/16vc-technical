import { useState } from "react";
import { ulid } from "ulid";
import * as Ably from "ably";
import { isEqual } from "lodash";
import { CHANNELS } from "../api/schemas/ws.schemas";
import iTools from "../api/utils/i-tools";
import { useChannel, useConnectionStateListener } from "ably/react";

export const useWS = () => {
  const [messages, setMessages] = useState<Ably.Message[]>([]);
  const [readyState, setReadyState] = useState<
    Ably.ConnectionStateChange | undefined
  >(undefined);
  const { publish } = useChannel(CHANNELS.tasks, (message) => {
    setMessages((prev) => [...prev, message]);
  });

  useConnectionStateListener((stateChange) => {
    console.log(stateChange.current); // the new connection state
    console.log(stateChange.previous); // the previous connection state
    console.log(stateChange.reason); // if applicable, an error indicating the reason for the connection state change
    console.log(readyState)
    setReadyState(stateChange);
  });

  const sendMessage = (messageText: any) => {
    iTools.log(`Sending message: ${messageText}`);
    publish(CHANNELS.tasks, { message: messageText });
  };

  const editMessage = (message: any) => {
    const update = messages.filter((msg) => !isEqual(msg, message));
    setMessages(update);
  };

  return {
    sendMessage,
    messageHistory: messages,
    data: messages
      .map((message: any) => {
        try {
          const data = JSON.parse(message);
          if (!data.id) data.id = ulid();
          return data;
        } catch (e) {
          if (e) {
            return null;
          }
        }
      })
      .filter(Boolean),
    editMessage,
  };
};
