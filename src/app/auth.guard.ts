import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IsLoggedInService } from './is-logged-in.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private isLoggedSvc:IsLoggedInService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          // If the user is not authenticated, redirect to login page
          this.router.navigate(['/login']);
          return false;
        }
        this.isLoggedSvc.setAuthState(true)
        return true;
      })
    );
  }
}
