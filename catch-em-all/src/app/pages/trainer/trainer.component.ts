import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokeResponse';
import { Trainer } from 'src/app/models/trainer.model';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent {

  get trainer(): Trainer | undefined {
    return this.userService.trainer
  }

  get pokemons(): Pokemon[] {
    if (this.userService.trainer) {
      const pokemonNames: string[] = this.userService.trainer.pokemon

      const pokemonArray: Pokemon[] = pokemonNames.map(name => {
        return {
          name: name,
          url: ''
        }
      });
      return pokemonArray
    }

    return []
  }

  constructor(
    private userService: UserService,
    private pokeapiService: PokeapiService
  ) { }


  ngOnInit(): void {
    //If user deletes sessionStorage and refreshed Trainer page, get the pokemons again
    this.pokeapiService.getPokemons()
  }
}
