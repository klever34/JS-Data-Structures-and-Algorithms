function quickSort(array, from, to) {
    if (from < to) {
        var indexOfPivot = partition(array, from, to);
        quickSort(array, from, indexOfPivot - 1);
        quickSort(array, indexOfPivot + 1, to);
    }
}

function partition(array, from, to) {
    var pivot = array[to];
    var wall = from;
    for (var i = from; i < to; i++) {
        if (array[i] <= pivot) {
            //swap with first number behind the wall
            var temp = array[wall];
            array[wall] = array[i];
            array[i] = temp;

            wall++;
        }
    }
    array[to] = array[wall];
    array[wall] = pivot;
    return wall;
}

var aInput = [100, 10, 15, 23, 2, 9, 28, 1, 36, 1];
console.log(aInput);
quickSort(aInput, 0, aInput.length - 1);
console.log(aInput);