import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  constructor( private heroeS: HeroesService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'crear') {
      this.heroeS.getHeroe(id).subscribe((resp: HeroeModel) => {
        console.log(resp);
        if (resp == null) { this.router.navigateByUrl(''); }
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }


  guardar( form: NgForm ){

    if (form.invalid){
      console.log('Formulario no valido');
      return false;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;
    let text: string;

    if (this.heroe.id) {
      peticion = this.heroeS.actualizarHeroe(this.heroe);
      text = 'Se actualizo correctamente';
    } else {
      peticion = this.heroeS.crearHeroe(this.heroe);
      text = 'Se creo correctamente';
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text,
        icon: 'success'
      });
    });

  }

}
