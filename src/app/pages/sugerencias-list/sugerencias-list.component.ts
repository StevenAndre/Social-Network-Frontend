import { Component, OnInit,OnDestroy } from '@angular/core';
import { AmistadService } from 'src/app/services/amistad.service';
import { LoginService } from 'src/app/services/login.service';
import { NumerPAgeServiceService } from 'src/app/services/numer-page-service.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sugerencias-list',
  templateUrl: './sugerencias-list.component.html',
  styleUrls: ['./sugerencias-list.component.css']
})
export class SugerenciasListComponent implements OnInit,OnDestroy {
  constructor(
    private amgServ:AmistadService,
    private logSer:LoginService,
    private pageService:NumerPAgeServiceService,
    private soliService:SolicitudService
  ){}

  sugeridos:any[]=[];
  usuarioId:number=0;
  imagenesPerfil:any[]=[];

  ngOnDestroy(): void {
    this.pageService.setPageNumero(0);
  }


  ngOnInit(): void {
   

    this.logSer.getUserActual().subscribe({
      next:user=>{
        this.usuarioId=user.id;
       this.cargarSugerencias();
        

      },
      error:err=>console.log(err)
    });
    

  }


  sendSolicitud(solicitadoId:any){

    
    this.soliService.sendSolicitud(this.usuarioId,solicitadoId).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire('Enviado!',"Solicitud enviada con exito",'success');
        this.cargarSugerencias();
      },
      error:e=>console.log(e)
    });

    console.log(this.usuarioId+" envia solicitud A: "+solicitadoId);

  }


  cargarSugerencias(){

    this.amgServ.getSugerencias(this.usuarioId).subscribe(
      {
        next:(sugerencias:any)=>{
          this.sugeridos=sugerencias;
          console.log("SUGERENCIAS",sugerencias);
          console.log("SUGERIDOS",this.sugeridos);
          

          
          this.sugeridos.forEach((amg) => {
          
            if (amg.imagenPost !==null) {
              this.logSer.getProfileImage(amg.photoProfile).subscribe({
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
