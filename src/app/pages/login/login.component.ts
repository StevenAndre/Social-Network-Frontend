import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '@stomp/stompjs';
import { Howl } from 'howler';
import * as SockJS from 'sockjs-client';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router,
    private notifyService:NotificationService
    ){
    this.client = new Client();
  }
  private client: Client;

  sound = new Howl({ src: ['../../../assets/audio/simple_notification.mp3'] });
  ngOnInit(): void {

    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/chat-websocket');
    };

  }

  jwtRequest:any={
    "username":'',
    "password":'',

  }

  ingresar(){
    
    this.loginService.login(this.jwtRequest).subscribe(
      {
        next:response=>{
          console.log(response);
          this.loginService.guardarToken(response.token);
          this.jwtRequest={
            "username":'',
            "password":'',
        
          }
          this.loginService.getUserActual().subscribe({
            next:data=>{
                this.loginService.setUsername(data.username);
                localStorage.setItem("userID",data.id);
                console.log(data.username)

                this.client.deactivate();

                this.client.activate();
                
            this.client.onConnect = (frame) => {
              this.client.subscribe(
                `/chat/notify/${data.username}`,
                (e) => {
                  this.sound.play();
                  let notification: Notification = JSON.parse(e.body) as Notification;
                  
                  console.log(notification);
                  console.log(e.body)
                  this.notifyService.agregarNotificacion(notification);
                  console.log("NOTIFICACIONES: "+JSON.stringify(this.notifyService.showNotifications()));
                }
              );
            }
              

            },
            error: error=>{
              console.log(error);
            }
          });

         


          this.router.navigate(['/admin']);
        },
        error:err=>{
        console.log(err);
        Swal.fire("Upss!!","Usuario o contrañesa equivocados, intente de nuevo",'warning');
      
      }
      }
    );
   

  }

}
