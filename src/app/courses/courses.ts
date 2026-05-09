import { Component, signal, computed } from '@angular/core';
import { CourseService, Course } from "../services/course";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})

export class Courses {
  courses = signal<Course[]>([]);

  searchPhrase = signal<string>("");

  //för sortering av kolumner. Utgår initialt från första kolumnen "code", a-ö. 
  sortCourses = signal<keyof Course>("code");

  sortAsc= signal<boolean>(true);

  //hade problem med att se tabell. Använde denna nedan för att se om ngt ändrades
  loading= signal<boolean>(true);

  constructor(private courseService: CourseService){
    this.courseService.getCourses().subscribe(data => {
      this.courses.set(data);
      this.loading.set(false);
    });
  }

  filteredCourses = computed(() => {
    const phrase = this.searchPhrase().toLowerCase();

    let result = this.courses().filter(c =>
      c.code.toLowerCase().includes(phrase) ||
      c.coursename.toLowerCase().includes(phrase) ||
      c.progression.toLowerCase().includes(phrase)
    );

    const key = this.sortCourses();
    const asc = this.sortAsc();
    return result.sort((a,b) => {
      const aValue = String(a[key]).toLowerCase();
      const bValue = String(b[key]).toLowerCase();

      //jämför värde A och B. Om A ska komma före eller efter B bestäms av asc
      //om asc är true = returnera -1. Om false, returnera 1.
      //? och : är förkortad if sats. asc ? -1 : 1 är tekniskt sett if(asc){ return -1; }else{ return 1;}
      if (aValue < bValue) return asc ? -1 : 1;
      if (aValue > bValue) return asc ? 1 : -1;
      return 0;
    });
});

  setSearch(value: string){
    this.searchPhrase.set(value);
  }
  sortBy(field: keyof Course) {
    if (this.sortCourses() === field) {
      this.sortAsc.update(v => !v);
    } else {
      this.sortCourses.set(field);
      this.sortAsc.set(true);
    }
  }
}