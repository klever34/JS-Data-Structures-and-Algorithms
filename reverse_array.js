function reverseArray(array) {
    for (var i = 0; i < array.length / 2; i++) {
        [arr[i], arr[arr.length - i - 1]] = [arr[arr.length - i - 1], arr[i]]; //Swapping with Array Destructuring [1,5] = [5,1]
    }
}

var arr = [1, 2, 3, 4, 5];
reverseArray(arr);
console.log(arr);