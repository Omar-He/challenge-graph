import "./App.css";
import DataTable from "./components/DataTable";
import useStore from "./store/store";

const App: React.FC = () => {
  const { data } = useStore();

  return (
    <div className="App">
      <DataTable data={data} title="Main Table" />
    </div>
  );
};

export default App;
