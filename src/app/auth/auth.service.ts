import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { UserModel } from '../shared/user-model';

interface responseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;
  loggedIn: boolean = null;
  user: UserModel;
  name: string = null;
  alerted: string = 'yes';

  signup(email: string, password: string) {
    return this.http.post<responseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        environment.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  login(email: string, password: string) {
    return this.http.post<responseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        environment.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  sendUserData(idToken: string, displayName: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' +
        environment.apiKey,
      {
        idToken: idToken,
        displayName: displayName,
        photoUrl: null,
        deleteAttribute: null,
        returnSecureToken: true,
      }
    );
  }

  retrieveUserData(idToken: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' +
        environment.apiKey,
      {
        idToken: idToken,
      }
    );
  }

  logout() {
    localStorage.removeItem('users');
    localStorage.removeItem('userResData');
    localStorage.removeItem('alerted');
    this.loggedIn = false;
    this.clearLogoutTimer();
    this.router.navigate(['/login']);
  }

  autoLogout() {
    this.logout();
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userResData'));
    this.handleAuthentication(userData);
  }

  handleAuthentication(resData: responseData) {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            this.user = new UserModel(resData.email, resData.localId, resData.displayName, resData.idToken, expirationDate);
            localStorage.setItem('users', JSON.stringify(this.user));
            this.loggedIn = true;
            this.setLogoutTimer(Number(resData.expiresIn) * 1000);
          this.name = resData.displayName;
          this.router.navigate(['todo']);
          if(this.name && JSON.parse(localStorage.getItem('alerted')) !== 'yes'){
            setTimeout(() => {
              alert(`Welcome "${this.name}"`);
              localStorage.setItem('alerted', JSON.stringify(this.alerted));
            }, 2000);
          } else{
            return null;
          }
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.autoLogout()
    }, expirationDuration)
  }

  clearLogoutTimer() {
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  constructor(private http: HttpClient, private router: Router) {}
}
