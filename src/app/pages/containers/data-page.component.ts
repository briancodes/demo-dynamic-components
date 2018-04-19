import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResolvedData } from '../services/data-resolver.service';
import { IClient, IAccount } from '../../data-api/data-api.service';

@Component({
  selector: 'bc-data-page',
  template: `
    <div class="main">
      <h2>Data Page</h2>
      <h4>Clients</h4>
      <div *ngFor="let client of clients">
        {{client.id}}
      </div>
      <h4>Accounts</h4>
      <div *ngFor="let account of accounts">
        {{account.id}}
      </div>
    </div>
  `,
  styles: [`
    .main {
      margin-left: 10px;
    }
  `]
})
export class DataPageComponent implements OnInit {

  clients: IClient[];
  accounts: IAccount[];

  constructor(private route: ActivatedRoute) {

    this.route.data
      .subscribe((data: { resolvedData: IResolvedData }) => {
        console.log('Data Page, route.data.subscribe: ', data.resolvedData);
        this.clients = data.resolvedData.clients;
        this.accounts = data.resolvedData.accounts;
      });

  }

  ngOnInit() {
  }

}
