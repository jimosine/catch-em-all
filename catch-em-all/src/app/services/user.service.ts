//Imports
import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-key.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

//Declaration
@Injectable({
  providedIn: 'root',
})
export class UserService {

  //Initialize the internal trainer variable (of type Trainer)
  private _trainer?: Trainer;

  //Getter and Setter
  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  //Set the value of our interval variable by reading the Trainer object from localStorage
  constructor() {
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
  }

  //We can check three things for a user:
  //
  //Is a pokemon (provided by name) already in the trainer's string[] collection
  //Return true or false
  public inCollection(pokemonName: string): boolean {
    if (this._trainer) {
      return Boolean(this._trainer.pokemon.find((pokemon: string) => pokemon === pokemonName))
    }
    return false
  }

  //Add a pokemon (provided by name) to the trainer's string[] collection
  public addToCollection(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon.push(pokemonName)
    }
  }

  //Remove a pokemon (provided by name) from the trainer's string[] collection
  public removeFromCollection(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon = this._trainer.pokemon.filter((pokemon: string) => pokemon !== pokemonName)
    }
  }
}
