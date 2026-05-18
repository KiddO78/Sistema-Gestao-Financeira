import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  togglePassword() {
    this.showPassword =
      !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword =
      !this.showConfirmPassword;
  }

  hasMinLength() {
    return this.password.length >= 8;
  }

  hasUpperCase() {
    return /[A-Z]/.test(this.password);
  }

  hasLowerCase() {
    return /[a-z]/.test(this.password);
  }

  hasNumber() {
    return /[0-9]/.test(this.password);
  }

  hasSpecialCharacter() {
    return /[!@#$%^&*]/.test(this.password);
  }

  isFormValid() {

    return (

      this.name &&
      this.email &&
      this.password &&
      this.confirmPassword &&

      this.password === this.confirmPassword &&

      this.hasMinLength() &&
      this.hasUpperCase() &&
      this.hasLowerCase() &&
      this.hasNumber() &&
      this.hasSpecialCharacter()

    );

  }

  register() {

    if(!this.isFormValid()) {
      return;
    }

    console.log('Conta criada');

  }

}