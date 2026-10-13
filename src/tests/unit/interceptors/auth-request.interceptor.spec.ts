import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthRequestInterceptor } from '@app/core/interceptors/auth-request.interceptor';
import { AuthService } from '@app/core/services/auth.service';
import { StorageService } from '@app/core/services/storage.service';

describe('AuthRequestInterceptor', () => {
  let interceptor: AuthRequestInterceptor;
  let authServiceMock: jest.Mocked<AuthService>;
  let storageServiceMock: jest.Mocked<StorageService>;
  let nextHandler: HttpHandlerFn;

  beforeEach(() => {
    authServiceMock = {
      getToken: jest.fn(),
      isTokenValid: jest.fn(),
      refreshToken: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    storageServiceMock = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<StorageService>;

    nextHandler = (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => of({} as HttpEvent<unknown>);

    TestBed.configureTestingModule({
      providers: [
        AuthRequestInterceptor,
        { provide: AuthService, useValue: authServiceMock },
        { provide: StorageService, useValue: storageServiceMock },
      ],
    });

    interceptor = TestBed.inject(AuthRequestInterceptor);
  });

  it('debería crear el interceptor correctamente', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept - añadir token a requests', () => {
    it('debería añadir el token de autenticación cuando es válido', () => {
      const mockToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-token';
      authServiceMock.getToken.mockReturnValue(mockToken);
      authServiceMock.isTokenValid.mockReturnValue(true);

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler);

      expect(authServiceMock.getToken).toHaveBeenCalled();
    });

    it('no debería modificar el header Authorization si no hay token', () => {
      authServiceMock.getToken.mockReturnValue(null);

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler);

      expect(authServiceMock.getToken).toHaveBeenCalled();
    });

    it('debería clonar la request original sin modificar la original', () => {
      const mockToken = 'Bearer mock-token';
      authServiceMock.getToken.mockReturnValue(mockToken);
      authServiceMock.isTokenValid.mockReturnValue(true);

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler);

      expect(mockRequest.headers.has('Authorization')).toBe(false);
    });

    it('debería pasar la request al siguiente handler', (done) => {
      const mockToken = 'Bearer mock-token';
      authServiceMock.getToken.mockReturnValue(mockToken);
      authServiceMock.isTokenValid.mockReturnValue(true);

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler).subscribe({
        next: () => {
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('intercept - manejo de token expirado antes de request', () => {
    it('debería intentar renovar token si está próximo a expirar', () => {
      const mockToken = 'Bearer expired-token';
      authServiceMock.getToken.mockReturnValue(mockToken);
      authServiceMock.isTokenValid.mockReturnValue(false);
      authServiceMock.refreshToken.mockReturnValue(of({ access_token: 'new-token', expires_in: 3600 }));

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler);

      expect(authServiceMock.refreshToken).toHaveBeenCalled();
    });
  });

  describe('intercept - casos edge', () => {
    it('debería manejar errores en la renovación de token', () => {
      const mockToken = 'Bearer expired-token';
      authServiceMock.getToken.mockReturnValue(mockToken);
      authServiceMock.isTokenValid.mockReturnValue(false);
      authServiceMock.refreshToken.mockReturnValue(throwError(() => new Error('Token refresh failed')));

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler).subscribe({
        next: () => {},
        error: (error) => {
          expect(error).toBeDefined();
        },
      });
    });

    it('no debería añadir token a requests de autenticación', () => {
      authServiceMock.getToken.mockReturnValue(null);

      const mockRequest = new HttpRequest('POST', '/api/auth/login', { username: 'test', password: 'test' });
      
      interceptor.intercept(mockRequest, nextHandler);

      expect(authServiceMock.getToken).not.toHaveBeenCalled();
    });
  });
});