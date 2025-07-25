import { Component, OnInit } from '@angular/core';
import { UserService, Order, User } from '../../services/userService/user.service';
import { ShareInfo, SharesService } from '../../services/shareService/shares.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: User = {
    name: "",
    email: "",
    aadhar: "",
    balance: 0,
    birth_date: ""
  };
  holdings: Order[] = [];
  order: Order[] = [];
  quantity: number[] = [];
  pricePrev: number[] = [];
  totalNow: number[] = [];
  totalPrev: number[] = [];
  pnl: number[] = [];
  TotalHolding: number = 0;
  constructor(private service: UserService, private shares: SharesService) { }

  ngOnInit(): void {
    this.service.getUserShares().subscribe((data: Order[]) => {
      this.holdings = data;

      this.totalNow = this.holdings.map(t => t.total);

      this.quantity = this.holdings.map(q => q.quantity);
      this.service.getUserOrders().subscribe((data: Order[]) => {
        this.order = data;
        this.pricePrev = this.order.map(o => o.price);
        this.profitAndLoss();
      })

    })

    this.service.getUser().subscribe(data => {
      this.user = data;
    })

  }

  sellShare(share: string) {
    console.log(share);
    share = share.replace('.NS', '');
    this.shares.currentShare.symbol = share;
  }

  profitAndLoss() {
    for (let i = 0; i < this.totalNow.length; i++) {
      this.totalPrev[i] = this.pricePrev[i] * this.quantity[i];
      this.pnl[i] = this.totalNow[i] - this.totalPrev[i];
      this.TotalHolding = this.TotalHolding + this.totalNow[i];
    }
  }
}
