import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate():boolean {

    const role = localStorage.getItem('role');
    if (role && role === 'user') {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
