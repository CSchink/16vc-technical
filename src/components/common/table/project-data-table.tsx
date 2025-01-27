import { Paper } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { formatMessagesForUI } from "../utils/helper";
import { useEffect, useState } from "react";
import { Message } from "ably";

type ProjectDataTableProps<T> = {
  data: Message[];
  columns: any[];
  selectedRecords?: T[];
  handleSelectedRecords?: () => void;
};

export default function ProjectDataTable<T>(props: ProjectDataTableProps<T>) {
  const { columns, handleSelectedRecords, data } = props;
  const [tableData, setTableData] = useState<any>([])

  useEffect(() => {
    setTableData(formatMessagesForUI(data))
  }, [data])


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
        records={tableData}
        columns={columns}
      />
    </Paper>
  );
}
