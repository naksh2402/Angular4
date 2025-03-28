import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { environment } from '../environment/environment';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbUrl=environment.firebaseConfig.dbUrl;
  constructor(private http:HttpClient) {}

   addProduct(product:Product):Observable<any>{
    return this.http.post(`${this.dbUrl}/products.json`,product);
   }

   getProducts():Observable<Product[]>{
    return this.http.get<{[key:string]:Product}>(`${this.dbUrl}/products.json`)
    .pipe(map (data=> data?Object.keys(data).map(key=>({id:key,...data[key]})):[]
    ))
   }

   deleteProject(id:string): Observable<any>{
    console.log("deleleting this project -id :",id);
    return this.http.delete(`${this.dbUrl}/products/${id}.json`);
   }
   updateTask(product:Product):Observable<any>{
    if(!product.id){
      throw new Error('Product is not there for update.');
    }
    const updatedData = {  ...product};
    delete updatedData.id;
    return this.http.patch(`${this.dbUrl}/products/${product.id}.json`,updatedData);
   }

}
