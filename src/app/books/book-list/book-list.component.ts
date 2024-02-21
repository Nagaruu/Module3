import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BooksService } from '../books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../shared/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookListComponent implements OnInit {
  books!: any[];
  newBookForm!: FormGroup;
  
  constructor(
    private booksService: BooksService,
    private formBuilder: FormBuilder,
    ) {
      this.newBookForm = this.formBuilder.group({
        title: ['', [
          Validators.required,
          Validators.minLength(4)
        ]],
        author: ['', [
          Validators.required,
          Validators.minLength(4) 
        ]],
        price: [0, Validators.required],
        qty: [0, Validators.required],
        description: [''],
        category: [[]],
        year: [0],
        rating: [[]],
        image: [''],
      });
    }
    
  ngOnInit(): void {
    this.getBooks();
    this.booksService.book$.subscribe((res: any) => {
      this.books = res;
    });
  }

  getBooks(): void {
    this.booksService.getBooks();
  }

  addBook(): void {
    if (this.newBookForm.valid) {
      this.booksService.addBook(this.newBookForm.value).subscribe(
        (addedBook: Book) => {
          // Optionally, you can do something with the added book
          console.log('Book added:', addedBook);

          // Clear the form after successful addition
          this.newBookForm.reset();
        },
        (error: any) => {
          console.error('Error adding book:', error);
        },
        () => {
          this.getBooks();
        }
      );
    } else {
      // Form is not valid, handle validation errors or show a message
      console.error('Form is not valid.');
    }
  }

  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.booksService.deleteBook(bookId).subscribe(
        () => {
          // Remove the deleted book from the local list
          this.books = this.books?.filter(book => book.id.toString() !== bookId);
        },
        (error: any) => {
          console.error('Error deleting book:', error);
        },
        () => {
          this.getBooks();
        }
      );
    }
  }
}