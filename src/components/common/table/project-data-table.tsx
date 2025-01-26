"use client";
import { Paper } from "@mantine/core";
import { DataTable } from "mantine-datatable";

type ProjectDataTableProps<T> = {
  data: T[];
  columns: any[];
  selectedRecords?: T[];
  handleSelectedRecords?: () => void;
};

export default function ProjectDataTable<T>(props: ProjectDataTableProps<T>) {
  const { data, columns, selectedRecords, handleSelectedRecords } = props;
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
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={handleSelectedRecords}
        records={data}
        columns={columns}
      />
    </Paper>
  );
}
