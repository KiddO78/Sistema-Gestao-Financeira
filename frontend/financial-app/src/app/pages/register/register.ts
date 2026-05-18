import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService
  ) {}

  register() {

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData)
      .subscribe({

        next: (response) => {

          console.log(response);

          alert('User registered successfully!');

        },

        error: (error) => {

          console.error(error);

          alert('Error during registration');

        }

      });

  }

}