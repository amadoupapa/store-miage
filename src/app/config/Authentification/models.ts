export class RegisterDTO {
    login!: string; 
    firstName!: string;
    lastName!: string;
    email!: string;
    imageUrl: string='';
    activated: boolean = true;
    authorities: string[]=['ROLE_USER'];
    password!: string; 
  }

  export interface LoginDTO{
    username: string,
    password: string,
    rememberMe: true
  }
  export interface LoginResponse{
    id_token:string
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
  }