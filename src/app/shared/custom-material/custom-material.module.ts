import {MatButtonModule, MatCheckboxModule, MatToolbarModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule],
  exports: [MatButtonModule, MatToolbarModule]
})
export class CustomMaterialModule { }
