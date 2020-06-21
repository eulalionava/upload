import { Component, OnInit} from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { HomeService } from '../../services/home.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HomeService]
})
export class HomeComponent implements OnInit {
  public imagenes=[];

  public datos = {
    id:'',
    nombre:'',
    historia:''
  }
  constructor(
    private _homeService:HomeService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages(){
    this._homeService.getImagenes().subscribe(
      response=>{
        this.imagenes = response['imagenes']
        console.log(this.imagenes);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //CAMBIOS DE INFORMACION DE LA IMAGEN
  actualizarCambios(id){
    if( this.datos.nombre != "" && this.datos.historia != ""){
      this.datos.id = id;
      this._homeService.updateImg(this.datos).subscribe(
        response=>{
          if(response['ok']){
            this.getAllImages();
            Swal.fire("",response['message'],"success");
            this.datos.nombre = "";
            this.datos.historia = "";
          }else{
            Swal.fire("",response['message'],"error");
          }
          console.log(response);
        },
        error=>{
          console.log(<any>error);
        }
      )

    }else{
      Swal.fire("","Debes llenar todos los campos","error");
    }
  }

}
