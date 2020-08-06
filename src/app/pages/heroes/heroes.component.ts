import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargandoData = true;
  constructor(private heroesS: HeroesService) { }

  ngOnInit(): void {
      this.cargandoData = true;
      this.heroesS.getHeroes().subscribe(resp => {
      this.heroes = resp;
      this.cargandoData = false;
    });
  }

  borrarHeroe(heroe: HeroeModel, i: number){

    Swal.fire({
      title: 'Confirmacion de eliminacion!',
      text: `Esta seguro que quiere borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value ) {
        this.heroesS.borrarHeroe(heroe.id).subscribe();
        this.heroes.splice(i, 1);
      }
    });
  }

}
