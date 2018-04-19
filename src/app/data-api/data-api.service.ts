import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { map } from 'rxjs/operators/map';

export interface IClient {
  id: string;
}
export interface IAccount {
  id: string;
}

export abstract class AbstractDataApiService {
  abstract getClients(): Observable<IClient[]>;
  abstract getAccounts(): Observable<IAccount[]>;
}

@Injectable()
export class DataApiService implements AbstractDataApiService {

  private clientsBehaviorSubject: BehaviorSubject<IClient[]> = new BehaviorSubject(undefined);
  private accountsBehaviorSubject: BehaviorSubject<IAccount[]> = new BehaviorSubject(undefined);

  private dataInitialized = false;

  constructor() { }

  getClients(): Observable<IClient[]> {
    if (!this.dataInitialized) {
      this.initData();
    }
    return this.clientsBehaviorSubject.asObservable();
  }

  getAccounts(): Observable<IAccount[]> {
    if (!this.dataInitialized) {
      this.initData();
    }
    return this.accountsBehaviorSubject.asObservable();
  }

  // This replicates XHR calls to the client and account API with a
  // delayed response for each
  private initData() {
    this.dataInitialized = true;

    timer(200)
      .pipe(
        map( value => {
          const cl1: IClient = { id: 'cl1'};
          const cl2: IClient = { id: 'cl2'};
          return [cl1, cl2];
        })
      )
      .subscribe( value => {
        this.clientsBehaviorSubject.next(value);
      });

    timer(300)
      .pipe(
        map( value => {
          const ac1: IAccount = { id: 'ac1'};
          const ac2: IAccount = { id: 'ac2'};
          return [ac1, ac2];
        })
      )
      .subscribe( value => {
        this.accountsBehaviorSubject.next(value);
      });
  }

}
