import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { MenuLateralComponent } from './pages/admin/menu-lateral/menu-lateral.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { AuthInterceptor } from './services/auth.interceptor';
import { ProfilrAdminComponent } from './pages/admin/profilr-admin/profilr-admin.component';
import { FeedAdminComponent } from './pages/admin/feed-admin/feed-admin.component';
import { UpdateProfileComponent } from './pages/admin/update-profile/update-profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    AdminDashboardComponent,
    MenuLateralComponent,
    ProfilrAdminComponent,
    FeedAdminComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule
    
   
  ],
  providers: [
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
