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

console.log(quicksort([10, 5, 2, 3]));

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
