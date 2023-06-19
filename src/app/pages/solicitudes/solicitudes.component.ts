import { Component,OnInit,OnDestroy } from '@angular/core';
import { AmistadService } from 'src/app/services/amistad.service';
import { LoginService } from 'src/app/services/login.service';
import { NumerPAgeServiceService } from 'src/app/services/numer-page-service.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit,OnDestroy{

  constructor(
    private soliService:SolicitudService,
    private amgServ:AmistadService,
    private logServ:LoginService,
    private pageService:NumerPAgeServiceService,
  ){}

  solicitudes:any[]=[];

  usuarioId:number=0;
  imagenesPerfil:any[]=[];

  ngOnDestroy(): void {
    this.pageService.setPageNumero(0);
  }
  ngOnInit(): void {


    this.logServ.getUserActual().subscribe(
      {
        next:user=>{
          this.usuarioId=user.id;

          this.cargarSolicitudes();

        },
        error:e=>console.log(e)
      }
    );

    
  }

  acceptfriendship(solicitudId:number){
    this.amgServ.acceptFriendship(solicitudId).subscribe(
      {
        next:response=>{
          console.log(response);
          Swal.fire('Felicidades','Solicitud aceptada!','success');
          this.cargarSolicitudes();
        },
        error:e=>console.log(e)
      }
    );
  }

  deleteSolicitud(solucitudId:number){

    this.soliService.deleteSolicitud(solucitudId).subscribe(
      {
        next:()=>{
          Swal.fire('Eliminada','Solicitud eliminada!','info');
          this.cargarSolicitudes();
        },
        error:e=>console.log(e)
      }
    );
   
  }

  

  cargarSolicitudes(){

    this.soliService.getSolicitudes(this.usuarioId).subscribe(
      {
        next:(solicitudesR:any)=>{
          this.solicitudes=solicitudesR;
          console.log("SolicitudesR",solicitudesR);
          console.log("Solicitudes",this.solicitudes);
          

          
          this.solicitudes.forEach((amg) => {
          
            if (amg.solicitante.imagenPost !==null) {
              
              
              this.logServ.getProfileImage(amg.solicitante.photoProfile).subscribe({
                next: (imagen) => {
                  this.imagenesPerfil[amg.id] = URL.createObjectURL(imagen);
                },
                error: (error) => console.log(error),
              });
            }else{
              this.imagenesPerfil[amg.id] ="../../../assets/images/perfil-defecto.png";
            }
          });

        },
        error:e=>console.log(e)
      }
    );
  }

}
