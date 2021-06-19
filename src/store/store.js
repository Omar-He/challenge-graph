import create from "zustand";

const useStore = create((set) => ({
  storeData: [],
  insertData: (data) => set((state) => ({ storeData: data })),
  removeItem: (allData, key) => {
    set((state) => ({ storeData: allData.splice(key, 1) }));
  },
}));
export default useStore;
