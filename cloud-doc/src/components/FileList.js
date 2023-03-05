import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faClose } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";
import useKeyPress from "../hooks/useKeyPress";

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [value, setValue] = useState("");
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);

  const closeEdit = () => {
    setEditStatus(false);
    setValue("");
  };

  useEffect(() => {
    if (enterPressed && editStatus) {
      onSaveEdit(editStatus, value);
      closeEdit();
    }

    if (escPressed && editStatus) {
      closeEdit();
    }
  });

  return (
    <ul className="list-group list-group-flush fileList">
      {files.map((file) => (
        <li
          className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
          key={file.id}
        >
          {file.id !== editStatus && (
            <>
              <span className="col-2">
                <FontAwesomeIcon size="lg" icon={faMarkdown} />
              </span>
              <span
                className="col-6 c-link"
                onClick={() => onFileClick(file.id)}
              >
                {file.title}
              </span>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  setEditStatus(file.id);
                  setValue(file.title);
                }}
              >
                <FontAwesomeIcon title="编辑" size="lg" icon={faEdit} />
              </button>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => onFileDelete(file.id)}
              >
                <FontAwesomeIcon title="删除" size="lg" icon={faTrash} />
              </button>
            </>
          )}
          {file.id === editStatus && (
            <>
              <input
                className="form-control col-10"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={closeEdit}
              >
                <FontAwesomeIcon title="关闭" size="lg" icon={faClose} />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onSaveEdit: PropTypes.func,
  onFileDelete: PropTypes.func,
};

export default FileList;
