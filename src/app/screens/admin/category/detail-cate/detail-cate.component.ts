import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-detail-cate',
  templateUrl: './detail-cate.component.html',
  styleUrls: ['./detail-cate.component.css']
})
export class DetailCateComponent implements OnInit {

  proId: number;
  product = [];//chứa dữ liệu từ API trả về
  //chạy vào component -> chạy constructor -> chạy render giao diện -> chạy ngOninit(data)
  // book = null -> this.book = data
  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {

  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {//params là tham số được định nghĩa trên đường dẫn
      this.proId = params['id'];//params.bookId
    });

    await this.categoryService.findById(this.proId).subscribe(data => {
      this.product = data.products;
    })
  }
}
