import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//Observable: data som kommer senare/asynkront från API
import { Observable } from "rxjs";

//utseende för hur varje kursobjekt ska se ut
export interface Course {
  code: string;
  coursename: string;
  progression: string;
  //använde inte syllabus i slutprodukten, men kan vara bra att behålla
  syllabus?: string;
}

@Injectable({
  //providedIn: root <- gör servicen (api:t) tillgängligt i hela webbplatsen
  providedIn: 'root',
})
export class CourseService {
  //URL till json med kurser
  private url = "https://webbutveckling.miun.se/files/ramschema.json";

  constructor(private http: HttpClient){}

  //Observable<Course[]> <- hämtar kurser från länk ovan. Observable gör den hämtningen "lazy"
  getCourses(): Observable<Course[]>{
    //HTTP GET-anrop till api
    return this.http.get<Course[]>(this.url);
  }
}
