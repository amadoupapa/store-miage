import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/config/Authentification/auth.service';
import { ProduitAll } from 'src/app/models/models';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css'],
})
export class ListeProduitsComponent implements OnInit {
  produits!: ProduitAll[];
  image_src!: string;
  image_type!: string;
  image_url!: string;

  constructor(
    private adminservice: AdminService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.adminservice.getProducts().subscribe({
      next: (p) => {
        this.produits = p;
        console.log('tout les produits sur admin', this.produits);
      },
    });
  }
  checkToken() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  deleteProduits(id: number) {
    if (this.authservice.checkToken()) {
      if (confirm('Confirmez la suppression')) {
        this.adminservice.deleteProduct(id).subscribe({
          next: (p) => {
            this.ngOnInit();
          },
          error(err: HttpErrorResponse) {
            alert(err.message);
          },
        });
      }
    }
  }
}
