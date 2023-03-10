import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faClose } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";
import useKeyPress from "../hooks/useKeyPress";
import classNames from "classnames";

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [value, setValue] = useState("");
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);

  const closeEdit = (editItem) => {
    setEditStatus(false);
    setValue("");

    // if we are editing a newly created file, wo shoule delete this file when pressing esc
    if (editItem.isNew) {
      onFileDelete(editItem.id);
    }
  };

  useEffect(() => {
    if (editStatus) {
      const editItem = files.find((file) => file.id === editStatus);

      if (
        enterPressed &&
        value.trim() !== "" &&
        !files.find((file) => file.title === value)
      ) {
        onSaveEdit(editItem.id, value, editItem.isNew);
        setEditStatus(false);
        setValue("");
      }

      if (escPressed) {
        closeEdit(editItem);
      }
    }
  });

  useEffect(() => {
    const newFile = files.find((file) => file.isNew);

    if (newFile) {
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  }, [files]);

  return (
    <ul className="list-group list-group-flush fileList">
      {files.map((file) => (
        <li
          className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
          key={file.id}
        >
          {file.id !== editStatus && !file.isNew && (
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
                <FontAwesomeIcon title="??????" size="lg" icon={faEdit} />
              </button>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => onFileDelete(file.id)}
              >
                <FontAwesomeIcon title="??????" size="lg" icon={faTrash} />
              </button>
            </>
          )}
          {(file.id === editStatus || file.isNew) && (
            <>
              <input
                className={classNames({
                  "form-control": true,
                  "col-10": true,
                  "is-invalid": !!files.find((file) => file.title === value),
                })}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="?????????????????????"
                required
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => closeEdit(file)}
              >
                <FontAwesomeIcon title="??????" size="lg" icon={faClose} />
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
