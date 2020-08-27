import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FilteredComponent} from './filtered/filtered.component';
//  
const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {path:'dashboard', component : DashboardComponent},
  {path:'filteredList', component:FilteredComponent ,runGuardsAndResolvers:"always"},
  // {path:'filteredList1', component:HomeComponent},
  // {path:'filteredList2', component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
  onSameUrlNavigation: 'reload',initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
