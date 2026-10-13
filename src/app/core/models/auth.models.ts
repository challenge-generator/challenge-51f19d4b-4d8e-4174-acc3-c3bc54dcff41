export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
  user: UserProfile;
}

export interface TokenData {
  sub: string;
  username: string;
  email?: string;
  roles: string[];
  permissions: string[];
  iat: number;
  exp: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  avatarUrl?: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthError {
  error: string;
  message: string;
  statusCode: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}