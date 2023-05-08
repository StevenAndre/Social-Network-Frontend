import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ProfilrAdminComponent } from './pages/admin/profilr-admin/profilr-admin.component';
import { FeedAdminComponent } from './pages/admin/feed-admin/feed-admin.component';
import { UpdateProfileComponent } from './pages/admin/update-profile/update-profile.component';

const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'',component:HomeComponent},
  {path:'admin',component:AdminDashboardComponent,children:[
    {path:'profile',component:ProfilrAdminComponent},
    {path:'feed',component:FeedAdminComponent},
    {path:'update-profile/:id',component:UpdateProfileComponent}
  ]},
  {path:'login',component:LoginComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
