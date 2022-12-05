import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AddAuthorComponent } from './screens/admin/author/add-author/add-author.component';
import { DetailAuthorComponent } from './screens/admin/author/detail-author/detail-author.component';
import { EditAuthorComponent } from './screens/admin/author/edit-author/edit-author.component';
import { ListAuthorComponent } from './screens/admin/author/list-author/list-author.component';
import { AddCateComponent } from './screens/admin/category/add-cate/add-cate.component';
import { DetailCateComponent } from './screens/admin/category/detail-cate/detail-cate.component';
import { EditCateComponent } from './screens/admin/category/edit-cate/edit-cate.component';
import { ListCateComponent } from './screens/admin/category/list-cate/list-cate.component';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { AddProComponent } from './screens/admin/product/add-pro/add-pro.component';
import { DetailProComponent } from './screens/admin/product/detail-pro/detail-pro.component';
import { EditProComponent } from './screens/admin/product/edit-pro/edit-pro.component';
import { ListProComponent } from './screens/admin/product/list-pro/list-pro.component';
import { ProductCateComponent } from './screens/product-cate/product-cate.component';
import { ProductDetailComponent } from './screens/product-detail/product-detail.component';
import { ProductListComponent } from './screens/product-list/product-list.component';

const routes: Routes = [
  {
    path: "",
    component: ClientLayoutComponent,
    children: [
      {
        path: "",
        component: ProductListComponent,
      },
      {
        path: "product/detail/:proId",
        component: ProductDetailComponent
      },
      {
        path: "product/category/:categoryId",
        component: ProductCateComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        component: ListProComponent
      },
      {
        path: "category",
        component: ListCateComponent
      },
      {
        path: "category/add",
        component: AddCateComponent
      },
      {
        path: "category/edit/:id",
        component: EditCateComponent
      },
      {
        path: "category/detail/:id",
        component: DetailCateComponent
      },
      {
        path: "product",
        component: ListProComponent
      },
      {
        path: "product/detail/:id",
        component: DetailProComponent
      },
      {
        path: "product/add",
        component: AddProComponent
      },
      {
        path: "product/edit/:id",
        component: EditProComponent
      },
      {
        path: "author",
        component: ListAuthorComponent
      },
      {
        path: "author/add",
        component: AddAuthorComponent
      },
      {
        path: "author/edit/:id",
        component: EditAuthorComponent
      },
      {
        path: "author/detail/:id",
        component: DetailAuthorComponent
      }
    ]
  },
  {
    path: "heroes",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
