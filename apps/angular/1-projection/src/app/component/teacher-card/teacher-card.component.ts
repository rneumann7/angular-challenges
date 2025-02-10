import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { EntityStore } from '../../data-access/entity.store';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      (addItem)="addNewItem()"
      (deleteItem)="deleteItem($event)">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CardComponent, NgOptimizedImage],
  providers: [{ provide: EntityStore, useClass: EntityStore<Teacher> }],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(EntityStore<Teacher>);

  teachers = this.store.entities;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
