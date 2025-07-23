import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { Home1Component } from './home1/home1.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: "allOrders", component: Home1Component },
  { path: "allUsers", component: AllUsersComponent },
  { path: "allContacts", component: AllContactsComponent },
  {path:"search",component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
