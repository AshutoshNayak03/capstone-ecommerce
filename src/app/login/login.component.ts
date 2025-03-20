import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    let errorMessages: string[] = [];

    if (!this.validateEmail(this.email)) {
      errorMessages.push('Invalid email format!');
    }
    if (this.password.length < 6) {
      errorMessages.push('Password must be at least 6 characters long!');
    }

    if (errorMessages.length > 0) {
      alert('Login Failed:\n' + errorMessages.join('\n')); // ✅ Show errors in alert box
      return;
    }

    this.authService.login(this.email, this.password).subscribe((users) => {
      if (users.length > 0) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        this.router.navigate(['/']); // Redirect to Home Page
        alert('Login Successfull!!!')
      } else {
        alert('Login Failed:\nInvalid email or password.'); // ✅ Show invalid credentials error
      }
    });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}