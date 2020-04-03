function Node(iValue, oNext) {
    this.value = iValue;
    this.next = oNext;
}

function HashTable(iSize) {
    //Uses an Array of LinkedList to store values
    this.content = []
    for (var index = 0; index < iSize; index++) {
        this.content[index] = new LinkedList();
    }
    this.insert = function(sValue) {
        var index = this.hashFunction(sValue) % this.content.length;
        return this.content[index].insert(sValue);
    }
    this.search = function(sValue) {
        var index = this.hashFunction(sValue) % this.content.length;
        return this.content[index].search(sValue);
    }
    this.delete = function(sValue) {
        var index = this.hashFunction(sValue) % this.content.length;
        return this.content[index].delete(sValue);
    }
    this.hashFunction = function(sValue) {
        var hash = 7;
        for (var i = 0; i < sValue.length; i++) {
            hash = hash * 31 + sValue.charCodeAt(i);
        }
        return hash;
    }
    this.jenkins_hash = function(sValue) {
        var hash = 0;
        for (var i = 0; i < sValue.length; i++) {
            hash += (sValue.charCodeAt(i) & 0xFF);
            hash += (hash << 10);
            hash ^= (hash << 6);
        }
        //binary shifts aew much faster for huge number of records
        hash += (hash << 3);
        hash ^= (hash >> 11);
        hash += (hash << 15);
        return hash;
    }
}

function LinkedList() {
    this.root = undefined;
    this.insert = function(iValue) {
        if (this.search(iValue)) {
            //to avoid inserting same data
            return false;
        }
        this.root = new Node(iValue, this.root); //all new nodes are created at the root and then points to the current root node.
        return true;
    };
    this.search = function(iValue) {
        var oCurrent = this.root;
        while (oCurrent !== undefined) {
            if (oCurrent.value === iValue) {
                return true;
            }
            oCurrent = oCurrent.next;
        }
        return false;
    };
    this.delete = function(iValue) {
        if (this.root !== undefined) {
            if (this.root.value === iValue) {
                this.root = this.root.next;
                return true;
            }
        } else {
            return false;
        }

        var oNodeBefore = undefined;
        var oCurrent = this.root;
        while (oCurrent.value !== iValue) {
            oNodeBefore = oCurrent;
            oCurrent = oCurrent.next;
            if (oCurrent === undefined) {
                return false;
            }
        }
        oNodeBefore.next = oCurrent.next;
        return true;
    };
}

var t = new HashTable(5);
var aInput = ["Adam", "car", "code", "ben", "fall", "the", "there", "compile"];
for (var i = 0; i < aInput.length; i++) {
    t.insert(aInput[i]);
}
for (var i = 0; i < aInput.length; i++) {
    if (!t.search(aInput[i])) {
        console.log("ERROR : cannot find " + aInput[i]);
    }
}
for (var i = 0; i < parseInt(aInput.length / 2); i++) {
    if (!t.delete(aInput[i])) {
        console.log("ERROR : cannot delete " + aInput[i]);
    }
}
for (var i = 0; i < parseInt(aInput.length / 2); i++) {
    if (t.search(aInput[i])) {
        console.log("ERROR : found after deletion " + aInput[i]);
    }
}
for (var i = parseInt(aInput.length / 2); i < aInput.length; i++) {
    if (!t.search(aInput[i])) {
        console.log("ERROR : cannot find " + aInput[i]);
    }
}
console.log("END")