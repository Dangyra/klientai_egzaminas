import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingComponent } from '../../loading/loading.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './clients-edit.component.html',
  styleUrl: './clients-edit.component.css'
})
export class ClientsEditComponent {
  public id:string;
  public clientName:string|null=null;
  public clientSurname:string|null=null;
  public phone:number|null=null;
  public email:string|null=null;
  public comment:string|null=null;
  public companyName:string|null=null;
  public companyAddress:string|null=null;
  
  public isLoading=false;
  public isError=false;
  
  constructor(private route:ActivatedRoute, private router:Router, private clientsService:ClientsService){
    this.id=this.route.snapshot.params["id"];
    this.isLoading=true;
    this.clientsService.loadClient(this.id).subscribe( (client)=>{
      this.clientName=client.clientName;
      this.clientSurname=client.clientSurname;
      this.phone=client.phone;
      this.email=client.email;
      this.comment=client.comment;
      this.companyName=client.companyName;
      this.companyAddress=client.companyAddress;
      this.isLoading=false;
    });
  }

  public updateRecord(f:NgForm){
    console.log(f.form.value);
    
    
      this.isLoading=true;
      this.clientsService.updateRecord({
        id:this.id,
        clientName:f.form.value.clientName,
        clientSurname:f.form.value.clientSurname,
        phone:f.form.value.phone,
        email:f.form.value.email,
        comment:f.form.value.comment,
        companyName:f.form.value.companyName,
        companyAddress:f.form.value.companyAddress
      }).subscribe({
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
