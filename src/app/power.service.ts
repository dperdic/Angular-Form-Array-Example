import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Power} from "./power";
import {of} from "rxjs/internal/observable/of";

@Injectable()
export class PowerService {

  constructor() { }

  getAll(): Observable<Power[]> {
    return of(this.getProds());
  }

  getProds(): Power[] {
    const powers = [];
    for (let i = 0; i < 10; i++) {
      const pow = new Power();
      pow.id = i+'';
      pow.name = 'Power ' + i;
      powers.push(pow);
    }
    return powers;
  }
}