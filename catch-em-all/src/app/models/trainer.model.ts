import { Pokemon } from "./pokeResponse";

export interface Trainer {
  id: number;
  username: string;
  pokemon: string[];
}
