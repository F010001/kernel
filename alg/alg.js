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

  merge_sort(head = this.head) {
    if (!head || !head.next) {
      return head;
    }

    const mid = this.get_mid(head);
    const next_mid = mid.next;

    mid.next = null;

    const left = this.merge_sort(head);
    const right = this.merge_sort(next_mid);

    return this.merge(left, right);
  }

  get_mid(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }

  merge(left, right) {
    const dummy = new Node(null);
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

    if (left) current.next = left;
    if (right) current.next = right;

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

console.log('До сортировки:');
list.print();

list.head = list.merge_sort();

console.log('После сортировки:');
list.print();

class Graph {
  constructor() {
    this.adjacencyList = {}; // Здесь будем хранить наши вершины и смежные ребра
  }

  // Добавление вершины
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Добавление ребра
  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1); // Для неориентированного графа
    }
  }

  // Удаление ребра
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2,
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1,
    );
  }

  // Удаление вершины
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  // Вывод графа
  printGraph() {
    for (let vertex in this.adjacencyList) {
      console.log(vertex + ' -> ' + this.adjacencyList[vertex].join(', '));
    }
  }
}

// Пример использования
const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');

graph.printGraph();

// Вывод:
// A -> B, C
// B -> A, C
// C -> A, B
