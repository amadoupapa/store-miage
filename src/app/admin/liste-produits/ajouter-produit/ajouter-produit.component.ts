import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { Categorie, CreateProdcutDto } from 'src/app/models/models';
import { AdminService } from 'src/app/services/admin.service';
import { ListeProduitsComponent } from '../liste-produits.component';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css'],
})
export class AjouterProduitComponent implements OnInit {


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const extension = file.name.split('.').pop();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.imageProduit = event.target?.result?.toString()
      this.imageProduitContentType = `image/${extension}`;
       this.base64Data = this.imageProduit?.split(',')[1]
      //console.log('type image', this.imageProduitContentType);
      console.log('contenu image', this.base64Data);
    };
  }
  data: CreateProdcutDto = new CreateProdcutDto();
  categories!: Categorie[];
  nomProduit?: string | null;
  descriptionProduit?: string | null;
  prix?: number | null;
  
  imageProduit?: string | null;
  imageProduitContentType?: string | null;
  base64Data:any
  featured?: boolean = false;
  categorie_id!: number;
 
  constructor(private admninservice: AdminService,private listeProduitsC:ListeProduitsComponent) {
    
  }

  ngOnInit(): void {
    this.admninservice.getCategories().subscribe((v) => {
      this.categories = v;
      this.data = {categorie:{id:null}}
      
    });
  }
  onSubmit(form: NgForm) {
    
    if (form.valid) {
      this.data.nomProduit = this.nomProduit;
      this.data.categorie.id = this.categorie_id;
      this.data.descriptionProduit = this.descriptionProduit;
      this.data.prix = this.prix;
      this.data.imageProduit = this.base64Data
      this.data.imageProduitContentType = this.imageProduitContentType;
      this.data.featured = this.featured;
      this.admninservice.createProduct(this.data).subscribe({
        next:(v)=>{
          alert('produit cree avec success');
          this.listeProduitsC.ngOnInit()
        },
        error(err:HttpErrorResponse) {
          alert(err.message);
        },
      })
      console.log('le produit a cree est ', this.data);
    } else {
      alert('Remplissez les champs');
    }
  }
  
}
