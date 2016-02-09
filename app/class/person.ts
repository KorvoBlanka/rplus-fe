import {Organisation} from './organisation';

export interface Person {
  id: number,

  name: string,

  organisation: Organisation,

  agent_id: number,

  phone: any[],
  email: any[],

  info: string;

  add_date: number,
  change_date: number,
}
