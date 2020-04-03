function recursiveIsSorted(arrayInput) {
    if (arrayInput.length == 1) {
        return;
    }
    return arrayInput.slice(1).every(function(item, i) {
        return arrayInput[i] <= item;
    });
}

var arr = [1, 2, 3, 4];
var result = recursiveIsSorted(arr);
console.log(result);