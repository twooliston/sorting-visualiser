export function getQuickSortAnimations(array) {
  // if nothing to compare
  if (array.length < 2) return array;

  const animationArray = [];
  quickSort(array, animationArray);
  // sortedArray.filter((value) => value !== undefined);
  return animationArray;
}

const quickSort = (arr, animationArray, start = 0, end = arr.length) => {
  let pivotIndex = pivot(arr, animationArray, start, end);

  if (start >= end) return arr;
  quickSort(arr, animationArray, start, pivotIndex);
  quickSort(arr, animationArray, pivotIndex + 1, end);

  return arr;
};

const pivot = (arr, animationArray, start, end) => {
  let pivotIndex = start;
  let pivot = arr[pivotIndex];

  for (let i = start + 1; i < end; i++) {
    compareAnimation(animationArray, i, pivotIndex);
    if (arr[i] < pivot) {
      swap(arr, i, pivotIndex);
      swapAnimation(animationArray, arr, i, pivotIndex);
      pivotIndex++;
    } else {
      noAnimation(animationArray);
    }
  }

  return pivotIndex;
};

// added twice, once for highlightling and the second for marking as sorted
const compareAnimation = (animationArray, indexOne, indexTwo) => {
  animationArray.push([indexOne, indexTwo]);
  animationArray.push([indexOne, indexTwo]);
};

const swapAnimation = (animationArray, arr, indexOne, pivotIndex) => {
  let endOfArray = [];
  let i = pivotIndex;
  while (i < arr.length) {
    endOfArray.push(arr[i++]);
  }
  animationArray.push([arr[indexOne], pivotIndex, endOfArray]);
};

const noAnimation = (animationArray) => {
  animationArray.push(["do nothing"]);
};

const swap = (arr, a, b) => {
  let temp = arr[a];
  arr.splice(a, 1);
  arr.splice(b, 0, temp);
};
