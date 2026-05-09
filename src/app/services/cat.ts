import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cat {
  id: string;
  name: string;
  origin: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private url = "https://api.thecatapi.com/v1/breeds";

  constructor(private http: HttpClient){}

  getCats(): Observable<Cat[]>{
    return this.http.get<Cat[]>(this.url);
  }
}