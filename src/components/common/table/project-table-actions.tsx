import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { TableAction, TableActionProps } from "src/api/schemas/table.schemas";
import { IconPencil } from "@tabler/icons-react";

export const TableActions: React.FC<TableActionProps<any>> = ({
  handleEdit,
  actions,
  item,
}) => {
  const defaultActions = {
    edit: (currentItem: any, editAction: (x: any) => void) => {
      return {
        label: "Edit",
        icon: <IconPencil />,
        onClick: (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          editAction(currentItem);
        },
      };
    },
  };

  const actionList = actions
    .map((action: TableAction) => {
      switch (action) {
        case "edit":
          return defaultActions.edit(item, handleEdit);
      }
    })
    .filter(Boolean);

  return (
    <Group gap="xs" justify="center">
      {actionList.map((action, index) => {
        
        return (
          <Tooltip key={index} label={action.label}>
            <ActionIcon onClick={action.onClick}>{action.icon}</ActionIcon>
          </Tooltip>
        );
      })}
    </Group>
  );
};
