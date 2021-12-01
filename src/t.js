//const a = [1,5,6,9,3,8,7];
const a = [1,5,0,21,7,85,35,99,12,63,7,48,96,45,51,20,7];

let merge = (tab, aux, left, mid, right) => {
    aux = [...tab];
    let leftIdx = left;
    let rightIdx = mid + 1;
    for(let k = left; k < right + 1; k++){
        if(aux[leftIdx] <= aux[rightIdx] && leftIdx < mid + 1){
            tab[k] = aux[leftIdx++];
        }
        else if(aux[rightIdx] <= aux[leftIdx] && rightIdx < right + 1){
            tab[k] = aux[rightIdx++];
        }
        else if (rightIdx === (right + 1) && leftIdx < mid + 1){
            tab[k] = aux[leftIdx++];
        }
        else if(leftIdx === (mid + 1) && rightIdx < right + 1){
            tab[k] = aux[rightIdx++];
        }
    }
}

let mergeSort = (tab, aux, left, right) => {
    if (left >= right) return;
    let mid = left + Math.floor((right - left)/2);
    mergeSort(tab, aux, left, mid);
    mergeSort(tab, aux, mid + 1, right);
    merge(tab, aux, left, mid, right);
}

b= [];

console.log('a: ', a);

mergeSort(a, b, 0, a.length- 1);

console.log('mergesort(a, b, 0, a.length-1): ', a);


