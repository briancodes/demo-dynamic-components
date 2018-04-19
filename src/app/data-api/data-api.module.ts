import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractDataApiService, DataApiService } from './data-api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: AbstractDataApiService, useClass: DataApiService}
  ]
})
export class DataApiModule { }
