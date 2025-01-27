"use client";
import { Paper } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useWS } from "../../../hooks/use-web-sockets";
import { formatMessagesForUI } from "../utils/helper";

type ProjectDataTableProps<T> = {
  data: T[];
  columns: any[];
  selectedRecords?: T[];
  handleSelectedRecords?: () => void;
};

export default function ProjectDataTable<T>(props: ProjectDataTableProps<T>) {
  const { columns, handleSelectedRecords } = props;
  const { messages } = useWS();

  return (
    <Paper shadow="md" withBorder p="md">
      <DataTable
        minHeight={300}
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        striped
        noRecordsText={"Please add a task to begin"}
        highlightOnHover
        onSelectedRecordsChange={handleSelectedRecords ?? undefined}
        records={formatMessagesForUI(messages)}
        columns={columns}
      />
    </Paper>
  );
}
