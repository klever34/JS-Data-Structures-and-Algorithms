function selectionSort(aInput) {
    for (let wall = 0; wall < aInput.length - 1; wall++) {
        var indexOfSmallest = wall;
        for (let j = wall + 1; j < aInput.length; j++) {
            if (aInput[indexOfSmallest] > aInput[j]) {
                indexOfSmallest = j;
            }
        }
        var temp = aInput[wall];
        aInput[wall] = aInput[indexOfSmallest];
        aInput[indexOfSmallest] = temp;
    }
}

var arrayinput = [100, 10, 15, 23, 2, 9, 28, 1, 36, 1];
selectionSort(arrayinput);
console.log(arrayinput);