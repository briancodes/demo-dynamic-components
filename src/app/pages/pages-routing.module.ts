import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './containers/home-page.component';
import { DataPageComponent } from './containers/data-page.component';
import { DataResolverService } from './services/data-resolver.service';
import { MarkedHTMLPipe } from './pipes/marked-html.pipe';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    resolve: { resolvedData: DataResolverService }
  },
  {
    path: 'data',
    component: DataPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DataResolverService, MarkedHTMLPipe]
})
export class PagesRoutingModule { }
