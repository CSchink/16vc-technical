import { useWS } from "../../hooks/use-web-sockets";
import { useMemo } from "react";
import { ulid } from "ulid";
import { Task } from "../../api/schemas/tasks.schemas";
import ProjectDataTable from "../common/project-data-table";
import { AddTask } from "./mutate-tasks";

const messageToTableFormatter = (message: any) => {
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

const TaskView = () => {
  const { messageHistory, sendMessage } = useWS();
  const data = useMemo(() => messageToTableFormatter(messageHistory), [
    messageHistory,
  ]);

  const handleTaskSubmit = (task: Task): void => {
    sendMessage(JSON.stringify(task));
  };

  const columns = [
    {
      accessor: "name",
    },
    {
      accessor: "category",
    },
    {
      accessor: "description",
    },
  ];

  return (
    <>
      <AddTask onSubmit={handleTaskSubmit} />
      <ProjectDataTable data={data ?? []} columns={columns ?? []} />
    </>
  );
};


export default TaskView;
