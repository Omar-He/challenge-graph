import "./App.css";
import { useEffect } from "react";
import DataTable from "./components/DataTable";
import data from "./data/example-data.json";
import useStore from "./store/store";

function App() {
  useStore((state) => state.storeData);
  const insertData = useStore((state) => state.insertData);

  useEffect(() => {
    insertData(data);
  }, [insertData]);

  return (
    <div className="App">
      <DataTable allData={data} title="Main Table" />
    </div>
  );
}

export default App;
