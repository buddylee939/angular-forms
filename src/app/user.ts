export class User {
  // address: {
  //   street: string;
  //   city: string;
  //   state: string;
  //   postalCode: string;
  // };
  // name: string;
  // email: string;
  // phone: number;
  // timePreference: string;
  // subscribe: boolean;
  constructor(
    public name: string,
    public email: string,
    public phone: number,
    public topic: string,
    public timePreference: string,
    public subscribe: boolean
  ) {}
}
