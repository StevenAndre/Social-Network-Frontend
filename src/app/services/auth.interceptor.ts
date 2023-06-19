import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService,private router:Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.loginService.getToken();

    if (token) {
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
     // console.log(authReq);

      return next.handle(authReq).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {

          
      

            // La respuesta es un HttpResponse exitoso
          //  console.log('Response bien :', event);
           // console.log('Status code bueno:', event.status);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          // La respuesta es un HttpErrorResponse con error
         // console.log('Error:', error);

          if (error.status==401) {
            if (error.error.tokenExpired) {
              Swal.fire("Error en la sesion","Lo sentimos tu token ah expirado, vuelve a iniciar sesion",'error');
              this.loginService.logout();
              this.router.navigate(['/login']);
            }else{
              Swal.fire("Error en la sesion","Lo sentimo hay un error en tu sesion, vuelve a iniciar sesion",'error');
              this.loginService.logout();
              this.router.navigate(['/login']);
            }

           
          }
          
          


          console.log('Status code:', error.status);

          return throwError(() => new Error("error en la respuesta del servidor"));
        })
      );
    
    }

   

    return next.handle(request);
  }
}
