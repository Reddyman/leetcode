/*
 * @lc app=leetcode id=218 lang=javascript
 *
 * [218] The Skyline Problem
 */

// @lc code=start
/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */

// No built-in heap/priority queue in javascript :(
class maxHeap {
  constructor() {
    this.data = [null]
  }

  swap(i, j) {
    const temp= this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }

  addNode(node) {
    this.data.push(node)
    if (this.data.length === 2) {
      return
    } else {
      this.bubbleUp(this.data.length-1)
    }
  }

  removeMax(){
      if(this.data === 1){
          return null;
      }
      else{
          this.swap(this.data.length - 1, 1);
          const ret = this.data.pop();
          this.bubbleDown(1);
      }
  }
    
  bubbleDown(i){
      const largestChild = this.data[i*2+1] && this.data[i*2+1].h > this.data[i*2].h ? i*2 + 1 : i*2;
      if(this.data[largestChild] && this.data[largestChild].h > this.data[i].h){
          this.swap(largestChild, i);
          this.bubbleDown(largestChild);
      }
  }

  bubbleUp(i){
      const parentIndex = Math.floor(i/2);
      if(this.data[parentIndex] && this.data[parentIndex].h < this.data[i].h){
          this.swap(parentIndex, i);
          this.bubbleUp(parentIndex);
      }
  }

  deleteNode(node) {
    const nodeIndex = this.data.indexOf(node);
    if (nodeIndex === -1) {
        return false;
    }
    else if (nodeIndex === this.data.length - 1) {
        this.data.pop();
    }
    else {
        this.swap(this.data.length - 1, nodeIndex);
        this.data.pop();
        const parentIndex = Math.floor(nodeIndex / 2);
        if (this.data[parentIndex] && this.data[parentIndex].h < this.data[nodeIndex].h) {
            this.bubbleUp(nodeIndex);
        }
        else {
            this.bubbleDown(nodeIndex);
        }
    }
  }

  getMaxHeight() {
    if (this.data.length === 1) return 0
    return this.data[1].h
  }

}

var getSkyline = function(buildings) {
  // NOTE: Revisit when wiser
  // think of merging of two-dimensional intervals
  // move up then move right, then move down, then move right, etc.
  // we don't need to find every corner point!
  // just enough to know when to change direction
  const buildingHeap = new maxHeap(), skylines = []
  let ret = []
    
  buildings.forEach(b => {
      const start = {type: 1, x: b[0], h: b[2]}
      const end = {type: 2, x: b[1], start: start}
      skylines.push(start, end)
  })
    
  skylines.sort((s1, s2) => {
      if (s1.x !== s2.x) {
          return s1.x - s2.x
      }
      else if (s1.type !== s2.type) {
          return s1.type - s2.type
      }
      else if (s1.type === 1) {
          return s1.h - s2.h
      }
      else {
          return s1.start.h - s2.start.h
      }
  })
    
  skylines.forEach(skyline => {
     if (skyline.type === 1) {
         if (skyline.h > buildingHeap.getMaxHeight()) {
             ret = ret.filter(r => r[0] !== skyline.x)
             ret.push([skyline.x, skyline.h])
         }
         buildingHeap.addNode(skyline)
     } else {
         buildingHeap.deleteNode(skyline.start)
         if(skyline.start.h > buildingHeap.getMaxHeight()){
             ret.push([skyline.x, buildingHeap.getMaxHeight()])
         }
     }
  })

  return ret
}
// @lc code=end

