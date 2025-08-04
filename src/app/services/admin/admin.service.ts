import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../userService/user.service';


export interface Order {
  name: string,
  price: number,
  quantity: number,
  total: number,
  symbol: string,
  order_date: string,
  email:string,
  type:string
}

export interface Contact{
  name:string,
  company:string,
  phone:string,
  email:string,
  subject:string,
  message:string,
}

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit{
  private url = "http://localhost:8000/"
  constructor(private http :  HttpClient) { }

  ngOnInit(): void {
    
  }

  getUserData(){
    return this.http.get<User[]>(`${this.url}allUser`);
  }

  getOrderData(){
    return this.http.get<Order[]>(`${this.url}allOrders`);
  }

  getContacts(){
    return this.http.get<Contact[]>(`${this.url}allContact`);
  }

}
