import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResponseInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          // TODO: Procesar respuestas exitosas para extraer tokens de sesión o actualizarlos.
          // Ejemplo: Si la respuesta contiene un nuevo token, almacenarlo.
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // TODO: Manejar respuestas de error específicas (ej. 401, 403, 500).
        // Ejemplo: Redirigir a login si el token es inválido o expiró.
        return throwError(() => error);
      })
    );
  }
}