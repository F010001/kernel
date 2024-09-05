// function binary_search(arr, elem) {
//   let low = 0;
//   let high = arr.length - 1;

//   while (low <= high) {
//     const mid = Math.floor((low + high) / 2);
//     const res = arr[mid];

//     if (res === elem) {
//       console.log(mid);
//       return;
//     } else if (res > elem) {
//       high = mid - 1;
//     } else if (res < elem) {
//       low = mid + 1;
//     }
//   }

//   return null;
// }

// binary_search([1, 2, 3, 4, 5], 24);

// function smallest(arr) {
//   let smallest = arr[0];
//   let smalletst_index = 0;

//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] < smallest) {
//       smallest = arr[i];
//       smalletst_index = i;
//     }
//   }

//   return smalletst_index;
// }

// function selectionSort(arr) {
//   const newArr = [];

//   while (arr.length > 0) {
//     const small = smallest(arr);

//     newArr.push(arr.splice(small, 1)[0]); // Удаляем наименьший элемент и добавляем в новый массив
//   }
//   return newArr;
// }

// console.log('selectionSort', selectionSort([3, 5, 123, 1]));

// function bubbleSort(arr) {
//   for (let j = arr.length - 1; j > 0; j--) {
//     for (let i = 0; i < j; i++) {
//       if (arr[i] > arr[i + 1]) {
//         let temp = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = temp;
//       }
//     }
//   }

//   return arr;
// }

// console.log(bubbleSort([2, 5, 6123, 0, -1]));

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class LinkList {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.size = 0;
//   }

//   add(value) {
//     const node = new Node(value);

//     if (this.head === null) {
//       this.head = node;
//       this.tail = node;
//     } else {
//       this.tail.next = node;
//       this.tail = node;
//     }

//     this.size++;
//   }

//   log() {
//     console.log(this.size);
//   }
// }

// const list = new LinkList();

// list.add(1);
// list.add(2);
// list.add(3);
// list.add(4);

// list.log();

// let currentNode = list.head;

// while (currentNode !== null) {
//   console.log(currentNode.value);
//   currentNode = currentNode.next;
// }

function bs(arr, value) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === value) {
      return mid;
    } else if (arr[mid] > value) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return -1;
}

console.log(bs([1, 2, 3, 4, 5, 6, 7], 5)); // 4
