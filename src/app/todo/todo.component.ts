import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  lists = [];

  onSubmit(form: NgForm) {
    if (new Date(form.value['dateTime']).getTime() < new Date().getTime()) {
      alert('Enter a valid Date and Time.');
    } else {
      this.lists.push(form.value);
      localStorage.setItem('todoList', JSON.stringify(this.lists));
      form.reset();
      this.timer();
    }
  }

  close(i) {
    this.todoService.completedTask.push(this.lists[i])
    this.lists.splice(i, 1);
    localStorage.setItem('todoList', JSON.stringify(this.lists));
  }

  timer() {
    setInterval(() => {
      this.lists.forEach((element, index) => {
        let time = new Date(element['dateTime']).getTime() - new Date().getTime();
        setInterval(() => {
          time = time - 1000
        },1000)
        if(time < 1000){
          let untask = this.lists.splice(index,1);
          this.todoService.unCompletedTask.push(...untask);
          localStorage.setItem('todoList',JSON.stringify(this.lists));
        }
      })
    },1000);
  }

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    if (localStorage.getItem('todoList')) {
      this.lists = JSON.parse(localStorage.getItem('todoList'));
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('todoList');
  }
}
