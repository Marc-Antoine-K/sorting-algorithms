import React from "react";
import classes from "./Info.module.css";

const Info = (props) => {
    return (
    <div className={classes}>
        <div>Type of sort: {props.selectedSort.sort}</div>
        <div>complexity: {props.selectedSort.complexity}</div>
        <div>In place: {props.selectedSort.inPlace}</div>
    </div>)
}

export default Info;