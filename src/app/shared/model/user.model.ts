export class User {
  _id!: string;
  isVerified!: boolean;
  userRole: string = 'Student';

  username!: string;
  email!: string;
  password!: string;
  passwordConfirmation?: string; // Frontend only!

  affiliateCode?: string;
  stripe?: string;
}
