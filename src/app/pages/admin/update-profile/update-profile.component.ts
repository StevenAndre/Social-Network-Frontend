import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  constructor(private sevicelog: LoginService, private route: ActivatedRoute,private router:Router,private snack:MatSnackBar) {}

  usuario: any;
  selectedImage: string | ArrayBuffer | null = '';
  disabled = false;
  idUsuario: any;
  passwordPost={
    password:''
  }
  image?: File;
   passwordConfirm?:boolean;

  ngOnInit(): void {
    
    this.idUsuario = this.route.snapshot.params['id'];
    console.log('ID USER==>' + this.idUsuario);
    this.sevicelog.getUserActual().subscribe({
      next: (data) => {
        this.usuario = data;
        this.sevicelog.getProfileImage(this.usuario.photoProfile).subscribe({
          next: (data) => {
            this.selectedImage = URL.createObjectURL(data);
            console.log('resource:' + URL.createObjectURL(data));
          },
        });
        console.log(this.usuario.photoProfile);
        console.log(this.usuario);
      },
      error: (err) => {
        Swal.fire('Lo sentimos', 'Error al cargar los datos:(', 'error');
        console.log(err);
      },
    });
  }

  contrasena: string = '';


  condirmarDaatos(){
    if (
      this.passwordPost.password.trim() == '' ||
      this.passwordPost.password.trim() == null
    ) {
      this.snack.open("Ingresa tu contraseña actual para confirmar los cambios",'aceptar',{
        horizontalPosition:'center',
        verticalPosition: 'top',
        duration:3000

      })
      
      return;
    }
    this.sevicelog.conprobarPassword(this.passwordPost).subscribe(
      {
        next:confirmacion=>{
         console.log("aqui esta la confirmacion="+confirmacion);
          
          this.passwordConfirm=confirmacion;

          this.enviar();
        },
        error:err=>{
          console.log(err);
        }
      }
     );
    

  }


  enviar() {


    if (
      this.usuario.username.trim() == '' ||
      this.usuario.username.trim() == null
    ) {
      this.snack.open("El username es requerido",'aceptar',{
        horizontalPosition:'center',
        verticalPosition: 'top',
        duration:3000

      })
      return;
    }

  
    

     if(!this.passwordConfirm){
    
      Swal.fire('error', 'tu contraseña no es correcta no se puede confirmar los cambios, intenta de nuevo', 'error');

      return;


     }




    if (this.disabled) {
      if (this.contrasena.trim() == '' || this.contrasena == null) {
        Swal.fire('error', 'la contraseña no debe estra vacia', 'error');

        return;
      }
      this.usuario.password = this.contrasena;
    }

    this.sevicelog
      .actualizarUser(this.usuario, this.idUsuario, this.image)
      .subscribe({
        next: (response) => {
        
          this.sevicelog.guardarToken(response.token.token);
          console.log(response);
          Swal.fire(
            'Actualizacion exitosa',
            'Tus datos fueron actualizados con exito',
            'success'
          );
        },
        error: (err) => {
          Swal.fire('lo siento', err.error, 'warning');
          console.log(err);
        },
      });

      
     
      this.router.navigate(['/admin/profile']);
     

      
    /*
    const jsonModificado = JSON.stringify(this.usuario);
    console.log('Usuarioo==> ' + jsonModificado);
    */
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.image = file;
      };
      reader.readAsDataURL(file);
    }
  }
  getImgUrl(): string | ArrayBuffer | null {
    return this.selectedImage;
  }
}
