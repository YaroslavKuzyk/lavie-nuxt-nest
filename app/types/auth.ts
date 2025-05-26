export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  id: number;
  email: string;
  type: UserType;
}

export enum UserType {
  USER = "user",
  ADMIN = "admin",
}
