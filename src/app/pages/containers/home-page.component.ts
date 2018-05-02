import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResolvedData } from '../services/data-resolver.service';

@Component({
  selector: 'bc-home-page',
  template: `
    <div class="main">
      <h2>Home Page</h2>
      <div [innerHTML]="markdownHTML | trustedHTML"></div>
    </div>
  `,
  styles: [`
    .main {
      margin-left: 10px;
    }
  `]
})
export class HomePageComponent implements OnInit {

  markdownHTML: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resolvedData: IResolvedData }) => {
        console.log('Home Page, route.data.subscribe: ', data.resolvedData);
        this.markdownHTML = data.resolvedData.markedHtml;
      });
  }

}
