import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent {
  @Input() pokemon: any

  public picture: string = ""


  ngOnInit(): void {
    this.picture = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1) + ".png"


  }

  handleCatch(): void {
    console.log(this.pokemon.name + " Gevangen");

  }

}
