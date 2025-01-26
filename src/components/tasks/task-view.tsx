import { useWS } from "../../hooks/use-web-sockets";
import { useMemo, useState } from "react";
import { Task } from "../../api/schemas/tasks.schemas";
import ProjectDataTable from "../common/table/project-data-table";
import { MutateTask } from "./mutate-tasks";
import { Stack } from "@mantine/core";
import { messageToTableFormatter } from "../common/utils/helper";
import { TableColumn } from "src/api/schemas/table.schemas";
import { TableActions } from "../common/table/project-table-actions";
import PageTitle from "../common/title";

const TaskView = () => {
  const { messageHistory, sendMessage, setMessageHistory } = useWS();
  const data = useMemo(() => messageToTableFormatter(messageHistory), [
    messageHistory,
  ]);
  const [task, setTask] = useState<Task | undefined>(undefined);

  //Transform task into string for WebSocket message transfer
  const handleTaskSubmit = (task: Task, isEditing: boolean): void => {
    if (isEditing) {
      const update = messageHistory.filter((message: any) => {
        return task.id !== message.id;
      });
      setTask(undefined);
      setMessageHistory(update);
    }
    sendMessage(JSON.stringify(task));
  };

  const handleEdit = (task: Task) => {
    setTask(task);
  };

  // Best to abstract this into a separate function,
  // especially if auth came into play (mutating objects with actions)
  const columns: TableColumn[] = [
    {
      accessor: "name",
    },
    {
      accessor: "category",
    },
    {
      accessor: "description",
    },
    {
      accessor: "status",
      render: ({ status }: { status: string }) => {
        if (status) return status.substring(0, 2) + " " + status.substring(2);
        return "";
      },
    },
    {
      accessor: "actions",
      render: (task: Task) => {
        const actions = ["edit"];
        return (
          <TableActions actions={actions} handleEdit={handleEdit} item={task} />
        );
      },
    },
  ];

  return (
    <Stack>
      <PageTitle title="Task Management" />
      <Stack
        gap="lg"
        align="center"
        justify="center"
        style={{ minHeight: "500px" }}
      >
        <MutateTask onSubmit={handleTaskSubmit} task={task} />
        <ProjectDataTable data={data ?? []} columns={columns ?? []} />
      </Stack>
    </Stack>
  );
};

export default TaskView;
