import { Injectable, signal } from '@angular/core';

@Injectable()
export class EntityStore<T> {
  public entities = signal<T[]>([]);

  addAll(entities: T[]) {
    this.entities.set(entities);
  }

  addOne(entity: T) {
    this.entities.set([...this.entities(), entity]);
  }

  deleteOne(id: number) {
    this.entities.set(this.entities().filter((e) => (e as any).id !== id));
  }
}
