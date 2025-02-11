import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { Todo } from './model/todo.model';
import { LoadingService } from './service/loading.service';
import { TodoService } from './service/todo.service';

@Component({
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <div *ngIf="loading$ | async" class="spinner-container">
      <mat-spinner></mat-spinner>
    </div>
    <div *ngIf="!(loading$ | async)">
      <div *ngFor="let todo of todos">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
    </div>
  `,
  styles: [
    `
      .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  todos!: Todo[];
  private loadingService = inject(LoadingService);
  loading$ = this.loadingService.loading$;
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
