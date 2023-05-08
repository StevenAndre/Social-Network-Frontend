import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService:LoginService, private router:Router){}

  jwtRequest:any={
    "username":'',
    "password":'',

  }

  ingresar(){
    
    this.loginService.login(this.jwtRequest).subscribe(
      {
        next:response=>{
          console.log(response);
          this.loginService.guardarToken(response.token);
          this.jwtRequest={
            "username":'',
            "password":'',
        
          }
          this.loginService.getUserActual().subscribe({
            next:data=>{
                this.loginService.setUsername(data.username);
            },
            error: error=>{
              console.log(error);
            }
          });


          this.router.navigate(['/admin']);
        },
        error:err=>{
        console.log(err);
        Swal.fire("Upss!!","Usuario o contrañesa equivocados, intente de nuevo",'warning');
      
      }
      }
    );
   

  }

}
