import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private passwordManagerService: PasswordManagerService,
    private router: Router
  ) {}

  onLogout() {
    this.passwordManagerService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
