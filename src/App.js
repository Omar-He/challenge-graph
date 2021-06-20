import "./App.css";
import DataTable from "./components/DataTable";
import useStore from "./store/store";

function App() {
  const { data } = useStore();

  return (
    <div className="App">
      <DataTable data={data} title="Main Table" />
    </div>
  );
}

export default App;
