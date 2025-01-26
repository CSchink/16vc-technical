import { RingProgress } from "@mantine/core";
// import { TaskStatus } from "src/api/schemas/tasks.schemas";

// import { useEffect, useState } from "react";
// import { messageToTableFormatter } from "./utils/helper";
// import { useWS } from "../../hooks/use-web-sockets";

// type ProgresCounterType = {
//   status: TaskStatus;
//   color: string;
//   tooltip: string;
//   value: number;
// };

export default function ProgressCounter() {
  //   const { messageHistory } = useWS();
  //   const [totals, setTotals] = useState<ProgresCounterType[]>([]);

  //   useEffect(() => {
  //     if (messageHistory.length) {
  //       const refinedData = messageToTableFormatter(messageHistory);
  //       const statuses: ProgresCounterType[] = [
  //         { status: "ToDo", color: "red", tooltip: "ToDo", value: 0 },
  //         {
  //           status: "InProgress",
  //           color: "yellow",
  //           tooltip: "InProgress",
  //           value: 0,
  //         },
  //         { status: "Completed", color: "green", tooltip: "Completed", value: 0 },
  //       ];
  //       const counts = statuses.map((item: ProgresCounterType) => {
  //         const total = refinedData.reduce(
  //           (acc, cur) => (cur.status === item.status ? ++acc : acc),
  //           0
  //         );
  //         item.value = total;
  //         return item;
  //       });
  //       setTotals(counts);
  //     }
  //   }, [messageHistory, totals, totals.length]);

  return <RingProgress size={120} thickness={12} roundCaps sections={[]} />;
}
