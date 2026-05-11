import { Component, signal, computed } from '@angular/core';

//importerar service från course. Där finns också interface för kurser 
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

  //sortering: grundläga = true, mao stigande (A-Ö)
  sortAsc= signal<boolean>(true);

  //hade problem med att se tabell. Använde denna nedan för att se om ngt ändrades
  loading= signal<boolean>(true);

  constructor(private courseService: CourseService){
    //när data har kommit från courseService/från getCourses(), uppdateras signals (courses, loading)
    this.courseService.getCourses().subscribe(data => {
      //tom courses får nu data
      this.courses.set(data);
      //loading blir false, då tabellen borde vara färdigladdad/fått information
      this.loading.set(false);
    });
  }

  //metod som ska räkna ut automatiskt:
  filteredCourses = computed(() => {
    //tar det användaren söker och gör till små bokstäver, trimmar bort mellanslag före och efter
    const phrase = this.searchPhrase().toLowerCase().trim();

    //filtera igenom arrayen courses som har data från json
    //filtrering jämför sökfras mot kursobjekten
    let result = this.courses().filter(c =>
      c.code.toLowerCase().includes(phrase) ||
      c.coursename.toLowerCase().includes(phrase) ||
      c.progression.toLowerCase().includes(phrase)
    );

    //hämta nuvarande nyckel som sorteras efter (code, coursename, progression)
    const key = this.sortCourses();
    //hämta nuvarande "sorteringsriktning" (är det stigande eller fallande, true eller false?)
    const asc = this.sortAsc();

    //returnera resultat: sortera
    return result.sort((a,b) => {
      //gör två värden som ska jämföras mot varandra: key kan vara code, coursename eller progression:
      //String(a[code]).toLowerCase()
      //Betyder ungefär: ta ut ett värde ur objektet (t.ex. code), gör till sträng och sedan till små bokstäver
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

  //uppdatera searchPhrases signal så den har det nya värdet
  //t.ex. användaren söker på "javascript". Nytt värde är javascript
  setSearch(value: string){
    this.searchPhrase.set(value);
  }

  //sortera tabell efter den kolumn användaren klickade på
  sortBy(field: keyof Course) {
    //är tabellen redan sorteras efter vald kolumn?
    if (this.sortCourses() === field) {
      //om ja, ändra ordning: om det är true, blir false.
      //A-ö, Ö-A
      this.sortAsc.update(v => !v);
    } else {
      //om nej, ändra vilken kolumn som sorteras efter
      //börja från A-ö
      this.sortCourses.set(field);
      this.sortAsc.set(true);
    }
  }
}