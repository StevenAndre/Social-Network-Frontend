import { Component, OnInit } from '@angular/core';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-feed-admin',
  templateUrl: './feed-admin.component.html',
  styleUrls: ['./feed-admin.component.css']
})
export class FeedAdminComponent implements OnInit {

  constructor(private postServices:PublicacionService){}
  pipe = new DatePipe('en-US');
  contenido:string="aqui va el contenido";
  usuario:any="NOmbre del usuario";
  fecha:any="fecha de publicacion";

 
  items=[1,2,3];

  publicaciones:any[]=[];

  usuarioId:any=1;
  imagenes: { [key: string]: string } = {}; // Objeto para almacenar las imágenes por post

  ngOnInit(): void {

  
  
    this.postServices.getPublicacionesByUser(this.usuarioId).subscribe(
      {
        next:(pubs:any)=>{

          this.publicaciones=pubs;
          console.log(pubs);

         this.publicaciones.forEach(pub=>{
          if(pub.imagenPost!==null){
            this.postServices.getImagenPost(pub.imagenPost).subscribe(
              {
                next:imagen=>{
                  this.imagenes[pub.id] = URL.createObjectURL(imagen);
                },
                error:error=>console.log(error)
              }
            );
            console.log("Pubb"+pub.imagenPost);
          }
         
         })





        },
        error: (error:any)=>{
          console.log(error);
        }
      }
    );

  }


  fechaParseada(fecha:any){
    return this.pipe.transform(fecha,'M/d/yy, h:mm a');
  
  }



}
