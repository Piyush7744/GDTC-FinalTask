import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { SharesService } from 'src/app/services/shareService/shares.service';
import { User, UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  public searchText = "";
  loading:boolean=true;
  totalUser:number=0;
  totalShares:number=224;
  totalRevenue:number=0;
  allUser:User[]=[];
  allOrder:any=[];
  allContact:any=[];
  allData:any=[];
  combinedData:any=[];
  filteredData:any=[];
  constructor(private service : SharesService,private admin:AdminService){}

  ngOnInit(): void {
    this.admin.getUserData().subscribe(data=>{
      this.allUser=data;
      this.totalUser = this.allUser.length;
    })

    this.admin.getContacts().subscribe(data=>{
      this.allContact = data;
    })

    this.admin.getOrderData().subscribe(data =>{
      this.allOrder = data;
      this.getTotalRevenue();
    })

  }


  filtered(){
    console.log(this.searchText);
  }

  getTotalRevenue(){
    for(let i=0;i<this.allOrder.length;i++){
      this.totalRevenue += this.allOrder[i].total;
    }
    this.loading = false;
  }

}
