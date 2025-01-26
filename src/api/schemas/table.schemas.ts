export interface TableColumn {
  accessor: string;
  render?: (x?: any) => void;
  textAlign?: string;
}

export type TableAction = "edit";

export interface TableActionProps<T> {
  handleEdit: (item: T) => void;
  actions: T[];
  item: T;
}
