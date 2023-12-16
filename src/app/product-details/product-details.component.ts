import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { CreateCommandeDto, ProduitAll } from '../models/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../config/Authentification/auth.service';
import { UserDataStorage } from '../config/Authentification/models';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private authservice:AuthService,
    private router:Router
    
  ) {}
  id_produit: any;
  client_id!: string | null;
  userData!: UserDataStorage | null;
  // user_id!: string | null;
  produit!: ProduitAll;
  image_src!: string;
  image_type!: string;
  image_url!: string;
  data!: CreateCommandeDto;
  estConnecte = false;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id_produit = params.get('id');
      this.client_id = localStorage.getItem('client_id');
      // this.user_id = localStorage.getItem('user_id');
      this.chargerProduit(this.id_produit);
      // Initialiser data ici
      this.data = {
        client: { id: 0 }, 
        produit: { id: 0 }, 
      };
    });
    this.authservice.estConnecte.subscribe(v=>{
      this.estConnecte = v
    })
  }

  chargerProduit(id:string) {
    this.clientService.getProduct(id).subscribe({
      next: (p) => {
        this.produit = p;
        this.image_url = p.imageProduit;
        this.image_type = p.imageProduitContentType;
        this.image_src =
          'data:' + this.image_type + ';base64,' + this.image_url;
        console.log('le produit clique est ', this.produit);
      },
    });
  }
  commander() {

   if (this.estConnecte) {
     if (this.client_id) {
       this.data.client.id = Number.parseInt(this.client_id);
       this.data.produit.id = Number.parseInt(this.id_produit);
       this.clientService.commander(this.data).subscribe({
         next: () => {
           alert('Commande cree');
         },
         error: (err: HttpErrorResponse) => {
           alert(err.message);
         },
       });
     } else {
       alert('id non trouve');
     }
   }else this.router.navigate(['/login'])
   }
}
