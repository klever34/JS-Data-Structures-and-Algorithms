function filterContent(stringInput) {
    return [...stringInput].filter(char => isNaN(char)).join("");
}

var result = filterContent("5abc2de123");
console.log(result);