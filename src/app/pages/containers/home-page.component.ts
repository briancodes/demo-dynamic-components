import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bc-home-page',
  template: `
    <div class="main">
      <h2>Home Page</h2>
    </div>
  `,
  styles: [`
    .main {
      margin-left: 10px;
    }
  `]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Home Page');
  }

}
