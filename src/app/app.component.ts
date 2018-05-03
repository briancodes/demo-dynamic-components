import { Component } from '@angular/core';

@Component({
  selector: 'bc-root',
  templateUrl: './app.component.html',
  styles: [`
  a.mat-button.active {
    border-bottom: 1px solid;
}
  `]
})
export class AppComponent {
  title = 'bc';
}
