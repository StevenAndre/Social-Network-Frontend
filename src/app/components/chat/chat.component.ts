import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client, Stomp, StompHeaders } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { NumerPAgeServiceService } from 'src/app/services/numer-page-service.service';
import { Mensaje } from './models/mensaje';
import { LoginService } from 'src/app/services/login.service';
import { AmistadService } from 'src/app/services/amistad.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  private client: Client;

  conectado: boolean = false;

  mensaje: Mensaje = new Mensaje();
  mensajes: Mensaje[] = [];
  amigos: any[] = [];
  messages:string[]=[];
  writing:string="";

  constructor(
    private pagService: NumerPAgeServiceService,
    private logSer: LoginService,
    private amigServ: AmistadService
  ) {
    this.client = new Client();
  }

  username: string | null = this.logSer.getUsername();
  usernameFriend: string = '';
  usuarioId?: number;
  usuarioChat:any={};

  imagenesPerfil:any[]=[];

  ngOnDestroy(): void {
    this.pagService.setPageNumero(0);
  }
  ngOnInit(): void {
    this.logSer.getUserActual().subscribe({
      next: (data) => {
        this.usuarioId = data.id;

        this.amigServ.getFriendsOfUser(this.usuarioId).subscribe({
          next: (data) => {
            this.amigos = data;

            
        this.amigos.forEach((amg) => {
          
          if (amg.imagenPost !== null) {
            this.logSer.getProfileImage(amg.photoProfile).subscribe({
              next: (imagen) => {
                this.imagenesPerfil[amg.id] = URL.createObjectURL(imagen);
              },
              error: (error) => console.log(error),
            });
          }
        });


          },
          error: (e) => console.log(e),
        });
      },
      error: (e) => console.log(e),
    });

    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/chat-websocket');
    };

  

    this.client.onDisconnect = (frame) => {
      console.log('Desconectados ', +!this.client.connected, ' : ' + frame);
      this.conectado = false;
    };

  }

  escribiendo():void{
    this.client.publish({
      destination: `/app/escribiendo/${this.username}/${this.usernameFriend}`,
      body: "Writing",
    });

  }


  conectar(usernameFriend: string,usuarioChat:any): void {
    this.usernameFriend = usernameFriend;
    this.usuarioChat=usuarioChat;
    this.mensajes=[];

    this.logSer.getChatByUSers(this.username,this.usernameFriend).subscribe({
      next:mensajes=>{
        this.mensajes=mensajes;
        console.log(mensajes);
      },
      error:err=>console.log(err)
    });




    this.client.deactivate();

    this.client.activate();

    

    this.client.onConnect = (frame) => {
      
      this.conectado = true;

      
      this.client.subscribe(
        `/chat/message/${this.username}/${this.usernameFriend}`,
        (e) => {
          let mensaje: Mensaje = JSON.parse(e.body) as Mensaje;
          mensaje.fechaEnvio = mensaje.fechaEnvio;
          
          this.mensajes.push(mensaje);
         
          this.messages.push(mensaje.texto);
          
        }
      );
      this.client.subscribe(
        `/chat/escribiendo/${this.username}/${this.usernameFriend}`,
        (e) => {
          this.writing=e.body;
          setTimeout(() => {
            this.writing="";
          }, 500);
        }
      );

      this.mensaje.userEmiter = this.username;
      this.client.publish({
        destination: `/app/chat/connect/${this.username}`,
      });

    };
  }

  desconectar(): void {
    this.client.deactivate();
  }

  enviarMensaje(): void {
    
    
    
    this.mensaje.userEmiter = this.username;
    this.mensaje.fechaEnvio=new Date();
    
    
   
    
    this.mensajes=[...this.mensajes,this.mensaje];
   
    
    this.client.publish({
      destination: `/app/mensaje-private/${this.username}/${this.usernameFriend}`,
      body: JSON.stringify(this.mensaje),
    });
    console.log(this.mensaje.texto);
    this.messages.push(this.mensaje.texto);
    console.log(this.mensaje.texto);
    console.log(this.mensajes);
    console.log(this.mensaje);
    
    this.mensaje= new Mensaje();
    console.log(this.mensaje);
  }

  transformEstado(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }
  //--------------------------------------------

}
