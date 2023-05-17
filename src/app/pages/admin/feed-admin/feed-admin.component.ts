import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ComentarioService } from 'src/app/services/comentario.service';
@Component({
  selector: 'app-feed-admin',
  templateUrl: './feed-admin.component.html',
  styleUrls: ['./feed-admin.component.css'],
})
export class FeedAdminComponent implements OnInit {
  constructor(
    private postServices: PublicacionService,
    private snack: MatSnackBar,
    private comentService:ComentarioService
  ) {}
  pipe = new DatePipe('en-US');

  items:any[]=[];
  image?: File;
  publicaciones: any[] = [];
  selectedImage: string | ArrayBuffer | null = '';
  usuarioId: any = 1;
  imagenes: { [key: string]: string } = {}; // Objeto para almacenar las imágenes por post
  todayDate: Date = new Date();
  likes= new Map<number,string>();
  mostrarVentana: boolean = false;
  comentarios:any[]=[];

  post = {
    contenido: '',
  };
  comentario = {
    contenido: '',
  };
  publicacionId:any=0;

  ngOnInit(): void {
    this.postServices.getPublicacionesByUser(this.usuarioId).subscribe({
      next: (pubs: any) => {
        this.publicaciones = pubs;
        console.log(pubs);

        this.publicaciones.forEach((pub) => {
          this.likes.set(pub.id,'black');
          if (pub.imagenPost !== null) {
            this.postServices.getImagenPost(pub.imagenPost).subscribe({
              next: (imagen) => {
                this.imagenes[pub.id] = URL.createObjectURL(imagen);
              },
              error: (error) => console.log(error),
            });
          }
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  @ViewChild('imagen')

  // this InputVar is a reference to our input.
  InputVar: any;

  reset() {
    // We will clear the value of the input
    // field using the reference variable.
    this.InputVar.nativeElement.value = '';
  }

  enviarPost() {
    if (
      this.post.contenido.trim() == null ||
      this.post.contenido.trim() == ''
    ) {
      this.snack.open('La publicacion debe tener un contenido', 'aceptar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return;
    }

    this.postServices.savePost(this.post, this.image).subscribe({
      next: (reponse) => {
        console.log(reponse);
        Swal.fire(
          'Publicado!!',
          'tu post fue publicado con exito!!',
          'success'
        );
        this.post = {
          contenido: '',
        };
        this.reset();
        this.image = undefined;

        
      },
      error: (err) => {
        Swal.fire('Error!!', 'tu post no pudo ser publicado ', 'error');
        console.log(err);
      },
    });

    console.log('POST=> ', this.post, ' FILE=>', this.image);
  }

  compareDates(fecha: any): boolean {
    let fechaHoy = this.pipe.transform(this.todayDate, 'd/M/yy');
    fecha = this.pipe.transform(fecha, 'M/d/yy');

    return fechaHoy == fecha ? true : false;
  }

  fechaParseada(fecha: any) {
    return this.pipe.transform(fecha, 'M/d/yy,   h:mm a');
  }
  fechaParseadaHoy(fecha: any) {
    return this.pipe.transform(fecha, 'h:mm a');
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

  color: string = 'black'; // color inicial del botón

  cambiarColor(id:any) {

    document.getElementById(id)?.style.color
    
    if (this.likes.get(id)=='black') {
     this.likes.set(id,'red');
    }else{
      this.likes.set(id,'black');
    }
    
  }
  cerrarVentana(){
    this.mostrarVentana=false;
  }

  abrirVentanaComentarios(pubId:any){
    this.comentService.getCommentsOfPub(pubId).subscribe(
      {
        next:coments=>{
          this.comentarios=coments;
          console.log(this.comentarios);
        },
        error:error=>console.log(error)
      }
    );
    this.publicacionId=pubId;

    this.mostrarVentana=true;
  }

  enviarComentario(){
    if (
      this.comentario.contenido.trim() == null ||
      this.comentario.contenido.trim() == ''
    ) {
      this.snack.open('El comentario debe tener un contenido', 'aceptar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      return;
    }
    this.comentService.saveCometario(this.publicacionId,this.comentario).subscribe(
      {
        next:response=>{
          console.log(response);
          this.comentario.contenido='';
          Swal.fire('Exito!','Felicidades tu comentario se publico','success');
          this.cerrarVentana();
        },
        error:error=>console.log(error)
      }
    );

    

  }
}
