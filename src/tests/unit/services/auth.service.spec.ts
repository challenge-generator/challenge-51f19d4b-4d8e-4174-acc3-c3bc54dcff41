import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@app/core/services/auth.service';
import { StorageService } from '@app/core/services/storage.service';
import { AuthToken, LoginCredentials } from '@app/core/models/auth.models';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storageServiceMock: jest.Mocked<StorageService>;

  const mockToken: AuthToken = {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    token_type: 'Bearer',
  };

  const mockCredentials: LoginCredentials = {
    username: 'testuser',
    password: 'testpassword',
  };

  beforeEach(() => {
    storageServiceMock = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<StorageService>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: StorageService, useValue: storageServiceMock },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('debería realizar login correctamente y guardar el token', (done) => {
      service.login(mockCredentials).subscribe({
        next: (token) => {
          expect(token).toEqual(mockToken);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCredentials);
      req.flush(mockToken);
    });

    it('debería guardar el token en el storage después del login', (done) => {
      service.login(mockCredentials).subscribe({
        next: () => {
          expect(storageServiceMock.set).toHaveBeenCalledWith('token', mockToken.access_token);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('/api/auth/login');
      req.flush(mockToken);
    });

    it('debería manejar errores de login correctamente', (done) => {
      service.login(mockCredentials).subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: (error) => {
          expect(error.status).toBe(401);
          done();
        },
      });

      const req = httpMock.expectOne('/api/auth/login');
      req.flush('Invalid credentials', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('logout', () => {
    it('debería limpiar el token del storage al hacer logout', () => {
      storageServiceMock.get.mockReturnValue('mock-token');
      
      service.logout();

      expect(storageServiceMock.remove).toHaveBeenCalledWith('token');
    });

    it('debería limpiar el refresh token del storage al hacer logout', () => {
      storageServiceMock.get.mockReturnValue('mock-token');
      
      service.logout();

      expect(storageServiceMock.remove).toHaveBeenCalledWith('refresh_token');
    });

    it('debería actualizar el estado de autenticación después del logout', () => {
      storageServiceMock.get.mockReturnValue('mock-token');
      
      service.logout();

      service.isAuthenticated$.subscribe((isAuth) => {
        expect(isAuth).toBe(false);
      });
    });
  });

  describe('refreshToken', () => {
    it('debería renovar el token correctamente', (done) => {
      service.refreshToken().subscribe({
        next: (token) => {
          expect(token).toEqual(mockToken);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('/api/auth/refresh');
      expect(req.request.method).toBe('POST');
      req.flush(mockToken);
    });

    it('debería guardar el nuevo token después de la renovación', (done) => {
      service.refreshToken().subscribe({
        next: () => {
          expect(storageServiceMock.set).toHaveBeenCalledWith('token', mockToken.access_token);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('/api/auth/refresh');
      req.flush(mockToken);
    });

    it('debería manejar errores al renovar token', (done) => {
      service.refreshToken().subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: (error) => {
          expect(error.status).toBe(401);
          done();
        },
      });

      const req = httpMock.expectOne('/api/auth/refresh');
      req.flush('Token expired', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('getToken', () => {
    it('debería obtener el token del storage', () => {
      storageServiceMock.get.mockReturnValue('mock-token');
      
      const token = service.getToken();

      expect(token).toBe('mock-token');
      expect(storageServiceMock.get).toHaveBeenCalledWith('token');
    });

    it('debería retornar null si no hay token', () => {
      storageServiceMock.get.mockReturnValue(null);
      
      const token = service.getToken();

      expect(token).toBeNull();
    });
  });

  describe('isTokenValid', () => {
    it('debería retornar true si el token es válido', () => {
      storageServiceMock.get.mockReturnValue('mock-token');
      
      const isValid = service.isTokenValid();

      expect(isValid).toBe(true);
    });

    it('debería retornar false si no hay token', () => {
      storageServiceMock.get.mockReturnValue(null);
      
      const isValid = service.isTokenValid();

      expect(isValid).toBe(false);
    });

    it('debería retornar false si el token está expirado', () => {
      storageServiceMock.get.mockReturnValue('expired-token');
      
      const isValid = service.isTokenValid();

      expect(isValid).toBe(false);
    });
  });
});