export enum IBloodTypes {
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-',
}

export interface ISpecialist {
  id: string;
  name: string;
  email: string;
  registry: string;
  phone: string;
  cell: string;
}