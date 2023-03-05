import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const closeSearch = (evt) => {
    evt.preventDefault();

    setInputActive(false);
    setValue("");
  };

  useEffect(() => {
    const handleInputEvent = (evt) => {
      const { keyCode } = evt;

      if (keyCode === 13 && inputActive) {
        onFileSearch(value);
      } else if (keyCode === 27 && inputActive) {
        closeSearch(evt);
      }
    };

    document.addEventListener("keyup", handleInputEvent);

    return () => document.removeEventListener("keyup", handleInputEvent);
  });

  useEffect(() => {
    if (inputActive) {
      inputRef.current.focus();
    }
  }, [inputActive]);

  return (
    <div className="alert alert-primary">
      <div className="d-flex justify-content-between align-items-center">
        {!inputActive && (
          <>
            <span>{title}</span>
            <button
              type="button"
              className="icon-button"
              onClick={() => setInputActive(true)}
            >
              <FontAwesomeIcon title="搜索" size="lg" icon={faSearch} />
            </button>
          </>
        )}
        {inputActive && (
          <>
            <input
              className="form-control"
              value={value}
              ref={inputRef}
              onChange={(e) => setValue(e.target.value)}
            />
            <button type="button" className="icon-button" onClick={closeSearch}>
              <FontAwesomeIcon title="关闭" size="lg" icon={faClose} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
};

FileSearch.defaultProps = {
  title: "我的云文档",
};

export default FileSearch;
