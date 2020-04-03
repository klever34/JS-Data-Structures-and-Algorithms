function twoDimensionQuickSort(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i][0] + array[i][1]);
        if (array[i][0] + array[i][1] < array[i + 1][0] + array[i + 1][1]) {
            var temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
        }
    }
}

var aInput = [
    [10, 2],
    [20, 8],
    [2, 4]
];
twoDimensionQuickSort(aInput);
console.log(aInput);