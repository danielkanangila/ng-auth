import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor(public authService: AuthService, private router: Router) { 
    authService.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit() {
  }

  signup () {
    this.authService.signup(this.email, this.password, error => {
      this.error = error;
    });
  }
}
