import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/config/Authentification/auth.service';
import { CreateCommandeDto, ProduitAll } from 'src/app/models/models';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent implements OnInit {
  protected produits!: ProduitAll[];
  protected data!: CreateCommandeDto;
  protected estConnecte = false;
  client_id = localStorage.getItem('client_id');
  constructor(
    private clientService: ClientService,
    private authservice: AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.clientService.getFeaturedProducts().subscribe({
      next: (p) => {
        this.produits = p;
      },
    });

    this.authservice.estConnecte.subscribe({
      next: (etat) => {
        this.estConnecte = etat;
      },
    });
  }

  
  commander(id_produit:number) {
    if(this.client_id && this.estConnecte){
      this.data.client.id = Number.parseInt(this.client_id)
      this.data.produit.id = id_produit
      this.clientService.commander(this.data).subscribe({
        next:(r)=>alert('Commande cree'),
        error:(err:HttpErrorResponse)=>{
          alert(err.message);
        }
      })
    }else this.router.navigate([''])
  }
}
