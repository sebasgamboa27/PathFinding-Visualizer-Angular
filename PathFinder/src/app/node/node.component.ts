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
  @Output() mouse = new EventEmitter<boolean>();


  @Output() send = new EventEmitter<number[]>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  makeWallDown(){
    if(!this.isWall){
      this.mouse.emit(true);
      this.isWall = true;
      this.send.emit([this.i,this.j]);
    }
  }

  makeWallEnter(){
    if(this.mousePressed){
      debugger;
      this.isWall = true;
      this.send.emit([this.i,this.j]);
    }
  }

  makeWallUp(){
    this.mouse.emit(false);
    this.isWall = true;
    this.send.emit([this.i,this.j]);
  }

  addNeighbors(grid: NodeComponent[][]) {
    var i = this.i;
    var j = this.j;
    if (i < 25 - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < 40 - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  }

}
