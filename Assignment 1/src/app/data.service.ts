import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

import {Carousel} from './carousel-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _url: string = '/assets/data/carousel.json';

  constructor(private http: HttpClient){}

  getPhones(): Observable<Carousel[]>{
    return this.http.get<Carousel[]>(this._url);
  }
}
