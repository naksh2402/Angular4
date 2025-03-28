import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private dbUrl = environment.firebaseConfig.dbUrl;
  
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<{ [key: string]: any }>(`${this.dbUrl}/products.json`)
      .pipe(
        map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [])
      );
  }

  getQuantity(id: string): Observable<any> {
    return this.http.get<{ [key: string]: any }>(`${this.dbUrl}/products/${id}.json`);
  }
}
