import { Component, HostListener, OnInit, ViewChild,OnChanges,SimpleChanges, Input, OnDestroy} from '@angular/core';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ComentarioService } from 'src/app/services/comentario.service';
import { LoginService } from 'src/app/services/login.service';
import { NumerPAgeServiceService } from 'src/app/services/numer-page-service.service';


@Component({
  selector: 'app-feed-admin',
  templateUrl: './feed-admin.component.html',
  styleUrls: ['./feed-admin.component.css'],
})
export class FeedAdminComponent implements OnInit, OnDestroy {

  constructor(
    private postServices: PublicacionService,
    private snack: MatSnackBar,
    private comentService:ComentarioService,
    private loginService:LoginService,
    private pageService:NumerPAgeServiceService
  ) {
    
  }
  ngOnDestroy(): void {
    this.pageService.setPageNumero(0);
  }


  pipe = new DatePipe('en-US');

  items:any[]=[];
 
  image?: File;
  publicaciones: any[] = [];
  selectedImage: string | ArrayBuffer | null = '';
  //usuarioId: any=this.loginService.getUSER();
  usuarioId: any;
  imagenes: { [key: string]: string } = {}; // Objeto para almacenar las imágenes por post
  imagenesProfiles: { [key: string]: string } = {}; 
  todayDate: Date = new Date();
  likes= new Map<number,string>();
  mostrarVentana: boolean = false;
  comentarios:any[]=[];

  numPag:number=this.pageService.getPageNumero();
  pagSize:number=3;
  sortDirect:string="desc";
  cargando = false;



  post = {
    contenido: '',
  };
  comentario = {
    contenido: '',
  };
  publicacionId:any=0;

  

  ngOnInit(): void {

    this.loginService.getUserActual().subscribe(
      {
        next: (user) => {

          this.usuarioId=user.id;

          this.pageService.numerPagDisparer.subscribe(
            data=>{
             
              this.numPag=data.data;
      
              this.postServices.getPublicacionesOfSeguidos(this.usuarioId,this.numPag,this.pagSize,this.sortDirect).subscribe({
                next: (pubs: any) => {
                  this.publicaciones.push(...pubs.content);
                  console.log(pubs);
          
                  this.publicaciones.forEach((pub) => {
                    this.likes.set(pub.id,'black');
                  
                this.loginService.getProfileImage(pub.autor.photoProfile).subscribe(
                  {
                    next:(imageProfile)=>{
                      this.imagenesProfiles[pub.autor.id]=URL.createObjectURL(imageProfile);
                    }
                  }
                );

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
      
          );

          this.postServices.getPublicacionesOfSeguidos(this.usuarioId,this.numPag,this.pagSize,this.sortDirect).subscribe({
            next: (pubs: any) => {
              this.publicaciones = pubs.content;
              console.log(pubs);
      
              this.publicaciones.forEach((pub) => {

           
                this.loginService.getProfileImage(pub.autor.photoProfile).subscribe(
                  {
                    next:(imageProfile)=>{
                      this.imagenesProfiles[pub.autor.id]=URL.createObjectURL(imageProfile);
                    }
                  }
                );

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
        ,error:e=>console.log(e)
      }

      




    );

   

   
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
  //  console.log("FECHA COMAPRES argument",fecha)
     let fechac=fecha.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
  //  console.log("FECHA REPLACE",fechac);
   let fechaHoy = this.pipe.transform(new Date(), 'd/M/yy');
   //console.log("FECHA COMAPRES hoy: ",fechaHoy)
    let fechap = this.pipe.transform(fechac, 'd/M/yy');
  // console.log("FECHA COMAPRES f last P ",fechap)
  
    return fechaHoy == fechap;
  }

  fechaParseada(fecha: any) {
    let fechac=fecha.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
    return this.pipe.transform(fechac, 'd/M/yy,   h:mm a');
  }
  fechaParseadaHoy(fecha: any) {
    let fechac=fecha.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
    return this.pipe.transform(fechac, 'h:mm a');
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
