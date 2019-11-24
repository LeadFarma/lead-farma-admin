import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

const Button = props => {
  const classe = "btn" + (props.disabled ? " disabled" : "");
  const bgColor = props.bgColor || "#0072c6";
  const bgColorDisabled = props.bgColorDisabled || "#ccc";
  const style = {
    ...props.style,
    backgroundColor: props.disabled ? bgColorDisabled : bgColor,
    width: props.width || "initial",
    minWidth: props.width || "145px",
    height: props.height || "initial",
    marginTop: props.marginTop || "10px",
    marginBottom: props.marginBottom || "10px",
    display: props.display || "flex",
    border: "none",
    cursor: "pointer",
    borderRadius: props.borderRadius || "4px",
    fontSize: props.fontSize || "14px"
  };
  const defaultFunc = () => {
    return;
  };
  return (
    <div className="buttonContainer">
      <button
        type={props.type || "button"}
        className={classe}
        style={style}
        onClick={
          !props.isLoading && typeof props.onClick === "function"
            ? props.onClick
            : defaultFunc
        }
      >
        {props.isLoading ? <div className="loading-box"></div> : props.children}
      </button>
    </div>
  );
};

Button.propTypes = {
  selecionado: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool
};

export default Button;
