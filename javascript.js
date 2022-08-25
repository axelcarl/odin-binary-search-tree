node = () => {
  return {
    data: null,
    left: null,
    right: null,
  }
}

tree = (arr) => {
  returnObj = {
    buildTree: buildTree = (tempArray, start, end) => {
      if (start > end) {
        return null;
      }
      const middle = Math.ceil((start + end) / 2);
      let root = node();
      root.data = tempArray[middle];
      root.left = buildTree(tempArray, start, middle - 1)
      root.right = buildTree(tempArray, middle + 1, end)
      return root;
    },

    root: buildTree(arr, 0, arr.length - 1),

    insert: insert = (data) => {
      let temp = node();
      temp = returnObj.root;
      while (temp.left || temp.right) {
        if (temp.data > data && temp.left == null)
          break;
        if (temp.data < data && temp.right == null)
          break;
        if (temp.left.data > data)
          temp = temp.left
        else if (temp.right.data < data)
          temp = temp.right
      }
      let insertNode = node()
      insertNode.data = data
      if (insertNode.data < temp.data)
        temp.left = insertNode
      else
        temp.right = insertNode
    },
    remove: remove = (data) => {
      let temp = node();
      temp = returnObj.root;
      while (temp.left || temp.right) {
        if (temp.data == data)
          break;
        if (temp.right != null)
          if (temp.right.data == data)
            break;

        if (temp.left != null)
          if (temp.left.data == data)
            break;

        if (temp.data > data)
          temp = temp.left
        if (temp.data < data)
          temp = temp.right
      }
      let direction = 'left';
      if (temp.data < data)
        direction = 'right';

      // no children
      if (temp.data == data && !temp.right && !temp.left) {
        temp.data = null;
        return;
      }

      if (!temp[direction].right && !temp[direction].left) {
        temp[direction] = null;
        return;
      }
      // one child - look over
      if (!temp[direction].right) {
        temp[direction] = temp[direction].left;
        return;
      }
      else if (!temp[direction].left) {
        temp[direction] = temp[direction].right;
        return;
      }
      //two children - in production
      let replace = temp;
      if (temp.data != data)
        replace = temp[direction]
      temp = temp.right;
      while (temp.left) {
        temp = temp.left;
      }
      let newData = temp.data;
      returnObj.remove(newData);
      replace.data = newData;
    },
    find: find = (data) => {
      let temp = returnObj.root;
      while (temp != null) {
        if (temp.data == data)
          return temp;
        if (temp.data < data)
          temp = temp.right
        if (temp.data > data)
          temp = temp.left
      }
      return null;
    },
    levelOrder: levelOrder = (func) => {
      let temp = returnObj.root;
      let nodes = []
      breadthTraverse = (arr) => {
        if (arr.length < 1)
          return;
        nodes.push(arr[0])
        if (arr[0].left)
          arr.push(arr[0].left)
        if (arr[0].right)
          arr.push(arr[0].right)
        arr.shift()
        breadthTraverse(arr)
      }
      breadthTraverse([temp])
      if (typeof (func) == 'function')
        nodes.forEach(node => { func(node) })
      else
        return nodes;
    },
    preOrder: preOrder = (func) => {
      let temp = returnObj.root;
      let nodes = [];
      depthTraverse = (temp) => {
        if (temp == null)
          return;
        nodes.push(temp)
        depthTraverse(temp.left)
        depthTraverse(temp.right)
      }
      depthTraverse(temp)
      if (typeof (func) == 'function')
        nodes.forEach(node => { func(node) })
      else
        return nodes;
    },
    inOrder: inOrder = (func) => {
      let temp = returnObj.root;
      let nodes = [];
      depthTraverse = (temp) => {
        if (temp == null)
          return;
        depthTraverse(temp.left)
        nodes.push(temp)
        depthTraverse(temp.right)
      }
      depthTraverse(temp)
      if (typeof (func) == 'function')
        nodes.forEach(node => { func(node) })
      else {
        let returnArray = [];
        nodes.forEach(node => returnArray.push(node.data))
        return returnArray;
      }
    },
    postOrder: postOrder = (func) => {
      let temp = returnObj.root;
      let nodes = [];
      depthTraverse = (temp) => {
        if (temp == null)
          return;
        depthTraverse(temp.left)
        depthTraverse(temp.right)
        nodes.push(temp)
      }
      depthTraverse(temp)
      if (typeof (func) == 'function')
        nodes.forEach(node => { func(node) })
      else {
        let returnArray = [];
        nodes.forEach(node => returnArray.push(node.data))
        return returnArray;
      }
    },
    height: height = (node) => {
      let nodes = returnObj.levelOrder();
      let heights = [];
      countFrom = (node, data) => {
        let count = 0;
        let temp = node;
        while (temp.right || temp.left) {
          if (temp.data == data)
            break;
          if (temp.data < data)
            temp = temp.right
          if (temp.data > data)
            temp = temp.left
          count++;
        }
        heights.push(count);
        return;
      }
      nodes.forEach(temp => countFrom(node, temp.data));
      return Math.max(...heights);
    },
    depth: depth = (node) => {
      let temp = returnObj.root;
      let count = 0;
      while (temp != null) {
        if (temp.data == node.data)
          break;
        if (temp.data < node.data)
          temp = temp.right
        if (temp.data > node.data)
          temp = temp.left
        count++;
      }
      return count;
    },
    isBalanced: isBalanced = () => {
      if (Math.abs((height(returnObj.root.left) - height(returnObj.root.right))) < 2)
        return true;
      else
        return false;
    },
    rebalance: rebalance = () => {
      let arr = returnObj.inOrder();
      returnObj.root = returnObj.buildTree(arr, 0, arr.length - 1);
    }
  }
  return returnObj;
}
