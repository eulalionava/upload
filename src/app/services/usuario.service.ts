import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url:string;

  constructor(
    private _http:HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  //SERVICIO QUE OBTIENE LA SESION DE ACCESO
  getInciarSesion(datos){
    let params = JSON.stringify({datos:datos});
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    
    return this._http.post( this.url + 'login',params,{headers:headers});

  }

  //SERVICIO PARA SUBIR UN ARCHIVO
  subirArchivo(files:Array<File>){
    const formData = new FormData();

    for(var i = 0; i<files.length; i++){
      formData.append('archivo',files[i],files[i].name);
    }
    
    return this._http.put(this.url + 'subeIMG',formData);

  }

  //  AUTENTICACION DE USUARIO
  Auth(){
    if(localStorage.getItem('datos_usuario')){
      return true;
    }else{
      return false;
    }
  }


}