import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  proId: number;

  proDetail: null;

  proRelate: any[];

  viewEdit: FormGroup;

  heartFill = false;

  constructor(private route: ActivatedRoute,
    private productService: ProductService) {
    this.viewEdit = new FormGroup({
      id: new FormControl(),
      name: new FormControl(''),
      categoryId: new FormControl(),
      image: new FormControl(''),
      authorId: new FormControl(''),
      source: new FormControl(''),
      view: new FormControl(),
      download: new FormControl()
    });
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {//params là tham số được định nghĩa trên đường dẫn
      this.proId = params['proId'];//params.cateId
    });

    await this.productService.findById(this.proId).subscribe(data => {
      this.proDetail = data;
      this.productService.getCateById(data.categoryId).subscribe(dataCate => {
        this.proRelate = dataCate;
      })
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

  viewImg(Id) {
    this.productService.findById(Id).subscribe(data => {
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
        this.proDetail = data;
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
        this.proDetail = data;
      })
    })
  }
}
