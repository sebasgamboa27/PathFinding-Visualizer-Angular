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
  @Input() previousNode: NodeComponent = null;
  @Input() isPath: boolean = false;
  @Input() distance: number = Infinity;

  @Output() send = new EventEmitter<number[]>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  makeWall(){
    this.isWall = true;
    this.send.emit([this.i,this.j]);
  }

}
