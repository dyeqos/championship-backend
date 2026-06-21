export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  birthDate: string | null;
  age?: number | null;
  numberIdentifier?: number;
}
