import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { IsLoggedInService } from '../is-logged-in.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent {
  isLoggedIn=false;

  ngOnInit(){
    this.isLoggedSvc.isLogginIn$.subscribe((state)=>{
     this.isLoggedIn=state
    })
  }
  constructor(
     private auth:AuthService,
     private isLoggedSvc:IsLoggedInService){

  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin + '/login' } });
    this.isLoggedSvc.setAuthState(false);

  }
}
