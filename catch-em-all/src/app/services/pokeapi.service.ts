import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result, RootObject } from '../models/pokeResponse';
import { map, Observable } from 'rxjs';
import { Trainer } from '../models/trainer.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private readonly http: HttpClient) { }

  private _pokemonName: string = ""
  private _pokemonId: string = ""
  private _pokemonPic: string = ""
  private _pokemons: Result[] = []

  public get pokemonName(): string {
    return this._pokemonName
  }

  public get pokemonId(): string {
    return this._pokemonId
  }
  public get pokemonPic(): string {
    return this._pokemonPic
  }
  public get pokemons(): Result[] {
    return this._pokemons
  }



  //wordt niet gebruikt
  //maar even ander voorbeeld
  getPokemon(): void {
    this.http.get<RootObject>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1')
      .pipe(
        map((response) => response.results[0])
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this._pokemonName = response.name
          this._pokemonId = response.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1)
          this._pokemonPic = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this._pokemonId + ".png"
        },
        error: (error) => { console.error(error.message) }
      })

  }

  getPokemons(): void {
    this.http.get<RootObject>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5')
      .subscribe({
        next: (response) => {
          console.log(response.results);
          this._pokemons = response.results
        },
        error: (error) => { console.error(error.message) }
      })

  }

  catchPokemon(pokemon: string) {
    console.log(pokemon);

  }

  // private pokeman: string[] | undefined


  // catchPokemon(pokemon: string): Observable<Trainer> {
  //   const url = 'https://jb-lost-in-translation-api-production.up.railway.app/trainers/3'
  //   let pokemannen = this.http.get<Trainer>(url).subscribe({
  //     next: (response) => {
  //       //console.log(response.pokemon);
  //       this.pokeman = response.pokemon
  //       this.pokeman.push(pokemon)
  //       //console.log(this.pokeman);
  //       response.pokemon = this.pokeman
  //       //console.log(response);
  //       return response.pokemon
  //     },
  //     error: (error) => { console.error(error.message) }
  //   })
  //   //return this.http.put<string>(url, pokemon, httpOptions)
  //   const trainer = {
  //     id: 3,
  //     username: 'jim',
  //     pokemon: pokemannen,
  //   };

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'x-api-key': apiKey,
  //   });
  //   // Post - Create items on the server
  //   return this.http.put<Trainer>(apiTrainers, trainer, { headers });
  // }

}
