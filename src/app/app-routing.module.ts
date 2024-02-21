import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: 'book', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), BrowserModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }