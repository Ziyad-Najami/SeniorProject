import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  toggleNav() {
    const navElement = document.getElementById('navbarNav');
    if (navElement) {
      navElement.classList.toggle('show');
    }
  }

  LogOut() {
    localStorage.removeItem('user_auth');
    this.router.navigate(['/login']);
    this.authService.logout();
  }
}
