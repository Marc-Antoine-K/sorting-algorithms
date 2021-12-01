import React from 'react';
import classes from './Toolbar.module.css';

const toolbar = (props) => {

    return(
        <div className={classes.Toolbar}>
            <button className={classes.btn} onClick={props.reset}>Reset</button>
            <button className={classes.btn} onClick={props.dummySort}>Dummy Sort</button>
            <button className={classes.btn} onClick={props.bubbleSort}>Bubble Sort</button>
            <button className={classes.btn} onClick={props.mergeSort}>Merge Sort</button>
            <button className={classes.btn} onClick={props.quickSort}>Quick Sort</button>
            <button className={classes.btn} onClick={props.insertionSort}>Insertion Sort</button>
            <button className={classes.btn} onClick={props.heapSort}>Heap Sort</button>
        </div>
    );

}

export default toolbar;