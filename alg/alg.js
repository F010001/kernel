function smallest(arr) {
  let smallest = arr[0];
  let smalletst_index = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
      smalletst_index = i;
    }
  }

  return smalletst_index;
}

function selectionSort(arr) {
  const newArr = [];

  while (arr.length > 0) {
    const small = smallest(arr);

    newArr.push(arr.splice(small, 1)[0]); 
  }
  return newArr;
}


function bubbleSort(arr) {
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }

  return arr;
}


function quicksort(arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const less = arr.filter((el) => el < pivot);
    const greater = arr.filter((el) => el > pivot);

    return quicksort(less).concat([pivot], quicksort(greater));
  }
}


function bs(arr, el) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (el === arr[mid]) {
      return mid;
    } else if (el > arr[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  mergeSort(head = this.head) {
    if (!head && !head.next) {
      return head;
    }

    const middle = this.getMiddle(head);
    const nextOfMiddle = middle.next;
    middle.next = null; 

    const left = this.mergeSort(head);
    const right = this.mergeSort(nextOfMiddle);

    return this.merge(left, right);
  }

  getMiddle(head) {
    if (!head) return head;
    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }

  merge(left, right) {
    let dummy = new Node(0); 
    let current = dummy;

    while (left && right) {
      if (left.value <= right.value) {
        current.next = left;
        left = left.next;
      } else {
        current.next = right;
        right = right.next;
      }
      current = current.next;
    }


    current.next = left  || right;

    return dummy.next;
  }

  print() {
    let current = this.head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join(' -> '));
  }
}


const list = new LinkedList();
list.add(4);
list.add(2);
list.add(1);
list.add(3);

console.log('До сортировки:');
list.print();

list.head = list.mergeSort();

console.log('После сортировки:');
list.print();