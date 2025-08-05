import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, take } from 'rxjs';

export interface ShareInfo {
  companyName: string;
  symbol: string;
  lastPrice: number;
  pChange: number;
  meta: {
    companyName: string;
  }
}

export interface ShareInformation {
  shortName: string,
  industry: string,
  dayLow: number,
  dayHigh: number,
  currentPrice: number,
  previousClose: number,
  volume: number,
  recommendationKey: string,
  longBusinessSummary: string,
  symbol: string
}

export interface Share {
  Date: string;
  Close: number;
  High: number;
  Low: number;
  Open: number;
  Volume: number;
}

@Injectable({
  providedIn: 'root'
})
export class SharesService implements OnInit {
  currentShare: ShareInfo = {
    companyName: "",
    symbol: "",
    lastPrice: 0,
    pChange: 0,
    meta: {
      companyName: ""
    }
  }
  private apiUrl = 'http://localhost:8000/';

  cachedShares$: Observable<Share[]> | undefined;
  cachedAllShares$:Observable<ShareInfo[]> | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  fetchData() {
    if(this.cachedAllShares$){
      return this.cachedAllShares$;
    }
    return this.cachedAllShares$ = this.http.get<ShareInfo[]>(this.apiUrl + "sharess").pipe(
      shareReplay(1),
      take(1)
    )
  }

  getData(symbol: string) {
    if(this.cachedShares$){
      return this.cachedShares$;
    }
    const baseUrl = `${this.apiUrl}shareDetails/${symbol}.NS`
    console.log("After return statement");
    return this.cachedShares$ = this.http.get<Share[]>(baseUrl).pipe(
      shareReplay(1),
      take(1)
    )
  }

  getInfo(symbol : string) {
    const baseUrl2 = `${this.apiUrl}shareInfo/${symbol}.NS`

    return this.http.get<ShareInformation>(baseUrl2)
  }

  order(s_id: string, quantity1: number, price1: number) {
    return this.http.post(`${this.apiUrl}order`, { sid: s_id, quantity: quantity1, price: price1 })
  }

  sell(s_id: string, quantity1: number, price1: number) {
    return this.http.post(`${this.apiUrl}sell`, { sid: s_id, quantity: quantity1, price: price1 })
  }

  contact(data: any) {
    return this.http.post(`${this.apiUrl}contact`, data);
  }
}
