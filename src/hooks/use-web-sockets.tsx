import { useState, useEffect } from "react";
import { messageToTableFormatter } from "../components/common/utils/helper";
import { ulid } from "ulid";
import * as Ably from "ably";
import { isEqual } from "lodash";

const clientId = "optional";

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
        authUrl: `/netlify/functions
    /index.ts`,
      });
      const channel = ably.channels.get("my-channel");

      channel.publish({ name: "message", data: outgoing[0] });
    }
  });

  useEffect(() => {
    const ably = new Ably.Realtime({
      authUrl: `/netlify/functions
  /index.ts`,
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
    data: messageToTableFormatter(
      messages.map((message: any) => {
        if (!message.id) message.id = ulid();
        return message;
      })
    ),
    editMessage,
  };
};
