import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content></ng-content>
      <section>
        @for (item of list(); track item) {
          <ng-container
            *ngTemplateOutlet="
              itemTemplate;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addItem.emit()">
        Add
      </button>
    </div>
  `,
  imports: [CommonModule],
})
export class CardComponent {
  @Output() addItem = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<number>();

  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  @Input() itemTemplate: TemplateRef<any> | null = null;

  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }
}
