import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() visited: boolean = false;
  @Input() animated: boolean = false;
  @Input() isStart: boolean = false;
  @Input() isFinish: boolean = false;
  @Input() isWall: boolean = false;

  @Input() i: number;
  @Input() j:number;

  @Input() f: number = 0;
  @Input() g:number = 0;
  @Input() h:number = 0;
  @Input() neighbors: NodeComponent[] = [];

  @Input() previousNode: NodeComponent = null;
  @Input() isPath: boolean = false;
  @Input() distance: number = Infinity;

  @Input() mousePressed: boolean = false;
  @Input() drag: boolean[] = [false,false];
  @Output() mouse = new EventEmitter<boolean[]>();


  @Output() send = new EventEmitter<number[]>();
  @Output() animateAgain = new EventEmitter<boolean>();

  @Input() animation: boolean = true;

  constructor() { 
  }

  ngOnInit(): void {
  }

  makeWallDown(){

    if(this.isStart){
      this.mouse.emit([true,true,true]);
      this.makeWallEnter(true,[true,true]);
    }
    else if(this.isFinish){
      this.mouse.emit([true,true,false]);
      this.makeWallEnter(true,[true,false]);
    }
    else{
      this.mouse.emit([true,false,false]);
      this.makeWallEnter(true,[false,false]);
    }

  }

  makeWallEnter(state: boolean,drop: boolean[]){
    if(this.mousePressed || state || drop[0]){

      let cell = null;

      if(this.drag[0] || drop[0]){
        if(this.drag[1] || drop[1]){
          cell = 1;
        }
        else{
          cell = 2;
        }
      }
      else if(!this.isWall && !this.isStart && !this.isFinish){
        this.isWall = true;
      }
      else{
        this.isWall = false;
      }
      this.send.emit([this.i,this.j,cell]);
    }
  }

  makeWallUp(){

    this.mouse.emit([false,false,false]);
    this.animateAgain.emit(true);
  }

  addNeighbors(grid: NodeComponent[][]) {
    var i = this.i;
    var j = this.j;
    if (j < 40 - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (i < 25 - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  }

}
