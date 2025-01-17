
import { Component, OnInit } from '@angular/core';
import { AppState, AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { RedirectLoginOptions } from '@auth0/auth0-angular'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}
 
  ngOnInit() {
    // Check if the user is authenticated, and redirect to /home if true
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/home']); // Redirect to home if already authenticated
      }
    });

    // Handle the redirect callback after authentication
    this.auth.handleRedirectCallback().subscribe({
      next: (result) => {
        console.log('Login successful!', result);
        // After successful login, redirect to /home route
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed', error);
        // Optionally show an error message here if login fails
      }
    });
  }

      
  loginWithAuth0(): void {
    // Trigger login with redirect
    this.auth.loginWithRedirect();
  }
  // logout(): void {
  //   this.auth.logout({ logoutParams: { returnTo: 'https://create-event-app.netlify.app' } });
  // }
  logout(): void {
    try {
      this.auth.logout({
        logoutParams: {
        returnTo: "https://create-event-app.netlify.app/login",
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}

