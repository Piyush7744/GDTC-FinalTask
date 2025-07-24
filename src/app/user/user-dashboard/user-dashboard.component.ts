import { Component, OnInit } from '@angular/core';
import { UserService, Order } from '../../services/userService/user.service';
import { SharesService } from '../../services/shareService/shares.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: any = [];
  holdings: Order[] = [];
  order: Order[] = [];
  quantity: number[] = [];
  pricePrev: number[] = [];
  totalNow: number[] = [];
  totalPrev: number[] = [];
  pnl: number[] = [];
  TotalHolding:number=0;
  constructor(private service: UserService, private shares: SharesService) { }

  ngOnInit(): void {
    this.service.getUserShares().subscribe((data: Order[]) => {
      this.holdings = data;
      this.totalNow = this.holdings.map(t => t.total);
      console.log(this.totalNow);
      this.quantity = this.holdings.map(q => q.quantity);
      console.log(this.quantity);
      // console.log(data);
    })

    this.service.getUser().subscribe(data => {
      this.user = data;
      console.log(data);
    })

    this.service.getUserOrders().subscribe((data: Order[]) => {
      this.order = data;
      this.pricePrev = this.order.map(o => o.price);
      console.log(this.pricePrev);
      console.log("Calling function")
      this.profitAndLoss();
    })
  }

  sellShare(share: any) {
    const trimmed = { ...share };
    trimmed.symbol = trimmed.symbol.replace('.NS', '');
    this.shares.currentShare = trimmed;
  }

  profitAndLoss() {
    for (let i = 0; i < this.totalNow.length; i++){
      this.totalPrev[i] = this.pricePrev[i] * this.quantity[i];
      this.pnl[i] = this.totalNow[i] - this.totalPrev[i];
      this.TotalHolding = this.TotalHolding + this.totalNow[i];
    }
  }
}
