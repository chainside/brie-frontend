import { Company } from "../Company/api";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LogoutResponse {
  data: {
    statusCode?: number
  }
}

export interface LoginResponse {
  data: UserinfoInterface
}

export interface UserinfoInterface {

  statusCode?: number,
  message?: string,
  id?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  company: Company
}

