import { useState } from "react";
import { ulid } from "ulid";
import * as Ably from "ably";
import { isEqual } from "lodash";
import { CHANNELS } from "../api/schemas/ws.schemas";
import { useChannel } from "ably/react";

export const useWS = () => {
  const [messages, setMessages] = useState<Ably.Message[]>([]);
  const { publish } = useChannel(CHANNELS.tasks, (message) => {
    setMessages((prev) => [...prev, message]);
  });
  const sendMessage = (messageText: any) => {
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
