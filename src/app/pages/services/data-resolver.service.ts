import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { filter } from 'rxjs/operators/filter';
import { first } from 'rxjs/operators/first';
import { map } from 'rxjs/operators/map';
import { AbstractDataApiService, IAccount, IClient } from '../../data-api/data-api.service';

export interface IResolvedData {
  clients: IClient[];
  accounts: IAccount[];
}

@Injectable()
export class DataResolverService implements Resolve<IResolvedData> {

  constructor(private dataServcie: AbstractDataApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResolvedData> {

    const clients$ = this.dataServcie.getClients();
    const accounts$ = this.dataServcie.getAccounts();

    const combined$ = combineLatest(clients$, accounts$,
      (clients, accounts) => {
        return <IResolvedData>{ clients, accounts };
      })
      .pipe(
        filter((value, index) => {
          console.log('Resolver Filter: ', value);
          return (value.clients && value.accounts) ? true : false;
        }),
        map(value => {
          console.log('Resolver Map & Complete:', value);
          return value;
        }),
        first()
      );
    return combined$;
  }

}
