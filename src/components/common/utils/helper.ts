import { ulid } from "ulid";

export const messageToTableFormatter = (message: any) => {
  return message
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
        console.error(e);
        return null;
      }
    })
    .filter(Boolean);
};

export const getFormObject = () => {
    
}