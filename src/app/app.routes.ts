import { Routes } from '@angular/router';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientsAddComponent } from './components/clients-add/clients-add.component';
import { ClientsEditComponent } from './components/clients-edit/clients-edit.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

export const routes: Routes = [
    {path:"", component:LoginFormComponent},
    {path:"list", component:ClientsListComponent},
    {path:"add-clients", component:ClientsAddComponent},
    {path:"client/:id", component:ClientsEditComponent},
];
