import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  loginSubmitted = false;
  signupSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService ) {}

  ngOnInit() {
    // Initialize login form with validators
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    // Initialize signup form with validators
    this.signupForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$') // At least one letter and one number
      ]],
      role: ['', [
        Validators.required
      ]]
    });
  }

  // Getter for easy access to form fields
  get lf() { return this.loginForm.controls; }
  get sf() { return this.signupForm.controls; }

  onLoginSubmit() {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) return;
  
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe({
      next: (res) => {
        console.log('Login response:', res);
        // Verify session (e.g., fetch user profile)
        this.authService.checkAuthStatus().subscribe({
          next: (user) => {
            console.log('Authenticated user:', user);
            // Redirect to dashboard/home
          },
          error: (err) => console.error('Session check failed:', err)
        });
      },
      error: (err) => {
        console.error('Login failed:', err);
        // Show error to user
      }
    });
  }

  onSignupSubmit() {
    this.signupSubmitted = true;
  
    if (this.signupForm.invalid) {
      // Add shake animation to invalid fields
      const invalidControls = document.querySelectorAll('.signup-form .ng-invalid');
      invalidControls.forEach(element => {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
      });
      return;
    }
  
    const userData = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      role: this.signupForm.value.role.toUpperCase() // Ensure uppercase
    };
  
    this.authService.register(userData).subscribe({
      next: () => {
        console.log('Registration successful');
        // Add success logic (e.g., redirect to login)
      },
      error: (err) => {
        console.error('Registration failed:', err);
        // Show error message to user
      }
    });
  }

  // Reset form status when switching between forms
  resetStatus() {
    this.loginSubmitted = false;
    this.signupSubmitted = false;
    document.querySelector('.login-form')?.classList.remove('form-submitted');
    document.querySelector('.signup-form')?.classList.remove('form-submitted');
  }

  // Method to handle Google sign in
  signInWithGoogle() {
    this.authService.loginWithGoogle();
  }

  // Method to handle Google sign up
  signUpWithGoogle() {
    this.authService.loginWithGoogle(); // also handles the sign up

  }
}