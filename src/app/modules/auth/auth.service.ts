import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth'; // Backend API for auth
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Login the user
   * @param email 
   * @param password 
   */
  apiResponse:any='';

  login(userData:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      }),
    //  catchError(this.handleError('login', []))
    );
  }

  // login(userData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, userData)
  // }
  

  /**
   * Signup a new user
   * @param email 
   * @param password 
   */


  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  /**
   * Logout the user
   */
  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']);
  }

  /**
   * Check if the user is logged in by validating the token
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null; 
  }

  /**
   * Set the authentication token
   * @param token 
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Get the authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Remove the authentication token
   */
  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('role')
  }

  /**
   * Handle HTTP operation failures
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}