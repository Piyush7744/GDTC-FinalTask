// import { Component, OnInit } from '@angular/core';
// import { forkJoin } from 'rxjs';
// import { AdminService } from 'src/app/services/admin/admin.service';
// import { SharesService } from 'src/app/services/shareService/shares.service';
// import { User, UserService } from 'src/app/services/userService/user.service';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css']
// })
// export class SearchComponent implements OnInit{
//   public searchText = "";
//   loading:boolean=true;
//   totalUser:number=0;
//   totalShares:number=224;
//   totalRevenue:number=0;
//   allUser:User[]=[];
//   allOrder:any=[];
//   allContact:any=[];
//   allData:any=[];
//   combinedData:any=[];
//   filteredData:any=[];
//   constructor(private service : SharesService,private admin:AdminService){}

//   ngOnInit(): void {
//     this.admin.getUserData().subscribe(data=>{
//       this.allUser=data;
//       this.totalUser = this.allUser.length;
//     })

//     this.admin.getContacts().subscribe(data=>{
//       this.allContact = data;
//     })

//     this.admin.getOrderData().subscribe(data =>{
//       this.allOrder = data;
//       this.getTotalRevenue();
//     })

//   }


//   filtered(){
//     console.log(this.searchText);
//   }

//   getTotalRevenue(){
//     for(let i=0;i<this.allOrder.length;i++){
//       this.totalRevenue += this.allOrder[i].total;
//     }
//     this.loading = false;
//   }

// }


import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { SharesService } from 'src/app/services/shareService/shares.service';
import { User, UserService } from 'src/app/services/userService/user.service';
import { forkJoin } from 'rxjs';
import { Order } from 'src/app/services/admin/admin.service';
import { Contact } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchText = "";
  loading: boolean = true;

  totalUser: number = 0;
  totalShares: number = 224;
  totalRevenue: number = 0;

  allUser: User[] = [];
  allOrder: Order[] = [];
  allContact: Contact[] = [];

  combinedData: any[] = [];
  filteredData: any[] = [];

  constructor(private service: SharesService, private admin: AdminService) { }

  ngOnInit(): void {

    let users = this.admin.getUserData();
    let contacts = this.admin.getContacts();
    let orders = this.admin.getOrderData();

    forkJoin([users, contacts, orders]).subscribe(([users, contacts, orders]) => {
      this.allUser = users ?? [];
      this.totalUser = this.allUser.length;

      this.allContact = contacts ?? [];
      this.allOrder = orders ?? [];

      this.getTotalRevenue();
      this.combineAllData();
      this.filteredData = [...this.combinedData];
      this.loading = false;
    });
  }

  combineAllData() {
    const userData = this.allUser.map(user => ({ stype: 'user', ...user }));
    const contactData = this.allContact.map(contact => ({ stype: 'contact', ...contact }));
    const orderData = this.allOrder.map(order => ({ stype: 'order', ...order }));

    this.combinedData = [...userData, ...contactData, ...orderData];

  }

  filtered() {
    const text = this.searchText.toLowerCase();

    this.filteredData = this.combinedData.filter(item => {
      const flat = this.flattenObject(item);
      return Object.values(flat).some(value =>
        value && value.toString().toLowerCase().includes(text)
      );
    });
  }


  flattenObject(obj: any, prefix = ''): Record<string, any> {
    let result: Record<string, any> = {};

    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(result, this.flattenObject(value, newKey));
      } else {
        result[newKey] = value;
      }
    }

    return result;
  }

  getTotalRevenue() {
    this.totalRevenue = this.allOrder.reduce((sum, order) => sum + (order.total || 0), 0);
  }
}