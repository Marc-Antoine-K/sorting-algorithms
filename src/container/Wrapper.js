import React, { useEffect, useState } from "react";
import Graph from "../container/Graph";
import Toolbar from "../components/Toolbar";

const Wrapper = () => {
  const MIN = 0;
  const MAX = 50;
  const BARNUMBER = 30;

  const rand = (min, max) => {
    return Math.floor((max - min) * Math.random() + min);
  };

  //Every time React re-renders the component, useState(initialState) is executed. 
  //If the initial state is a primitive value (number, boolean, etc) there are no performance issues.

/*   const randomNumberList = [];
  for (let i = 0; i < BARNUMBER; i++) {
    randomNumberList.push(rand(MIN, MAX));
  }
  const [numberList, setNumberList] = useState(randomNumberList); */

  //passing a callback function initialise useState only on the first rendering and not every rendering ?
  const [numberList, setNumberList] = useState(
  function getInitialState() {
    const randomNumberList = [];
    for (let i = 0; i < BARNUMBER; i++) {
      randomNumberList.push(rand(MIN, MAX));
    }
    return randomNumberList;
  });

  const [selectedIndex, setSelectedIndex] = useState([0, 0]);
  const [updateUI, setUpdateUI] = useState(false);

  const resetHandler = () => {
    const randomNumberList = [];

    for (let i = 0; i < BARNUMBER; i++) {
      randomNumberList.push(rand(MIN, MAX));
    }
    setNumberList(randomNumberList);
    setSelectedIndex([0, 0]);
  };

  useEffect(() => console.log[numberList], [numberList]);
  
  //here
  //https://dmitripavlutin.com/react-usestate-hook-guide/#:~:text=To%20update%20the%20state%2C%20call,(prevState%20%3D%3E%20newState)%20.
  // I use setNumberList(numberList => [...tab]); Because if I use setNumberList(tab), the old state is taken into account.
  // I have to use array destructuring otherwise it copies the pointer and not the values 
  
  const dummySortHandler = async () => {
    const tab = [...numberList];
    let tmpMin;
    let index;
    for (let i = 0; i < numberList.length - 1; i++) {
      tmpMin = tab[i];
      index = i;
      for (let j = i; j < tab.length + 1; j++) {
        await new Promise((resolve) => setTimeout(resolve, 0.01));
        if (tab[j] < tmpMin) {
          tmpMin = tab[j];
          index = j;
          setSelectedIndex([i, index]);
        }
      }
      if (index !== i) {
        tab[index] = tab[i];
        tab[i] = tmpMin;
      }
      setNumberList(numberList => [...tab]); //here
    }
  };

  const bubbleSortHandler = async () => {
    const tab = [...numberList];
    let tmp, N;
    for (N = numberList.length; N > 1; N--) {
      for (let i = 0; i < N - 1; i++) {
        if (tab[i + 1] < tab[i]) {
          await new Promise((resolve) => setTimeout(resolve, i * 0.001));
          tmp = tab[i + 1];
          tab[i + 1] = tab[i];
          tab[i] = tmp;
          setSelectedIndex([i, i + 1]);
          setNumberList(numberList => [...tab]);
          console.log(N);
        }
      }
    }
  };

  let merge = async (tab, aux, left, mid, right) => {
    aux = [...tab];
    let leftIdx = left;
    let rightIdx = mid + 1;
    for (let k = left; k < right + 1; k++) {
      await new Promise((resolve) => setTimeout(resolve,  1));
      if (aux[leftIdx] <= aux[rightIdx] && leftIdx < mid + 1) {
        tab[k] = aux[leftIdx++];
        setSelectedIndex([k, leftIdx]);
      } else if (aux[rightIdx] <= aux[leftIdx] && rightIdx < right + 1) {
        tab[k] = aux[rightIdx++];
        setSelectedIndex([k, rightIdx]);
      } else if (rightIdx === right + 1 && leftIdx < mid + 1) {
        tab[k] = aux[leftIdx++];
        setSelectedIndex([k, leftIdx]);
      } else if (leftIdx === mid + 1 && rightIdx < right + 1) {
        tab[k] = aux[rightIdx++];
        setSelectedIndex([k, rightIdx]);
      }
      //await new Promise((resolve) => setTimeout(resolve, 1 * 1));
      /* await new Promise((resolve) => setTimeout(resolve,  1));
        setNumberList(tab); */
        setNumberList(numberList => [...tab]);
    }
  };

  let mergeSort = async (tab, aux, left, right) => {
    if (left >= right) return;
    let mid = left + Math.floor((right - left) / 2);
    mergeSort(tab, aux, left, mid);
    mergeSort(tab, aux, mid + 1, right);
    merge(tab, aux, left, mid, right);
  };

  let mergeSortHandler = () => {
    let tab = [...numberList];
    mergeSort(tab, [], 0, tab.length - 1);
  };

  const insertionSortHandler = async () => {
    const tab = [...numberList];
    let tmp;
    let N = numberList.length;
    for (let i = 1; i < N; i++) {
      for (let j = i; j > 0; j--) {
        if (tab[j - 1] > tab[j]) {
          await new Promise((resolve) => setTimeout(resolve, i * 100));
          tmp = tab[j - 1];
          tab[j - 1] = tab[j];
          tab[j] = tmp;
          setSelectedIndex([j, j - 1]);
          setNumberList(numberList => [...tab]);
        }
      }
    }
    if (N === 1) setUpdateUI(!updateUI);
  };

  const quickSortHandler = async () => {
    const tab = [...numberList];
    let tmp;
    let N;
    for (N = numberList.length; N > 1; N--) {
      for (let i = 0; i < N - 1; i++) {
        if (tab[i + 1] < tab[i]) {
          await new Promise((resolve) => setTimeout(resolve, i * 0.01));
          tmp = tab[i + 1];
          tab[i + 1] = tab[i];
          tab[i] = tmp;
          setSelectedIndex([i, i + 1]);
          setNumberList(tab);
          console.log(N);
        }
      }
    }
    if (N === 1) setUpdateUI(!updateUI);
  };

  const heapSortHandler = async () => {
    const tab = [...numberList];
    let tmp;
    let N;
    for (N = numberList.length; N > 1; N--) {
      for (let i = 0; i < N - 1; i++) {
        if (tab[i + 1] < tab[i]) {
          await new Promise((resolve) => setTimeout(resolve, i * 0.01));
          tmp = tab[i + 1];
          tab[i + 1] = tab[i];
          tab[i] = tmp;
          setSelectedIndex([i, i + 1]);
          setNumberList(tab);
          console.log(N);
        }
      }
    }
    if (N === 1) setUpdateUI(!updateUI);
  };

  return (
    <React.Fragment>
      <Toolbar
        reset={resetHandler}
        dummySort={dummySortHandler}
        bubbleSort={bubbleSortHandler}
        //here
        //mergeSort={() => mergeSortHandler([...numberList])}
        mergeSort={mergeSortHandler}
        quickSort={quickSortHandler}
        insertionSort={insertionSortHandler}
        heapSort={heapSortHandler}
      />
      <Graph numberList={numberList} indexSelected={selectedIndex} />
    </React.Fragment>
  );
};
export default Wrapper;
