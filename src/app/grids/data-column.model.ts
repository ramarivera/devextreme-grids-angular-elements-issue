export interface DataColumn<TData> {
  /** Calculates custom cell values. Use this function to create an unbound data column. */
  calculateCellValue?: (rowData: any) => any;
  /* Calculates custom display values for column cells.
   *  Requires specifying the dataField or calculateCellValue option.
   *  Used in lookup optimization. */
  calculateDisplayValue?: string | ((rowData: any) => any);
  /** Customizes the text displayed in column cells. */
  customizeText?: (cellInfo: {
    value?: string | number | Date;
    valueText?: string;
    target?: string;
    groupInterval?: string | number;
  }) => string;
  /** Binds the column to a field of the dataSource. */
  dataField?: keyof TData;
  /** Casts column values to a specific data type. */
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime';
  /** Specifies the identifier of the column. */
  name?: string;
  /** Specifies whether the column is visible, that is, occupies space in the table. */
  visible?: boolean;
  /** Specifies the position of the column regarding other columns in the resulting widget. */
  visibleIndex?: number;
}
