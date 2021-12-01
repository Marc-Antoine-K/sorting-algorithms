const a = [1, 5, 6, 9, 3, 8, 7];
const b = [1, 5, 0, 21, 7, 85, 35, 99, 12, 63, 7, 48, 96, 45, 51, 20, 7];

function Heapify(a, i, lgth) {
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < lgth && a[max] < a[left]) {
    max = left;
  }

  if (right < lgth && a[max] < a[right]) {
    max = right;
  }

  if (max != i) {
    [a[max], a[i]] = [a[i], a[max]];
    //heapify down the tree if necessary
    Heapify(a, max, lgth);
  }
}

function heapSort(a) {
  //max-Heapify the array starting from the root + 1 level and going from right to left up to the root
  for (let k = Math.floor(a.length / 2); k > -1; k--) {
    Heapify(a, k, a.length);
  }

  let lgth = a.length;

  for (let k = a.length - 1; k > 0; k--) {
    //put the max at the end of the array and shorten the array to be sorted by 1
    [a[0], a[k]] = [a[k], a[0]];
    lgth--;
    //Heapify the new unsorted array (from 0 to k - 1)
    Heapify(a, 0, lgth);
  }
}

//var arr = [3, 0, 2, 5, -1, 4, 1];
console.log("a: ", a);
heapSort(a);
console.log("heapsort(a,0): ", a);

console.log("b: ", b);
heapSort(b);
console.log("heapsort(b,0): ", b);
