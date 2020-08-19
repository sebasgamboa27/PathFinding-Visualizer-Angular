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
  endY: number = 20;

  constructor() { 

    for (let i = 0; i < 25; i++) {
      let temp = []
      for (let j = 0; j < 25; j++) {
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

  showBoard(numbers: number[]){
    this.board[numbers[0]][numbers[1]].isWall = true;
    console.log(this.board);
  }
  
  showDijkstra(){
    const visitedNodesInOrder = this.dijkstra(this.board, this.board[this.startX][this.startY], this.board[this.endX][this.endY]);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(this.board[this.endX][this.endY]);
    console.log(nodesInShortestPathOrder); 
    this.showCorrectPath(nodesInShortestPathOrder);
  }

  showCorrectPath(nodes:NodeComponent[]){
    nodes.forEach(node => {
      node.isPath = true;
    });
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

}
