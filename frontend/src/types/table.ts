export interface TableColumn<T = any> {
  label: string
  prop: keyof T | string
  width?: number
}

export interface TableAction<T = any> {
  label: string
  onClick: (row: T) => void
}

export interface TableConfig<T = any> {
  columns: TableColumn<T>[]
  actions?: TableAction<T>[]
}
