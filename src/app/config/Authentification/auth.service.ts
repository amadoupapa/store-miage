import { Injectable } from '@angular/core';
import { LoginDTO, LoginResponse, RegisterDTO, RegisterErrorResponse, User } from './models';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ClientService } from 'src/app/services/client.service';
import { ClientAll, CreateClientDto } from 'src/app/models/models';
import { AppConfig } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private baseUrl = AppConfig.BASE_URL;
  public token = '';
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );
  //Observable pour partager etat de connexion du user
  private estSujetConnecte = new BehaviorSubject<boolean>(false);
  public estConnecte: Observable<boolean> =
    this.estSujetConnecte.asObservable();

  setEtatAuth(status: boolean) {
    this.estSujetConnecte.next(status);
  }
  estUserConnecte(): boolean {
    return this.estSujetConnecte.value;
  }


  constructor(private http: HttpClient, private clientService: ClientService, private router:Router) {}
  register(registerDto: RegisterDTO, clientDto: CreateClientDto) {
    //CREE D'ABORD UN USER
    this.http
      .post<User>(`${this.baseUrl}/api/register`, registerDto)
      .subscribe({
        next: (r) => {
          var credential = {
            username: registerDto.login,
            password: registerDto.password,
            rememberMe: true,
          };
          //CONNECTER DIRECTEMENT USER ET OBTENIR UN TOKEN
          this.login(credential);
          //ENSUITE CREER LE CLIENT AVEC INFO SUPPLEMENTAIRES
          console.log('creation user reussi ',r);
          this.clientService.createClient(clientDto,r);

          this.router.navigate(['login'])
          
        },
        error(err) {
          //alert(err.body);
          console.log(err);
        },
      });
  }

  login(credentials: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/api/authenticate`, credentials)
      .subscribe({
        next: (r) => {
          localStorage.setItem('token', r.id_token);

          this.token = r.id_token;
          this.getUserInfo();
          this.setEtatAuth(true)

          this.router.navigate([''])
          
          //alert('Token' + r.id_token);
        },
        error(err: HttpErrorResponse) {
          alert(err.message);
        },
      });
  }
  getUserInfo() {
    return this.http
      .get<User>(this.baseUrl + '/api/account', { headers: this.headers })
      .subscribe((v) => {
        localStorage.setItem('user_id', v.id.toString());
        localStorage.setItem('login', v.login.toString());
        localStorage.setItem('username', v.login);
        localStorage.setItem('firstname', v.firstName);
        localStorage.setItem('lastname', v.lastName);
        alert('login depuis local '+ localStorage.getItem('login'));
        this.getClientByUserId(v.id)
        console.log('info obtenu est ', v);
      });

 
  }
  
  getClientByUserId(user_id:number){
    return this.http.get<ClientAll>(this.baseUrl+'/api/clients/user/'+user_id,{headers:this.headers}).subscribe((v)=>{
      localStorage.setItem('client_id',v.id.toString())
       console.log('info sur le client est ',v)
    })
  }
  clearLocal(){
  localStorage.clear()
  }
  
}

