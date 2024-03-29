/*
 * @lc app=leetcode id=28 lang=javascript
 *
 * [28] Implement strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  let needleLen = needle.length
  if (needleLen === 0) return 0
  for (let i = 0; i <= haystack.length - needleLen; i++) {
    if (haystack.slice(i, i + needleLen) === needle) {
      return i
    }
  }
  return -1
};
// @lc code=end

