function Node(iValue, oLeft, oRight) {
    this.value = iValue;
    this.left = oLeft;
    this.right = oRight;
}

var BST = {
    root: undefined,
    insert: function(iValue) {
        if (this.root === undefined) {
            this.root = new Node(iValue);
            return true;
        }
        var oNodeBefore = undefined;
        var oCurrentNode = this.root;
        while (oCurrentNode !== undefined) {
            oNodeBefore = oCurrentNode;
            if (oCurrentNode.value < iValue) {
                oCurrentNode = oCurrentNode.right;
            } else if (oCurrentNode.value > iValue) {
                oCurrentNode = oCurrentNode.left;
            } else {
                return false;
            }
        }

        if (oNodeBefore.value < iValue) {
            oNodeBefore.right = new Node(iValue);
        } else {
            oNodeBefore.left = new Node(iValue);
        }
        return true;
    },
    search: function(iValue) {
        var oCurrentNode = this.root;
        while (oCurrentNode !== undefined) {
            if (oCurrentNode.value < iValue) {
                oCurrentNode = oCurrentNode.right;
            } else if (oCurrentNode.value > iValue) {
                oCurrentNode = oCurrentNode.left;
            } else {
                return true;
            }
        }
        return false;
    },
    findBiggestInLeft: function(oNode) {
        var oNodeBefore = oNode;
        var oCurrentNode = oNode.left; //left subtree
        if (oCurrentNode.right === undefined) {
            oNodeBefore.left = oCurrentNode.left;
            return oCurrentNode.value;
        }
        while (oCurrentNode.right !== undefined) {
            oNodeBefore = oCurrentNode;
            oCurrentNode = oCurrentNode.right;
        }
        if (oCurrentNode.left === undefined) {
            oNodeBefore.right = undefined;
            return oCurrentNode.value;
        } else {
            oNodeBefore.right = oCurrentNode.left;
            return oCurrentNode.value;
        }
    },
    deleteValue: function(iValue) {
        if (this.root === undefined) {
            return false;
        }
        if (this.root.value === iValue) {
            if (this.root.left === undefined && this.root.right === undefined) {
                this.root = undefined;
            } else if (this.root.left === undefined) {
                this.root = this.root.right;
            } else if (this.root.right === undefined) {
                this.root = this.root.left;
            } else {
                this.root = new Node(
                    this.findBiggestInLeft(this.root),
                    this.root.left,
                    this.root.right
                );
            }
            return true;
        }
        var oNodeBefore = undefined;
        var oCurrentNode = this.root;
        while (oCurrentNode.value !== iValue) {
            oNodeBefore = oCurrentNode;
            if (oCurrentNode.value < iValue) {
                oCurrentNode = oCurrentNode.right;
            } else if (oCurrentNode.value > iValue) {
                oCurrentNode = oCurrentNode.left;
            }
            if (oCurrentNode === undefined) {
                return false;
            }
        }

        if (oCurrentNode.left === undefined && oCurrentNode.right === undefined) {
            if (oNodeBefore.value < iValue) {
                oNodeBefore.right = undefined;
            } else {
                oNodeBefore.left = undefined;
            }
        } else if (oCurrentNode.left === undefined) {
            if (oNodeBefore.value < iValue) {
                oNodeBefore.right = oCurrentNode.right;
            } else {
                oNodeBefore.left = oCurrentNode.right;
            }
        } else if (oCurrentNode.right === undefined) {
            if (oNodeBefore.value < iValue) {
                oNodeBefore.right = oCurrentNode.left;
            } else {
                oNodeBefore.left = oCurrentNode.left;
            }
        } else {
            if (oNodeBefore.value < iValue) {
                oNodeBefore.right = new Node(
                    this.findBiggestInLeft(oCurrentNode),
                    oCurrentNode.left,
                    oCurrentNode.right
                );
            } else {
                oNodeBefore.left = new Node(
                    this.findBiggestInLeft(oCurrentNode),
                    oCurrentNode.left,
                    oCurrentNode.right
                );
            }
        }
        return true;
    }
};

var aInput = [];
for (var i = 0; i < 100; i++) {
    aInput[i] = Math.round(Math.random() * 100);
    while (!BST.insert(aInput[i])) {
        aInput[i] = Math.round(Math.random() * 100);
    }
}
for (var i = 0; i < 50; i++) {
    if (!BST.deleteValue(aInput[i])) {
        console.log("ERROR: Cannot delete " + aInput[i]);
    }
}
for (var i = 0; i < 50; i++) {
    if (BST.search(aInput[i])) {
        console.log("ERROR: Value is still in the tree " + aInput[i]);
    }
}
for (var i = 50; i < 100; i++) {
    if (!BST.search(aInput[i])) {
        console.log("ERROR: Value is not in the tree" + aInput[i]);
    }
}

console.log("END");