import { Component,OnInit,OnDestroy } from '@angular/core';
import { AmistadService } from 'src/app/services/amistad.service';
import { LoginService } from 'src/app/services/login.service';
import { NumerPAgeServiceService } from 'src/app/services/numer-page-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit,OnDestroy {
  constructor(
    private logService: LoginService,
    private amistadSer: AmistadService,
    private pageService:NumerPAgeServiceService,
  ) {}

  usuario: any;
  amigos: any[] = [];
  imagenesPerfil:any[]=[];


  ngOnDestroy(): void {
    this.pageService.setPageNumero(0);
  }


  ngOnInit(): void {
    this.logService.getUserActual().subscribe({
      next: (data) => {
        this.usuario = data;
        this.cargarFriends(this.usuario.id);
      },
      error: (err) => console.log(err),
    });
  }

  
  deleteFriendship(amigoId:number){
    Swal.fire({
      title:'Eliminar amigo',
      text:'Estas seguro de querer eliminar tu amistad con este usuario?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      confirmButtonText:'Eliminar',
      cancelButtonText:'cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.amistadSer.deleteFrindship(this.usuario.id,amigoId).subscribe({
          next:()=>{
            Swal.fire('Eliminado','Usuario fue eliminado de su lista de amigo','info');
            this.cargarFriends(this.usuario.id);
          },
          error:e=>{
            Swal.fire('Lo sentimos :( ','Ocurrio un error al intentar eliminar, vuelva a intentarlo','error');
            console.log(e);
          }
        });
      }
    });
    

  }

  cargarFriends(usuarioId:number){

    this.amistadSer.getFriendsOfUser(usuarioId).subscribe({
      next: (response) => {
        this.amigos = response;
        console.log(this.amigos);

        this.amigos.forEach((amg) => {
          
          if (amg.imagenPost !== null) {
            this.logService.getProfileImage(amg.photoProfile).subscribe({
              next: (imagen) => {
                this.imagenesPerfil[amg.id] = URL.createObjectURL(imagen);
              },
              error: (error) => console.log(error),
            });
          }
        });

      },
      error: (err) => console.log(err),
    });
  }


}
