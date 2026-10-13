import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private storageService = inject(StorageService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // TODO: Implementar la lógica para añadir el token de sesión a las solicitudes salientes.
    // Debe verificar si el token existe y está válido antes de añadirlo a los headers.
    // En caso de token expirado, debe manejar la renovación del token antes de proceder.
    // Solo añadir el token a rutas que no sean de autenticación (evitar loops).
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // TODO: Manejar errores específicos de autenticación (ej. 401, 403)
        return throwError(() => error);
      })
    );
  }
}