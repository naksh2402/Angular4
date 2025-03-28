import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbUrl=environment.firebaseConfig.dbUrl;

  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<{ [key: string]: User }>(`${this.dbUrl}/users.json`)
      .pipe(
        map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [])
      );
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.dbUrl}/users/${userId}.json`);
  }

  updateUser(user: User): Observable<any> {
    if (!user.id) throw new Error('User ID is required');
    return this.http.patch(`${this.dbUrl}/users/${user.id}.json`, user);
  }

  deleteUser(userId:string,userData:any):Observable<any>{
    return this.http.delete(`${this.dbUrl}/users/${userId}.json`);
  }
  addUser(id:string,user:any):Observable<any>{
   return this.http.put(`${this.dbUrl}/users/${id}.json`,user);
  }
}
