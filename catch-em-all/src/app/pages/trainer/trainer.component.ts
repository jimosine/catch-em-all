//Imports
import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokeResponse';
import { Trainer } from 'src/app/models/trainer.model';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';

//Declaration
@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})

export class TrainerComponent {

  //Save the Trainer object as we need the username to display
  get trainer(): Trainer | undefined {
    return this.userService.trainer
  }

  //We need to provide the pokemon-list component with a Pokemon[]
  //However, in the Trainer object, we only have a string[] stored
  //with the pokemon names. Therefore we need to contruct a new Pokemon[]
  //from the string[], but the url property doesn't need to be filled in
  //as we retrieve this later from the Pokemon[] in session storage.
  get pokemons(): Pokemon[] {
    if (this.userService.trainer) {
      const pokemonNames: string[] = this.userService.trainer.pokemon

      const pokeArray: Pokemon[] = pokemonNames.map(name => {
        return {
          name: name,
          url: ''
        }
      });
      return pokeArray
    }

    return []
  }

  //Inject services
  constructor(
    private userService: UserService,
    private pokeapiService: PokeapiService
  ) { }

  //If user deletes sessionStorage while on the Trainer page and refreshes Trainer page, get the pokemons again
  ngOnInit(): void {
    this.pokeapiService.getPokemons()
  }
}
