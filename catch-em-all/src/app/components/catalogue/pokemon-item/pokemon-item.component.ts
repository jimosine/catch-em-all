//Imports
import { Component, Input } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-key.enum';
import { Pokemon } from 'src/app/models/pokeResponse';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { StorageUtil } from 'src/app/utils/storage.util';

//Declaration
@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent {

  //A pokemon-item component takes a Pokemon object as input (provided by pokemon-list)
  @Input() pokemon!: Pokemon

  //We will need to get the pokemon's id and picture using some string manipulation
  public picture: string = ""
  public id: any

  //Inject the PokeAPI service
  constructor(private readonly pokeapiService: PokeapiService) { }

  //Whenever we render a pokemon item component, we want to search in the session storage
  //where we saved the entire Pokemon[] for the pokemon as provided by the pokemon-list.
  //This is because we don't store the url (needed to create id & picture) in the server.
  ngOnInit(): void {
    const pokeRay = StorageUtil.sessionStorageRead<Pokemon[]>(StorageKeys.Pokemon)
    if (pokeRay !== undefined) {
      //Find a pokemon by name, and return the url
      const match = pokeRay.find((pokemon: Pokemon) => pokemon.name === this.pokemon.name)?.url
      if (match !== undefined) {
        //Strip the id from the url
        this.id = match.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1)
      }
    }
    //Retreive the picture by combining the id with this github repo
    this.picture = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.id + ".png"
  }



}
