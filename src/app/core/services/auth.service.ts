import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthToken } from '../models/auth.models';
import { StorageService } from './storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private readonly TOKEN_KEY = 'auth_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(credentials: { username: string; password: string }): Observable<AuthToken> {
    // TODO: Implementar la lógica de login.
    // Debe realizar una solicitud HTTP al endpoint de autenticación.
    // Almacenar el token recibido y actualizar el estado de autenticación.
    return this.http.post<AuthToken>('/api/auth/login', credentials).pipe(
      tap((token) => {
        this.storageService.setItem(this.TOKEN_KEY, token.accessToken);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    // TODO: Implementar la lógica de logout.
    // Eliminar el token de sesión y actualizar el estado de autenticación.
    this.storageService.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  refreshToken(): Observable<AuthToken> {
    // TODO: Implementar la lógica de renovación de token.
    // Debe realizar una solicitud HTTP al endpoint de renovación.
    // Almacenar el nuevo token y mantener el estado de autenticación.
    return this.http.post<AuthToken>('/api/auth/refresh', {}).pipe(
      tap((token) => {
        this.storageService.setItem(this.TOKEN_KEY, token.accessToken);
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    // TODO: Implementar la lógica para obtener el token almacenado.
    // Verificar si el token existe y está válido antes de retornarlo.
    return this.storageService.getItem(this.TOKEN_KEY);
  }

  isTokenValid(): boolean {
    // TODO: Implementar la lógica para verificar si el token es válido.
    // Usar jwt-decode para extraer la fecha de expiración y compararla con la fecha actual.
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
    } catch {
      return false;
    }
  }
}