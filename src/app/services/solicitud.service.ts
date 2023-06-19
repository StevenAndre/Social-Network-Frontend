import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http:HttpClient) { }


  sendSolicitud(solicitanteId:any,solicitadoId:any):Observable<any>{
    return this.http.post(`${baseUrl}/solicitudes/${solicitanteId}/solicita/${solicitadoId}`,{});
  }

  getSolicitudes(usuarioId:any):Observable<any>{
    return this.http.get(`${baseUrl}/solicitudes/${usuarioId}`);
  }

  deleteSolicitud(solicitudId:number):Observable<any>{
    return this.http.delete(`${baseUrl}/solicitudes/delete/${solicitudId}`);
  }

}
