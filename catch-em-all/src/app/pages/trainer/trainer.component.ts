import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokeResponse';
import { Trainer } from 'src/app/models/trainer.model';
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
      //console.log(pokemonNames);

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
    private userService: UserService
  ) { }

}
