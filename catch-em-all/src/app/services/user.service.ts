import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-key.enum';
import { Pokemon } from '../models/pokeResponse';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _trainer?: Trainer;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() {
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
  }

  public inCollection(pokemonName: string): boolean {
    if (this._trainer) {
      return Boolean(this._trainer.pokemon.find((pokemon: string) => pokemon === pokemonName))
    }
    return false
  }

  public addToCollection(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon.push(pokemonName)
    }
  }

  public removeFromCollection(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon = this._trainer.pokemon.filter((pokemon: string) => pokemon !== pokemonName)
    }
  }
}
