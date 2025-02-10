import { Component, EventEmitter, input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content></ng-content>
      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.firstName"
            [id]="item.id"
            (delete)="onDeleteItem($event)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addItem.emit()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent],
})
export class CardComponent {
  @Output() addItem = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<number>();

  readonly list = input<any[] | null>(null);
  readonly customClass = input('');

  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }
}
