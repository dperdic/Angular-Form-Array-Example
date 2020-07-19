import {Power} from "./power";


export class Hero {
  id: number;
  name: string;
  powers: Power[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.powers = [];
  }
}