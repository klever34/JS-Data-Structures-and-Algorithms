function mergeSort(aInput, from, to) {
    if (to - from < 1) {
        return;
    }
    var middle = parseInt((to + from) / 2);
    mergeSort(aInput, from, middle);
    mergeSort(aInput, middle + 1, to);
    merge(aInput, from, middle, to);
}

function merge(aInput, from, middle, to) {
    var leftArray = aInput.slice(from, middle + 1);
    var rightArray = aInput.slice(middle + 1, to + 1);
    var leftPointer = 0;
    var rightPointer = 0;

    for (var i = from; i <= to; i++) {
        //meaning leftArray is empty
        if (leftPointer === leftArray.length) {
            while (rightPointer < rightArray.length) {
                aInput[i] = rightArray[rightPointer];
                rightPointer++;
                i++;
            }
            return;
        }
        //meaning rightArray is empty
        if (rightPointer === rightArray.length) {
            while (leftPointer < leftArray.length) {
                aInput[i] = leftArray[leftPointer];
                leftPointer++;
                i++;
            }
            return;
        }

        if (leftArray[leftPointer] < rightArray[rightPointer]) {
            aInput[i] = leftArray[leftPointer];
            leftPointer++;
        } else {
            aInput[i] = rightArray[rightPointer];
            rightPointer++;
        }
    }
}

var arrayinput = [100, 10, 15, 23, 2, 9, 28, 1, 36, 1];
mergeSort(arrayinput, 0, arrayinput.length - 1);
console.log(arrayinput);