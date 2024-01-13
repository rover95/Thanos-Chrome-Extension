function collectLeafNodes(node, leafNodes) {
  if (node.nodeType === Node.ELEMENT_NODE && node.childNodes.length === 0) {
    // 当前节点是一个没有子节点的元素节点，即叶子节点
    leafNodes.push(node);
  } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
    // 当前节点是一个非空文本节点，即叶子节点
    leafNodes.push(node);
  } else {
    // 递归收集子节点中的叶子节点
    node.childNodes.forEach(child => collectLeafNodes(child, leafNodes));
  }
}

function randomDeleteTextOrNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    // 随机删除文本中的字符
    let text = node.nodeValue;
    let newText = text.split('').filter(() => Math.random() > 0.5).join('');
    node.nodeValue = newText;
  } else if (node.nodeType === Node.ELEMENT_NODE && node.parentNode && Math.random() > 0.5) {
    // 如果是元素节点，没有子节点，并且通过随机概率测试，则删除该节点
    if (!node.hasChildNodes()) {
      node.parentNode.removeChild(node);
    }
  }
}

function randomDeleteFromLeaves() {
  const leafNodes = [];
  collectLeafNodes(document.body, leafNodes); // 收集所有叶子节点

  // 从每个叶子节点开始，向上遍历并随机删除文本或节点
  leafNodes.forEach(leaf => {
    let current = leaf;
    while (current !== document.body) { // 遍历到根节点停止
      const parent = current.parentNode;
      randomDeleteTextOrNode(current);
      current = parent; // 向上移动到父节点
    }
  });
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "deleteHalfDOM") {
			randomDeleteFromLeaves();
    }
  }
);
