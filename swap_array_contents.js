function swapContents(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return;
    }

    for (var i = firstArray.length - 1; i >= 0; i--) {
        for (var j = 0; j < secondArray.length; j++) {
            var temp = firstArray[i];
            firstArray[i] = secondArray[j];
            secondArray[j] = temp;
        }
    }
}

var arr1 = [1, 2, 3, 4, 5];
var arr2 = [6, 7, 8, 9, 0];

swapContents(arr1, arr2);
console.log(arr1);
console.log(arr2);