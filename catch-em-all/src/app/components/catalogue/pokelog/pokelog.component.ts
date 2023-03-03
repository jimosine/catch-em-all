//Imports
import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokeResponse';
import { PokeapiService } from 'src/app/services/pokeapi.service';

//Declaration
@Component({
  selector: 'app-pokelog',
  templateUrl: './pokelog.component.html',
  styleUrls: ['./pokelog.component.css']
})
export class PokelogComponent {


  //Inject with the PokeAPI service to get all pokemons.
  constructor(private readonly pokeapiService: PokeapiService) { }

  //Store the pokemons (as a Pokemon[]) in the pokemons const by using the service getter.
  public get pokemons(): Pokemon[] {
    return this.pokeapiService.pokemons
  }

  //Boolean const to display a loading message when the app or API is loading pokemon.
  public get loading(): boolean {
    return this.pokeapiService.loading
  }

  public get error(): string {
    return this.pokeapiService.error
  }

  //Whenever a pokélog component is rendered, get the pokémon from storage or our server
  ngOnInit(): void {
    this.pokeapiService.getPokemons()
  }
}
