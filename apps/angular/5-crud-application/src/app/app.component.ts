import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './model/todo.model';
import { TodoService } from './service/todo.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Todo[];
  private toDoService = inject(TodoService);

  ngOnInit(): void {
    this.toDoService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  update(todo: Todo): void {
    this.updateTodoTitle(todo);
    this.toDoService.updateTodo(todo).subscribe((todoUpdated: Todo) => {
      this.todos = this.todos.map((t) =>
        t.id === todoUpdated.id ? todoUpdated : t,
      );
    });
  }

  delete(todo: Todo): void {
    this.toDoService.deleteTodo(todo).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    });
  }

  private updateTodoTitle(todo: Todo): void {
    todo.title = randText();
  }
}
