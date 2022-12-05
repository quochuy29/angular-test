import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DifficultService } from 'src/app/services/difficult.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {

  authorId: Number = -1;
  editForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authorService: DifficultService) {
    this.editForm = this.createForm();
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.authorId = params.id;
    });
    await this.authorService.findById(this.authorId).subscribe(data => {
      this.editForm.setValue({ id: data.id, name: data.name });
    })
  }

  get f() {
    return this.editForm.controls;
  }

  createForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(-1),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  saveAuthor(event: any) {
    event.preventDefault();
    this.authorService.storeEdit(this.editForm.value).subscribe(data => {
      this.router.navigate(['/admin/author']);
    })
  }

}
