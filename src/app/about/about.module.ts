import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactsMaterialModule } from '../contacts-material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AboutComponent }
    ]),
    FlexLayoutModule,
    ContactsMaterialModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
