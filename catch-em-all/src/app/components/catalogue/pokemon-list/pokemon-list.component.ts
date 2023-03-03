//Imports
import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokeResponse';

// Declaration
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})

export class PokemonListComponent {
  //Pokemon[] provided by pokelog component to loop over
  @Input() pokemons: Pokemon[] = [];

  //We will want to start our pagination at the first page
  p: number = 1;
}
