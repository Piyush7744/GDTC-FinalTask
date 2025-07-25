import { Component, OnInit } from '@angular/core';
import { SharesService ,ShareInfo} from '../../services/shareService/shares.service';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css']
})
export class SharesComponent implements OnInit {
  shares1: ShareInfo[] = [];
  shares: ShareInfo[] = [];
  loading: boolean = true;
  constructor(private service: SharesService) { }

  ngOnInit(): void {
    this.service.fetchData().subscribe(data => {
      this.shares1 = data;
      this.shares = this.shares1.splice(0, 9);
      this.loading = false;
    });
  }

  viewDetails(share: any) {
    this.service.currentShare = share;
  }
}
