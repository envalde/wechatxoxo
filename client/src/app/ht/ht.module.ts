import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtPageComponent } from './ht-page/ht-page.component';
import { HtPostComponent } from './ht-post/ht-post.component';
import {RouterModule } from '@angular/router';



@NgModule({
  declarations: [HtPageComponent, HtPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HtPageComponent}
    ])
  ]
})
export class HtModule { }
