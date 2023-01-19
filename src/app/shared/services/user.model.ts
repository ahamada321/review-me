export class User {
  _id?: string;
  isVerified?: boolean;
  userRole: string = 'Student';
  perMonth?: number;
  courseTime?: number;

  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string; // Frontend only!

  pendingTeachers!: User[];
  pendingStudents!: User[];
  teachers!: User[];
  students!: User[];

  affiliateCode?: string;
  stripe?: string;
}
