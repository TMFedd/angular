import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})




export class ApiService {

  constructor(private http: HttpClient) {

  }

  getProducts() {
    return this.http.get<any>('http://localhost:3000/productList/');
  }

  createProduct(data: any) {
    return this.http.post<any>('http://localhost:3000/productList/', data);
  }

  updateProduct(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/productList/' + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>('http://localhost:3000/productList/' + id);
  }

  getLanguages() {
    return this.http.get<any>('http://localhost:3000/languageList/');
  }

  getBrands() {
    return this.http.get<any>('http://localhost:3000/brandList/');
  }

}