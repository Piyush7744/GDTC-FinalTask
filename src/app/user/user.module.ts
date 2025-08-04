import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { CacheInterceptor } from '../interceptor/cache-interceptor.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: CacheInterceptor,
  //     multi: true
  //   }
  // ]
})
export class UserModule { }
