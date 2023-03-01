export class StorageUtil {
  public static storageSave<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static sessionStorageSave<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

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