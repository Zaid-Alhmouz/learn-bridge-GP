import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Regular Login
  login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email); // Spring Security expects 'username' as parameter name
    body.set('password', password);

    return this.http.post(`${this.apiUrl}/login`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true // For session cookies
    });
  }

  // Registration
  register(userData: { name: string; email: string; password: string; role: string }) {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      withCredentials: true
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
