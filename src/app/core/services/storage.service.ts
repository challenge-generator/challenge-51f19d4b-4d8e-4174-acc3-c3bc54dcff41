import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;
  private useSessionStorage: boolean = false;

  constructor() {
    this.storage = localStorage;
  }

  setUseSessionStorage(useSession: boolean): void {
    this.useSessionStorage = useSession;
    this.storage = useSession ? sessionStorage : localStorage;
    this.migrateTokensIfNeeded();
  }

  private migrateTokensIfNeeded(): void {
    const sourceStorage = this.useSessionStorage ? localStorage : sessionStorage;
    const token = sourceStorage.getItem(TOKEN_KEY);
    if (token && !this.getToken()) {
      this.storage.setItem(TOKEN_KEY, token);
    }
    const refreshToken = sourceStorage.getItem(REFRESH_TOKEN_KEY);
    if (refreshToken && !this.getRefreshToken()) {
      this.storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    const expiry = sourceStorage.getItem(TOKEN_EXPIRY_KEY);
    if (expiry && !this.getTokenExpiry()) {
      this.storage.setItem(TOKEN_EXPIRY_KEY, expiry);
    }
  }

  setToken(token: string, expiresIn?: number): void {
    this.storage.setItem(TOKEN_KEY, token);
    if (expiresIn) {
      const expiryDate = new Date();
      expiryDate.setSeconds(expiryDate.getSeconds() + expiresIn);
      this.storage.setItem(TOKEN_EXPIRY_KEY, expiryDate.getTime().toString());
    }
  }

  getToken(): string | null {
    return this.storage.getItem(TOKEN_KEY);
  }

  setRefreshToken(token: string): void {
    this.storage.setItem(REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return this.storage.getItem(REFRESH_TOKEN_KEY);
  }

  getTokenExpiry(): number | null {
    const expiry = this.storage.getItem(TOKEN_EXPIRY_KEY);
    return expiry ? parseInt(expiry, 10) : null;
  }

  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    if (!expiry) {
      return true;
    }
    return Date.now() > expiry;
  }

  removeToken(): void {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.removeItem(TOKEN_EXPIRY_KEY);
  }

  removeRefreshToken(): void {
    this.storage.removeItem(REFRESH_TOKEN_KEY);
  }

  clear(): void {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.removeItem(REFRESH_TOKEN_KEY);
    this.storage.removeItem(TOKEN_EXPIRY_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  getStorageType(): string {
    return this.useSessionStorage ? 'sessionStorage' : 'localStorage';
  }

  setSecureItem(key: string, value: string): void {
    const encoded = btoa(encodeURIComponent(value));
    this.storage.setItem(key, encoded);
  }

  getSecureItem(key: string): string | null {
    const encoded = this.storage.getItem(key);
    if (!encoded) {
      return null;
    }
    try {
      return decodeURIComponent(atob(encoded));
    } catch {
      return null;
    }
  }
}