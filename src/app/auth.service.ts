import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private authStatus= new BehaviorSubject<boolean>(false);
  public isLogginIn$ = this.authStatus.asObservable(); 


  setAuthState(state: boolean) {
    this.authStatus.next(state);
  }

  isLoggedIn(): boolean {
    return this.authStatus.value;
  }
}
