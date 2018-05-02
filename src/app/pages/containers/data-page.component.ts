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
      margin-left: 10px;
    }
  `]
})
export class DataPageComponent implements OnInit {


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
