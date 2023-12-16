export class RegisterDTO {
  login!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  imageUrl: string = '';
  activated: boolean = true;
  authorities: string[] = ['ROLE_USER'];
  password!: string;
}

export interface LoginDTO {
  username: string;
  password: string;
  rememberMe: true;
}
export interface LoginResponse {
  id_token: string;
}

//reponse apres creation de compte
export interface User {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  activated: boolean;
  langKey: string;
  imageUrl: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  resetDate: string;
  authorities: string[]
}

export interface RegisterErrorResponse {
  type: string;
  title: string;
  status: 400;
  detail: string;
  instance: string;
  message: string;
  path: string;
  fieldErrors: [
    {
      objectName: string;
      field: string;
      message: string;
    }
  ];
}

export interface UserDataStorage{
  token: string,
          user_id: number,
          login: string,
          firstname: string,
          lastname: string,
          estAdmin: boolean,
}
