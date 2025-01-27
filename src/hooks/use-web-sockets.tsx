import { useCallback, useEffect, useState } from "react";
import * as Ably from "ably";
import { CHANNELS } from "../api/schemas/ws.schemas";
import iTools from "../api/utils/i-tools";
import { useChannel, useConnectionStateListener } from "ably/react";
import {
  formatMessages,
  formatMessagesForUI,
  getMessage,
} from "../components/common/utils/helper";

export const useWS = () => {
  const [messages, setMessages] = useState<Ably.Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [readyState, setReadyState] = useState<
    Ably.ConnectionStateChange | undefined
  >(undefined);
  const { publish, channel } = useChannel(CHANNELS.tasks);

  useConnectionStateListener((stateChange) => {
    if (stateChange) {
      setReadyState(stateChange);
    }
  });

  const getMessages = useCallback(async () => {
    await channel.subscribe(CHANNELS.tasks, (msg: Ably.Message) => {
      iTools.log(`Receiving message: ${msg}`);
      const data = getMessage(msg);
      if (data.edit) {
        const update = messages.filter((msg) => {
          return msg.id !== data.edit.id;
        });
        setLoading(true);
        setMessages(formatMessages([msg, ...update]));
        setLoading(false);
        return;
      }
      setLoading(true);
      setMessages((prev) => formatMessages([...prev, msg]));
      setLoading(false);
    });
  }, [channel, messages]);

  useEffect(() => {
    getMessages();
    return () => {
      channel.unsubscribe();
    };
  }, [readyState, channel, messages, getMessages]);

  const sendMessage = (messageText: any) => {
    iTools.log(`Sending message: ${messageText}`);
    publish(CHANNELS.tasks, { message: messageText });
  };

  const editMessage = async (message: any) => {
    console.log(message)
    message.edit = {
      id: message.id,
      action: message.status === "Deleted" ? "DELETE" : "EDIT",
    };
    sendMessage(JSON.stringify(message));
  };

  return {
    sendMessage,
    messageHistory: messages,
    data: loading ? [] : formatMessagesForUI(messages),
    editMessage,
    loading,
  };
};
