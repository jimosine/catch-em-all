import { Component } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-key.enum';
import { Pokemon, RootObject } from 'src/app/models/pokeResponse';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-pokelog',
  templateUrl: './pokelog.component.html',
  styleUrls: ['./pokelog.component.css']
})
export class PokelogComponent {


  constructor(private readonly pokeapiService: PokeapiService) { }


  public get pokemons(): Pokemon[] {
    return this.pokeapiService.pokemons
  }

  public get loading(): boolean {
    return this.pokeapiService.loading
  }

  public get error(): string {
    return this.pokeapiService.error
  }

  ngOnInit(): void {
    this.pokeapiService.getPokemons()
  }
}
