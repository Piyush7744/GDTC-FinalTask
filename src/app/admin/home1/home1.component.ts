import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {
  loading:boolean = true;
  dataSource: any = new MatTableDataSource<any>();
  displayedColumns: string[] = ['order_id', 'date', 'email', 'symbol', 'total','type'];
  constructor(private service: AdminService) { }

  ngOnInit(): void {
    this.service.getOrderData().subscribe(data => {
      this.dataSource.data = data;
      this.loading = false;
      console.log(this.dataSource.data);
    })
  }
}
