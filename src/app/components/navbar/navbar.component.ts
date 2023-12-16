import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/models';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  categories!:Categorie[]
  constructor(private clientservice:ClientService){
    
  }

  ngOnInit(): void {
    this.clientservice.getCategories().subscribe({
      next:(c)=>{
        this.categories = c
      },
      error(err) {
        alert('Erreur chargement categories');
      },
    })
  }
 
}
