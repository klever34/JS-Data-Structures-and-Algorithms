function mergeSort(array, from, to) {
    //check if we have one element remainig

    if (to - from < 1) {
        return;
    } else {
        //get the middle of the array and sort
        var middle = parseInt((to + from) / 2);
        mergeSort(array, from, middle);
        mergeSort(array, middle + 1, to);
        merge(array, from, middle, to);
    }
}

function merge(array, from, middle, to) {
    var leftArray = array.slice(from, middle + 1);
    var rightArray = array.slice(middle + 1, to + 1);
    var leftPointer = 0;
    var rightPointer = 0;
    //running through the whole array
    for (var i = from; i <= to; i++) {
        //check if the left array is empty
        if (leftPointer === leftArray.length) {
            while (rightPointer < rightArray.length) {
                array[i] = rightArray[rightPointer];
                rightPointer++;
                i++;
            }
            return;
        }
        //check if the right array is empty
        if (rightPointer === rightArray.length) {
            while (leftPointer < leftArray.length) {
                array[i] = leftArray[leftPointer];
                leftPointer++;
                i++;
            }
            return;
        }
        //means we have contents in both arrays
        if (leftArray[leftPointer] < rightArray[rightPointer]) {
            array[i] = leftArray[leftPointer];
            leftPointer++;
        } else {
            array[i] = rightArray[rightPointer];
            rightPointer++;
        }
    }
}
var aInput = [100, 10, 15, 23, 2, 9, 28, 1, 36, 1];
console.log(aInput);
mergeSort(aInput, 0, aInput.length - 1);
console.log(aInput);