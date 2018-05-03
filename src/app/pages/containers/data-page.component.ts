import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResolvedData } from '../services/data-resolver.service';

@Component({
  selector: 'bc-data-page',
  template: `
    <div class="main">
      <h2>Data Page</h2>
      <h4>Clients</h4>
      <h4>Accounts</h4>
    </div>
  `,
  styles: [`
    .main {
      padding: 10px;
      max-width: 750px;
      margin: 0 auto;
    }

  `]
})
export class DataPageComponent implements OnInit {


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
