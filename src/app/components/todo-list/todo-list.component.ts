import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoServiceService } from '../../services/todo-service.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() todo!: Todo;

  todolist: Todo[] = [];

  todoSubject$!: Observable<Todo[]>;

  constructor(
    private todoService: TodoServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos();
    this.todoSubject$ = this.todoService.getTodoUpdateListener();
  }

  listTodos() {
    this.todoService.getTodos();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo);
    this.toastr.success('Todo successfully added');
  }

  toggleComplete(todoToggle: Todo) {
    this.todoService.toggleComplete(todoToggle);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  editTodo(todo: Todo) {
    this.todoService.editTodo(todo);
  }
}
