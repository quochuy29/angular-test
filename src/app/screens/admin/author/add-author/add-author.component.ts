import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DifficultService } from 'src/app/services/difficult.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  authorForm: FormGroup;

  constructor(private authorService: DifficultService,
    private router: Router,
    private route: ActivatedRoute) {
    this.authorForm = this.createForm();
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
    return this.authorForm.controls;//controls
  }

  saveAuthor(event: any) {
    event.preventDefault();
    this.authorService.store(this.authorForm.value).subscribe(data => {
      this.router.navigate(['/admin/author']);
    })
  }

}
