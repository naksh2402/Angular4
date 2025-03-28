import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { map, Observable } from 'rxjs';

export interface CartItem {
  name: string;
  qty: number;
  totalValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private dbUrl = environment.firebaseConfig.dbUrl;
  private authId: string | null = localStorage.getItem('userId'); 

  constructor(private http: HttpClient) {}

  addToCart(cart: CartItem): Observable<any> {
    if (!this.authId) {
      throw new Error('User is not logged in.');
    }
    return this.http.post(`${this.dbUrl}/cart/${this.authId}.json`, cart);
  }
  
  getCart(): Observable<(CartItem & { id: string })[]> {
    if (!this.authId) {
      throw new Error('User is not logged in.');
    }
    return this.http.get<{ [key: string]: CartItem }>(`${this.dbUrl}/cart/${this.authId}.json`)
      .pipe(
        map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [])
      );
  }

  deleteCart(): Observable<any> {
  if(!this.authId){
    throw new Error('User is not logged in.');
  }
  return this.http.delete(`${this.dbUrl}/cart/${this.authId}.json`);
  }
}
