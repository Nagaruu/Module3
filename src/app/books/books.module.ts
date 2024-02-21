import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { booksRoutes } from './books.routes';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksService } from './books.service';
import { BrowserModule } from '@angular/platform-browser';
import { BookListComponent } from './book-list/book-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(booksRoutes)
  ],
  providers: [
    BooksService,
    { provide: 'UUID', useValue: uuidv4 }, // Use the 'UUID' token for injection

  ]
})
export class BooksModule { }