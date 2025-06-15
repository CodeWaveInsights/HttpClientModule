import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  retry,
  throwError,
  timeout,
  TimeoutError,
  timer,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { Coffee } from '../types/coffee';

@Injectable({
  providedIn: 'root',
})
export class CoffeeApiService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  //GET
  getCoffees(): Observable<Coffee[]> {
    console.log('Fetching coffees from API');
    return this.http.get<Coffee[]>(this.apiUrl).pipe(
      timeout(20000),
      retry({
        count: environment.coffeeServiceRetryCount,
        delay: (err, attempNum) => {
          console.log(
            `[CoffeeApiService] => Retrying request... Attempt #${attempNum}`,
            err
          );
          return timer(1000 * attempNum); // Delay each retry by 1 second multiplied by the attempt number
        },
      }),
      catchError( this.handleErrorWithTimeout)
    );
  }

  //Get Coffee By ID
  getCoffeeById(id: string): Observable<Coffee> {
    return this.http
      .get<Coffee>(this.apiUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  //POST
  createCoffee(coffee: Partial<Coffee>): Observable<Coffee> {
    return this.http
      .post<{ success: boolean; added: Coffee }>(
        this.apiUrl,
        JSON.stringify(coffee)
      )
      .pipe(
        map((res) => res.added),
        retry(1),
        catchError(this.handleError)
      );
  }

  //PUT
  updateCoffee(coffee: Partial<Coffee>): Observable<Coffee> {
    return this.http
      .put<{ message: string; updated: Coffee }>(
        `${this.apiUrl}/${coffee.id}`,
        JSON.stringify(coffee)
      )
      .pipe(
        map((res) => res.updated),
        retry(1),
        catchError(this.handleError)
      );
  }

  //DELETE
  deleteCoffee(id: string) {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  private handleError(
    error: HttpErrorResponse | TimeoutError
  ): Observable<never> {
    let errorMessage = '';
    if (error instanceof TimeoutError) {
      errorMessage = '[CoffeeApiService] => Client Side Http timeout occurred.';
      return throwError(() => {
        return errorMessage;
      });
    } else {
      return this.handleError(error);
    }
  }

  private handleErrorWithTimeout(error: HttpErrorResponse | TimeoutError): Observable<never> {
    let errorMessage = '';
    if (error instanceof TimeoutError) {
      errorMessage = '[CoffeeApiService] => Client Side Http timeout occurred.';
      return throwError(() => errorMessage);
    } else {
      return this.handleError(error);
    }
  }
}
