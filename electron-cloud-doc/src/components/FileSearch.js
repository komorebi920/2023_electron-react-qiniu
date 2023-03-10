import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import useKeyPress from "../hooks/useKeyPress";

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  const inputRef = useRef(null);

  const closeSearch = () => {
    setInputActive(false);
    setValue("");
    onFileSearch("");
  };

  useEffect(() => {
    if (enterPressed && inputActive) {
      onFileSearch(value);
    }

    if (escPressed && inputActive) {
      closeSearch();
    }
  }, [enterPressed, escPressed]);

  useEffect(() => {
    if (inputActive) {
      inputRef.current.focus();
    }
  }, [inputActive]);

  return (
    <div className="alert alert-primary mb-0 rounded-0 d-flex justify-content-between align-items-center">
      {inputActive ? (
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
      ) : (
        <>
          <span style={{ lineHeight: "38px" }}>{title}</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => setInputActive(true)}
          >
            <FontAwesomeIcon title="搜索" size="lg" icon={faSearch} />
          </button>
        </>
      )}
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
