import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokeResponse';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  @Input() pokemons: Pokemon[] = []

  public picture: string = ""


}