import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
      this.userService.removeFromCollection(pokemonName)
    } else {
      this.userService.addToCollection(pokemonName)
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    })


    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon]
    }, { headers })
      .pipe(
        tap((updatedTrainer: Trainer) => {
          this.userService.trainer = updatedTrainer
        })
      )
  }

}
