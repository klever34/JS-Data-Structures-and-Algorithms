// functions: push, pop, peek and length

var letters = [];
var word = "mallam";
var reverseWord = "";

for (var i = 0; i < word.length; i++) {
    letters.push(word[i]);
}

for (var i = 0; i < word.length; i++) {
    reverseWord += letters.pop();
}

if (word === reverseWord) {
    console.log(`${word} is a palindrome`);
} else {
    console.log(`${word} is not a palindrome`);
}

class Stack {
    constructor() {
        this.count = 0;
        this.storage = {};
        this.push = function(value) {
            this.storage[this.count] = value;
            this.count++;
        };
        this.pop = function() {
            if (this.count === 0) return undefined;
            this.count--;
            var result = this.storage[this.count];
            delete this.storage[this.count];
            return result;
        };
        this.size = function() {
            return this.count;
        };
        this.peek = function() {
            return this.storage[this.count - 1];
        };
    }
}

var myStack = new Stack();
myStack.push(10);
myStack.push(3);
myStack.push(16);
console.log(myStack.pop());