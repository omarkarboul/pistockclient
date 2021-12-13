import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8088/SpringMVC/produit';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl + "/retrieve-all-produits")
  }

  getProductByCat(cat:String): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl + "/getproductsbtcat/" +cat)
  }
}