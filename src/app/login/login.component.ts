import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../config/Authentification/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  estConnecte = false

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,]],
      rememberMe: [false],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.authService.estConnecte.subscribe(v=>{
      this.estConnecte = v
    })
    this.authService.clearLocal()
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Envoyez les données du formulaire au backend ou effectuez toute autre action nécessaire
      this.authService.login(this.loginForm.value)
      //console.log('le token du local storage est '+ localStorage.getItem('token'))
    
      //console.log(localStorage.getItem('token'))
      //console.log('Infos de connexion'+this.loginForm.value);
    }
  }

}
