import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Client } from '../../modals/clients';
import { ClientsService } from '../../services/clients.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-clients-add',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './clients-add.component.html',
  styleUrl: './clients-add.component.css'
})
export class ClientsAddComponent {

  public clientName:string|null=null;
  public clientSurname:string|null=null;
  public phone:number|null=null;
  public email:string|null=null;
  public comment:string|null=null;
  public companyName:string|null=null;
  public companyAddress:string|null=null;

  public isLoading=false;
  public isError=false;

  public constructor(private clientsService:ClientsService, private router:Router){

  }

  public addNewClient(f:NgForm){
    const tmp:Client={
      clientName:f.form.value.clientName,
      clientSurname:f.form.value.clientSurname,
      phone:f.form.value.phone,
      email:f.form.value.email,
      comment:f.form.value.comment,
      companyName:f.form.value.companyName,
      companyAddress:f.form.value.companyAddress,
      id:null
    };
    this.isLoading=true;
    this.clientsService.addClient(tmp).subscribe({
      next:()=>{
        this.isLoading=false;
        this.isError=false;
        this.router.navigate(["/list"]);
      },
      error:()=>{
        this.isError=true;
        this.isLoading=false;
      }
    });
  }
}
