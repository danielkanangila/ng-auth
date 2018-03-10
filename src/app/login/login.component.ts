import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loginError: string;

  constructor(private router: Router, public authService: AuthService) { 
    authService.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password, error => {
      this.loginError = error;
    });
  }

}
