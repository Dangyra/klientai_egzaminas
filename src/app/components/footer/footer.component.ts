import { Component } from '@angular/core';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public count=0;

  constructor(private clientsService:ClientsService){
    this.clientsService.onClientCountChange.subscribe(()=>{
      this.count=this.clientsService.getCount();
    });
    


  }

}
