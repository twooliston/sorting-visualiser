function quickSort(items, left = 0, right = items.length) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(items, index, right);
    }
  }
  return items;
}

const quickSort = (arr, animationArray, start = 0, end = arr.length) => {
  let pivotIndex = pivot(arr, animationArray, start, end);

  if (start >= end) return arr;
  quickSort(arr, animationArray, start, pivotIndex);
  quickSort(arr, animationArray, pivotIndex + 1, end);

  return arr;
};

function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //swap two elements
      i++;
      j--;
    }
  }
  return i;
}

const pivot = (arr, animationArray, start = 0, end = arr.length + 1) => {
  let pivotIndex = start;
  let pivot = arr[pivotIndex];
  for (let i = start; i < arr.length; i++) {
    compareAnimation(animationArray, pivotIndex, i);
    if (arr[i] <= pivot) {
      swap(arr, i, pivotIndex);
      swapAnimation(animationArray, arr, i, pivotIndex);
      pivotIndex = i;
    } else {
      noAnimation(animationArray);
    }
  }
  return pivotIndex;
};

const pivot = (arr, animationArray, start = 0, end = arr.length + 1) => {
  let pivot = arr[start],
    pointer = start;

  for (let i = start; i < arr.length; i++) {
    if (pointer !== i) {
      compareAnimation(animationArray, pointer, i);
      if (arr[i] < pivot) {
        pointer++;
        swap(arr, pointer, i);
        swapAnimation(animationArray, arr, i, pointer);
      } else {
        noAnimation(animationArray);
      }
    }
  }
  swap(arr, start, pointer);
  swapAnimation(animationArray, arr, start, pointer);

  return pointer;
};
