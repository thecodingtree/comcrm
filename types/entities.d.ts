type Attribute = {
  name: string;
  value: string;
};

type Address = {
  id: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type Company = {
  id: string;
  name: string;
  address?: Address;
  attributes?: Attribute[];
  //user: User;
  createdAt?: Date;
  updatedAt?: Date;
};

type Property = {
  id: string;
  name: string;
  address?: Address;
  attributes?: Attribute[];
  //user: User
  createdAt?: Date;
  updatedAt?: Date;
};

type Contact = {
  id: string;
  name: string;
  surName?: string;
  address: Address;
  attributes: Attribute[];
  //user: User
  createdAt: Date;
  updatedAt: Date;
};
