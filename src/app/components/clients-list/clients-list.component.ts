import { Component } from '@angular/core';
import { Client } from '../../modals/clients';
import { ClientsService } from '../../services/clients.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, FormsModule],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent {
  public clients:Client[]=[];
  public filteredClients: Client[] = [];
  public isLoading=false;
  public isError=false;

  public filters = {
    clientName: '',
    clientSurname: '',
    companyName: ''
  };

  private loadData(){
    this.isLoading=true;
    this.clientsService.loadClients().subscribe( {
      next:(data)=>{
        this.clients=data.sort((a, b) => a.clientSurname.localeCompare(b.clientSurname));
        this.filteredClients = this.clients;
        this.isLoading=false;
        this.isError=false;
       },
       error:(data)=>{
        this.isError=true;
        this.isLoading=false;
       }
    });
  }

  public constructor ( private clientsService:ClientsService){
    this.loadData();

  }

  public deleteClient(id:string|null){
    if (id!=null){
      this.clientsService.deleteClient(id).subscribe( ()=>{
        this.loadData();
      });
    }

  }

  ngOnInit() {
    this.updateFilteredClients();
  }

  ngOnChanges() {
    this.updateFilteredClients();
  }

  public updateFilteredClients() {
    const { clientName, clientSurname, companyName } = this.filters;
  
    const normalize = (str: string): string => str.toLowerCase().trim(); // Normalize input
  
    const splitAndCheck = (target: string, query: string): boolean => {
      if (!query) return true; // If query is empty, match all
      const queryWords = normalize(query).split(/\s+/); // Split query into words
      return queryWords.every(word => normalize(target).includes(word)); // All words must match
    };
  
    this.filteredClients = this.clients.filter(client =>
      splitAndCheck(client.clientName, clientName) &&
      splitAndCheck(client.clientSurname, clientSurname) &&
      splitAndCheck(client.companyName, companyName)
    );
  }
}