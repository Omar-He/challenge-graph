
  export type kidsType = Record<string, { records: TableRow[] }> | {};

  export interface TableRow {
    uuid?: string;
    data: Record<string, string>;
    kids: kidsType;
  }
