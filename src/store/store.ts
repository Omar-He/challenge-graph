import data from "../data/example-data.json";
import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import {TableRow} from "../global";

const normalizeData = (data: TableRow[]): TableRow[] => {
  data.forEach((row) => {
    if (Object.keys(row.kids).length > 0)
      normalizeData(Object.values(row.kids)[0].records);
    row.uuid = uuidv4();
  });
  return data;
};

interface storeTypes {
  data: TableRow[];
  setData: (data: TableRow[]) => void;
  removeRow: (row: TableRow) => void;
  expanded: TableRow[];
  expandRow: (row: TableRow) => void;
  hideRow: (uuid?: string) => void;
  isRowExpanded: (uuid?: string) => TableRow | undefined;
}

const useStore = create<storeTypes>((set, get) => ({
  data: normalizeData(data),
  setData: (data) => set(() => ({ data })),
  removeRow: (row) => {
    const new_data = removeByUUID(get().data, row.uuid);
    return get().setData(new_data);
  },
  expanded: [],
  expandRow: (row) => set(({ expanded }) => ({ expanded: [...expanded, row] })),
  hideRow: (uuid) =>
    set(({ expanded }) => ({
      expanded: expanded.filter((row: TableRow) => row.uuid !== uuid),
    })),
  isRowExpanded: (uuid) =>
    get().expanded.find((i: TableRow) => i.uuid === uuid),
}));

const removeByUUID = (data: TableRow[], uuid?: string): TableRow[] => {
  return data.filter((row) => {
    if (Object.keys(row.kids).length > 0) {
      Object.values(row.kids)[0].records = removeByUUID(
        Object.values(row.kids)[0].records,
        uuid
      );
    }
    return row.uuid !== uuid;
  });
};

export default useStore;
