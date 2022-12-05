import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-pro',
  templateUrl: './detail-pro.component.html',
  styleUrls: ['./detail-pro.component.css']
})
export class DetailProComponent implements OnInit {

  imgShow = false;

  proId: number;
  product = null;//chứa dữ liệu từ API trả về
  //chạy vào component -> chạy constructor -> chạy render giao diện -> chạy ngOninit(data)
  // book = null -> this.book = data
  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private storage: AngularFireStorage
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params => {//params là tham số được định nghĩa trên đường dẫn
      this.proId = params['id'];//params.bookId
    });

    await this.productService.findById(this.proId).subscribe(data => {
      this.product = data;
      console.log(data)
    })
  }

  imageShow(event) {
    if (this.imgShow != true) {
      this.imgShow = true;
    } else {
      this.imgShow = false;
    }
    event.preventDefault();
  }

  removeImg(Id, downloadUrl) {
    this.productService.removePro(Id).subscribe(data => {
      this.product = data;
      this.router.navigate(['/admin/product']);
      return this.storage.storage.refFromURL(downloadUrl).delete();
    })
  }
}
