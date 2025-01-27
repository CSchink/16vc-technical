import { useEffect, useState } from "react";
import * as Ably from "ably";
import { isEqual } from "lodash";
import { CHANNELS } from "../api/schemas/ws.schemas";
import iTools from "../api/utils/i-tools";
import { useChannel, useConnectionStateListener } from "ably/react";
import { getMessage, uniqueValues } from "../components/common/utils/helper";

export const useWS = () => {
  const [messages, setMessages] = useState<Ably.Message[]>([]);
  const [readyState, setReadyState] = useState<
    Ably.ConnectionStateChange | undefined
  >(undefined);
  const { publish, channel } = useChannel(CHANNELS.tasks, (message) => {
    iTools.log(JSON.stringify(message));
  });

  useConnectionStateListener((stateChange) => {
    if (readyState) {
      setReadyState(stateChange);
    }
  });

  useEffect(() => {
    const getMessages = async () => {
      await channel.subscribe(CHANNELS.tasks, (msg: Ably.Message) => {
        iTools.log(`Receiving message: ${msg}`);
        setMessages((prev) => uniqueValues([...prev, msg], "id"));
      });
    };
    getMessages();
  }, [readyState, channel]);

  const sendMessage = (messageText: any) => {
    iTools.log(`Sending message: ${messageText}`);
    publish(CHANNELS.tasks, { message: messageText });
  };

  const editMessage = async (message: any) => {
    const update = messages.filter((msg) => {
      const objectFormat = getMessage(msg);
      console.log(
        isEqual(objectFormat.id, message.id),
        objectFormat.id,
        message.id
      );
      return !isEqual(objectFormat.id, message.id);
    });
    setMessages(update);
    const targetMessage = messages.find((msg) => {
      const objectFormat = getMessage(msg);
      return isEqual(objectFormat.id, message.id);
    });
    await channel.presence.update({
      message: targetMessage,
      messageId: targetMessage?.id,
    });
  };

  return {
    sendMessage,
    messageHistory: messages,
    data: messages
      .map((message: any) => {
        try {
          const data = getMessage(message);
          console.log(data.id);
          if (data.status === "Deleted") {
            return null;
          }
          const id = message.id;
          if (!data.id) data.id = id;
          if (!message.id) message.id = id;
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
