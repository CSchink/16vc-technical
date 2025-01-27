import { RingProgress } from "@mantine/core";
import { TaskStatus } from "src/api/schemas/tasks.schemas";

import { useEffect, useState } from "react";
import { useWS } from "../../hooks/use-web-sockets";

type ProgresCounterType = {
  status: TaskStatus;
  color: string;
  tooltip: string;
  value: number;
};

export default function ProgressCounter() {
  const { data } = useWS();
  const [totals, setTotals] = useState<ProgresCounterType[]>([]);

  useEffect(() => {
    if (data.length) {
      const statuses: ProgresCounterType[] = [
        { status: "ToDo", color: "red", tooltip: "ToDo", value: 0 },
        {
          status: "InProgress",
          color: "yellow",
          tooltip: "InProgress",
          value: 0,
        },
        { status: "Completed", color: "green", tooltip: "Completed", value: 0 },
      ];
      const totalAmount = data.length ?? 1;
      const counts = statuses.map((item: ProgresCounterType) => {
        const current = data.reduce(
          (acc, cur) => (cur.status === item.status ? ++acc : acc),
          0
        );
        item.value = parseInt(((current / totalAmount) * 100).toFixed(0));
        return item;
      });
      setTotals(counts);
    }
  }, [data, totals, totals.length]);

  return <RingProgress size={120} thickness={12} roundCaps sections={totals} />;
}
