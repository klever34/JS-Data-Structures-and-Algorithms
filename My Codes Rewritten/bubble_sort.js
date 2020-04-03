function bubbleSort(aInput) {
    for (let i = 0; i < aInput.length; i++) {
        var isSwap = false;
        for (let j = 0; j < aInput.length - i - 1; j++) {
            if (aInput[j] > aInput[j + 1]) {
                var temp = aInput[j];
                aInput[j] = aInput[j + 1];
                aInput[j + 1] = temp;
                isSwap = true;
            }
        }
        if (!isSwap) {
            return;
        }
    }
}

var arrayinput = [100, 10, 15, 23, 2, 9, 28, 1, 36, 1];
bubbleSort(arrayinput);
console.log(arrayinput);