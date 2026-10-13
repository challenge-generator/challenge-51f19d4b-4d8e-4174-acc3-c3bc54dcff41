import { Component, OnInit, OnDestroy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { Subject, takeUntil, finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule,
    ErrorMessageComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = signal(false);
  hidePassword = signal(true);
  errorMessage = signal<string | null>(null);
  rememberMe = signal(false);
  
  emailValidationError = computed(() => {
    const email = this.loginForm?.get('email');
    if (email?.hasError('required') && email?.touched) {
      return 'El correo electrónico es requerido';
    }
    if (email?.hasError('email') && email?.touched) {
      return 'Por favor ingresa un correo electrónico válido';
    }
    return null;
  });
  
  passwordValidationError = computed(() => {
    const password = this.loginForm?.get('password');
    if (password?.hasError('required') && password?.touched) {
      return 'La contraseña es requerida';
    }
    if (password?.hasError('minlength') && password?.touched) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    return null;
  });
  
  private destroy$ = new Subject<void>();
  
  private readonly MIN_PASSWORD_LENGTH = 8;
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000;
  
  private loginAttempts = 0;
  private lockoutEndTime = 0;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    effect(() => {
      const isAuthenticated = this.authService.isAuthenticated$();
      if (isAuthenticated) {
        this.handleSuccessfulLogin();
      }
    });
  }
  
  ngOnInit(): void {
    this.initializeForm();
    this.checkExistingSession();
    this.setupAutoLogoutListener();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]],
      rememberMe: [false]
    });
  }
  
  private checkExistingSession(): void {
    const savedEmail = this.storageService.get('saved_email');
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail, rememberMe: true });
    }
  }
  
  private setupAutoLogoutListener(): void {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => {
        if (!isAuth && this.authService.getToken()) {
          this.handleSessionExpired();
        }
      });
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }
    
    if (this.isLockedOut()) {
      this.handleLockout();
      return;
    }
    
    this.performLogin(this.loginForm.value);
  }
  
  private performLogin(credentials: LoginForm): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    
    this.authService.login({
      email: credentials.email,
      password: credentials.password
    })
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (response) => {
        this.handleLoginSuccess(response, credentials);
      },
      error: (error) => {
        this.handleLoginError(error);
      }
    });
  }
  
  private handleLoginSuccess(response: any, credentials: LoginForm): void {
    this.loginAttempts = 0;
    
    if (credentials.rememberMe) {
      this.storageService.set('saved_email', credentials.email);
    } else {
      this.storageService.remove('saved_email');
    }
    
    this.showNotification('Bienvenido de nuevo', 'success');
    this.navigateToDashboard();
  }
  
  private handleLoginError(error: any): void {
    this.loginAttempts++;
    
    if (this.loginAttempts >= this.MAX_LOGIN_ATTEMPTS) {
      this.lockoutEndTime = Date.now() + this.LOCKOUT_DURATION;
      this.errorMessage.set('Has excedido el número máximo de intentos. Intenta de nuevo más tarde.');
      return;
    }
    
    const errorMsg = error?.error?.message || 'Credenciales incorrectas. Por favor intenta de nuevo.';
    this.errorMessage.set(errorMsg);
    this.showNotification(errorMsg, 'error');
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as any);
      }
    });
  }
  
  private isLockedOut(): boolean {
    return Date.now() < this.lockoutEndTime;
  }
  
  private handleLockout(): void {
    const remainingMinutes = Math.ceil((this.lockoutEndTime - Date.now()) / 60000);
    this.errorMessage.set(`Cuenta bloqueada. Intenta de nuevo en ${remainingMinutes} minutos.`);
    this.showNotification('Cuenta bloqueada temporalmente', 'error');
  }
  
  private handleSessionExpired(): void {
    this.showNotification('Tu sesión ha expirado. Por favor inicia sesión nuevamente.', 'warning');
  }
  
  private handleSuccessfulLogin(): void {
    this.navigateToDashboard();
  }
  
  private navigateToDashboard(): void {
    const returnUrl = this.getReturnUrl();
    this.router.navigateByUrl(returnUrl || '/dashboard');
  }
  
  private getReturnUrl(): string | null {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('returnUrl');
  }
  
  private showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: type === 'error' ? 0 : 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`]
    });
  }
  
  togglePasswordVisibility(): void {
    this.hidePassword.update(v => !v);
  }
  
  get f() {
    return this.loginForm.controls;
  }
  
  onRememberMeChange(checked: boolean): void {
    this.rememberMe.set(checked);
  }
}