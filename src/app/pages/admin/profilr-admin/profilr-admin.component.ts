import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profilr-admin',
  templateUrl: './profilr-admin.component.html',
  styleUrls: ['./profilr-admin.component.css']
})
export class ProfilrAdminComponent  implements OnInit{
 

  constructor(private sevicelog:LoginService){}
  showModal = false;
  selectedImageUrl?: string;
  usuario:any;
  profileImageUrl$:any;
  ngOnInit(): void {
    this.sevicelog.getUserActual().subscribe({
      next:data=>{
        this.usuario=data;
       this.sevicelog.getProfileImage(this.usuario.photoProfile).subscribe({
          next:data=>{

            this.profileImageUrl$=URL.createObjectURL(data)
           console.log("resource:" +URL.createObjectURL(data))
          }
        });
        console.log(this.usuario.photoProfile)
      },
      error:err=>{
        Swal.fire("Lo sentimos","Error al cargar los datos:(","error");
        console.log(err);
      }
    });
  }

}
