import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Imagen } from 'src/app/modelos/imagen';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  providers:[UsuarioService]
})
export class ImagenComponent implements OnInit {
  public imagen:Imagen;

  constructor(
    private _usuarioService:UsuarioService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.imagen = new Imagen(1,'');
  }

  //capturar datos del evento chance del boton de imagen 
  public filesToUpload:Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  onSubmit(form){
    this._usuarioService.subirArchivo(this.filesToUpload).subscribe(
      response=>{
        if(response['ok']){
          form.reset();
          if(! confirm("¿ Desea subir otro imagen ?")){
            this._router.navigate(['/home']);
          }
        }else{
          alert('Fue imposible guardar el archivo,favor de verificar !!');
          console.log(response);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
