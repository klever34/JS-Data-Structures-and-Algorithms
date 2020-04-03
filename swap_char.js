function swapChar(char1, char2, stringInput) {
    let stringSplit = stringInput.split("");

    for (let i = 0; i < stringSplit.length; i++) {
        if (stringSplit[i] === char1) {
            stringSplit[i] = char2;
        }
    }
    return stringSplit.join("");
}

var result = swapChar("a", "b", "a123baaa");
console.log(result);