import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokeResponse';


@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent {

  @Input() pokemon!: Pokemon

  public picture: string = ""
  public id: string = ""


  ngOnInit(): void {
    this.picture = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1) + ".png"
    this.id = this.pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1)

  }

  handleCatch(): void {
    //console.log(this.pokemon.name + " Gevangen");

  }

}
