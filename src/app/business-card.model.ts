export class BusinessCard {
  id: string = '0';
  name: string = '';
  jobTitle: string = '';
  email: string = '';
  countryCode: string = '';
  phoneNumber: string = '';
  phone: string = '';
  description: string = '';
  address: string = '';
  company: string = '';
  facebook: string = '';
  instagram: string = '';
  twitter: string = '';
  linkedin: string = '';
  github: string = '';

  constructor(options: Partial<BusinessCard>) {
    Object.assign(this, options);
    this.phone = this.countryCode + this.phoneNumber;
  }
}
