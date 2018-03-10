import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  redirectUrl = '/';

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;

    this.user.subscribe((user) => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  /**
   * Signup user with email.
   * @param email of user
   * @param password of user
   * @param callback function if error
   */
  signup(email: string, password: string, callback) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        callback('Sommething went wrong: ' + err.message);
      });
  }

  /**
   * Login user with email and password.
   * @param email of user
   * @param password of user
   * @param callback function if error
   */
  login(email: string, password: string, callback) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigateByUrl(this.redirectUrl);
      })
      .catch(err => {
        callback('Something went wrong: ' + err.message);
      });
  }

  get isLoggedIn(): boolean {
    return this.userDetails !== null;
  }

  get authState() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth
      .auth
      .signOut()
      .then(() => {
        this.router.navigate(['login']);
      });
  }
}
