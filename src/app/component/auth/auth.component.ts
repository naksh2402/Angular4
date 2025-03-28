import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  email:string='';
  password:string='';
  name:string='';
  phone:string='';
  pinCode:string='';
  address:string='';

  isLoginMode=true;
  private adminEmail="test@this.admin.com";
  private adminPass="784512";

  constructor(private authService:AuthService,private userService:UserService,private router:Router){}
ngOnInit(): void {
}
isToggleMode(){
  this.isLoginMode=!this.isLoginMode;
}
onSubmit(form:NgForm){
  if(this.isLoginMode){
    if(this.email===this.adminEmail && this.password===this.adminPass){
        localStorage.setItem('role',"admin");
        this.authService.setCurrentUser({role:"admin"});
        this.router.navigate(['/admin']);
      }else{
    this.authService.login(this.email,this.password).subscribe((response)=>{
      // check for admin
          this.authService.setCurrentUser(response);
       const userId = response.localId; // Firebase returns a 'localId' as the user id
       localStorage.setItem('role','user');
       this.userService.getUser(userId).subscribe(
          (userData: any) => {
          const fullUser = { ...response, ...userData };
          this.router.navigate(['/home']);
          alert('Login Successful');
          },
          (error:any) => {
          console.error('Error fetching user data:', error);
          alert("Login Failed ");
          }
        );
      }
      )
  }
}else{
     this.authService.signUp(this.email, this.password, this.name,this.phone,this.address,this.pinCode).subscribe(
        response => {
          this.authService.setCurrentUser(response);
          console.log('Signup successful via email:', response);
          // localStorage.setItem('role','user');
          const userId = response.localId;
          const userData = {email: this.email, phone: this.phone, name:this.name,createdAt: new Date().toISOString(),role:"user"};

          // For signup, we add the user record only once
          this.userService.addUser(userId, userData).subscribe(
            (res:any) => {
              localStorage.setItem('userId',JSON.stringify(userId));
              console.log('User record added successfully:', res)},
            (err:any) => console.error('Error adding user record:', err)
          );
          alert('Signup Successful! Please log in. ');
          this.isLoginMode=!this.isLoginMode;
          this.router.navigate(['/auth']);
        },
        error => {
          alert('Signup failed! Please try again.');
          console.error('Signup error:', error);
        }
      );
  }
}
}
