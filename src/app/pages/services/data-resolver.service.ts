import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators/first';
import { map } from 'rxjs/operators/map';
import { MarkedHTMLPipe } from '../pipes/marked-html.pipe';
import { AbstractHttpDataService } from './http-data.service';

export interface IResolvedData {
  markedHtml: string;
}

@Injectable()
export class DataResolverService implements Resolve<IResolvedData> {

  constructor(
    private markedPipe: MarkedHTMLPipe,
    private dataService: AbstractHttpDataService
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResolvedData> {
    const url = '/assets/markdown.md';
    return this.dataService.getMarkdown(url)
      .pipe(
        map(markdownString => {
          const html = markdownString && this.markedPipe.transform(markdownString) || '';
          const data = { markedHtml: html };
          return data;
        }),
        first() // HttpClient triggers complete, but not sure of error situation (don't want to prevent navigation)
      );
  }

}
