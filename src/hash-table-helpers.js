/* eslint-disable class-methods-use-this */
// A special array class that can only store the number of items specified by the `limit` argument
class LimitedArray {
  constructor(limit) {
    // You should not be directly accessing this array from your hash table methods
    // Use the getter and setter methods included in this class to manipulate data in this class
    this.storage = [];
    this.limit = limit;
  }

  checkLimit(index) {
    if (typeof index !== 'number') throw new Error('The supplied index needs to be a number');
    if (this.limit <= index) {
      throw new Error('The supplied index lies out of the array\'s bounds');
    }
  }

  each(cb) {
    for (let i = 0; i < this.storage.length; i++) {
      cb(this.storage[i], i);
    }
  }
  // Use this getter function to fetch elements from this class
  get(index) {
    this.checkLimit(index);
    return this.storage[index];
  }

  get length() {
    return this.storage.length;
  }
  // Use this setter function to add elements to this class
  set(index, value) {
    this.checkLimit(index);
    this.storage[index] = value;
  }
}
/* eslint-disable no-bitwise, operator-assignment */
// This is hash function you'll be using to hash keys
// There's some bit-shifting magic going on here, but essentially, all it is doing is performing the modulo operator
// on the given `str` arg (the key) modded by the limit of the limited array
// This simply ensures that the hash function always returns an index that is within the boundaries of the limited array
const getIndexBelowMax = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
};

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    // Do not modify anything inside of the constructor
  }
  // Wraps the given value in a node object and adds the node to the tail of the list
  // If the list is empty, the new element is considered the tail as well as the head
  // If there is one element in the list before the new element is added, the new element becomes the tail of the list
  addToTail(value) {
    const newNode = {
      next: null,
      value,
    };

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
  }
  // Removes the current head node from the list, replacing it with the next element in the list
  // Returns the value of the removed node
  removeHead() {
    // need to check if there is a head node
    if (this.head === null) return;

    // check if head has a next (or is it a single element)
    if (this.head.next === null) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      return value;
    }
    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }

  removeNode(previousNode) {
    if (this.head === null) return;

    // check if head has a next (or is it a single element)
    if (this.head.next === null) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      return value;
    }

    const value = this.value;
    previousNode.next = this.next;
    return value;
  }

  findPreviousNode(nextValue, head) {
    // check if the linked list is empty
    if (head === null) return false;
    // otherwise, define our recursive function
    const searchLinkedList = (node) => {
      // check if the current node's key matches what we're looking for
      if (node.next === nextValue) return node;
      // check if we've reached the end of the linked list
      if (node.next === null) return false;
      // make our recursive call
      return searchLinkedList(node.next);
    };
    return searchLinkedList(head);
  }

  // Checks the linked list for the given value
  // Returns true if the the value is found in the list, false otherwise
  contains(value) {
    if (this.head === null) return false;
    const searchLinkedList = (node) => {
      if (node.value === value) return true;
      if (node.next === null) return false;
      return searchLinkedList(node.next);
    };
    return searchLinkedList(this.head);
  }

  findNode(key, head) {
    // check if the linked list is empty
    if (head === null) return false;
    // otherwise, define our recursive function
    const searchLinkedList = (node) => {
      // check if the current node's key matches what we're looking for
      if (node.key === key) return node;
      // check if we've reached the end of the linked list
      if (node.next === null) return false;
      // make our recursive call
      return searchLinkedList(node.next);
    };
    return searchLinkedList(head);
  }
}

module.exports = {
  LimitedArray,
  getIndexBelowMax,
  LinkedList,
};
