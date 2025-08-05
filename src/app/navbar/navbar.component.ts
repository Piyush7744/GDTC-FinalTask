import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged: boolean = false;
  public balance: number = 0;
  userData: User = {
    name: "",
    email: "",
    aadhar: "",
    balance: 0,
    birth_date: ""
  };
  userLogged: boolean = false;
  adminLogged: boolean = false;
  toggle: boolean = false;
  constructor(private user: UserService) {
  }

  ngOnInit(): void {
    if ((localStorage.getItem("token")) && (this.user.getRole() == "user")) {
      this.userLogged = true;
      console.log("Inside user")
      this.user.getUser().subscribe(data => {
        this.userData = data;
        this.balance = this.userData.balance;

      })
    } else if ((localStorage.getItem("token")) && (this.user.getRole() == "admin")) {
      console.log("Inside admin");
      this.adminLogged = true;
    }

    this.user.getStatus().subscribe(data => {
      this.logged = data;
    })

  }


  logout() {
    this.logged = false;
    this.userLogged = false;
    this.adminLogged = false;
    this.user.logOut();
  }

  toggled() {
    this.toggle = !this.toggle;
  }

}
