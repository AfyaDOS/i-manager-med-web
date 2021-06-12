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
  specialties: {
    id: string;
    specialty: string;
    text: string;
    created_at: string;
    updated_at: string;
  }[];
  address_id: {
    id: string;
    city: string;
    state: string;
    street: string;
    district: string;
    numberOf: string;
    postcode: string;
    created_at: string;
    updated_at: string;
  };

}
