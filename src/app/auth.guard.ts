import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(): Observable<boolean> {
    // Store redirect URL for redirecting
    this.authService.redirectUrl = '/courses-list';
     return Observable.from(this.authService.authState)
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
           if (!authenticated) { this.router.navigate([ '/login' ]); }
      });
  }
}
