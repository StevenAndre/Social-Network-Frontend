import { Component,OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    usuario?:any;
    nombre:string='';
       constructor(private login: LoginService){}
  ngOnInit(): void {
    this.login.getUserActual().subscribe({
        next:data=>{
          this.usuario=data;
          this.nombre=this.usuario.nombre;
        },
        error:error=>{
          console.log(error)
        }
    });
  }

      


}
