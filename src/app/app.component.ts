import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { AuthService } from './modules/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Team Collaboration Platform';
  role:any = '';
  constructor(public authService: AuthService, private router: Router) {}
  isNavOpen: boolean = false;

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  ngDoCheck(){
    this.role =  localStorage.getItem('role');
  }

  /**
   * Handles user logout
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}