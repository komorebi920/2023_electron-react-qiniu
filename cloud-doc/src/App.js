import React, { useState } from "react";
import {
  faPlus,
  faFileImport,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import SimpleMDE from "react-simplemde-editor";
import { v4 as uuid_v4 } from "uuid";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import BottomBtn from "./components/BottomBtn";
import TabList from "./components/TabList";
import { flattenArr, objToArr } from "./utils/helper";
import fileHelper from "./utils/fileHelper";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "easymde/dist/easymde.min.css";

// require node.js modules
const { join } = window.require("path");
const { remote } = window.require("electron");
const Store = window.require("electron-store");

const saveLocation = join(remote.app.getPath("appData"), "cloud-doc");
const fileStore = new Store({ name: "Files Data" });

const saveFilesToStore = (files) => {
  // wo don't have to save any info in file system, eg: isNew, body, etc
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const { id, path, title, createAt } = file;
    result[id] = { id, path, title, createAt };
    return result;
  }, {});

  fileStore.set("files", filesStoreObj);
};

function App() {
  const [files, setFiles] = useState(fileStore.get("files") || {});
  const [activeFileId, setActiveFileId] = useState("");
  const [openedFileIds, setOpenedFileIds] = useState([]);
  const [unsavedFileIds, setUnsavedFileIds] = useState([]);
  const [searchedFiles, setSearchFiles] = useState([]);
  const filesArr = objToArr(files);
  const fileListArr = searchedFiles.length > 0 ? searchedFiles : filesArr;
  const openedFiles = openedFileIds.map((id) => files[id]);
  const activeFile = files[activeFileId];

  const tabClick = (id) => {
    // set current active file
    setActiveFileId(id);
  };

  const fileClick = (id) => {
    // set current active file
    tabClick(id);

    if (!files[id].isLoaded) {
      fileHelper.readFile(join(saveLocation, files[id].path)).then((value) =>
        setFiles({
          ...files,
          [id]: { ...files[id], body: value, isLoaded: true },
        })
      );
    }

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
    const newFile = { ...files[id], body: value };
    setFiles({ ...files, [id]: newFile });

    // update unsavedIds
    if (!unsavedFileIds.includes(id)) {
      setUnsavedFileIds([...unsavedFileIds, id]);
    }
  };

  const deleteFile = (id) => {
    const { [id]: value, ...afterDeleteFiles } = files;

    if (files[id].isNew) {
      setFiles(afterDeleteFiles);
    } else {
      fileHelper
        .deleteFile(join(saveLocation, `${files[id].title}.md`))
        .then(() => {
          setFiles(afterDeleteFiles);
          saveFilesToStore(afterDeleteFiles);

          // close the tab if opened
          tabClose(id);
        });
    }
  };

  const updateFileName = (id, title, isNew) => {
    const oldPath = `${files[id].title}.md`;
    const newPath = `${title}.md`;
    const modifiedFile = { ...files[id], title, isNew: false, path: newPath };
    const newFiles = { ...files, [id]: modifiedFile };

    return new Promise((resolve) => {
      if (isNew) {
        resolve(
          fileHelper.writeFile(join(saveLocation, newPath), modifiedFile.body)
        );
      } else {
        resolve(
          fileHelper.renameFile(
            join(saveLocation, oldPath),
            join(saveLocation, newPath)
          )
        );
      }
    }).then(() => {
      setFiles(newFiles);
      saveFilesToStore(newFiles);
    });
  };

  const createNewFile = () => {
    const newId = uuid_v4();
    const newFile = {
      id: newId,
      title: "",
      body: "## 请输入 Markdown",
      createAt: new Date().getTime(),
      isNew: true,
    };
    setFiles({ ...files, [newId]: newFile });
  };

  const fileSearch = (keyword) => {
    // filter out the new files based on the keyword
    const newFiles = filesArr.filter((file) => file.title.includes(keyword));
    setSearchFiles(newFiles);
  };

  const saveCurrentFile = () => {
    if (activeFile) {
      fileHelper
        .writeFile(
          join(saveLocation, `${activeFile.title}.md`),
          activeFile.body
        )
        .then(() =>
          setUnsavedFileIds(unsavedFileIds.filter((id) => id !== activeFile.id))
        );
    }
  };

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
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn
                text="保存"
                colorClass="btn-danger"
                icon={faSave}
                onClick={saveCurrentFile}
              />
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
