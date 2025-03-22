import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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
      accountType: ['', [
        Validators.required
      ]]
    });
  }

  // Getter for easy access to form fields
  get lf() { return this.loginForm.controls; }
  get sf() { return this.signupForm.controls; }

  onLoginSubmit() {
    this.loginSubmitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      // Add shake animation to invalid fields
      const invalidControls = document.querySelectorAll('.login-form .ng-invalid');
      invalidControls.forEach(element => {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
      });
      return;
    }

    // Add success animation
    document.querySelector('.login-form')?.classList.add('form-submitted');
    
    // Form is valid, proceed with login logic
    console.log('Login form submitted', this.loginForm.value);
    
    // You would typically call your authentication service here
    // this.authService.login(this.loginForm.value).subscribe(...);
  }

  onSignupSubmit() {
    this.signupSubmitted = true;
    
    // Stop here if form is invalid
    if (this.signupForm.invalid) {
      // Add shake animation to invalid fields
      const invalidControls = document.querySelectorAll('.signup-form .ng-invalid');
      invalidControls.forEach(element => {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
      });
      return;
    }

    // Add success animation
    document.querySelector('.signup-form')?.classList.add('form-submitted');
    
    // Form is valid, proceed with signup logic
    console.log('Signup form submitted', this.signupForm.value);
    
    // You would typically call your user registration service here
    // this.userService.register(this.signupForm.value).subscribe(...);
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
    console.log('Sign in with Google clicked');
    // Here you would integrate with your Google authentication service
    // For example:
    // this.authService.signInWithGoogle().then(result => {
    //   // Handle successful sign in
    // }).catch(error => {
    //   // Handle error
    // });
  }

  // Method to handle Google sign up
  signUpWithGoogle() {
    console.log('Sign up with Google clicked');
    // Here you would integrate with your Google authentication service for registration
    // For example:
    // this.authService.signUpWithGoogle().then(result => {
    //   // Handle successful sign up
    // }).catch(error => {
    //   // Handle error
    // });
  }
}