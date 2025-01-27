import { useEffect, useState } from "react";
import * as Ably from "ably";
import { CHANNELS } from "../api/schemas/ws.schemas";
import iTools from "../api/utils/i-tools";
import { useChannel, useConnectionStateListener } from "ably/react";
import {
  formatMessages,
  formatMessagesForUI,
  getMessage,
  uniqueValues,
} from "../components/common/utils/helper";

export const useWS = () => {
  const [messages, setMessages] = useState<Ably.Message[]>([]);
  const [readyState, setReadyState] = useState<
    Ably.ConnectionStateChange | undefined
  >(undefined);
  const { publish, channel } = useChannel(CHANNELS.tasks, (message) => {
    iTools.log(JSON.stringify(message));
  });

  useConnectionStateListener((stateChange) => {
    if (stateChange) {
      setReadyState(stateChange);
    }
  });

  useEffect(() => {
    const getMessages = async () => {
      await channel.subscribe(CHANNELS.tasks, (msg: Ably.Message) => {
        iTools.log(`Receiving message: ${msg}`);
        const data = getMessage(msg);
        if (data.edit) {
          const update = messages.filter((msg) => {
            console.log(msg.id !== data.edit.id);
            return msg.id !== data.edit.id;
          });
          setMessages(formatMessages([msg, ...update]));
          return;
        }
        setMessages((prev) => formatMessages([...prev, msg]));
      });
    };
    getMessages();
  }, [readyState, channel, messages]);

  const sendMessage = (messageText: any) => {
    iTools.log(`Sending message: ${messageText}`);
    publish(CHANNELS.tasks, { message: messageText });
  };

  const editMessage = async (message: any) => {
    const targetMessage = messages.find((msg) => {
      const objectFormat = getMessage(msg);
      console.log(objectFormat);
      return objectFormat.id === message.id;
    });
    message.edit = {
      id: targetMessage?.id,
      action: message.status === "Deleted" ? "DELETE" : "EDIT",
    };
    sendMessage(JSON.stringify(message));
  };

  return {
    sendMessage,
    messageHistory: messages,
    data: uniqueValues(formatMessagesForUI(messages), "id"),
    editMessage,
  };
};
