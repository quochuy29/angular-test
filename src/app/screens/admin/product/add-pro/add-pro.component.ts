import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Difficult } from 'src/app/models/difficult';
import { CategoryService } from 'src/app/services/category.service';
import { DifficultService } from 'src/app/services/difficult.service';
import { ProductService } from 'src/app/services/product.service';
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-add-pro',
  templateUrl: './add-pro.component.html',
  styleUrls: ['./add-pro.component.css']
})
export class AddProComponent implements OnInit {

  Cate: Category[];//biến cate có kiểu dữ liệu Category dạng mảng

  Diff: Difficult[];//biến diff có kiểu dữ liệu Category dạng mảng

  productForm: FormGroup;

  downloadURL: Observable<string>;

  constructor(private route: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private difficultService: DifficultService,
    private storage: AngularFireStorage) {
    this.productForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60)
      ]),
      categoryId: new FormControl('', [
        Validators.required
      ]),
      image: new FormControl('', [
        Validators.required
      ]),
      authorId: new FormControl('', [
        Validators.required
      ]),
      source: new FormControl(''),
      view: new FormControl(0),
      download: new FormControl(0)
    });
  }

  ngOnInit(): void {//thực thi hàm được gọi
    this.selectCate();
    this.selectAuthor();
  }

  selectCate() { //lấy giá trị của cate đưa vào thẻ select
    this.categoryService.all().subscribe(data => {
      this.Cate = data;
    })
  }
  selectAuthor() { //lấy giá trị của cate đưa vào thẻ select
    this.difficultService.all().subscribe(data => {
      this.Diff = data;
    })
  }

  upload(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Uploads/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Uploads/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.productForm.controls['image'].setValue(url);
            console.log(url);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  get f() { //lấy ra trạng thái của name để name.dirty hoặc name.touched 
    //f viết tắt của form
    return this.productForm.controls;//controls
  }

  savePro(event: any) { //lưu data vào db.json
    event.preventDefault();
    this.productService.addChar(this.productForm.value).subscribe(data => {//lấy data từ request trả về (subscribe để dữ liệu) 
      this.route.navigate(['/admin/product']);                               //và gán vào biến data
      //sau lưu đc data trở về trang /admin/category 
    })
  }
}
