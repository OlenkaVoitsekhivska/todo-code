import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() onToggleComplete: EventEmitter<Todo> = new EventEmitter();
  @Output() onDeleteTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() onEditTodo: EventEmitter<Todo> = new EventEmitter();

  originalTodo!: Todo;
  inputVal: string = '';

  constructor() {}

  ngOnInit() {
    this.originalTodo = { ...this.todo };
  }

  toggleInput(todo: Todo) {
    this.onToggleComplete.emit(todo);
  }

  deleteTodo(todo: Todo) {
    this.onDeleteTodo.emit(todo);
  }

  onInput(todoInput: string) {
    this.inputVal = todoInput;
  }

  editTodo(todo: Todo, val: string) {
    this.onEditTodo.emit({
      id: todo.id,
      description: val,
      complete: todo.complete,
    });
  }
}
