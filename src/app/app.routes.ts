import { Routes, RouterModule } from '@angular/router';
import { Courses } from "./courses/courses";
import { Cats } from "./cats/cats";

export const routes: Routes = [
    { path: 'courses', component: Courses},
    {path: "cats", component: Cats},
    { path: '', redirectTo: 'courses', pathMatch: 'full' }
];
