import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtPageComponent } from './ht-page/ht-page.component';
import { HtPostComponent } from './ht-post/ht-post.component';



@NgModule({
  declarations: [HtPageComponent, HtPostComponent],
  imports: [
    CommonModule
  ]
})
export class HtModule { }
