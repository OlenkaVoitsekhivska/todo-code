import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/models';


@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss']
})
export class AddTodoFormComponent implements OnInit {
  @Output() onAddTodo:EventEmitter<Todo> = new EventEmitter();
  
  todo:string='';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    const newTodo = {
      id: '',
      description: this.todo,
      complete:false
    }
    this.onAddTodo.emit(newTodo);
    this.todo='';
  }

}
