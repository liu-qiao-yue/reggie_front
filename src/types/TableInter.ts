// 定义表格数据的类型
export interface TableRow {
  [key: string]: unknown;
}


// 定义表格列的元数据
export interface TableColumn {
  prop: keyof TableRow;
  label: string;
  width?: string | number;
  templateSlotName?: string; // 自定义插槽名称
  isActions?: boolean; // 标记是否为操作列
  displayStatus?: number; // 列显示状态
  formatter?: (value: unknown, row: TableRow) => string; // 单元格格式化函数
  fixed?: string; // 固定列
}
