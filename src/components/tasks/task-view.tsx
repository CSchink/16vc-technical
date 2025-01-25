import { useWS } from "../../hooks/use-web-sockets";
import { useMemo } from "react";
import { Task } from "../../api/schemas/tasks.schemas";
import ProjectDataTable from "../common/project-data-table";
import { MutateTask } from "./mutate-tasks";
import { Stack, Title } from "@mantine/core";
import { messageToTableFormatter } from "../common/utils/helper";

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
      <Stack>
        <Title>Task Management</Title>
        <Stack
          gap="lg"
          align="center"
          justify="center"
          style={{ minHeight: "500px" }}
        >
          <MutateTask onSubmit={handleTaskSubmit} />
          <ProjectDataTable data={data ?? []} columns={columns ?? []} />
        </Stack>
      </Stack>
    </>
  );
};

export default TaskView;
