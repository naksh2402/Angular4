import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey=environment.firebaseConfig.apikey;
  private currentUserSubject=new BehaviorSubject<any>(null);
  $currentUser=this.currentUserSubject.asObservable();

  constructor(private http:HttpClient,private router:Router) {
     const savedUser = localStorage.getItem('currentuser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  signUp(email: string, password: string,name:string,phone:string,address:string,pinCode:string): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    const payload = { email, password,name,phone,address,pinCode,returnSecureToken: true };
    return this.http.post(url, payload);
  }

  // Email/password login
  login(email: string, password: string): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    const payload = { email, password, returnSecureToken: true };
    return this.http.post(url, payload);
  }

 setCurrentUser(user:any):void{
  localStorage.setItem('currentuser',JSON.stringify(user));
  this.currentUserSubject.next(user);
 }

 getCurrentUser(){
  return localStorage.getItem('currentuser');
  // return this.currentUserSubject.value;
 }
 logout(){
  localStorage.removeItem('currentuser');
  localStorage.removeItem('role');
  this.currentUserSubject.next(null);
  this.router.navigate(['/auth']);
 }
 isAdmin():boolean{
  return localStorage.getItem('role')==='admin';
 }
}
