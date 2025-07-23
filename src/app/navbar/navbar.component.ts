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
  toggle:boolean = false;
  constructor(private service: UserService, private user: UserService) {
  }

  ngOnInit(): void {
    this.user.getUser().subscribe(data => {
      this.userData = data;
    })
    this.service.getStatus().subscribe(data=>{
      this.logged = data;
    })

  }


  logout() {
    this.logged = false;
    this.service.logOut();
  }

  toggled(){
    this.toggle = !this.toggle;
  }

}
