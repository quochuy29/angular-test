import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { DifficultService } from 'src/app/services/difficult.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.css']
})
export class ListProComponent implements OnInit {

  product: Product[];

  filterObject = {
    keyword: "",
    orderBy: "1",
    authorBy: "",
    accorBy: ""
  }

  orderCondition: any[] = [];

  authorCondition: any[] = [];

  accorCondition: any[] = [
    {
      id: "1",
      name: "Tên tăng dần"
    },
    {
      id: "2",
      name: "Tên giảm dần"
    },
    {
      id: "3",
      name: "Số lượt xem tăng dần"
    },
    {
      id: "4",
      name: "Số lượt xem giảm dần"
    },
    {
      id: "5",
      name: "Số lượt tải tăng dần"
    },
    {
      id: "6",
      name: "Số lượt tải giảm dần"
    }
  ];

  constructor(private productService: ProductService,
    private cateService: CategoryService,
    private difficultService: DifficultService) { }

  ngOnInit(): void {
    this.search();
    this.getCate();
    this.getAuthor();
  }

  getProData() {
    this.productService.All().subscribe(data => {
      this.product = data;
    })
  }

  getCate() {
    this.cateService.getAllCate().subscribe(dataCate => {
      this.orderCondition = dataCate;
      this.orderCondition.push({
        id: 8,
        name: "All"
      });
    })
  }

  getAuthor() {
    this.difficultService.getAll().subscribe(dataAuthor => {
      this.authorCondition = dataAuthor;
    })
  }

  deleteCate(id: any) {
    this.cateService.findById(id).subscribe(cate => {
      console.log(cate);
      cate.products?.forEach(pro => {
        this.productService.removePro(pro.id);
      });

      this.cateService.delete(cate.id);
    });
  }

  search() {
    this.productService.getPro(this.filterObject).subscribe(data => {
      this.product = data;
    })
  }
}
