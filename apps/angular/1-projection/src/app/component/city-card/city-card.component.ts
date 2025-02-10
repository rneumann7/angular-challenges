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
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <ng-template #cityTemplate let-city>
      <app-list-item
        [name]="city.name"
        [id]="city.id"
        (delete)="deleteItem($event)"></app-list-item>
    </ng-template>

    <app-card
      [list]="cities()"
      customClass="bg-light-yellow"
      [itemTemplate]="cityTemplate"
      (addItem)="addNewItem()"
      (deleteItem)="deleteItem($event)">
      <img ngSrc="assets/img/city.png" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      .bg-light-yellow {
        background-color: rgba(242, 255, 0, 0.57);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  providers: [{ provide: EntityStore, useClass: EntityStore<City> }],
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(EntityStore<City>);

  cities = this.store.entities;

  @ViewChild('cityTemplate', { static: true }) cityTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
