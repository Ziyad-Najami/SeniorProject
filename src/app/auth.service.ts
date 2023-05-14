import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router: any;
  
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'user_auth';
  isLoggedIn$ = this._isLoggedIn.asObservable();
  user: UserModel | undefined;
  
  get token(): any 
  {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  
  constructor( private APIService : ApiService ,) 
  {
    //const token = localStorage.getItem('user_auth');
    this._isLoggedIn.next(!!this.token);
    
    this.user = this.getUser(this.token);
  }


  logincheckAuth(username: string, password: string) {
    return this.APIService.logincheck(username, password).pipe(
      tap((response: any) => {
        
        if (response.success === 1) {
          this._isLoggedIn.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.jwt);
          this.user = this.getUser(response.jwt);
        
        }
      }),
      catchError(() => {
        localStorage.removeItem('user_auth');
        this._isLoggedIn.next(false);
        return of(null);
      })
    );
  }
  

  private getUser(token: string): any {
    if (!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }



  logout() {
    localStorage.removeItem(this.TOKEN_NAME);
    this._isLoggedIn.next(false);
    this.user = undefined;
    this.router.navigate(['/']);
  }


  
}
