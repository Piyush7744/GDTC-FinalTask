// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpEventType
// } from '@angular/common/http';
// import { Observable} from 'rxjs';
// import { of , tap} from 'rxjs';
// import { CacheService } from '../services/cache/cache.service';

// @Injectable()
// export class CacheInterceptor implements HttpInterceptor {

//   constructor(private cache : CacheService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
//     if(request.method !== 'GET'){
//       return next.handle(request);
//     }

//     const cachedResponse = this.cache.get(request.url);
//     if(cachedResponse){
//       return of(cachedResponse);
//     }

//     return next.handle(request).pipe(
//       tap((event:HttpEvent<any>)=>{
//         if(event.type === HttpEventType.Response){
//           this.cache.put(request.url,event);
//         }
//       })
//     )
//   }
// }
