import { useState, useEffect } from "react";
import { ulid } from "ulid";
import * as Ably from "ably";
import { isEqual } from "lodash";
import { CHANNELS } from "..//api/schemas/ws.schemas";
import iTools from "src/api/utils/i-tools";

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
      iTools.log(`Publishing message:${outgoing[0]}`);
      channel.publish({ name: "message", data: outgoing[0] });
    }
  });

  useEffect(() => {
    const ably = new Ably.Realtime({
      authUrl,
    });
    const channel = ably.channels.get(CHANNELS.tasks);

    channel.subscribe("message", (message: Ably.InboundMessage) => {
      setMessages([...messages, message.data]);
    });
    iTools.log(`Found messages: ${messages}`);

    return () => {
      channel.unsubscribe();
      ably.close();
      iTools.log("Closing connection");
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
