import { ulid } from "ulid";
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
        const data = JSON.parse(message.data);
        return {
          name: data.name,
          description: data.description,
          category: data.category,
          id: ulid(),
        };
      } catch (e) {
        handleException(e);
        return null;
      }
    })
    .filter(Boolean);
};
