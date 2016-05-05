
export class User {
  id: string;
  role: string = 'agent';
  manager_id: string;

  name: string;
  photo: string;
  phone: any[];
  email: any[];

  description: string;

  add_date: number;
  change_date: number;
}
