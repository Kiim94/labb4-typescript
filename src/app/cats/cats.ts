import { Component, signal, computed } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CatService, Cat } from "../services/cat";

@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cats.html',
  styleUrl: './cats.scss',
})
export class Cats {
  cats = signal<Cat[]>([]);
  searchPhrase = signal("");
  sortCats = signal<keyof Cat>("id");
  sortAsc = signal<boolean>(true);


  constructor(private catService: CatService){
    this.catService.getCats().subscribe(data => {
      this.cats.set(data)
    })
  }

  filteredCats = computed(() => {
    const phrase = this.searchPhrase().toLowerCase();

    let result = this.cats().filter(cat => 
      cat.name.toLowerCase().includes(phrase) ||
      cat.origin.toLowerCase().includes(phrase)
    );
    const key = this.sortCats();
    const asc = this.sortAsc();

    return result.sort((a, b) => {
      const aValue = String(a[key]).toLowerCase();
      const bValue = String(b[key]).toLowerCase();

      if(aValue < bValue) return asc ? -1 : 1;
      if(aValue > bValue) return asc ? 1 : -1;
      return 0;
    })
  })

  setSearch(value: string){
    this.searchPhrase.set(value);
  }
  sortBy(field: keyof Cat) {
    if (this.sortCats() === field) {
      this.sortAsc.update(v => !v);
    } else {
      this.sortCats.set(field);
      this.sortAsc.set(true);
    }
  }
}