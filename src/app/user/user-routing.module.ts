import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharesComponent } from './shares/shares.component';
import { ShareDetailComponent } from './share-detail/share-detail.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "shares", component: SharesComponent },
  { path: "shareDetails/:id", component: ShareDetailComponent },
  { path: "userDashboard", component: UserDashboardComponent },
  { path: "contact", component: ContactComponent },
  { path: "about", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
