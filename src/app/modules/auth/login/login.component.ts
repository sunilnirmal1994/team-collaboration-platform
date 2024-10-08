import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, CommonModule, RouterLink, RouterOutlet], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage = '';
  successMessage = '';
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          localStorage.setItem("role", response.role)
          this.successMessage = response.message;
          this.errorMessage = '';
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.successMessage = '';
        }
      );
  }
}
  // login() {
  //   this.authService.login(this.email, this.password).subscribe(response => {
  //     console.log("response==", response)
  //     if (response.token) {
  //       this.router.navigate(['/dashboard']); // Navigate to dashboard after login
  //     } else {
  //       alert('Login failed');
  //     }
  //   });
  // }
}