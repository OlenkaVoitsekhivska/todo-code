import {
  Component,
  OnInit,
  Input,
  OnDestroy
} from '@angular/core';
import { Todo } from '../../../models';
import { TodoServiceService } from '../../services/todo-service.service';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  @Input() todo!: Todo;

  todolist: Todo[] = [];
  private subscr!: Subscription;

  constructor(private todoService: TodoServiceService) {}

  ngOnInit(): void {
    this.todoService.getTodos();
    this.subscr = this.todoService
      .getTodoUpdateListener()
      .subscribe((todos: Todo[]) => {
        this.todolist = todos;
      });
  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
  }

  listTodos() {
    this.todoService.getTodos();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo);
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
