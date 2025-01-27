import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from '../http-cache.service';


@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // pass along non-cacheable requests and invalidate cache  
        if (req.method !== 'GET') {
            //console.log(`Invalidating cache: ${req.method} ${req.urlWithParams}`);
            this.cacheService.invalidateCache();
            return next.handle(req);
        }

        // attempt to retrieve a cached response  
        const cachedResponse: HttpResponse<any> = this.cacheService.get(req.urlWithParams);

        // return cached response  
        if (cachedResponse) {
            //console.log(`Returning a cached response: ${cachedResponse.url}`);
            //console.log(cachedResponse);
            return of(cachedResponse);
        }

        // send request to server and add response to cache  
        return next.handle(req)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        //console.log(`Adding item to cache: ${req.url}`);
                        let taskURL = 'api/clients/tasks?';
                        if (req.urlWithParams.toLowerCase().includes(taskURL.toLowerCase())) {
                            //console.log(`Adding item to cache: ${req.urlWithParams}`);
                            this.cacheService.put(req.urlWithParams, event);
                        }
                        let boardViewURL = 'api/clients/tasks/folderview?';
                        if (req.urlWithParams.toLowerCase().includes(boardViewURL.toLowerCase())) {
                            //console.log(`Adding board view item to cache: ${req.urlWithParams}`);
                            this.cacheService.put(req.urlWithParams, event);
                        }
                        let taskDashboardURL = 'api/clients/taskDashboard?';
                        if (req.urlWithParams.toLowerCase().includes(taskDashboardURL.toLowerCase())) {
                            //console.log(`Adding task dashboard item to cache: ${req.urlWithParams}`);
                            this.cacheService.put(req.urlWithParams, event);
                        }
                        //let taskDashNotificationURl = 'api/tenants/me/audittrail?activityType=0&notificationType=';
                        //if (req.urlWithParams.toLowerCase().includes(taskDashNotificationURl.toLowerCase())) {
                        //    console.log(`Adding task dashboard item to cache: ${req.urlWithParams}`);
                        //    this.cacheService.put(req.urlWithParams, event);
                        //}
                        //let taskDashStatisticsURl = 'api/clients/taskstatistics?createdOnType=';
                        //if (req.urlWithParams.toLowerCase().includes(taskDashStatisticsURl.toLowerCase())) {
                        //    console.log(`Adding task dashboard item to cache: ${req.urlWithParams}`);
                        //    this.cacheService.put(req.urlWithParams, event);
                        //}
                    }
                })
            );

    }
}  