import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private headers = {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const updateUrl = `${this.apiUrl}/${todo.id}`;
    const jsonString = JSON.stringify(todo);
    return this.http.put<Todo>(updateUrl, jsonString, this.headers);
  }
}
