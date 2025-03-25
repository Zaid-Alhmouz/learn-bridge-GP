import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Mock user storage (simulating a database)
  private users: any[] = [];

  // Flag to track login status
  private isLoggedIn = false;

  constructor() {}

  // Mock registration method (unchanged from previous version)
  setRegister(userData: any): Observable<any> {
    const existingUser = this.users.find(user => user.email === userData.email);
    
    if (existingUser) {
      return throwError(() => ({
        error: { message: 'Email already exists' }
      }));
    }

    this.users.push(userData);

    return of({ success: true, message: 'Registration successful' }).pipe(
      delay(1000)
    );
  }

  // Mock login method with success detection
  setLogin(credentials: any): Observable<any> {
    const user = this.users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      // Set login status to true
      this.isLoggedIn = true;
      
      return of({ 
        success: true, 
        user,
        message: 'Login successful' 
      });
    } else {
      // Reset login status
      this.isLoggedIn = false;
      
      return throwError(() => ({
        error: { message: 'Invalid email or password' }
      }));
    }
  }

  // Method to check login status
  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  // Method to logout
  logout() {
    this.isLoggedIn = false;
  }
}