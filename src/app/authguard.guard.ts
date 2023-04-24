import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {



  constructor(private router: Router , private authserv : AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authserv.isLoggedIn$.pipe(
      tap(isLoggedIn => {
        if(!isLoggedIn)
        {
          console.log(isLoggedIn)
          this.router.navigate(['login']);
          
        }
      })
    );
  }
  
}
