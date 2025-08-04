import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './services/userService/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  constructor(public service: UserService) { }

  ngOnInit(): void {
    if (this.service.isTokenExpired()) {
      console.log("Expiration time is remaining");
    } else {
      console.log("Expiration time is over");
      this.service.logOut();
    }
  }
}
