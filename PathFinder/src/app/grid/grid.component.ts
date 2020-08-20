import { Component, OnInit } from '@angular/core';
import { NodeComponent } from '../node/node.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  board: NodeComponent[][] = [];
  startX: number = 5;
  startY: number = 5;
  endX: number = 20;
  endY: number = 35;
  mouseState: boolean = false;

  openSet: NodeComponent[] = [];
  closedSet: NodeComponent[] = [];

  DFSPath: NodeComponent[] = [];
  DFSEnded: boolean = false;


  timeTaken: number = 0;
  cellsVisited: number = 0;
  pathLength: number = 0;

  constructor() { 

    for (let i = 0; i < 25; i++) {
      let temp = []
      for (let j = 0; j < 40; j++) {
        const newNode = new NodeComponent();
        newNode.i = i;
        newNode.j = j;
        temp.push(newNode);
      }
      this.board.push(temp);
    }
  }

  ngOnInit(): void {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if(i === this.startX && j === this.startY){
          debugger;
          this.board[i][j].isStart = true;
        }
        else if(i === this.endX && j === this.endY){
          debugger;
          this.board[i][j].isFinish = true;
        }
      }   
    }
  }

  clearBoard(){
    this.board = [];
    this.closedSet = [];
    this.openSet = [];
    this.DFSPath = [];
    this.DFSEnded = false;
    this.timeTaken = 0;
    this.cellsVisited = 0;
    this.pathLength = 0;

    for (let i = 0; i < 25; i++) {
      let temp = []
      for (let j = 0; j < 40; j++) {
        const newNode = new NodeComponent();
        newNode.i = i;
        newNode.j = j;
        temp.push(newNode);
      }
      this.board.push(temp);
    }

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if(i === this.startX && j === this.startY){
          debugger;
          this.board[i][j].isStart = true;
        }
        else if(i === this.endX && j === this.endY){
          debugger;
          this.board[i][j].isFinish = true;
        }
      }   
    }
  }

  clearBoardWalls(){
    let oldBoard = this.board;
    this.board = [];
    this.closedSet = [];
    this.openSet = [];
    this.DFSPath = [];
    this.DFSEnded = false;
    this.timeTaken = 0;
    this.cellsVisited = 0;
    this.pathLength = 0;

    for (let i = 0; i < 25; i++) {
      let temp = []
      for (let j = 0; j < 40; j++) {
        const newNode = new NodeComponent();
        newNode.i = i;
        newNode.j = j;
        if(oldBoard[i][j].isWall){
          newNode.isWall = true;
        }
        temp.push(newNode);
      }
      this.board.push(temp);
    }

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if(i === this.startX && j === this.startY){
          debugger;
          this.board[i][j].isStart = true;
        }
        else if(i === this.endX && j === this.endY){
          debugger;
          this.board[i][j].isFinish = true;
        }
      }   
    }
  }

  changeMouse(state: boolean){
    this.mouseState = state;
  }

  showBoard(numbers: number[]){
    if(this.board[numbers[0]][numbers[1]].isWall){
      this.board[numbers[0]][numbers[1]].isWall = false;
    }
    else{
      this.board[numbers[0]][numbers[1]].isWall = true;
    }
    console.log(this.board);
  }
  
  showDijkstra(){

    const start = performance.now();
    const visitedNodesInOrder = this.dijkstra(this.board, this.board[this.startX][this.startY], this.board[this.endX][this.endY]);
    const end = performance.now();
    const time = end-start;
    console.log(time);
    this.timeTaken = time;
    this.cellsVisited = visitedNodesInOrder.length;
    const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(this.board[this.endX][this.endY]);
    this.pathLength = nodesInShortestPathOrder.length;
    this.animateAll(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  showAStar(){
    const start = performance.now();
    const end = this.aStar(this.board[this.startX][this.startY], this.board[this.endX][this.endY]);
    const endTime = performance.now();
    const time = endTime-start;
    this.timeTaken = time;
    this.cellsVisited = this.closedSet.length;
    const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(this.board[this.endX][this.endY]);
    this.pathLength = nodesInShortestPathOrder.length;
    this.animateAStar(nodesInShortestPathOrder);
  }

  showBreadth(){
    const start = performance.now();
    const visitedNodesInOrder = this.BFS(this.board[this.startX][this.startY], this.board[this.endX][this.endY]);
    const end = performance.now();
    const time = end-start;
    this.timeTaken = time;
    this.cellsVisited = visitedNodesInOrder.length;
    const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(this.board[this.endX][this.endY]);
    this.pathLength = nodesInShortestPathOrder.length;
    this.animateAll(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  showDepth(){
    const start = performance.now();
    this.DFS(this.board[this.startX][this.startY], this.board[this.endX][this.endY]);
    const end = performance.now();
    const time = end-start;
    this.timeTaken = time;
    this.cellsVisited = this.DFSPath.length;
    const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(this.board[this.endX][this.endY]);
    this.pathLength = nodesInShortestPathOrder.length;
    this.animateAll(this.DFSPath, nodesInShortestPathOrder);
  }

  BFS(first: NodeComponent, end: NodeComponent){

    for (var i = 0; i < 25; i++) {
      for (var j = 0; j < 40; j++) {
        this.board[i][j].addNeighbors(this.board);
      }
    }

    let path = [];
    let queue = [];

    first.visited = true;
    queue.push(first);
    path.push(first);

    while(queue.length>0){
      let current = queue.shift();
      path.push(current);

      if(current === end){
        return path;
      }

      current.neighbors.forEach(adjacent => {
        if(adjacent.visited === false && !adjacent.isWall){
          adjacent.visited = true;
          adjacent.previousNode = current;
          queue.push(adjacent);
        }
      });

    }
    return path;
  }


  DFS(first: NodeComponent, end: NodeComponent){

    for (var i = 0; i < 25; i++) {
      for (var j = 0; j < 40; j++) {
        this.board[i][j].addNeighbors(this.board);
      }
    }

    first.visited = true;
    return this.DFSRecursive(end,first);

  }

  DFSRecursive(end: NodeComponent, current: NodeComponent){

    if(!this.DFSEnded){

      this.DFSPath.push(current);

      console.log(current);

      if(current === end){
        debugger;
        this.DFSEnded = true;
        return this.DFSPath;
      }
      else{
        current.neighbors.forEach(adjacent => {
          if(adjacent.visited === false && !adjacent.isWall){
            adjacent.visited = true;
            adjacent.previousNode = current;
            this.DFSRecursive(end,adjacent);
          }
        });
      }
    }


  }

  showCorrectPath(nodes:NodeComponent[]){
    nodes.forEach(node => {
      node.isPath = true;
    });
  }

  animateAll(visitedNodesInOrder:NodeComponent[], nodesInShortestPathOrder:NodeComponent[]) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        node.animated = true;
      }, 10 * i);
    }
  }

  animateAStar( nodesInShortestPathOrder:NodeComponent[]) {
    for (let i = 0; i <= this.closedSet.length; i++) {
      if (i === this.closedSet.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = this.closedSet[i];
        node.animated = true;
      }, 10 * i);
    }
  }

  showAStarPath(){
    for (var i = 0; i < this.openSet.length; i++) {
      this.openSet[i].animated = true;
    }
  }

  animateShortestPath(nodesInShortestPathOrder: NodeComponent[]) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        node.isPath = true;
      }, 50 * i);
    }
  }

  dijkstra(grid: NodeComponent[][], startNode: NodeComponent, finishNode: NodeComponent) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = this.getAllNodes(grid);
    
    while (!!unvisitedNodes.length) {
      this.sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.visited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      this.updateUnvisitedNeighbors(closestNode, grid);
    }
  }

  sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  getUnvisitedNeighbors(node: NodeComponent, grid: NodeComponent[][]) {
    const neighbors = [];
    const i = node.i;
    const j = node.j;
    if (j > 0) neighbors.push(grid[i][j - 1]);
    if (j < grid[0].length - 1) neighbors.push(grid[i][j + 1]);
    if (i > 0) neighbors.push(grid[i - 1][j]);
    if (i < grid.length - 1) neighbors.push(grid[i + 1][j]);
    return neighbors.filter(neighbor => !neighbor.visited);
  }
  
  getAllNodes(grid) {
    const nodes = [];
    for (const j of grid) {
      for (const node of j) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  getNodesInShortestPathOrder(finishNode: NodeComponent) {
    debugger;
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      debugger;
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  removeFromArray(arr, elt) {
    // Could use indexOf here instead to be more efficient
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == elt) {
        arr.splice(i, 1);
      }
    }
  }


  aStar(start: NodeComponent, end:NodeComponent){
    for (var i = 0; i < 25; i++) {
      for (var j = 0; j < 40; j++) {
        this.board[i][j].addNeighbors(this.board);
      }
    }

    this.openSet.push(start);

    //Starts algorithm

    while (this.openSet.length > 0) {

      // Best next option
      var winner = 0;
      for (var i = 0; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[winner].f) {
          winner = i;
        }
      }
      var current = this.openSet[winner];
  
      // Did I finish?
      if (current === end) {
        console.log("DONE!");
        return current;
      }
  
      // Best option moves from openSet to closedSet
      this.removeFromArray(this.openSet, current);
      this.closedSet.push(current);
  
      // Check all the neighbors
      var neighbors = current.neighbors;
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
  
        // Valid next spot?
        if (!this.closedSet.includes(neighbor) && !neighbor.isWall) {
          var tempG = current.g + this.heuristic(neighbor, current);
  
          // Is this a better path than before?
          var newPath = false;
          if (this.openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            this.openSet.push(neighbor);
          }
  
          // Yes, it's a better path
          if (newPath) {
            debugger;
            neighbor.h = this.heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previousNode = current;
          }
        }
  
      }
      // Uh oh, no solution
    } 
    return null;

  }

  heuristic(a, b) {
    //var d = dist(a.i, a.j, b.i, b.j);
    //var d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
    let d = Math.sqrt( Math.pow((a.i-b.i), 2) + Math.pow((a.j-b.j), 2) );
    return d;
  }

}
