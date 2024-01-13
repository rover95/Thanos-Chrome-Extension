// 收集所有叶子节点
function collectLeafNodes(node, leafNodes) {
  if (node.childNodes.length === 0) {
    leafNodes.push(node);
  } else {
    node.childNodes.forEach(child => collectLeafNodes(child, leafNodes));
  }
}

function randomDeleteTextOrNode(node) {
  if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
    // 随机删除文本中的字符
    let text = node.nodeValue;
    let newText = text.split('').filter(() => Math.random() > 0.5).join('');
    node.nodeValue = newText;
  } else if ( node.parentNode && Math.random() > 0.5) {
    if (!node.hasChildNodes()) {
      node.parentNode.removeChild(node);
    }
  }
}

function randomDeleteFromLeaves() {
  const leafNodes = [];
  collectLeafNodes(document.body, leafNodes); 

  leafNodes.forEach(leaf => {
    let current = leaf;
    while (current !== document.body) { 
      const parent = current.parentNode;
      randomDeleteTextOrNode(current);
      current = parent; 
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
console.log('⚠️网页已被灭霸已标记⚠️')
