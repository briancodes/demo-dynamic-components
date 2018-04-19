import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResolvedData } from '../services/data-resolver.service';
import { IClient, IAccount } from '../../data-api/data-api.service';

@Component({
  selector: 'bc-data-page',
  template: `
    <p>
      data-page works!
      {{clients}}
      {{accounts}}
    </p>
  `,
  styleUrls: ['./data-page.component.scss']
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
