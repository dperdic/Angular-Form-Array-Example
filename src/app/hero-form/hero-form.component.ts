import {Component, OnChanges, OnInit} from '@angular/core';
import {PowerService} from "../power.service";
import {Power} from "../power";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Hero} from "../hero";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit, OnChanges {

  heroForm: FormGroup;
  nameChangeLog: string[] = [];
  hero: Hero = new Hero();
  allPowers: Power[] = [];

  constructor(private fb: FormBuilder, private powerService: PowerService) {
    this.createForm();
    this.logNameChange();
  }

  ngOnInit() {
    this.powerService.getAll().subscribe(powers => this.allPowers = powers);
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      powers: this.fb.array([]),
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.heroForm.reset({
      name: this.hero.name
    });
    this.setPowersControl(this.hero.powers);
  }

  setPowersControl(powers: Power[]) {
    const powersFGs = powers.map(pow => this.fb.group(pow));
    const powersFormArray = this.fb.array(powersFGs);
    this.heroForm.setControl('powers', powersFormArray);
  }


  get powers(): FormArray {
    const pows = this.heroForm.get('powers') as FormArray;
    return pows;
  }


  addPowerChoice() {
    this.powers.push(this.fb.control(new Power()));
    // this.powers.push(this.fb.group(new Power(), Validators.required));
  }

onSubmit() {
    this.hero = this.prepareSaveHero();
    console.log('SAVING HERO', this.hero);
    // this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    this.hero = new Hero();
    this.rebuildForm();
}

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;

    // deep copy of form model lairs
    const powersDeepCopy: Power[] = formModel.powers.map(
      (pow: Power) => Object.assign({}, pow)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      powers: powersDeepCopy
    };
    return saveHero;
  }

  revert() { this.rebuildForm(); }

  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }


}