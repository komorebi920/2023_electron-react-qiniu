import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const BottomBtn = ({ text, colorClass, icon, onClick }) => {
  return (
    <button
      type="button"
      className={`btn btn-block no-border rounded-0 ${colorClass}`}
      onClick={onClick}
    >
      <FontAwesomeIcon title={text} size="lg" icon={icon} className="mr-2" />
      {text}
    </button>
  );
};

BottomBtn.propTypes = {
  text: PropTypes.string,
  colorClass: PropTypes.string,
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

BottomBtn.defaultProps = {
  text: "新建",
};

export default BottomBtn;
