import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Difficult } from '../models/difficult';

@Injectable({
  providedIn: 'root'
})
export class DifficultService {

  private API_URL = "http://localhost:3000/authors";
  private API_URL1 = "http://localhost:3000/categories";
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    let requestApi = this.API_URL;
    return this.http.get<any>(requestApi);//gửi request dạng GET trả về dữ liệu kiểu dữ liệu là any
  }

  all(embed: boolean = true): Observable<Difficult[]> {
    let requestUrl = this.API_URL;
    if (embed) requestUrl += '?_embed=products';
    return this.http.get<any[]>(requestUrl);
  }

  findById(difficultId): Observable<any> {
    let requestApi = `${this.API_URL}/${difficultId}?_embed=products`;//${} là quy đổi về value `` = nối chuỗi
    //nối đường link
    return this.http.get<any>(requestApi);
  }

  store(obj: Difficult): Observable<any> {
    return this.http.post<any>(this.API_URL, obj);
  }

  storeEdit(obj: Difficult): Observable<any> {
    let requestUrl = `${this.API_URL}/${obj.id}`;
    return this.http.put<any>(requestUrl, obj);
  }

  delete(id: any): Observable<any> {
    let requestUrl = `${this.API_URL}/${id}`;
    return this.http.delete<any>(requestUrl);
  }

  getCate(id): Observable<any> {
    let requestUrl = `${this.API_URL1}/${id}`;
    return this.http.delete<any>(requestUrl);
  }
}
