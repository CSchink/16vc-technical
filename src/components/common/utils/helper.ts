import { Message } from "ably";
import { handleException } from "./handle-error";
import { Task } from "src/api/schemas/tasks.schemas";

/**
 * Helper function to format Web Socket messages into
 * an array of Tasks
 * @param message
 * @returns array of messages formatted for display
 */
export const messageToTableFormatter = (messages: any): Task[] => {
  return messages
    .map((message: any) => {
      try {
        const data: Task = JSON.parse(message.data);
        return data.status !== "Deleted"
          ? {
              name: data.name,
              description: data.description ?? "",
              category: data.category,
              status: data.status ?? "",
              id: message.id,
            }
          : null;
      } catch (e) {
        handleException(e);
        return null;
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
    return null;
  }
};
