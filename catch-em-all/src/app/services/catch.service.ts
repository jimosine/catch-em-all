//Imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokeResponse';
import { Trainer } from '../models/trainer.model';
import { PokeapiService } from './pokeapi.service';
import { UserService } from './user.service';

//Set API credentials (url & key) from our environment file
const { apiKey, apiTrainers } = environment

//Decorator
@Injectable({
  providedIn: 'root'
})
export class CatchService {

  //Inject services
  constructor(
    private readonly http: HttpClient,
    private readonly pokeapiService: PokeapiService,
    private readonly userService: UserService
  ) { }

  //This service only implements one public function, catchPokemon()
  //This takes a pokemon's name as a string as input, and returns and
  //Observable of type Trainer.
  public catchPokemon(pokemonName: string): Observable<Trainer> {

    //First check if Trainer exists, so we make sure trainer != undefined
    if (!this.userService.trainer) {
      throw new Error("catchPokemon: There is no trainer")
    }
    //Get the current user and search in the Pokemon[] stored in storage for a match with the provided pokemon name
    const trainer: Trainer = this.userService.trainer
    const pokemon: Pokemon | undefined = this.pokeapiService.pokemonByName(pokemonName)

    //We can't catch pokemons that don't exist
    if (!pokemon) {
      throw new Error("catchPokemon: No pokemon with name " + pokemonName)
    }

    //Check if the pokemon is already caught. If yes, we actually want to remove it from the user's collection.
    //Otherwise, we will add it
    if (this.userService.inCollection(pokemonName)) {
      this.userService.removeFromCollection(pokemonName)
    } else {
      this.userService.addToCollection(pokemonName)
    }

    //Create header for http request
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    })


    //Finally, do a patch request for the current user and spread in the users's pokemon property.
    //After storing it on the server, also update the state.
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
