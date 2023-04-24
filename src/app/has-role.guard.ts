import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(private authservice : AuthService , private router : Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
     Observable<boolean | UrlTree> |
     Promise<boolean |  UrlTree> |
     boolean |
     UrlTree {

      const isAuthorized = this.authservice.user?.role.includes(route.data['role']);
      
      if (!isAuthorized) {
        // redirect
        // display a message
        //window.alert('you are not authorized');

        this.router.navigate(['notAuthorized']);

      }
  
      return isAuthorized || false;
    }
  }

  