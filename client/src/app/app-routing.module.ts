import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HtPageComponent} from './ht/ht-page/ht-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/feed', pathMatch: 'full'},
  {path: 'hashtag', component: HtPageComponent},
  {path: 'feed', loadChildren: () => import('./feed/feed.module').then(r => r.FeedModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
