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


  ngOnInit(): void {
    //this.picture = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1) + ".png"


  }

  handleCatch(): void {
    //console.log(this.pokemon.name + " Gevangen");

  }

}
