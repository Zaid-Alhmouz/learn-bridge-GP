import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; 

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}


  login(email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);
  
    return this.http.post(`${this.apiUrl}/api/login`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true, // Required for cookies/session
      responseType: 'text' // Workaround for empty responses
    }).pipe(
      map(() => ({ status: 'Login successful' })), // Map empty response to success
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  // Registration
  register(userData: { name: string; email: string; password: string; role: string }) {
    return this.http.post(`${this.apiUrl}/api/register`, userData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Prevent redirects
      }
    });
  }

  // Google OAuth Initiation
  loginWithGoogle() {
    window.location.href = `${this.apiUrl}/oauth2/authorization/google`;
  }

  // Check login status
  checkAuthStatus() {
    return this.http.get(`${this.apiUrl}/user`, {
      withCredentials: true
    });
  }
}
