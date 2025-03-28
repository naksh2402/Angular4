import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-commerce';
  isUser=false;
  isAdmin=false;
  isLoggedIn=false;
  constructor(private authService:AuthService) {}
    ngOnInit(): void {
    this.authService.$currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.role === 'admin';
      // this.isAdmin = localStorage.getItem('role')==='admin'
      // this.isUser = user?.role === 'user';
      console.log(this.isAdmin,this.isLoggedIn,this.isUser);
    });
    // localStorage.getItem('role')==="admin"?this.isAdmin=true:this.isAdmin=false;
    //       console.log(this.isAdmin,this.isLoggedIn,this.isUser);

  }
  logout(){
   this.authService.logout();
  }
}
