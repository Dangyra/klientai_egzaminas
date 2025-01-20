import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Client } from '../modals/clients';
import { map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clients:Client[]=[];

  public onClientCountChange=new EventEmitter();

  constructor(private http:HttpClient, private auth:AuthService) { }

  public addClient(item:Client){
    return this.http.post("https://klientai-4dadd-default-rtdb.firebaseio.com/clients.json", item,{
      params:{
        "auth":this.auth.idToken
      }
    });
  }

  public loadClients(){
    return this.http
      .get<{[key:string]:Client}>("https://klientai-4dadd-default-rtdb.firebaseio.com/clients.json",{
        params:{
          "auth":this.auth.idToken
        }
      })
      .pipe(
        map((data):Client[]=>{
          const clients=[];
          for (let k in data){
           data[k].id=k;
           clients.push(data[k]);
          }
          return clients;
        }),
        tap((data)=>{
          this.clients=data;
          this.onClientCountChange.emit();
        })

      )
  }

  public loadClient(id:string){
    return this.http.get<Client>("https://klientai-4dadd-default-rtdb.firebaseio.com/clients/"+id+".json",{
      params:{
        "auth":this.auth.idToken
      }
    });
  }
  public updateRecord(item:Client){
    return this.http.patch("https://klientai-4dadd-default-rtdb.firebaseio.com/clients/"+item.id+".json", item,{
      params:{
        "auth":this.auth.idToken
      }
    });
  }

  public deleteClient(id:string){
    return this.http.delete("https://klientai-4dadd-default-rtdb.firebaseio.com/clients/"+id+".json",{
      params:{
        "auth":this.auth.idToken
      }
    });
  }

  public getCount(){
    return this.clients.length;
  }

}
