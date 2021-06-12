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


interface IBloodType{
  id: string;
  typeOf: string;
}

export interface IAddress{
  id: string;
  city: string;
  state: string;
  street: string;
  district: string;
  numberOf: string;
  postcode: string;
}

export interface IClient {
  id: string;
  cpf: string;
  name: string;
  phone: string;
  email: string;
  address: IAddress;
  bloodtype: IBloodType;
}

export interface ISpecialist {
  id: string;
  name: string;
  email: string;
  registry: string;
  phone: string;
  cell: string;
}
