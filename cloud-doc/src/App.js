import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileSearch from "./components/FileSearch";

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-6 left-panel">
          <FileSearch title="我的云文档" onFileSearch={console.log} />
        </div>
        <div className="col-6 bg-primary right-panel">
          <h1>This is the right.</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
