import { Component, OnInit } from '@angular/core';
import { AuthService } from '../config/Authentification/auth.service';
import { CommandeAll } from '../models/models';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
deleteCommande(arg0: number) {
throw new Error('Method not implemented.');
}
  estConnecte = false;
  client_id! : string | null
  commandes!:CommandeAll[];
  constructor(private autservice:AuthService,private clientservice:ClientService){}
ngOnInit(): void {
  this.autservice.checkAuth()
  this.client_id = localStorage.getItem('client_id')
  if(this.client_id){
    this.clientservice.getCommandesByClient(this.client_id).subscribe(c=>{
      this.commandes = c;
      console.log("la liste de mes commandes", this.commandes);
    })
  }
  
}

}
