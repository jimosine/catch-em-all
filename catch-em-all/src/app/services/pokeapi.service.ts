import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result, RootObject } from '../models/pokeResponse';
import { map } from 'rxjs';

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
          //console.log(response.results);
          this._pokemons = response.results
        },
        error: (error) => { console.error(error.message) }
      })

  }
}
