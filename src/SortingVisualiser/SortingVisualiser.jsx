import React from 'react';
import './SortingVisualiser.css';
import * as MergeAlgorithm from '../SortingAlgos/mergeAlgorithm.js'
import * as BubbleAlgorithm from '../SortingAlgos/bubbleAlgorithm.js'

//test
// import {getMergeSortAnimations} from '../SortingAlgos/testAlgorithms.js';

const windowWidth = window.innerWidth;
const maxHeight = window.innerHeight/2;

const mobilePadding = 4/100;
const pcPadding = 31/100;

export class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            windowWidth,
            maxHeight,
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const windowWidth = window.innerWidth;
        const maxHeight = window.innerHeight/2;

        const array = [];
        var numberOfBars = 0;

        // get number of bars that can fit in the panel
        if (windowWidth > 1024) {
            numberOfBars = Math.trunc(windowWidth*(1 - (pcPadding*2))/5);
        } else {
            numberOfBars = Math.trunc(windowWidth*(1 - (mobilePadding*2))/5);
        }

        for (let i = 0; i < numberOfBars; i++) {
            // chosen 10 as minimum to make the value visable on the interface
            array.push(randomIntegerFromInterval(10, maxHeight));
        }
        this.setState({array, windowWidth, maxHeight});
        
        // reset colour
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = 'cadetblue'
        }
    }

    MergeSort(array) {
        const animationArray = MergeAlgorithm.getMergeSortAnimations(array);
        for (let i = 0; i < animationArray.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [firstIndex, secondIndex] = animationArray[i];
                const firstStyle = arrayBars[firstIndex].style;
                const secondStyle = arrayBars[secondIndex].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    firstStyle.backgroundColor = color;
                    secondStyle.backgroundColor = color;
                }, i * 10);
            } else {
                setTimeout(() => {
                    const [firstIndex, newHeight] = animationArray[i];
                    const firstStyle = arrayBars[firstIndex].style;
                    firstStyle.height = `${newHeight}px`;
                }, i * 10);
            }
        }
    }

    QuickSort(array) {
        // const animationArray = QuickAlgorithm.getQuickSortAnimations(array);
        // this.animateSort(animationArray);
    }

    InsertionSort(array) {
        // const animationArray = InsertionAlgorithm.getInsertionSortAnimations(array);
        // this.animateSort(animationArray);
    }

    // use when data set is almost sorted (or small data sets)
    BubbleSort(array) {
        const animationArray = BubbleAlgorithm.getBubbleSortAnimations(array);
        this.animateSort(animationArray);
    }

    animateSort(animationArray) {
        for (let i = 0; i < animationArray.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [firstIndex, secondIndex] = animationArray[i];
                const firstStyle = arrayBars[firstIndex].style;
                const secondStyle = arrayBars[secondIndex].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    firstStyle.backgroundColor = color;
                    secondStyle.backgroundColor = color;
                }, i * 5);
            } else {
                setTimeout(() => {
                    const [firstIndex, firstValue, secondIndex, secondValue] = animationArray[i];
                    if (firstValue > secondValue) {
                        const firstStyle = arrayBars[firstIndex].style;
                        firstStyle.height = `${secondValue}px`;
                        const secondStyle = arrayBars[secondIndex].style;
                        secondStyle.height = `${firstValue}px`;
                    }
                }, i * 5);
            }
        }
    }

    TestSorts(array) {
        const jsSorted = array.slice().sort((a, b) => a - b);
        const mergeSorted = this.MergeSort(array);
        
        if (jsSorted.length === mergeSorted.length) {
            for (let i = 0; i < jsSorted.length; i++) {
                if (jsSorted[i] !== mergeSorted[i]) {
                    console.log(false);
                }
            }
            console.log(true);

        } else {
            console.log(false);
        }
    }

    render() {
        const {array, maxHeight} = this.state;

        return (
            <div className="page">
                <div className="panel">
                    <div className="array-container" style={{height: `${maxHeight}px`}}>
                        {array.map((value, index) => (
                            <div className="array-bar" key={index} style={{height: `${value}px`}}/>
                        ))}
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={() => this.resetArray()}> Generate New Values</button>
                    <button onClick={() => this.MergeSort(array)}> Merge Sort</button>
                    <button onClick={() => this.QuickSort(array)}> QuickSort</button>
                    <button onClick={() => this.HeapSort(array)}> Heap Sort</button>
                    <button onClick={() => this.BubbleSort(array)}>Bubble Sort</button>
                    <button onClick={() => this.TestSorts(array)}> Test Sorts</button>
                </div>
            </div>
        );
    }
}

function randomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * max - min + 1) + min;
}

export default SortingVisualiser;