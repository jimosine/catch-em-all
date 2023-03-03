//Imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

//Set API credentials from environments files
const { apiTrainers, apiKey } = environment;

//Decorator
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  //Inject services
  constructor(private readonly http: HttpClient) { }

  //Function that uses two private funcions to checked if 
  //a user already exists with the provided string or create
  //a new user with this parameter. Returns an Observable
  //of type Trainer
  public login(username: string): Observable<Trainer> {
    return this.checkTrainername(username).pipe(
      switchMap((trainer: Trainer | undefined) => {
        if (trainer === undefined) {
          return this.createTrainer(username);
        }
        return of(trainer);
      })
    );
  }


  // Check if user with provided name exists by doing a HTTP get request.
  //Returns either the user as an Observable of type Trainer or undefined
  //if the user isn't stored on the server
  private checkTrainername(username: string): Observable<Trainer | undefined> {
    return this.http
      .get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(
        map((response: Trainer[]) => response.pop())
      )
  }

  // Create a new Trainer object, only set the username to the input.
  private createTrainer(username: string): Observable<Trainer> {
    const trainer = {
      username,
      pokemon: [],
    };

    //Create headers for the POST request, api-key was already set in environment files
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });
    // Post - Create Trainer on the server
    return this.http.post<Trainer>(apiTrainers, trainer, { headers });
  }
}
