import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from './app.tokens';

import { Route } from './models/route';

interface RouteResponse { item: Route; }
interface RoutesResponse { items: Route[]; }
interface EmailAvailableResponse { msg?: string; error?: boolean; }


@Injectable()
export class RoutesService {

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint) { }

  // searchForName(terms$: Observable<string>, debounceMs = 400): Observable<Array<Route>> {
  //   return terms$.pipe(
  //     debounceTime(debounceMs),       // Obersvable<string>
  //     distinctUntilChanged(),         // Obersvable<string>
  //     switchMap(term => this.rawSearch(term)) // Observable<Array<Route>>
  //   );
  // }

  search(terms$: Observable<string>, debounceMs = 400): Observable<Array<Route>> {
    return terms$.pipe(
      debounceTime(debounceMs),       // Obersvable<string>
      distinctUntilChanged(),         // Obersvable<string>
      switchMap(term => this.rawSearch(term)) // Observable<Array<Route>>
    );
  }

  rawSearch(term: string) {
    return this.http.get<RoutesResponse>(`${this.apiEndpoint}/search?text=${term}`)
      .pipe(map(data => data.items));
  }

  searchAll(search$: Observable<Array<string>>, name: string, location: string, perimeter: string, recommendation: string,
    type: string, debounceMs = 400): Observable<Array<Route>> {
    return search$.pipe(
      debounceTime(debounceMs),       // Obersvable<string>
      distinctUntilChanged(),         // Obersvable<string>
      switchMap(term => this.rawSearchAll(term[0], term[1], term[2], term[3], term[4])) // Observable<Array<Route>>
    ); // Observable<Array<Route>>

  }



  rawSearchAll(name: string, location: string, perimeter: string, recommendation: string, type: string) {
    return this.http.get<RoutesResponse>(`${this.apiEndpoint}/search?text=${name}&location=${location}&perimeter=${perimeter}
    &recommendation=${recommendation}&type=${type}`)
      .pipe(map(data => data.items));
  }

  getRoute(id: string): Observable<Route> {
    return this.http.get<RouteResponse>(`${this.apiEndpoint}/routes/${id}`)
      .pipe(map(data => data.item));
  }

  getRoutes(): Observable<Array<Route>> {
    return this.http.get<RoutesResponse>(`${this.apiEndpoint}/routes`)
      .pipe(map(data => data.items));
  }

  updateRoute(contact: Route): Observable<Route> {
    return this.http.put<RouteResponse>(`${this.apiEndpoint}/routes/${contact.id}`, contact)
      .pipe(map(data => data.item));
  }

  addRoute(route: Route) {
    return this.http.post<RouteResponse>(`${this.apiEndpoint}/route`, route)
      .pipe(map(data => data.item));
  }

  isEmailAvailable(email: string) {
    return this.http.get<EmailAvailableResponse>(`${this.apiEndpoint}/check-email?email=${email}`)
      .pipe(map(data => data));
  }

}
