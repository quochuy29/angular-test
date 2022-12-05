import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-cate',
  templateUrl: './product-cate.component.html',
  styleUrls: ['./product-cate.component.css']
})
export class ProductCateComponent implements OnInit {
  cateName: any;

  viewEdit: FormGroup;

  categoryId: number;

  productType: any[];

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
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService) {
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

  async ngOnInit() {
    await this.route.params.subscribe(params => {//params là tham số được định nghĩa trên đường dẫn
      this.categoryId = params['categoryId'];//params.cateId
    });

    await this.productService.getType(this.categoryId).subscribe(data => {
      this.productType = data;
      this.categoryService.findNameCate(this.categoryId).subscribe(dataName => {
        this.cateName = dataName;
      })
    })
    this.search();
  }

  search() {
    this.productService.getTypePro(this.categoryId, this.filterObject).subscribe(data => {
      this.productType = data;
    })
  }
  toDataURL(url) {
    return fetch(url)
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        return URL.createObjectURL(blob);
      });
  }

  async download(image) {
    const a = document.createElement("a");
    a.href = await this.toDataURL(image);
    a.download = "test.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
        this.productType = data;
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
        this.productType = data;
      })
    })
  }
}
