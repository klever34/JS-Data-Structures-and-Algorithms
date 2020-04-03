function selectionSort(array) {
    for (var wall = 0; wall < array.length - 1; wall++) {
        //indexOfSmallest will be the same with the wall
        var indexOfSmallest = wall;
        for (var j = wall + 1; j < array.length; j++) {
            //start iteration from the next index
            if (array[indexOfSmallest] > array[j]) {
                indexOfSmallest = j;
            }
        }
        //swap items btw the indexes
        var temp = array[wall];
        array[wall] = array[indexOfSmallest];
        array[indexOfSmallest] = temp;
    }
}

var unorderedArray = [10, 15, 23, 2, 9, 28, 1, 36];
selectionSort(unorderedArray);
console.log(unorderedArray);