import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutOnGoingComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactsMaterialModule } from '../contacts-material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AboutOnGoingComponent }
    ]),
    FlexLayoutModule,
    ContactsMaterialModule
  ],
  declarations: [AboutOnGoingComponent]
})
export class AboutModule { }
