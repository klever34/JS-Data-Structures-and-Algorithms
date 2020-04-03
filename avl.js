function Node(iValue, oParent, oLeft, oRight) {
    this.value = iValue;
    this.parent = oParent;
    this.left = oLeft;
    this.right = oRight;
    this.getBalance = function() {
        if (this.left !== undefined && this.right !== undefined) {
            return this.left.getHeight() - this.right.getHeight();
        } else if (this.left !== undefined) {
            return this.left.getHeight();
        } else if (this.right !== undefined) {
            return 0 - this.right.getHeight();
        } else {
            return 0;
        }
    };
    this.getHeight = function() {
        if (this.left !== undefined && this.right !== undefined) {
            return 1 + Math.max(this.left.getHeight(), this.right.getHeight());
        } else if (this.left !== undefined) {
            return 1 + this.left.getHeight();
        } else if (this.right !== undefined) {
            return 1 + this.right.getHeight();
        } else {
            return 1;
        }
    };
    this._setAsParent = function(oChild) {
        if (oChild !== undefined) {
            oChild.parent = this;
        }
    };
    this.setLeft = function(oLeft) {
        this._setAsParent(oLeft);
        this.left = oLeft;
    };
    this.setRight = function(oRight) {
        this._setAsParent(oRight);
        this.right = oRight;
    };
}

function AVL() {
    this.root = undefined;
    this.insert = function(iValue) {
        if (this.root === undefined) {
            this.root = new Node(iValue);
            return;
        }

        var oCurrent = this.root;
        while (true) {
            if (oCurrent.value < iValue) {
                if (oCurrent.right !== undefined) {
                    oCurrent = oCurrent.right;
                } else {
                    oCurrent.setRight(new Node(iValue));
                    break;
                }
            } else if (oCurrent.value > iValue) {
                if (oCurrent.left !== undefined) {
                    oCurrent = oCurrent.left;
                } else {
                    oCurrent.setLeft(new Node(iValue));
                    break;
                }
            } else {
                return false;
            }
        }
        this.rebalance(oCurrent);
        return true;
    };
    this.search = function(iValue) {
        var oCurrent = this.root;
        while (oCurrent !== undefined) {
            if (oCurrent.value < iValue) {
                oCurrent = oCurrent.right;
            } else if (oCurrent.value > iValue) {
                oCurrent = oCurrent.left;
            } else {
                return true;
            }
        }
        return false;
    };
    this.delete = function(iValue) {
        var oCurrent = this.root;
        while (oCurrent !== undefined) {
            if (oCurrent.value < iValue) {
                oCurrent = oCurrent.right;
            } else if (oCurrent.value > iValue) {
                oCurrent = oCurrent.left;
            } else {
                this.deleteNode(oCurrent);
                return true;
            }
        }
        return false;
    };
    this.deleteNode = function(oNode) {
        //case 1
        //node is a leaf
        if (oNode.left === undefined && oNode.right === undefined) {
            if (oNode !== this.root) {
                var oParent = oNode.parent;
                if (oParent.value < oNode.value) {
                    oParent.setRight(undefined);
                } else {
                    oParent.setLeft(undefined);
                }
                this.rebalance(oParent);
            } else {
                this.root = undefined;
            }
            return;
        }

        //case 2
        //node have one child
        if (oNode.left === undefined) {
            if (oNode !== this.root) {
                var oParent = oNode.parent;
                if (oParent.value < oNode.value) {
                    oParent.setRight(oNode.right);
                } else {
                    oParent.setLeft(oNode.right);
                }
            } else {
                oNode.right.parent = undefined;
                this.root = oNode.right;
            }
            this.rebalance(oNode.right);
            return;
        } else if (oNode.right === undefined) {
            if (oNode !== this.root) {
                var oParent = oNode.parent;
                if (oParent.value < oNode.value) {
                    oParent.setRight(oNode.left);
                } else {
                    oParent.setLeft(oNode.left);
                }
            } else {
                oNode.left.parent = undefined;
                this.root = oNode.left;
            }
            this.rebalance(oNode.left);
            return;
        }

        //case 3
        // node have both childs
        if (oNode.left !== undefined && oNode.right !== undefined) {
            var successor = this.getBiggestFromLeftSubtree(oNode);
            successor.setLeft(oNode.left);
            successor.setRight(oNode.right);
            var oParent = oNode.parent;
            if (oNode !== this.root) {
                if (oParent.value < oNode.value) {
                    oParent.setRight(successor);
                } else {
                    oParent.setLeft(successor);
                }
            } else {
                successor.parent = undefined;
                this.root = successor;
            }
            this.rebalance(successor);
        }
    };
    this.getBiggestFromLeftSubtree = function(oNode) {
        var result = oNode.left;
        if (result.right === undefined) {
            //no right child
            oNode.setLeft(result.left);
            return result;
        }

        while (result.right !== undefined) {
            result = result.right;
        }

        result.parent.setRight(result.left);
        return result;
    };
    this.rebalance = function(oNode) {
        var balance = oNode.getBalance();

        if (balance === 2) {
            //height left subtree is bigger by 2
            if (oNode.left.getBalance() === -1) {
                oNode = this.LR(oNode);
            } else {
                oNode = this.RR(oNode);
            }
        } else if (balance === -2) {
            //height of right subtree is bigger by 2
            if (oNode.right.getBalance() === 1) {
                oNode = this.RL(oNode);
            } else {
                oNode = this.LL(oNode);
            }
        }

        if (oNode.parent !== undefined) {
            this.rebalance(oNode.parent);
        }
    };
    this.LL = function(node) {
        var right = node.right;
        var parent = node.parent;
        node.setRight(right.left);

        right.setLeft(node);
        if (node !== this.root) {
            if (parent.value < right.value) {
                parent.setRight(right);
            } else {
                parent.setLeft(right);
            }
        } else {
            right.parent = undefined;
            this.root = right;
        }
        return right;
    };

    this.RR = function(node) {
        var left = node.left;
        var parent = node.parent;
        node.setLeft(left.right);
        left.setRight(node);
        if (node !== this.root) {
            if (parent.value < left.value) {
                parent.setRight(left);
            } else {
                parent.setLeft(left);
            }
        } else {
            left.parent = undefined;
            this.root = left;
        }
        return left;
    };
    this.RL = function(node) {
        this.RR(node.right);
        return this.LL(node);
    };
    this.LR = function(node) {
        this.LL(node.left);
        return this.RR(node);
    };
}
var tree = new AVL();
var aInput = [];
for (var i = 0; i < 100; i++) {
    aInput[i] = Math.round(Math.random() * 100);
    while (!tree.insert(aInput[i])) {
        aInput[i] = Math.round(Math.random() * 100);
    }
}
for (var i = 0; i < 50; i++) {
    if (!tree.delete(aInput[i])) {
        console.log("ERROR: Cannot delete " + aInput[i]);
    } else {
        if (tree.search(aInput[i])) {
            console.log("ERROR: Value is still in the tree " + aInput[i]);
        }
    }
}
for (var i = 0; i < 50; i++) {
    if (tree.search(aInput[i])) {
        console.log("ERROR: Value is still in the tree " + aInput[i]);
    }
}
for (var i = 50; i < 100; i++) {
    if (!tree.search(aInput[i])) {
        console.log("ERROR: Value is not in the tree" + aInput[i]);
    }
}

console.log("END");