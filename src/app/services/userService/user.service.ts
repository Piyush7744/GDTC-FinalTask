import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

export interface User {
  name: string,
  email: string,
  aadhar: string,
  balance: number,
  birth_date: string
}

interface RegisterUser extends User {
  balance: number
}

interface TokenPayload {
  sub: string;
  role: string;
  exp: number;
}

export interface Order{
  name: string,
  price: number,
  quantity: number,
  total: number,
  symbol: string,
  order_date: string,
  Otype: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private apiUrl = 'http://localhost:8000/';
    userData: User = {
    name: "",
    email: "",
    aadhar: "",
    balance: 0,
    birth_date: ""
  };


  constructor(private http: HttpClient, private router: Router) { }


  public status = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getStatus(): Observable<boolean> {
    return this.status.asObservable();
  }

  register(userData: RegisterUser) {
    return this.http.post(`${this.apiUrl}register`, userData);
  }

  login(data: any): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', data.username);
    body.set('password', data.password);

    return this.http.post(`${this.apiUrl}login`,
      body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    ).pipe(
      tap((res: any) => {
        localStorage.setItem("token", res.access_token);
        this.status.next(true)
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode<TokenPayload>(token);
          const value = decoded.exp * 1000;
          if (decoded.role === "admin") {
            localStorage.setItem("role", decoded.role);
            this.router.navigate(['/admin/allOrders']);
          } else {
            localStorage.setItem("role", decoded.role);
            this.router.navigate(['']);
          }
        }
      })
    )
  }
  logOut() {
    localStorage.clear();
    this.status;
    this.userData = {
      name: "",
      email: "",
      aadhar: "",
      balance: 0,
      birth_date: ""
    };
    this.router.navigate(['/login']);
  }


  getUserData() {
    this.http.get<User>(`${this.apiUrl}user/`).subscribe(data => {
      this.userData = data;
    })
  }

  getUser() {
    return this.http.get<User>(`${this.apiUrl}user/`);
  }

  getUserOrders() {
    return this.http.get<Order[]>(`${this.apiUrl}userOrders`);
  }

  getUserShares() {
    return this.http.get<Order[]>(`${this.apiUrl}userShares`);
  }

  updateBalance(newBalance: number) {
    return this.http.put(`${this.apiUrl}user/balance`, { balance: newBalance });
  }

 public isTokenExpired() {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      const expiry = decoded.exp * 1000;
      return expiry > Date.now();
    }
    return false;
  }
}