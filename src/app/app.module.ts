import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AddCateComponent } from './screens/admin/category/add-cate/add-cate.component';
import { EditCateComponent } from './screens/admin/category/edit-cate/edit-cate.component';
import { ListCateComponent } from './screens/admin/category/list-cate/list-cate.component';
import { ListProComponent } from './screens/admin/product/list-pro/list-pro.component';
import { AddProComponent } from './screens/admin/product/add-pro/add-pro.component';
import { EditProComponent } from './screens/admin/product/edit-pro/edit-pro.component';
import { DetailProComponent } from './screens/admin/product/detail-pro/detail-pro.component';
import { ProductListComponent } from './screens/product-list/product-list.component';
import { ProductDetailComponent } from './screens/product-detail/product-detail.component';
import { ProductCateComponent } from './screens/product-cate/product-cate.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { AddAuthorComponent } from './screens/admin/author/add-author/add-author.component';
import { EditAuthorComponent } from './screens/admin/author/edit-author/edit-author.component';
import { ListAuthorComponent } from './screens/admin/author/list-author/list-author.component';
import { DetailAuthorComponent } from './screens/admin/author/detail-author/detail-author.component';
import { DetailCateComponent } from './screens/admin/category/detail-cate/detail-cate.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
    AddCateComponent,
    EditCateComponent,
    ListCateComponent,
    ListProComponent,
    AddProComponent,
    EditProComponent,
    DetailProComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductCateComponent,
    DashboardComponent,
    AddAuthorComponent,
    EditAuthorComponent,
    ListAuthorComponent,
    DetailAuthorComponent,
    DetailCateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
