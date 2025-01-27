"use client";
import { Paper } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useState } from "react";

type ProjectDataTableProps<T> = {
  data: T[];
  columns: any[];
  selectedRecords?: T[];
  handleSelectedRecords?: () => void;
};

export default function ProjectDataTable<T>(props: ProjectDataTableProps<T>) {
  const { data, columns, selectedRecords, handleSelectedRecords } = props;
  const [tableData] = useState<any>(
    data.filter((item: any) => item && item.id)
  );

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
        records={tableData}
        columns={columns}
      />
    </Paper>
  );
}
