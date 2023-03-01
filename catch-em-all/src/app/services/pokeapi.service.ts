import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pokemon, RootObject } from '../models/pokeResponse';
import { finalize, map } from 'rxjs';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private readonly http: HttpClient) { }

  private _pokemons: Pokemon[] = []
  private _error: string = ''
  private _loading: boolean = false


  public get pokemons(): Pokemon[] {
    return this._pokemons
  }

  public get error(): string {
    return this._error
  }

  public get loading(): boolean {
    return this._loading
  }

  getPokemons(): void {

    this._loading = true
    this.http.get<RootObject>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5') //omschrijven om apiPokemon const gebruiken
      .pipe(
        map((response: RootObject) => response.results),

        finalize(() => {
          this._loading = false
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this._pokemons = response

          // store in session
          for (let pokemons of response) {
            const id = pokemons.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1)
            StorageUtil.sessionStorageSave<string>(pokemons!.name, id);
          }
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message
          console.error(error.message)
        }
      })
  }


  public pokemonByName(name: string): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.name === name)
  }








  // //wordt niet gebruikt
  // //maar even ander voorbeeld
  // getPokemon(): void {
  //   this.http.get<RootObject>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1')
  //     .pipe(
  //       map((response) => response.results[0])
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         this._pokemonName = response.name
  //         this._pokemonId = response.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1)
  //         this._pokemonPic = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this._pokemonId + ".png"
  //       },
  //       error: (error) => { console.error(error.message) }
  //     })
  // }

}
