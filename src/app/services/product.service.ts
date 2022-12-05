import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = "http://localhost:3000/products";

  constructor(private http: HttpClient) { }

  getAll(filter: any): Observable<any> { //observable để xử lý bất đồng bộ và nó sẽ chờ server trả về request sau khi đc gửi đi
    let requestApi = this.API_URL + "?_expand=category&_expand=author";
    switch (filter.orderBy) {
      case "1":
        requestApi += `&_sort=download&_order=asc`;
        break;
      case "2":
        requestApi += `&_sort=download&_order=desc`;
        break;
      case "3":
        requestApi += `&_sort=view&_order=asc`;
        break;
      case "4":
        requestApi += `&_sort=view&_order=desc`;
        break;
    }
    if (filter.keyword.length > 0) {
      requestApi += `&name_like=${filter.keyword}`;
    }
    return this.http.get<any>(requestApi);
  }

  All() {
    let requestApi = this.API_URL + "?_expand=category&_expand=author";
    return this.http.get<any>(requestApi);
  }

  getTypePro(categoryId, filter: any): Observable<any> { //observable để xử lý bất đồng bộ và nó sẽ chờ server trả về request sau khi đc gửi đi
    let requestApi = `${this.API_URL}?categoryId=${categoryId}&_expand=category&_expand=author`;
    switch (filter.orderBy) {
      case "1":
        requestApi += `&_sort=download&_order=asc`;
        break;
      case "2":
        requestApi += `&_sort=download&_order=desc`;
        break;
      case "3":
        requestApi += `&_sort=view&_order=asc`;
        break;
      case "4":
        requestApi += `&_sort=view&_order=desc`;
        break;
    }
    if (filter.keyword.length > 0) {
      requestApi += `&name_like=${filter.keyword}`;
    }

    return this.http.get<any>(requestApi);
  }

  getType(categoryId): Observable<any> {
    let requestApi = `${this.API_URL}?categoryId=${categoryId}&_expand=category&_expand=author`;
    console.log(requestApi)
    return this.http.get<any>(requestApi);
  }

  findById(characterId): Observable<any> {
    let requestApi = `${this.API_URL}/${characterId}?_expand=category&_expand=author`;//${} là quy đổi về value `` = nối chuỗi
    //nối đường link
    return this.http.get<any>(requestApi);
  }
  getCateById(cateId): Observable<any> {
    let requestApi = `${this.API_URL}?categoryId=${cateId}&_start=1&_limit=8`;//${} là quy đổi về value `` = nối chuỗi
    //nối đường link
    return this.http.get<any>(requestApi);
  }

  addChar(obj: Product): Observable<any> {
    obj.categoryId = Number(obj.categoryId);
    obj.authorId = Number(obj.authorId)
    return this.http.post<any>(this.API_URL, obj);
  }

  proEdit(obj: Product): Observable<any> {
    obj.categoryId = Number(obj.categoryId);
    obj.authorId = Number(obj.authorId)
    let requestUrl = `${this.API_URL}/${obj.id}`;
    return this.http.put<any>(requestUrl, obj);
  }

  removePro(id: any): Observable<any> {
    let requestUrl = `${this.API_URL}/${id}`;
    return this.http.delete<any>(requestUrl);
  }

  getPro(filter: any): Observable<any> {
    let requestApi = `${this.API_URL}?_expand=category&_expand=author`;
    switch (filter.orderBy) {
      case "1":
        requestApi += `&categoryId=1`;
        break;
      case "2":
        requestApi += `&categoryId=2`;
        break;
      case "3":
        requestApi += `&categoryId=3`;
        break;
      case "4":
        requestApi += `&categoryId=4`;
        break;
      case "5":
        requestApi += `&categoryId=5`;
        break;
      case "6":
        requestApi += `&categoryId=6`;
        break;
      case "7":
        requestApi += `&categoryId=7`;
        break;
      case "8":
        requestApi;
        break;
    }
    switch (filter.authorBy) {
      case "1":
        requestApi += `&authorId=1`;
        break;
      case "2":
        requestApi += `&authorId=2`;
        break;
      case "3":
        requestApi += `&authorId=3`;
        break;
    }
    switch (filter.accorBy) {
      case "1":
        requestApi += `&_sort=name&_order=asc`;
        break;
      case "2":
        requestApi += `&_sort=name&_order=desc`;
        break;
      case "3":
        requestApi += `&_sort=view&_order=asc`;
        break;
      case "4":
        requestApi += `&_sort=view&_order=desc`;
        break;
      case "5":
        requestApi += `&_sort=download&_order=asc`;
        break;
      case "6":
        requestApi += `&_sort=download&_order=desc`;
        break;
    }
    if (filter.keyword.length > 0) {
      requestApi += `&name_like=${filter.keyword}`;
    }

    return this.http.get<any>(requestApi);
  }

}
