import { Message } from "ably";
import { handleException } from "./handle-error";
import { Task } from "../../../api/schemas/tasks.schemas";
import { ulid } from "ulid";
/**
 * Helper function to format Web Socket messages into
 * an array of Tasks
 * @param message
 * @returns array of messages formatted for display
 */
export const formatMessages = (messages: Message[]): Message[] => {
  return messages
    .map((message: any) => {
      try {
        const data = getMessage(message);
        if (data.status === "Deleted") {
          return null;
        }
        const id = ulid();
        if (!data.id) data.id = id;
        message.id = id;
        return message;
      } catch (e) {
        if (e) {
          return null;
        }
      }
    })
    .filter(Boolean);
};

/**
 * Helper function to format Web Socket messages into
 * an array of Tasks
 * @param message
 * @returns array of messages formatted for display
 */
export const formatMessagesForUI = (messages: Message[]): Task[] => {
  return messages
    .map((message: any) => {
      try {
        const data = getMessage(message);
        if (data.status === "Deleted") {
          return null;
        }
        const id = message.id;
        console.log(id);
        if (!data.id) data.id = id;
        console.log(id, data.id);
        return data;
      } catch (e) {
        if (e) {
          return null;
        }
      }
    })
    .filter(Boolean);
};

export const uniqueValues = (array: any[], key: string | number) => {
  return [...new Map(array.map((item: any) => [item[key], item])).values()];
};

export const getMessage = (message: Message) => {
  try {
    return JSON.parse(message.data.message);
  } catch (e) {
    handleException(e);
    return message;
  }
};
