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

}
