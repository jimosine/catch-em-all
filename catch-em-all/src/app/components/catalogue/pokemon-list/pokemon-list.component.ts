import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokeResponse';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  @Input() pokemons: Pokemon[] = [];

  public picture: string = '';
  p: number = 1;
}
