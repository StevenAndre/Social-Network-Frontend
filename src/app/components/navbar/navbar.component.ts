import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {

  constructor(public logService:LoginService,private router:Router){}

  isLoggeIn:boolean=false;
  username:string | undefined='';
 
  ngOnInit(): void {
  
  }

  


  logout(){


    this.logService.logout();
    
    this.router.navigate(['/login']);
  }

  


}
