import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthResponseInterceptor } from '@app/core/interceptors/auth-response.interceptor';
import { AuthService } from '@app/core/services/auth.service';
import { StorageService } from '@app/core/services/storage.service';

describe('AuthResponseInterceptor', () => {
  let interceptor: AuthResponseInterceptor;
  let authServiceMock: jest.Mocked<AuthService>;
  let storageServiceMock: jest.Mocked<StorageService>;
  let nextHandler: HttpHandlerFn;

  beforeEach(() => {
    authServiceMock = {
      getToken: jest.fn(),
      logout: jest.fn(),
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
        AuthResponseInterceptor,
        { provide: AuthService, useValue: authServiceMock },
        { provide: StorageService, useValue: storageServiceMock },
      ],
    });

    interceptor = TestBed.inject(AuthResponseInterceptor);
  });

  it('debería crear el interceptor correctamente', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept - manejo de respuestas exitosas', () => {
    it('debería pasar las respuestas exitosas sin modificación', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/users');
      const mockResponse = of({} as HttpEvent<unknown>);
      
      const successHandler = jest.fn(() => mockResponse);

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: (event) => {
          expect(event).toBeDefined();
          done();
        },
        error: done.fail,
      });

      expect(successHandler).toHaveBeenCalledWith(mockRequest);
    });
  });

  describe('intercept - manejo de errores 401', () => {
    it('debería intentar renovar token en error 401', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/users');
      
      const errorResponse = new HttpErrorResponse({
        status: 401,
        statusText: 'Unauthorized',
        url: '/api/users',
      });

      const retryHandler = jest.fn(() => of({} as HttpEvent<unknown>));
      authServiceMock.refreshToken.mockReturnValue(of({ access_token: 'new-token', expires_in: 3600 }));

      const successHandler = jest.fn(() => throwError(() => errorResponse));

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: (event) => {
          done();
        },
        error: (error) => {
          done.fail('No debería entrar en error cuando la renovación es exitosa');
        },
      });
    });

    it('debería hacer logout si la renovación de token falla', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/users');
      
      const errorResponse = new HttpErrorResponse({
        status: 401,
        statusText: 'Unauthorized',
        url: '/api/users',
      });

      authServiceMock.refreshToken.mockReturnValue(throwError(() => new Error('Refresh failed')));

      const successHandler = jest.fn(() => throwError(() => errorResponse));

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: () => {
          expect(authServiceMock.logout).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('intercept - manejo de errores 403', () => {
    it('debería hacer logout en error 403 Forbidden', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/admin');
      
      const errorResponse = new HttpErrorResponse({
        status: 403,
        statusText: 'Forbidden',
        url: '/api/admin',
      });

      const successHandler = jest.fn(() => throwError(() => errorResponse));

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: () => {
          expect(authServiceMock.logout).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('intercept - otros errores', () => {
    it('debería propagar errores sin hacer logout para errores distintos a 401/403', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/users');
      
      const errorResponse = new HttpErrorResponse({
        status: 500,
        statusText: 'Internal Server Error',
        url: '/api/users',
      });

      const successHandler = jest.fn(() => throwError(() => errorResponse));

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: () => {
          expect(authServiceMock.logout).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('debería manejar errores de red correctamente', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/users');
      
      const errorResponse = new HttpErrorResponse({
        status: 0,
        statusText: 'Network Error',
        url: '/api/users',
      });

      const successHandler = jest.fn(() => throwError(() => errorResponse));

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: (error) => {
          expect(error).toBeDefined();
          done();
        },
      });
    });
  });
});