import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree| Promise<boolean|UrlTree> | Observable<boolean|UrlTree> {
    if(this.authService.loggedIn) {
      this.authService.loggedIn = null;
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
  constructor(private authService: AuthService, private router: Router) {}
}
