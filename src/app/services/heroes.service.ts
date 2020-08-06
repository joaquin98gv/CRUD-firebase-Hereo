import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { environment } from '../../environments/environment';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ){
    return this.http.post(`${environment.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  actualizarHeroe( heroe: HeroeModel ){

    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${environment.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes(){
    return this.http.get(`${environment.url}/heroes.json`)
    .pipe(
      map(this.crearArreglo),
      delay(1500)
    );
  }

  getHeroe(id: string){
    return this.http.get(`${environment.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: string){
    return this.http.delete(`${environment.url}/heroes/${id}.json`);
  }

  private crearArreglo( heroesObj: object ){

    const heroes: HeroeModel[] = [];
    if (heroesObj === null) { return []; }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }
}
