import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../config/Authentification/auth.service';
import { CreateClientDto } from '../models/models';
import { RegisterDTO, User } from '../config/Authentification/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user! : User 
  dataRegister: RegisterDTO = new RegisterDTO();
  dataClient: CreateClientDto = {
    adresse: '',
    telephone: '',
    user: this.user
  };
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      login: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/[0-9]/)]],
      confirmpassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    
  }

  onSubmit() {
      this.dataRegister.firstName = this.registerForm.get('firstName')?.value
      this.dataRegister.lastName = this.registerForm.get('lastName')?.value
      this.dataRegister.login = this.registerForm.get('login')?.value
      this.dataRegister.email = this.registerForm.get('email')?.value
      this.dataRegister.password = this.registerForm.get('password')?.value
      this.dataClient.adresse = this.registerForm.get('adresse')?.value
      this.dataClient.telephone = this.registerForm.get('telephone')?.value
      this.authService.register(this.dataRegister,this.dataClient)

    console.log(this.dataRegister,this.dataClient)
  }
}
