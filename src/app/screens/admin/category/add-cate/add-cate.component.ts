import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-cate',
  templateUrl: './add-cate.component.html',
  styleUrls: ['./add-cate.component.css']
})
export class AddCateComponent implements OnInit {

  cateForm: FormGroup;

  constructor(private cateService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {
    this.cateForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])
    });
  }
  get f() { //lấy ra trạng thái của name để name.dirty hoặc name.touched 
    //f viết tắt của form
    return this.cateForm.controls;//controls
  }

  saveCate(event: any) {
    event.preventDefault();
    this.cateService.store(this.cateForm.value).subscribe(data => {
      this.router.navigate(['/admin/category']);
    })
  }

}
