//Imports 
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pokemon, RootObject } from '../models/pokeResponse';
import { finalize, map } from 'rxjs';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-key.enum';
import { environment } from 'src/environments/environment';

//Set the API url from environment file
const { apiPokemon } = environment;

//Decorator
@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  //Inject service
  constructor(private readonly http: HttpClient) { }

  //Initialize internal variables (prefixed with _ so we don't get mixed up with getters)
  private _pokemons: Pokemon[] = []
  private _error: string = ''
  private _loading: boolean = false


  //Getters
  public get pokemons(): Pokemon[] {
    return this._pokemons
  }

  public get error(): string {
    return this._error
  }

  public get loading(): boolean {
    return this._loading
  }

  //This function will read/update the Pokemon[] used to create pokemon items
  getPokemons(): void {

    //If not in already sessionStorage under the correct key (as set in StorageKeys), then get from pokeAPI
    if (StorageUtil.sessionStorageRead<Pokemon[]>(StorageKeys.Pokemon) === undefined) {

      //While retrieving from the server, set loading to true
      this._loading = true

      //Does a HTTP get request to the pokemon api, which returns a RootObject.
      //We are only interestede in it's .results property, which is the Pokemon object
      this.http.get<RootObject>(apiPokemon)
        .pipe(
          map((response: RootObject) => response.results),

          //When this request finishes, set loading to false
          finalize(() => {
            this._loading = false
          })
        )
        //Update the local Pokemon[] with the http response
        .subscribe({
          next: (response) => {
            this._pokemons = response

            // Store all pokemon as Pokemon[] in session storage
            StorageUtil.sessionStorageSave<Pokemon[]>(StorageKeys.Pokemon, response!);

          },

          //Error handling
          error: (error: HttpErrorResponse) => {
            this._error = error.message
            console.error(error.message)
          }
        })
    }

    //Otherwise if already in sessionStorage, retrieve from here.
    //This is so we don't have to do a HTTP request everytime we load pages.
    //Even after checking before that the value !== undefined,
    //it still does not let us use normal sessionRead, so pokeStorageRead
    //is specific for this.
    else {
      this._pokemons = StorageUtil.pokeStorageRead(StorageKeys.Pokemon)
    }

  }

  //Look in the current state of our Pokemon[] and return the Pokemon that
  //matches the the provided name parameter
  public pokemonByName(name: string): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.name === name)
  }

}
