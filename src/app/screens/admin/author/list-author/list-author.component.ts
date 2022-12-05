import { Component, OnInit } from '@angular/core';
import { Difficult } from 'src/app/models/difficult';
import { DifficultService } from 'src/app/services/difficult.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.css']
})
export class ListAuthorComponent implements OnInit {

  authors: Difficult[];

  constructor(private authorService: DifficultService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.getAuthorData();
  }

  getAuthorData() {
    this.authorService.all().subscribe(data => {
      this.authors = data;
    })
  }

  removeAuthor(id: any) {
    // lấy thông tin danh mục kèm các quyển sách
    this.authorService.findById(id).subscribe(author => {
      if (author.products.length > 0) {
        author.products.forEach(pro => {
          this.productService.removePro(pro.id);
        });
      }
      this.authorService.delete(author.id).subscribe(data => {
        this.authors = data;
      });
    });
    // xóa danh mục
  }

}
