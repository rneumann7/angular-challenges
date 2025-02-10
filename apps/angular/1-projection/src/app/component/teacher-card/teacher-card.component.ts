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
  randTeacher,
} from '../../data-access/fake-http.service';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <ng-template #teacherTemplate let-teacher>
      <app-list-item (delete)="deleteItem(teacher.id)">
        {{ teacher.firstName }}
      </app-list-item>
    </ng-template>

    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      [itemTemplate]="teacherTemplate"
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
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  providers: [{ provide: EntityStore, useClass: EntityStore<Teacher> }],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(EntityStore<Teacher>);

  teachers = this.store.entities;

  @ViewChild('teacherTemplate', { static: true })
  teacherTemplate!: TemplateRef<any>;

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
