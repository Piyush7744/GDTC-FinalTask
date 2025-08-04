import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SharesService, ShareInfo } from '../../services/shareService/shares.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css']
})
export class SharesComponent implements OnInit{
  shares: ShareInfo[] = [];
  shares9:ShareInfo[] = [];
  FilteredShares:ShareInfo[] = [];
  loading: boolean = true;
  allData: boolean = false;
  page: number = 1;
  pageSize: number = 12;
  public searchText = "";
  filteredLength = 0;
  constructor(private service: SharesService, private router : Router) { }

  ngOnInit(): void {
    this.service.fetchData().subscribe(data => {
      this.shares = data;
      this.shares9 = this.shares.splice(0,9);
      this.loading = false;
      console.log(this.allData)
    });
  }

  viewDetails(share: any) {
    this.service.currentShare = share;
    this.router.navigate([`shareDetails/${share.symbol}`])
  }

  viewAllShares() {
    this.allData = !this.allData;
  }

  getFilteredShares(): ShareInfo[] {
    if (!this.searchText.trim()) {
      return [];
    }
    const text = this.searchText.toLowerCase();
    const filtered = this.shares.filter((share: ShareInfo) =>
      share.meta.companyName.toLowerCase().includes(text) ||
      share.symbol.toLowerCase().includes(text)
    );
    this.filteredLength = filtered.length;
    return filtered;
  }

  get paginatedShares() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.shares.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.shares.length / this.pageSize);
  }

  get totalItems() {
    return this.shares.length;
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
  }

}
