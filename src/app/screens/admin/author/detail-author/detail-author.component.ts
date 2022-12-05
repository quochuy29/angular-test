import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DifficultService } from 'src/app/services/difficult.service';

@Component({
  selector: 'app-detail-author',
  templateUrl: './detail-author.component.html',
  styleUrls: ['./detail-author.component.css']
})
export class DetailAuthorComponent implements OnInit {

  proId: number;
  product = [];//chứa dữ liệu từ API trả về
  //chạy vào component -> chạy constructor -> chạy render giao diện -> chạy ngOninit(data)
  // book = null -> this.book = data
  constructor(private route: ActivatedRoute,
    private authorService: DifficultService,
    private router: Router
  ) {

  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {//params là tham số được định nghĩa trên đường dẫn
      this.proId = params['id'];//params.bookId
    });

    await this.authorService.findById(this.proId).subscribe(data => {
      this.product = data.products;
    })
  }

}
