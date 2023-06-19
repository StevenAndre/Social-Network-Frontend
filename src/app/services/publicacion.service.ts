import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http:HttpClient) { }



  public getPublicacionesByUser(usuarioId:any):Observable<any>{
    return this.http.get<any>(`${baseUrl}/posts/user/${usuarioId}`);
  }

  public getPublicacionesOfSeguidos(usuarioId:any,numPag:any,pageSize:any,sortDirec:any):Observable<any>{
    const url=`${baseUrl}/posts/follows/${usuarioId}`
    const params = new HttpParams()
      .set('numPag', numPag)
      .set('pageSize', pageSize)
      .set('sortDirec', sortDirec);

    return this.http.get<any>(url,{params});
  }


  getImagenPost(filename: string): Observable<Blob> {
    const headers = new HttpHeaders().append('Accept', 'image/*');
    return this.http.get<Blob>(`${baseUrl}/posts/image/${filename}`, {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }

  savePost(post: any, image?: File): Observable<any> {
    const formData = new FormData();

    formData.append(
      'publicacion',
      new Blob([JSON.stringify(post)], {
        type: 'application/json',
      })
    );

    if (image) {
      formData.append('image', image);
    }
    return this.http.post(`${baseUrl}/posts/create`, formData);
  }


}
