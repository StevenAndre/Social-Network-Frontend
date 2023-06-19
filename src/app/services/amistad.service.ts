import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AmistadService {

  constructor(private http: HttpClient) { }

  public getFriendsOfUser(usuarioId:any):Observable<any>{
    return this.http.get(`${baseUrl}/amistad/amigos/${usuarioId}`);
  }

  public getSugerencias(usuarioId:any){
    return this.http.get(`${baseUrl}/amistad/sugerencias/${usuarioId}`);
  }


  public acceptFriendship(solicitudId:number):Observable<any>{
    return this.http.post(`${baseUrl}/amistad/solicitud/${solicitudId}`,{} );
  }
  
  public deleteFrindship(userId:number,friendId:number):Observable<any>{
    return this.http.delete(`${baseUrl}/amistad/${userId}/unfollowing/${friendId}`);
  }


}
