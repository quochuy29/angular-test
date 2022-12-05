import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: any[];

  viewEdit: FormGroup;

  heartFill = false;

  filterObject = {
    keyword: "",
    orderBy: "1"
  }
  orderCondition: any[] = [
    {
      id: "1", name: "Số lượt tải tăng dần"
    },
    {
      id: "2", name: "Số lượt tải giảm dần"
    },
    {
      id: "3", name: "Số lượt xem tăng dần"
    },
    {
      id: "4", name: "Số lượt xem giảm dần"
    }
  ]
  constructor(private productService: ProductService) {
    this.viewEdit = new FormGroup({
      id: new FormControl(),
      name: new FormControl(''),
      categoryId: new FormControl(),
      image: new FormControl(''),
      authorId: new FormControl(),
      source: new FormControl(''),
      view: new FormControl(),
      download: new FormControl()
    });
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.productService.getAll(this.filterObject).subscribe(data => {
      this.product = data;
    })
  }

  iconHeart(event) {
    if (this.heartFill != true) {
      this.heartFill = true;
    } else {
      this.heartFill = false;
    }
    event.preventDefault()
  }

  async viewImg(Id) {
    await this.productService.findById(Id).subscribe(data => {
      this.viewEdit.setValue({
        id: data.id,
        name: data.name,
        categoryId: data.categoryId,
        image: data.image,
        authorId: data.authorId,
        source: data.source,
        view: (data.view + 1),
        download: data.download
      });
      this.productService.proEdit(this.viewEdit.value).subscribe(data => {
        this.product = data;
      })
    })
  }
  downloadImg(Id) {
    this.productService.findById(Id).subscribe(data => {
      this.viewEdit.setValue({
        id: data.id,
        name: data.name,
        categoryId: data.categoryId,
        image: data.image,
        authorId: data.authorId,
        source: data.source,
        view: data.view,
        download: (data.download + 1)
      });
      this.productService.proEdit(this.viewEdit.value).subscribe(data => {
        this.product = data;
      })
    })
  }
}
