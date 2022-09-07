import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from 'src/models';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  private apiUrl = environment.apiUrl;

  private todos: Todo[] = [];
  private todosUpd = new Subject<Todo[]>();

  constructor(private http: HttpClient) {}

  getTodoUpdateListener() {
    return this.todosUpd.asObservable();
  }

  composeUrl(id: string): string {
    return `${this.apiUrl}/${id}`;
  }

  getTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe(todos => {
      this.todos = todos;
      this.todosUpd.next([...this.todos]);
    });
  }

  addTodo(todo: Todo) {
    this.http
      .post<{ message: string; id: string }>(this.apiUrl, todo)
      .subscribe(todoAdded => {
        todo.id = todoAdded.id;
        this.todos = [...this.todos, todo];
        this.todosUpd.next([...this.todos]);
      });
  }

  deleteTodo(todo: Todo) {
    const url = this.composeUrl(todo.id);
    this.http.delete(url).subscribe(() => {
      this.todos = this.todos.filter(todoDel => todoDel.id !== todo.id);
      this.todosUpd.next([...this.todos]);
    });
  }

  toggleComplete(todo: Todo) {
    const url = this.composeUrl(todo.id);
    this.http
      .patch<{ message: string; id: string; complete: boolean }>(
        url,
        todo,
        httpOptions
      )
      .subscribe(todoEdited => {
        this.todos = this.todos.map(todo => {
          if (todo.id === todoEdited.id) {
            return {
              id: todo.id,
              description: todo.description,
              complete: todoEdited.complete,
            };
          }
          return todo;
        });
        this.todosUpd.next([...this.todos]);
      });
  }

  editTodo(todo: Todo) {
    const url = this.composeUrl(todo.id);
    this.http
      .put<{ message: string; description: string }>(url, todo)
      .subscribe(todoEdited => {
        todo.description = todoEdited.description;
        this.todosUpd.next([...this.todos]);
      });
  }
}
