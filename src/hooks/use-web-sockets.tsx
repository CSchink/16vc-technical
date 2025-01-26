import { useEffect, useState } from "react";
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
  const { publish, channel } = useChannel(CHANNELS.tasks, (message) => {
    setMessages((prev) => [...prev, message]);
  });

  useConnectionStateListener((stateChange) => {
    console.log(readyState);
    console.log(channel);
    if (readyState) {
      setReadyState(stateChange);
    }
  });

  useEffect(() => {
    const getMessages = async () => {
      await channel.subscribe((msg: Ably.Message) => {
        console.log("Ably message received", msg);
      });
    };
    if (readyState) {
      getMessages();
    }
  }, [readyState, channel]);

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
          const data = JSON.parse(message.data.message);
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
