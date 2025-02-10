import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { EntityStore } from '../../data-access/entity.store';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <ng-template #studentTemplate let-student>
      <app-list-item
        [name]="student.firstName"
        [id]="student.id"
        (delete)="deleteItem($event)"></app-list-item>
    </ng-template>

    <app-card
      [list]="students()"
      customClass="bg-light-green"
      [itemTemplate]="studentTemplate"
      (addItem)="addNewItem()"
      (deleteItem)="deleteItem($event)">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  providers: [{ provide: EntityStore, useClass: EntityStore<Student> }],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(EntityStore<Student>);

  students = this.store.entities;

  @ViewChild('studentTemplate', { static: true })
  studentTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
