import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import BottomBtn from "./components/BottomBtn";
import TabList from "./components/TabList";
import defaultFiles from "./utils/defaultFiles";

function App() {
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch
            title="我的云文档"
            onFileSearch={(value) => {
              console.log("🚀 ~ file: App.js ~ onFileSearch ~ value:", value);
            }}
          />
          <FileList
            files={defaultFiles}
            onFileClick={(id) => {
              console.log("🚀 ~ file: App.js ~ onFileClick ~ id:", id);
            }}
            onSaveEdit={(id, value) => {
              console.log(
                "🚀 ~ file: App.js ~ onSaveEdit ~ id, value:",
                id,
                value
              );
            }}
            onFileDelete={(id) => {
              console.log("🚀 ~ file: App.js ~ onFileDelete ~ id:", id);
            }}
          />
          <div className="row no-gutters">
            <div className="col">
              <BottomBtn text="新建" colorClass="btn-primary" icon={faPlus} />
            </div>
            <div className="col">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          <TabList
            files={defaultFiles}
            activeId="1"
            unsaveIds={["1", "2"]}
            onTabClick={(id) => {
              console.log("🚀 ~ file: App.js ~ onTabClick ~ id:", id);
            }}
            onCloseTab={(id) => {
              console.log("🚀 ~ file: App.js ~ onCloseTab ~ id:", id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
