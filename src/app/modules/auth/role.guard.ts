import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
//import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role')
    if (token) {
      const userRole = role;

      if (userRole === '1') {
        return true;
      } else {
        this.router.navigate(['/taskboard']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
