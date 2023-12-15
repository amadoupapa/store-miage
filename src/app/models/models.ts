import { User } from "../config/Authentification/models";

export interface Produit {
    id: number;
    nomProduit: string;
    descriptionProduit: string;
    prix: number;
    featured: boolean;
    imageProduit: Blob;
    idCategorie: number;
  }
export interface ProduitAll{
    id: number;
    nomProduit: string;
    descriptionProduit: string;
    prix: number;
    imageProduit: string;
    imageProduitContentType:string
    featured: boolean;
    categorie: Categorie;
}
  export interface Client {
    id: number;
    adresse: string;
    telephone: string;
    idUser: number; 
  }
  export interface ClientAll{
    id: number;
    adresse: string;
    telephone: string;
    user: User; 
  }
  export interface CreateClientDto{
    adresse: string;
    telephone: string;
    user:User;
  }
  

  export interface Commande {
    id: number;
    idClient: number;
    idProduit: number;
    date_commande: Date;
  }
  export interface CommandeAll {
    id: number;
    client: Client;
    produit: Produit;
    date_commande: Date;
  }
  export interface CreateCommandeDto{
    client:{id:number};
    produit:{id:number};
  }

export interface Categorie{
  nomCategorie:string
}