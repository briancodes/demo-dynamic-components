import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './containers/home-page.component';
import { DataPageComponent } from './containers/data-page.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [HomePageComponent, DataPageComponent]
})
export class PagesModule { }
