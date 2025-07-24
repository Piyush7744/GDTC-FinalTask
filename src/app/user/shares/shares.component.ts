import { Component, OnInit } from '@angular/core';
import { SharesService } from '../../services/shareService/shares.service';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css']
})
export class SharesComponent implements OnInit {
  shares1: any = [];
  shares: any = [];
  loading: boolean = true;
  constructor(private service: SharesService) { }

  ngOnInit(): void {
    console.log("Hello")
    this.service.fetchData().subscribe(data => {
      this.shares1 = data;
      this.shares = this.shares1.splice(0, 9);
      this.loading = false;
      console.log(this.shares1);
      console.log(this.shares)
    });
  }

  viewDetails(share: any) {
    this.service.currentShare = share;
  }
}
