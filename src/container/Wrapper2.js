import React, { useEffect, useState } from "react";
import Graph from "../container/Graph";
import Toolbar from "../components/Toolbar";
import Info from "../container/Info";

const Wrapper2 = () => {
  const MIN = 0;
  const MAX = 50;
  const BARNUMBER = 100;

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
  const [numberList, setNumberList] = useState(function getInitialState() {
    const randomNumberList = [];
    for (let i = 0; i < BARNUMBER; i++) {
      randomNumberList.push(rand(MIN, MAX));
    }
    return randomNumberList;
  });

  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);

  const [sort, setSort] = useState({
    sort: "Select a sorting algorithm to sort the array",
    complexity: null,
    inPlace: false,
  });

  const resetHandler = () => {
    setSort({...sort,
      sort: "Select a sorting algorithm to sort the array",
      complexity: null,
      inPlace: false,
    });
    const randomNumberList = [];

    for (let i = 0; i < BARNUMBER; i++) {
      randomNumberList.push(rand(MIN, MAX));
    }
    setNumberList(randomNumberList);
    setSelectedIndex1(0);
    setSelectedIndex2(0);
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
          setSelectedIndex1(i);
          setSelectedIndex2(index);
        }
      }
      if (index !== i) {
        tab[index] = tab[i];
        tab[i] = tmpMin;
      }
      setNumberList((numberList) => [...tab]); //here
    }
  };

  const bubbleSortHandler = async () => {
    const tab = [...numberList];
    let N;
    for (N = numberList.length; N > 1; N--) {
      for (let i = 0; i < N - 1; i++) {
        if (tab[i + 1] < tab[i]) {
          await new Promise((resolve) => setTimeout(resolve, 0.1));
          //swap tab[i], tab[i+1]
          [tab[i], tab[i + 1]] = [tab[i + 1], tab[i]];
          setSelectedIndex1((selectedIndex1) => i);
          setSelectedIndex2((selectedIndex2) => i + 1);
          setNumberList((numberList) => [...tab]);
          console.log(N);
        }
      }
    }
  };

  let merge = async (tab, aux, left, mid, right) => {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    aux = [...tab];
    /*     let leftIdx = left;
    let rightIdx = mid + 1; */
    for (let k = left, leftIdx = left, rightIdx = mid + 1; k < right + 1; k++) {
      if (aux[leftIdx] <= aux[rightIdx] && leftIdx < mid + 1) {
        tab[k] = aux[leftIdx++];
        setSelectedIndex1((selectedIndex1) => k);
        setSelectedIndex2((selectedIndex2) => leftIdx);
      } else if (aux[rightIdx] <= aux[leftIdx] && rightIdx < right + 1) {
        tab[k] = aux[rightIdx++];
        setSelectedIndex1((selectedIndex1) => k);
        setSelectedIndex2((selectedIndex2) => rightIdx);
      } else if (rightIdx === right + 1 && leftIdx < mid + 1) {
        tab[k] = aux[leftIdx++];
        setSelectedIndex1((selectedIndex1) => k);
        setSelectedIndex2((selectedIndex2) => leftIdx);
      } else if (leftIdx === mid + 1 && rightIdx < right + 1) {
        tab[k] = aux[rightIdx++];
        setSelectedIndex1((selectedIndex1) => k);
        setSelectedIndex2((selectedIndex2) => rightIdx);
      }
      setNumberList((numberList) => [...tab]);
    }
    //await new Promise((resolve) => setTimeout(resolve, 1000));
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
    let N = numberList.length;
    for (let i = 1; i < N; i++) {
      for (let j = i; j > 0; j--) {
        if (tab[j - 1] > tab[j]) {
          await new Promise((resolve) => setTimeout(resolve, 0.1));
          [tab[j - 1], tab[j]] = [tab[j], tab[j - 1]];
          setSelectedIndex1(j);
          setSelectedIndex2(j - 1);
          setNumberList((numberList) => [...tab]);
        }
      }
    }
  };

  async function quickSort(a, start, end) {
    if (start < end) {
      //partition
      let partitionIndex = start;
      let pivot = a[end]; //chose the last element as pivot
      for (let i = start; i < end; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        setSelectedIndex1(i);
        setSelectedIndex2(partitionIndex);
        if (a[i] <= pivot) {
          [a[i], a[partitionIndex]] = [a[partitionIndex], a[i]];
          setNumberList((numberList) => [...a]);
          partitionIndex++;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1));
      setSelectedIndex1(end);
      setSelectedIndex2(partitionIndex);
      [a[end], a[partitionIndex]] = [a[partitionIndex], a[end]];
      setNumberList((numberList) => [...a]);

      //sort left half and right half
      quickSort(a, start, partitionIndex - 1);
      quickSort(a, partitionIndex + 1, end);
    }
  }

  const quickSortHandler = async () => {
    const tab = [...numberList];
    quickSort(tab, 0, tab.length - 1);
  };

  /*   const heapSortHandler = async () => {
    const tab = [...numberList];

    await new Promise((resolve) => setTimeout(resolve, i * 0.01));
  }; */

  async function Heapify(a, i, lgth) {
    let max = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < lgth && a[max] < a[left]) {
      max = left;
    }

    if (right < lgth && a[max] < a[right]) {
      max = right;
    }
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      setSelectedIndex1(i);
      setSelectedIndex2(max);
      setNumberList((numberList) => [...a]);
      //heapify down the tree if necessary
      Heapify(a, max, lgth);
    }
  }

  async function heapSortHandler() {
    const a = [...numberList];
    //max-Heapify the array starting from the root + 1 level and going from right to left up to the root
    for (let k = Math.floor(a.length / 2); k > -1; k--) {
      Heapify(a, k, a.length);
    }

    let lgth = a.length;
    await new Promise((resolve) => setTimeout(resolve, 10000));
    for (let k = a.length - 1; k > 0; k--) {
      //put the max at the end of the array and shorten the array to be sorted by 1
      [a[0], a[k]] = [a[k], a[0]];
      setSelectedIndex1(k);
      setSelectedIndex2(0);
      setNumberList((numberList) => [...a]);
      await new Promise((resolve) => setTimeout(resolve, 0.1));

      lgth--;
      //Heapify the new unsorted array (from 0 to k - 1)
      Heapify(a, 0, lgth);
    }
  }

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
      <Graph
        numberList={numberList}
        indexSelected={[selectedIndex1, selectedIndex2]}
      />
      <Info selectedSort={sort} />
    </React.Fragment>
  );
};
export default Wrapper2;
