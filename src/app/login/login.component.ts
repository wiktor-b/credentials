import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private toast: HotToastService,
    private router: Router,
    private passwordManagerService: PasswordManagerService
  ) {}
  onSubmit(values: any) {
    this.passwordManagerService
      .login(values.email, values.password)
      .then(() => {
        this.toast.success('Login Successful');
        this.router.navigate(['/site-list']);
      })
      .catch((err) => {
        this.toast.error('Error Logging In');
      });
  }
}
