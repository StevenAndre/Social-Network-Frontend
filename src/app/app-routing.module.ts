import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ProfilrAdminComponent } from './pages/admin/profilr-admin/profilr-admin.component';
import { FeedAdminComponent } from './pages/admin/feed-admin/feed-admin.component';
import { UpdateProfileComponent } from './pages/admin/update-profile/update-profile.component';
import { FriendSeccionComponent } from './pages/friend-seccion/friend-seccion.component';
import { FriendListComponent } from './pages/friend-list/friend-list.component';
import { SugerenciasListComponent } from './pages/sugerencias-list/sugerencias-list.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'',component:HomeComponent},
  {path:'admin',component:AdminDashboardComponent,children:[
    {path:'profile',component:ProfilrAdminComponent},
    {path:'feed',component:FeedAdminComponent},
    {path:'chat',component:ChatComponent},
    {path:'update-profile/:id',component:UpdateProfileComponent},
    {path:'friend',component:FriendSeccionComponent,children:[
      {path:'list-friends',component:FriendListComponent},
      {path:'list-sugerencias',component:SugerenciasListComponent},
      {path:'list-solicitudes',component:SolicitudesComponent},
    ]},
   
  ]},
  {path:'login',component:LoginComponent},
  {path:'chat',component:ChatComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
