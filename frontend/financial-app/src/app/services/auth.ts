import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:8000/routes';

  constructor(private http: HttpClient) { }

  register(userData: any) {
    return this.http.post(
      `${this.apiUrl}/register.php`,
      userData
    );
  }
}