export interface User {
  displayName: string;
  email: string;
  phoneNumber: string;
  password?: string;    // if user sign in with provider don't need password
  photoURL?: string;
  enable?: boolean;
  emailVerified?: boolean;
  refreshToken?: string;
  roles?: Array<string>;
  uid?: string;
}
