import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './containers/home-page.component';
import { DataPageComponent } from './containers/data-page.component';
import { MarkedHTMLPipe } from './pipes/marked-html.pipe';
import { TrustedHtmlPipe } from './pipes/trusted-html.pipe';
import { HttpDataService, AbstractHttpDataService } from './services/http-data.service';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [
    HomePageComponent,
    DataPageComponent,
    MarkedHTMLPipe,
    TrustedHtmlPipe
  ],
  providers: [
    { provide: AbstractHttpDataService, useClass: HttpDataService}
  ]
})
export class PagesModule { }
