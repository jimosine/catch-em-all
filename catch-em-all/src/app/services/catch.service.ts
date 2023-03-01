import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokeResponse';
import { Trainer } from '../models/trainer.model';
import { PokeapiService } from './pokeapi.service';
import { UserService } from './user.service';

const { apiKey, apiTrainers } = environment

@Injectable({
  providedIn: 'root'
})
export class CatchService {

  private _loading: boolean = false

  get loading(): boolean {
    return this._loading
  }

  constructor(
    private readonly http: HttpClient,
    private readonly pokeapiService: PokeapiService,
    private readonly userService: UserService
  ) { }

  public catchPokemon(pokemonName: string): Observable<Trainer> {

    if (!this.userService.trainer) {
      throw new Error("catchPokemon: There is no trainer")
    }

    const trainer: Trainer = this.userService.trainer
    const pokemon: Pokemon | undefined = this.pokeapiService.pokemonByName(pokemonName)

    if (!pokemon) {
      throw new Error("catchPokemon: No pokemon with name " + pokemonName)
    }

    if (this.userService.inCollection(pokemonName)) {
      throw new Error("catchPokemon: Pokemon already in collection " + pokemonName)
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    })

    this._loading = true

    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon, pokemon.name]
    }, { headers })
      .pipe(
        tap((updatedTrainer: Trainer) => {
          this.userService.trainer = updatedTrainer
        }),
        finalize(() => {
          this._loading = false
        })
      )
  }

}
