import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import defaultFiles from "./utils/defaultFiles";

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-6 left-panel">
          <FileSearch title="我的云文档" onFileSearch={console.log} />
          <FileList
            files={defaultFiles}
            onFileClick={(id) => console.log(id)}
            onSaveEdit={(id, value) => console.log(id, value)}
            onFileDelete={(id) => console.log(id)}
          />
        </div>
        <div className="col-6 bg-primary right-panel">
          <h1>This is the right.</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
