export interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  phoneNumber: string;
}
