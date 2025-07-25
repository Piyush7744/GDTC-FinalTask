import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/userService/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
    dataSource = new MatTableDataSource<User>();
    displayedColumns:string[]=['name','email','aadhar','balance'];
    constructor(private service : AdminService){}
  
    ngOnInit(): void {
      this.service.getUserData().subscribe(data=>{
        this.dataSource.data = data;
      })
    }
}
