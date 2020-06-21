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

  updateImg(datos:any){
    let params = JSON.stringify({datos:datos});

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    
    return this._http.put(this.url + 'updateImage',params,{headers:headers});

  }




}