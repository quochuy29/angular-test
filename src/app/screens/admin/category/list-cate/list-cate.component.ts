import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-cate',
  templateUrl: './list-cate.component.html',
  styleUrls: ['./list-cate.component.css']
})
export class ListCateComponent implements OnInit {

  cates: Category[];

  constructor(private cateService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getCatesData();
  }

  getCatesData() {
    this.cateService.all().subscribe(data => {
      this.cates = data;

    })
  }

  removeCate(id: any) {
    // lấy thông tin danh mục kèm các quyển sách
    this.cateService.findById(id).subscribe(cate => {
      cate.products.forEach(pro => {
        this.productService.removePro(pro.id);
      });
      this.cateService.delete(cate.id).subscribe(data => {
        this.cates = data;
      });
    });
    window.location.reload();
    // xóa danh mục
  }
}
