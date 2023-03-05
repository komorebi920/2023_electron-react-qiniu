import React, { useState } from "react";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import SimpleMDE from "react-simplemde-editor";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import BottomBtn from "./components/BottomBtn";
import TabList from "./components/TabList";
import defaultFiles from "./utils/defaultFiles";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "easymde/dist/easymde.min.css";

function App() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileId, setActiveFileId] = useState("");
  const [openedFileIds, setOpenedFileIds] = useState([]);
  const [unsavedFileIds, setUnsavedFileIds] = useState([]);
  const [searchedFiles, setSearchFiles] = useState([]);

  const openedFiles = openedFileIds.map((openedFileId) =>
    files.find((file) => file.id === openedFileId)
  );

  const activeFile = files.find((file) => file.id === activeFileId);

  const tabClick = (id) => {
    // set current active file
    setActiveFileId(id);
  };

  const fileClick = (id) => {
    // set current active file
    tabClick(id);

    // if openedFiles don't have the current Id
    // then add new fileId to openedFiles
    if (!openedFileIds.includes(id)) {
      setOpenedFileIds([...openedFileIds, id]);
    }
  };

  const tabClose = (id) => {
    const tabsWithout = openedFileIds.filter((fileId) => fileId !== id);

    // remove current id from openedFileIds
    setOpenedFileIds(tabsWithout);

    // set the active to the first opened tab
    if (tabsWithout.length > 0) {
      setActiveFileId(tabsWithout[tabsWithout.length - 1]);
    } else {
      setActiveFileId("");
    }
  };

  const fileChange = (id, value) => {
    // loop through file array to update to new value
    const newFiles = files.map((file) => {
      if (file.id === id) {
        file.body = value;
      }

      return file;
    });

    setFiles(newFiles);

    // update unsavedIds
    if (!unsavedFileIds.includes(id)) {
      setUnsavedFileIds([...unsavedFileIds, id]);
    }
  };

  const deleteFile = (id) => {
    // filter out the current file id
    const newFiles = files.filter((file) => file.id !== id);
    setFiles(newFiles);

    // close the tab if opened
    tabClose(id);
  };

  const updateFileName = (id, title) => {
    // loop throgh file, and update the title
    const newFiles = files.map((file) => {
      if (file.id === id) {
        file.title = title;
      }

      return file;
    });

    setFiles(newFiles);
  };

  const fileSearch = (keyword) => {
    // filter out the new files based on the keywork
    const newFiles = files.filter((file) => file.title.includes(keyword));
    setSearchFiles(newFiles);
  };

  const fileListArr = searchedFiles.length > 0 ? searchedFiles : files;

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch title="我的云文档" onFileSearch={fileSearch} />
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onSaveEdit={updateFileName}
            onFileDelete={deleteFile}
          />
          <div className="row no-gutters button-group">
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
          {activeFile ? (
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileId}
                unsaveIds={unsavedFileIds}
                onTabClick={tabClick}
                onCloseTab={tabClose}
              />
              <SimpleMDE
                key={activeFileId}
                value={activeFile.body}
                onChange={(value) => {
                  fileChange(activeFileId, value);
                }}
                options={{
                  minHeight: "515px",
                }}
              />
            </>
          ) : (
            <div className="start-page">选择或者创建新的 Markdown 文档</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
