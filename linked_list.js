function Node(iValue, oNext) {
    this.value = iValue;
    this.next = oNext;
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

var LL = new LinkedList();
var aInput = [];
for (var i = 0; i < 100; i++) {
    aInput[i] = Math.round(Math.random() * 100);
    while (!LL.insert(aInput[i])) {
        aInput[i] = Math.round(Math.random() * 100);
    }
}
for (var i = 0; i < 50; i++) {
    if (!LL.delete(aInput[i])) {
        console.log("ERROR: Cannot delete " + aInput[i]);
    }
}
for (var i = 0; i < 50; i++) {
    if (LL.search(aInput[i])) {
        console.log("ERROR: Value is still in the tree " + aInput[i]);
    }
}
for (var i = 50; i < 100; i++) {
    if (!LL.search(aInput[i])) {
        console.log("ERROR: Value is not in the tree" + aInput[i]);
    }
}

console.log("END");