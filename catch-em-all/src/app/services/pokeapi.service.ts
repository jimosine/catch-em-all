import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pokemon, RootObject } from '../models/pokeResponse';
import { finalize, map } from 'rxjs';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-key.enum';

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

    //If not in localStorage, then get from pokeAPI
    if (StorageUtil.sessionStorageRead<Pokemon[]>(StorageKeys.Pokemon) === undefined) {

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
            this._pokemons = response

            // store all pokemon as Pokemon[] in session storage
            StorageUtil.sessionStorageSave<Pokemon[]>(StorageKeys.Pokemon, response!);

          },
          error: (error: HttpErrorResponse) => {
            this._error = error.message
            console.error(error.message)
          }
        })
    }

    //Otherwise retrieve the pokemon from sessionStorage
    //even after checking before that the value !== undefined,
    //it still does let us use normal sessionRead, so pokeStorage
    //is specific for this
    else {
      this._pokemons = StorageUtil.pokeStorageRead(StorageKeys.Pokemon)
    }

  }


  public pokemonByName(name: string): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.name === name)
  }

}
