import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  visited: boolean = false;
  isStart: boolean = false;
  isFinish: boolean = false;
  isWall: boolean = false;
  @Input() i: number;
  @Input() j:number;
  previousNode: Node;

  @Output() send = new EventEmitter<boolean>();

  constructor() { 
  }

  ngOnInit(): void {
    if(this.i === 5 && this.j === 5){
      this.isStart = true;
    }
    else if(this.i === 20 && this.j === 20){
      this.isFinish = true;
    }
  }

  makeWall(){
    console.log('si');
    debugger;
    this.isWall = true;
    this.send.emit(true);
  }

}
