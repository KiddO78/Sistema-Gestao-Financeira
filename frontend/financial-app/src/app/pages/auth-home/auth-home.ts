import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './auth-home.html',
  styleUrl: './auth-home.css'
})
export class AuthHomeComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const userData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userData)
      .subscribe({
        next: (response: any) => {

          if(response.success) {

            alert('Login successful');

            this.router.navigate(['/dashboard']);

          } else {

            alert(response.message);

          }

        },

        error: (error) => {
          console.error(error);
        }
      });

  }

}