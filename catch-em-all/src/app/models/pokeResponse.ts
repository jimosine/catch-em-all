//Interface for the Pokemon object 
export interface Pokemon {
    name: string;
    url: string;
}

//Response of the PokeAPI
export interface RootObject {
    count: number;
    next: string;
    previous?: any;
    results: Pokemon[];
}

