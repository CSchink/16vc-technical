import { useState, useEffect } from "react";
import { ulid } from "ulid";
import * as Ably from "ably";
import { isEqual } from "lodash";
import { CHANNELS } from "src/api/schemas/ws.schemas";

const optionalClientId = "optionalClientId";
const authUrl = `/.netlify/functions/auth?clientId=${optionalClientId}`;
export const useWS = () => {
  const [messages, setMessages] = useState<Ably.InboundMessage[]>([]);
  const [outgoing, setOutgoing] = useState<any>([]);

  const sendMessage = (messageText: any) => {
    setOutgoing([...outgoing, messageText]);
  };

  const editMessage = (message: any) => {
    const update = messages.filter((msg) => !isEqual(msg, message));
    setMessages(update);
  };

  useEffect(() => {
    if (outgoing.length) {
      const ably = new Ably.Realtime({
        authUrl,
      });
      const channel = ably.channels.get(CHANNELS.tasks);

      channel.publish({ name: "message", data: outgoing[0] });
    }
  });

  useEffect(() => {
    const ably = new Ably.Realtime({
      authUrl,
    });
    const channel = ably.channels.get("my-channel");

    channel.subscribe("message", (message: Ably.InboundMessage) => {
      setMessages([...messages, message.data]);
    });

    return () => {
      channel.unsubscribe();
      ably.close();
    };
  }, []);
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
