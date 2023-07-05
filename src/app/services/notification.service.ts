import { Injectable } from '@angular/core';
import { Notificacion } from '../components/chat/models/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  
  listaNotificaciones:Notificacion[]=[]

  agregarNotificacion(nuevaNotificacion:any){
    this.listaNotificaciones.push(nuevaNotificacion);
  }

  showNotifications(){
    return this.listaNotificaciones;
  }

  deleteNotifications(){
    this.listaNotificaciones=[];
  }



}
