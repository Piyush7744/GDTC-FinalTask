import { Component } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: "",
    password: ""
  }
  constructor(private service: UserService, private router: Router) { }
  login() {
    this.service.login(this.loginData).subscribe({
      next: (res) => {
        console.log("User Logged in", res)
        localStorage.setItem('token', res.access_token);
        this.service.isLoggedIn();
      },
      error: (err) => console.error('Error during logging', err)
    })
  }
}
