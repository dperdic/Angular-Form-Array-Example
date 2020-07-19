import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { PowerService } from './power.service';
import { HeroFormComponent } from './hero-form/hero-form.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent, HeroFormComponent ],
  bootstrap:    [ AppComponent ],
  providers: [PowerService]
})
export class AppModule { }
