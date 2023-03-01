import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokeResponse';
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


  ngOnInit(): void {
    this.id = StorageUtil.sessionStorageRead<string>(this.pokemon.name)
    this.picture = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.id + ".png"
  }



}
