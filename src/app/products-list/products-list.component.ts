import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitAll } from '../models/models';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{
  constructor(private route:ActivatedRoute,private clientservice:ClientService){}
  produits!: ProduitAll[];
  categorie_id!:string | null
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categorie_id = params.get('categorie_id')
      this.clientservice.getProductsByCategorie(this.categorie_id).subscribe({
        next:(p)=>{
          this.produits = p
          console.log('page liste produits',this.produits);
        },
        error:(e)=>{
          alert('impossible de charger les produits')
        }
      })
      
    });

   
    
    





  
  }


}
