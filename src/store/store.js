import data from "../data/example-data.json";
import create from "zustand";
import { v4 as uuidv4 } from "uuid";

const normalizeData = (data) => {
  data.forEach((row) => {
    if (Object.keys(row.kids).length > 0)
      normalizeData(Object.values(row.kids)[0].records);
    row.uuid = uuidv4();
  });
  return data;
};

const useStore = create((set, get) => ({
  data: normalizeData(data),
  setData: (data) => set(() => ({ data })),
  removeRow: (row) => {
    const new_data = removeByUUID(row.uuid, get().data);
    return get().setData(new_data);
  },
  expanded: [],
  expandRow: (row) => set(({ expanded }) => ({ expanded: [...expanded, row] })),
  hideRow: (uuid) =>
    set(({ expanded }) => ({
      expanded: expanded.filter((row) => row.uuid !== uuid),
    })),
  isRowExpanded: (uuid) => get().expanded.find((i) => i.uuid === uuid),
}));

const removeByUUID = (uuid, data) => {
  return data.filter((row) => {
    if (Object.keys(row.kids).length > 0) {
      Object.values(row.kids)[0].records = removeByUUID(
        uuid,
        Object.values(row.kids)[0].records
      );
    }
    return row.uuid !== uuid;
  });
};

export default useStore;
