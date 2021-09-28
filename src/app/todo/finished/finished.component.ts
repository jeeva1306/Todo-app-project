import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.css']
})
export class FinishedComponent implements OnInit {
  lists: Array<object>;
  show: boolean = false;

  check() {
    if(this.lists.length > 0) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.lists = this.todoService.completedTask;
    this.check();
  }
}
