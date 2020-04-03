function charOccurrences(character, stringInput) {
    if (stringInput.indexOf(character) < 0) {
        return;
    }
    // Method 1
    // let stringSplit = stringInput.split("");
    // for (let index = 0; index < stringSplit.length; index++) {
    //     if (character === stringSplit[index]) {
    //         count++;
    //     }
    // }
    // return count;

    // Method 2
    let count = 0;
    [...stringInput].filter(function(char) {
        if (char === character) {
            count++;
        }
    });
    return count;
}

var result = charOccurrences("e", "free");
console.log(result);