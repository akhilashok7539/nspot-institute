import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, timeout, catchError, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    // constructor(
    //     private spinner: NgxSpinnerService
    //  ) {}

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     this.spinner.show();
     
      
    //     return next.handle(req).pipe(tap(
          
    //         (event: HttpEvent<any>) => {
    //             if (event instanceof HttpResponse) {
    //                 console.log(HttpResponse);
                    
    //                 this.spinner.hide();
    //             }
          
    //         }

    //     ));
    // }
    constructor( private spinner: NgxSpinnerService ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        console.log('loadingg......NSPOT ADDMISSION');

        return next.handle(req).pipe(
         
            
            finalize(() =>   this.spinner.hide())
        );
    }
}
