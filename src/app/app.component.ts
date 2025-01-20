import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientsAddComponent } from './components/clients-add/clients-add.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { NavigationComponent } from './components/navigation/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientsAddComponent, ClientsListComponent, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'klientai';
}
