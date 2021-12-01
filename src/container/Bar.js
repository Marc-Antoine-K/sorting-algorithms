import React from "react";
import classes from "./Bar.module.css";

const bar = (props) => {
  return (
    <div
      className={classes.Bar}
      style={{
        height: props.height * 5 + "px",
        borderColor: props.selected ? "red" : "blue",
      }}
    ></div>
  );
};

export default bar;
