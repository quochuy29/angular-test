import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Difficult } from 'src/app/models/difficult';
import { CategoryService } from 'src/app/services/category.service';
import { DifficultService } from 'src/app/services/difficult.service';
import { ProductService } from 'src/app/services/product.service';
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-edit-pro',
  templateUrl: './edit-pro.component.html',
  styleUrls: ['./edit-pro.component.css']
})
export class EditProComponent implements OnInit {

  proId: Number = -1;

  Cate: Category[];//biến cate có kiểu dữ liệu Category dạng mảng

  Diff: Difficult[];//biến diff có kiểu dữ liệu Category dạng mảng

  downloadURL: Observable<string>;

  productForm: FormGroup;
  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private difficultService: DifficultService,
    private storage: AngularFireStorage) {
    this.productForm = new FormGroup({
      id: new FormControl(-1),
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

  async ngOnInit() { //thực thi hàm được gọi
    await this.activatedRoute.params.subscribe(params => { //lấy ra id đường dẫn
      this.proId = params.id;
    });
    // lấy ra thông tin nhân vật thông qua id
    await this.productService.findById(this.proId).subscribe(data => {
      this.productForm.setValue({
        id: data.id,
        name: data.name,
        categoryId: data.categoryId,
        image: data.image,
        authorId: data.authorId,
        source: data.source,
        view: data.view,
        download: data.download
      });
    })
    this.selectCate();
    this.selectAuthor();
  }

  selectCate() { // lấy dữ liệu category đổ vào
    this.categoryService.all().subscribe(data => {//lấy data từ request trả về (subscribe để dữ liệu) 
      this.Cate = data;                           //và gán vào biến data
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
            this.productForm.value.image = url;
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
  savePro(event: any) { // thay đổi dữ liệu
    event.preventDefault();
    this.productService.proEdit(this.productForm.value).subscribe(data => { //chưa xong
      this.route.navigate(['/admin/product']);
    })
  }

}
