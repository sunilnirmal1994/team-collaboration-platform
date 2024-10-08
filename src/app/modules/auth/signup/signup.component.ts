import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, FormsModule, MatInputModule, CommonModule, MatButtonModule, RouterLink, RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  roles = [
    { id: 1, name: "admin" },
    { id: 2, name: "user" },
  ]
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
      role: ['', [Validators.required]]
    });
  }


  onSubmit(): void {
    this.submitted = true;

    // If form is invalid, do not submit
    if (this.signupForm.invalid) {
      return;
    }

    // Submit data to the API
    this.authService.signup(this.signupForm.value).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        window.alert("Sign up is successful. Now you can login to proceed further")
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.successMessage = '';
      }
    );
  }

  // Access form controls easily in template
  get f() {
    return this.signupForm.controls;
  }
}