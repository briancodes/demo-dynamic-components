import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError} from 'rxjs/operators/catchError';
import { retry } from 'rxjs/operators/retry';

export abstract class AbstractHttpDataService {
    abstract getMarkdown(url: string): Observable<string>;
}
@Injectable()
export class HttpDataService implements AbstractHttpDataService {

    constructor(
        private http: HttpClient,
    ) { }

    getMarkdown(url: string): Observable<string> {
        // let headers = new HttpHeaders({
        //     'Content-Type':  'application/markdown',
        //     'Authorization': 'my-auth-token'
        // });
        const headers = new HttpHeaders({
            'Content-Type': 'text/markdown'
        });

        return this.http.get(url, { responseType: 'text', headers })
            .pipe(
                retry(2), // retry a failed request up to 3 times
                catchError(this.handleError('getMarkDown', url)) // then handle the error
            );
    }

    private handleError(errorType: string, url: string) {
        return (error: HttpErrorResponse) => {
            if (error.error instanceof ErrorEvent) {
                // A client-side or network error occurred. Handle it accordingly.
            } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log(errorType, error.status);
            }
            // return an ErrorObservable with a user-facing error message. Completes the Observable
            // return new ErrorObservable('Something bad happened; please try again later.');
            return of('Error occured');
        };
    }
}
