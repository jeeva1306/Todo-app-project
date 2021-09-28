import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-unfinished',
  templateUrl: './unfinished.component.html',
  styleUrls: ['./unfinished.component.css']
})
export class UnfinishedComponent implements OnInit {
  lists: Array<object>;
  show: boolean = false;

  check() {
    if(this.lists.length > 0) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.lists = this.todoService.unCompletedTask;
    this.check();
  }
}
