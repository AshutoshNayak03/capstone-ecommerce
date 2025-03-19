import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    mobile: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    let errorMessages: string[] = [];

    if (!this.user.firstName) errorMessages.push('First Name is required!');
    if (!this.user.lastName) errorMessages.push('Last Name is required!');
    if (!this.validateEmail(this.user.email)) errorMessages.push('Invalid email format!');
    if (this.user.password.length < 6) errorMessages.push('Password must be at least 6 characters!');
    if (this.user.password !== this.user.confirmPassword) errorMessages.push('Passwords do not match!');
    if (!/^[0-9]{10}$/.test(this.user.mobile)) errorMessages.push('Mobile number must be 10 digits!');

    if (errorMessages.length > 0) {
      alert('Registration Failed:\n' + errorMessages.join('\n')); // ✅ Show detailed errors in alert box
      return;
    }

    this.authService.register(this.user).subscribe(() => {
      alert('Registration successful! Please log in.');
      this.router.navigate(['/login']);
    });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
