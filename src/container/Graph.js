import React from "react";
import classes from "./Graph.module.css";
import Bar from "./Bar";

const Graph = (props) => {
  const barList = [];

  const BARNUMBER = 100;

  for (let i = 0; i < BARNUMBER; i++) {
    barList.push(
      <Bar key={i} className={classes.Graph} height={props.numberList[i]} selected={i === props.indexSelected[0] || i === props.indexSelected[1]}></Bar> //
    );
  }

  return <div className={classes.Graph}>{barList}</div>;
};

export default Graph;
