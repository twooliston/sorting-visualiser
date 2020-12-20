export function getBubbleSortAnimations(array) {
  // if nothing to compare
  if (array.length < 2) return array;

  const animationArray = [];
  bubbleSort(array, array.length - 1, animationArray);
  return animationArray;
}

function bubbleSort(mainArray, endIndex, animationArray) {
  var temp;
  var notSorted = true;
  var len = mainArray.length;

  while (notSorted) {
    notSorted = false;
    for (let i = 0; i < len - 1; i++) {
      compareAnimation(animationArray, i, i + 1);
      animationArray.push([i, mainArray[i], i + 1, mainArray[i + 1]]);
      if (mainArray[i] > mainArray[i + 1]) {
        temp = mainArray[i];
        mainArray[i] = mainArray[i + 1];
        mainArray[i + 1] = temp;
        notSorted = true;
      }
    }
    len--;
  }
}

// added twice, once for highlightling and the second for marking as sorted
function compareAnimation(animationArray, indexOne, indexTwo) {
  animationArray.push([indexOne, indexTwo]);
  animationArray.push([indexOne, indexTwo]);
}
