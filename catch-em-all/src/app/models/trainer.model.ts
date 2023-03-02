//Interface for our Trainer objects. We only want to store
//the pokemon names that are in our collection on the server
//rather than the entire Pokemon object.
export interface Trainer {
  id: number;
  username: string;
  pokemon: string[];
}
