export function getMergeSortAnimations(array) {
  // if nothing to compare
  if (array.length < 2) return array;

  const animationArray = [];
  const auxiliaryArray = array.slice();
  mergeSort(array, 0, array.length - 1, auxiliaryArray, animationArray);
  return animationArray;
}

function mergeSort(
  mainArray,
  startIndex,
  endIndex,
  auxiliaryArray,
  animationArray
) {
  if (startIndex === endIndex) return;
  const halfwayPoint = Math.floor((startIndex + endIndex) / 2);

  // on the left side
  mergeSort(
    auxiliaryArray,
    startIndex,
    halfwayPoint,
    mainArray,
    animationArray
  );
  // on the right side
  mergeSort(
    auxiliaryArray,
    halfwayPoint + 1,
    endIndex,
    mainArray,
    animationArray
  );

  // merge the two sides
  merge(
    mainArray,
    startIndex,
    halfwayPoint,
    endIndex,
    auxiliaryArray,
    animationArray
  );
}

function merge(
  mainArray,
  startIndex,
  halfwayPoint,
  endIndex,
  auxiliaryArray,
  animationArray
) {
  let k = startIndex;
  let i = startIndex;
  let j = halfwayPoint + 1;
  while (i <= halfwayPoint && j <= endIndex) {
    compareAnimation(animationArray, i, j);

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // swap the values
      animationArray.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // swap the values
      animationArray.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= halfwayPoint) {
    compareAnimation(animationArray, i, i);

    // swap the values
    animationArray.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    compareAnimation(animationArray, j, j);

    // swap the values
    animationArray.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// added twice, once for highlightling and the second for marking as sorted
function compareAnimation(animationArray, indexOne, indexTwo) {
  animationArray.push([indexOne, indexTwo]);
  animationArray.push([indexOne, indexTwo]);
}
