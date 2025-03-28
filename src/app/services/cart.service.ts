import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private dbUrl=environment.firebaseConfig.dbUrl;
  constructor(private http:HttpClient,private authService:AuthService) { }
  private authId=localStorage.getItem('userId');
  addToCart(id:string,cart:any):Observable<any>{
   return this.http.post(`${this.dbUrl}/cart/${this.authId}.json`,{
      userId:this.authId,
      cart:{id,...cart}
    })

  }
  
   getCart():Observable<any>{
    return this.http.get<{[key:string]:any}>(`${this.dbUrl}/cart.json`)
         .pipe(map (data=> data?Object.keys(data).map(key=>({id:key,...data[key]})):[]
         ))
   }
}
