// book detail ts 
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BooksService } from '../books.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'book-detail-app',
    templateUrl: 'book-detail.component.html',
    styleUrls: ['./book-detail.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class BookDetailComponent implements OnInit {
    book: any = null;
    productList: any;
    quantity_oder: number = 1;
    
    constructor(private http: HttpClient, private api: BooksService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id !== null) {
            this.api.getBookById(id).subscribe((res) => {
                console.log(res);
                this.book = res;
                this.productList = res;
                this.productList.forEach((a: any) => {
                    Object.assign(a, { quantity: 1, total: a.price });
                });
            })
        }
    }
}