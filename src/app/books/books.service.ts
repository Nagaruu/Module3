import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { Book } from './shared/models/book';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private book: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  public book$: Observable<Book[]> = this.book.asObservable();

  private apiBooks = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { } 

  public getBooks() {
    this.http
      .get<Book[]>(this.apiBooks)
      .subscribe((e: Book[]) => {
        this.books = e;        
      });
  }

  public getBook(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiBooks);
  }

  public getBookById(id: any): Observable<Book | undefined> {
    return this.getBook().pipe(
      map((books: Book[]) => books.find((book: Book) => book.id.toString() === id))
    );
  }

  public addBook(newBook: Book): Observable<Book> {
    newBook.id = uuidv4();
    return this.http.post<Book>(this.apiBooks, newBook);
  }

  public deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBooks}/${bookId}`);
  }
  
  get books(): Book[] {
    return this.book.getValue();
  }
  
  set books(books: Book[]) {
    this.book.next(books);
  }
}

// function uuidv4(): number {
//   throw new Error('Function not implemented.');
// }
