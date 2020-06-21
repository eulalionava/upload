import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit {
  public usuario:Usuario;
  constructor(
    private _usuarioService:UsuarioService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.usuario = new Usuario(1,'','','','','','');
  }

  iniciarSesion(){
    this._usuarioService.getInciarSesion(this.usuario).subscribe(
      response=>{
        console.log(response);
        if( response['ok']){
          localStorage.setItem('datos_usuario',JSON.stringify(response['usuario']));
          this._router.navigate(['/home']);
        }else{
          alert(response['err']['message']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
