import { TokenData } from '../models/auth.models';

export function decodeToken(token: string): TokenData | null {
  return null;
}

export function isTokenExpired(token: string): boolean {
  return true;
}

export function getTokenExpirationDate(token: string): Date | null {
  return null;
}

export function getTokenRemainingTime(token: string): number {
  return 0;
}

export function hasRole(token: string, role: string): boolean {
  return false;
}

export function hasAnyRole(token: string, roles: string[]): boolean {
  return false;
}

export function hasPermission(token: string, permission: string): boolean {
  return false;
}

export function formatTokenHeader(token: string): string {
  return `Bearer ${token}`;
}

export function validateTokenFormat(token: string): boolean {
  return false;
}