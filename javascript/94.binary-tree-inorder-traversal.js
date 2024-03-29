/*
 * @lc app=leetcode id=94 lang=javascript
 *
 * [94] Binary Tree Inorder Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  // O(n) time
  // O(n) space
  let traverseOrder = []
  let traverseNodes = node => {
    if (!node) return
    traverseNodes(node.left)
    traverseOrder.push(node.val)
    traverseNodes(node.right)
  }
  traverseNodes(root)
  return traverseOrder
};
// @lc code=end

