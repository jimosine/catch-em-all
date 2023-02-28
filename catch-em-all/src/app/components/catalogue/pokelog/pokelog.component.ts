import { Component } from '@angular/core';
import { Pokemon, RootObject } from 'src/app/models/pokeResponse';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokelog',
  templateUrl: './pokelog.component.html',
  styleUrls: ['./pokelog.component.css']
})
export class PokelogComponent {


  constructor(private readonly pokeapiService: PokeapiService) { }


  // public get name(): string {
  //   return this.pokeapiService.pokemonName
  // }
  // public get id(): string {
  //   const url = this.pokeapiService.pokemonId
  //   return url
  // }
  // public get picture(): string {
  //   return this.pokeapiService.pokemonPic
  // }

  public get pokemons(): Pokemon[] {
    return this.pokeapiService.pokemons
  }


  ngOnInit(): void {
    // this.pokeapiService.getPokemon()
    this.pokeapiService.getPokemons()
  }


}
