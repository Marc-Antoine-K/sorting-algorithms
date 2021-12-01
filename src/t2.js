const a = [1, 5, 6, 9, 3, 8, 7];
const b = [1, 5, 0, 21, 7, 85, 35, 99, 12, 63, 7, 48, 96, 45, 51, 20, 7];

function Heapify(a, i, lgth) {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let max = i;

  if (left < lgth && a[max] < a[left]) {
    max = left;
  }
  if (right < lgth && a[max] < a[right]) {
    max = right;
  }

  if (max != i) {
    //swap(i, max)
    [a[i], a[max]] = [a[max], a[i]];
    Heapify(a, max, lgth);
  }
}

function heapSort(a) {
  //Creates a max-heap from the array
  for (let k = Math.floor(a.length / 2); k > -1; k--) {
    Heapify(a, k, a.length);
  }

  let lgth = a.length;

  //Place the root(max) in the ordered array (swap), removes the root and heapify the new array
  for (let k = a.length -1; k > 0; k--) {
    [a[0], a[k]] = [a[k], a[0]];
    lgth--;
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
