import { useWS } from "../../hooks/use-web-sockets";
import { useMemo, useState } from "react";
import { Task } from "../../api/schemas/tasks.schemas";
import ProjectDataTable from "../common/table/project-data-table";
import { MutateTask } from "./mutate-tasks";
import { Loader, Stack } from "@mantine/core";
import { TableColumn } from "src/api/schemas/table.schemas";
import { TableActions } from "../common/table/project-table-actions";
import PageTitle from "../common/title";
import ProgressCounter from "../common/progress";

const TaskView = () => {
  const { sendMessage, editMessage, data, loading } = useWS();
  const [task, setTask] = useState<Task | undefined>(undefined);
  const tableData = useMemo(() => data, [data]);
  //Transform task for WebSocket transfer
  const handleTaskSubmit = (task: Task, isEditing: boolean): void => {
    if (isEditing) {
      editMessage(task);
      setTask(undefined);
    }
    sendMessage(JSON.stringify(task));
  };

  const handleEdit = (task: Task) => {
    console.log(task);
    setTask(task);
  };

  // Best to abstract this into a separate function,
  // especially if auth came into play (mutating objects with actions)
  const columns: TableColumn[] = [
    {
      accessor: "name",
      width: 200,
    },
    {
      accessor: "category",
      width: 200,
    },
    {
      accessor: "description",
      width: 200,
    },
    {
      accessor: "status",
      width: 200,
      render: ({ status }: { status: string }) => {
        if (status === "Completed") return status;
        if (status) return status.substring(0, 2) + " " + status.substring(2);
        return "";
      },
    },
    {
      accessor: "actions",
      width: 50,
      render: (task: Task) => {
        const actions = ["edit"];
        return (
          <TableActions actions={actions} handleEdit={handleEdit} item={task} />
        );
      },
    },
  ];

  return loading ? (
    <Loader />
  ) : (
    <Stack>
      <PageTitle title="Task Management" />
      <Stack
        gap="lg"
        align="center"
        justify="center"
        style={{ minHeight: "500px" }}
      >
        <ProgressCounter />
        <MutateTask onSubmit={handleTaskSubmit} task={task} />
        <ProjectDataTable data={tableData ?? []} columns={columns ?? []} />
      </Stack>
    </Stack>
  );
};

export default TaskView;
