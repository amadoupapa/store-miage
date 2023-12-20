import { Injectable } from '@angular/core';
import { LoginResponse, RegisterDTO, User, UserDataStorage } from './models';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { ClientService } from 'src/app/services/client.service';
import { ClientAll, CreateClientDto } from 'src/app/models/models';
import { AppConfig } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = AppConfig.BASE_URL;

  public userData!: UserDataStorage;
  public estAdmin = false;

  //Observable pour partager etat de connexion du user
  private estSujetConnecte = new BehaviorSubject<boolean>(false);
  public estConnecte: Observable<boolean> =
    this.estSujetConnecte.asObservable();

  setEtatAuth(status: boolean) {
    this.estSujetConnecte.next(status);
  }

  initHeaders(token: string) {
    console.log('le token obtenu sans refresh est ', token);
    // console.log('init token apres login', this.headers);
    console.log('le token decode contient ', jwtDecode(token));
    this.getUserInfo(token);
  }

  
  constructor(
    private http: HttpClient,
    private clientService: ClientService,
    private router: Router,
    private location:Location
   
   
    
  ) {}
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
          console.log('creation user reussi ', r);
          this.clientService.createClient(clientDto, r);

          this.router.navigate(['login']);
          
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

          this.initHeaders(r.id_token);

          this.setEtatAuth(true);
          //stockage data user
          this.router.navigate(['']);
         
          
          
          //  this.getUserInfo(r.id_token);

          //alert('Token' + r.id_token);
          
        },

        error:(err: HttpErrorResponse)=> {
          if(err.status==401)
          alert("Connexion impossible. Verifier vos informations");
        else alert(err.message);
        },
      });
  }
  logout() {
    if (confirm('Confirmez la deconnexion')) {
      this.clearLocal();
      localStorage.clear();
      this.setEtatAuth(false);
      
      this.router.navigate(['']);
      location.reload()
      //recharcher la page pour bien vider les tokens

    }
  }

  getUserInfo(token: string) {
    var v_headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<User>(this.baseUrl + '/api/account', { headers: v_headers })
      .subscribe((v) => {
        localStorage.setItem('user_id', v.id.toString());
        localStorage.setItem('login', v.login.toString());
        localStorage.setItem('username', v.login);
        localStorage.setItem('firstname', v.firstName);
        localStorage.setItem('lastname', v.lastName);
        this.getClientByUserId(v.id, v_headers);
        console.log('toutes les infos obtenues sont ', v);
        v.authorities.forEach((r) => {
          if (r.valueOf() == 'ROLE_ADMIN') {
            this.estAdmin = true;
            alert('Connecte en tant que admin');
          }
        });
        this.setEtatAuth(true);
        this.userData = {
          token: token,
          user_id: v.id,
          login: v.login,
          firstname: v.firstName,
          lastname: v.lastName,
          estAdmin: this.estAdmin,
        };
        localStorage.setItem('userData', JSON.stringify(this.userData));
        console.log(
          'le vrai localstorage de userData stocke est :',
          localStorage.getItem('userData')
        );
      });
  }

  getClientByUserId(user_id: number, v_headers: HttpHeaders) {
    return this.http
      .get<ClientAll>(this.baseUrl + '/api/clients/user/' + user_id, {
        headers: v_headers,
      })
      .subscribe((v) => {
        localStorage.setItem('client_id', v.id.toString());
        console.log('info sur le client est ', v);
        console.log('id client ' + localStorage.getItem('client_id'));
      });
  }
  checkAuth() {
    if (localStorage.getItem('userData')) {
      this.setEtatAuth(true);
      return this.estConnecte;
    }
    this.router.navigate(['']);
    this.setEtatAuth(false);
    return this.estConnecte;
  }
  checkToken() {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

  parseUserData(data: string | null) {
    var parsed: UserDataStorage;
    if (data) return (parsed = JSON.parse(data));
    //alert('User data not found');
  }

  clearLocal() {
    localStorage.clear();
  }
}
