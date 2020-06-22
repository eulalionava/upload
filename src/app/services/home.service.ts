import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public url:string;

  constructor(
    private _http:HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  //SERVICIO QUE OBTIENE TODOS LAS IMAGENES CARGADAS
  getImagenes(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    
    return this._http.get( this.url + 'getImagenes',{headers:headers});


  }

  updateImg(datos:any,token:any){
    let params = JSON.stringify({datos:datos,token:token});

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    headers = headers.set('token',token.token);
    
    return this._http.post(this.url + 'updateImage',params,{headers:headers});

  }




}