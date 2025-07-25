import { Component } from '@angular/core';
import { SharesService, ShareInfo } from '../../services/shareService/shares.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-all-shares',
  templateUrl: './all-shares.component.html',
  styleUrls: ['./all-shares.component.css']
})
export class AllSharesComponent {
  shares: ShareInfo[] = [];
  public searchText = ""
  page: number = 1;
  pageSize: number = 12;
  loading: boolean = true;

  constructor(private service: SharesService) { }

  ngOnInit(): void {
    this.service.fetchData().subscribe(data => {
      this.shares = data;
      this.loading = false;
    });
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

  viewDetails(data: ShareInfo) {
    this.service.currentShare = data;
  }
}


