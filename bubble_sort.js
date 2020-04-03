function bubbleSort(array) {
    for (var i = 0; i < array.length - 1; i++) {
        var isSwap = false;
        for (var j = 0; j < array.length - i - 1; j++) {
            //as i increases, the number of items to swap reduces
            if (array[j] > array[j + 1]) {
                isSwap = true;
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
        if (!isSwap) {
            return;
        }
    }
}

var arrInput = [100, 10, 15, 23];
bubbleSort(arrInput);
console.log(arrInput);