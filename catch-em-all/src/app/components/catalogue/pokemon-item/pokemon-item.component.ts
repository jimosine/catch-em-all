import { Component, Input } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-key.enum';
import { Pokemon } from 'src/app/models/pokeResponse';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { StorageUtil } from 'src/app/utils/storage.util';


@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent {

  @Input() pokemon!: Pokemon

  public picture: string = ""
  public id: any

  constructor(private readonly pokeapiService: PokeapiService) { }

  ngOnInit(): void {

    //TO RETRIEVE THE ID AND URL FROM SESSION
    //REFACTOR INTO A SERVICE

    const pokeRay = StorageUtil.sessionStorageRead<Pokemon[]>(StorageKeys.Pokemon)
    if (pokeRay !== undefined) {
      const match = pokeRay.find((pokemon: Pokemon) => pokemon.name === this.pokemon.name)?.url
      if (match !== undefined) {
        this.id = match.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1)
      }
    }
    this.picture = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.id + ".png"
  }



}
