//These functions are responsible for storing and retrieving data in the local and session storage
//Local Storage is used to store a user, Session storage is used to store all pokemons so we don't
//need to fetch them from PokeAPI server every time. An additional session storage read function is 
//implemented which can't return undefined, which was a requirement in the pokeapi service.

export class StorageUtil {

  //Store data in the local storage by providing a key string (only strings allowed in local storage)
  //The value can be any object, but will be casted to a string
  public static storageSave<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  //Same for session storage
  public static sessionStorageSave<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  //Retrieve data stored in the local storage by providing a key, return the value
  //after transforming the value back to generic type
  public static storageRead<T>(key: string): T | undefined {
    const storedValue = localStorage.getItem(key);
    try {
      if (storedValue) {
        return JSON.parse(storedValue) as T;
      }
      return undefined;
    } catch (e) {
      localStorage.removeItem(key);
      return undefined;
    }
  }

  //Same for session storage
  public static sessionStorageRead<T>(key: string): T | undefined {
    const storedValue = sessionStorage.getItem(key);
    try {
      if (storedValue) {
        return JSON.parse(storedValue) as T;
      }
      return undefined;
    } catch (e) {
      sessionStorage.removeItem(key);
      return undefined;
    }
  }

  //Seems like we need this because it complains about "potentially" returning undefined
  //in the pokeapi service, even after checking !== undefined
  //wont give errors though, because we do this check beforehand
  public static pokeStorageRead(key: string) {
    const storedValue = sessionStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue)
    }
  }
}