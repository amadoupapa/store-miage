import { Component, OnInit } from '@angular/core';
import { SERVER_TOKEN } from '@angular/flex-layout';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/config/Authentification/auth.service';
import { Categorie } from 'src/app/models/models';
import { AdminService } from 'src/app/services/admin.service';
import { SousMenuComponent } from '../sous-menu/sous-menu.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styleUrls: ['./liste-categories.component.css']
})
export class ListeCategoriesComponent implements OnInit{
  categories!:Categorie[]
  constructor(private authservice:AuthService, private adminservice:AdminService,private router:Router,){}
  nomCategorie:string = ''



  ngOnInit(): void {
    this.adminservice.getCategories().subscribe({
      next:(c)=>{
        this.categories = c
      },
      error(err) {
        alert('Erreur de chargements de categories');
      },
    })
  }
  ajouterCategorie(form:NgForm) {
    if(this.authservice.checkToken()){
      if(form.valid){
        const data = {nomCategorie:this.nomCategorie}
       this.adminservice.createCategorie(data).subscribe({
        next:()=> {
          alert('Ajoute avec success');
          this.ngOnInit()
        },
        error(err) {
          alert('Une erreur est surveue');
        },
       })
       }else{
        alert('Remplissez les champs requis');
       }
    }
      
    }
    deleteCategorie(id: number) {
      if(this.authservice.checkToken()){
    if(confirm('Confirmez la suppressions')){
      this.adminservice.deleteCategorie(id).subscribe({
        next:()=>{
          this.ngOnInit()
        },
        error(err) {
          alert('Une erreur est survenue');
        },
      })

    }
    }}

     //verification route login
  checkRouteCategories() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
       
        if(this.router.url === '/liste-categories') this.ngOnInit()   
      }
    });
  }
    
}
