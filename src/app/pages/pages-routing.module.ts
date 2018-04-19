import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './containers/home-page.component';
import { DataPageComponent } from './containers/data-page.component';
import { DataResolverService } from './services/data-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'data',
    component: DataPageComponent,
    resolve: { resolvedData: DataResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DataResolverService]
})
export class PagesRoutingModule { }
