import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { HtPageComponent } from './ht/ht-page/ht-page.component';
import { HtPostComponent } from './ht/ht-post/ht-post.component';

import { HtModule } from './ht/ht.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HtModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
