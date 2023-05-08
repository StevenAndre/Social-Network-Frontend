import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private loginService:LoginService){}

  image?: File;

  recibirImagen(event: any) {
   const file= event.target.files[0];
    
   if(file){
    this.image = file;
   }
   console.log(file)

  }
  
  user:any={
    nombre:'',
    apellido:'',
    username:'',
    email:'',
    password:'',
  }
  @ViewChild("imagen")
   
  // this InputVar is a reference to our input.
 
  InputVar:any;
 
  reset()
  {
    // We will clear the value of the input
    // field using the reference variable.
    this.InputVar.nativeElement.value = "";
  }

  enviar(){

    if(this.user.username.trim()=='' ||this.user.username.trim()==null){
      alert("el username es requerido");
      return;
    }

    this.loginService.registerUser(this.user,this.image).subscribe({
      next:response=>{
        console.log(response);
        Swal.fire('Registro exitoso',"Tu cuenta fue registrada con exito",'success');
        this.user={
          nombre:'',
          apellido:'',
          username:'',
          email:'',
          password:'',
        }
        this.reset()
        
      },
      error:err=>{
        Swal.fire("lo siento",err.error,"warning");
        console.log(err);
      }
    });
  }


}
