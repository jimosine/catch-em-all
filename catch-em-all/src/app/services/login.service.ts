import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //Dependency Injection
  constructor(private readonly http: HttpClient) {}

  //Models, HttpClient, Observables, and RxJS Operators
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

  // Login

  // Check if user excist
  private checkTrainername(username: string): Observable<Trainer | undefined> {
    return this.http
      .get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(map((respons: Trainer[]) => respons.pop()));
  }
  // IF NOT user - Create a
  private createTrainer(username: string): Observable<Trainer> {
    const trainer = {
      username,
      pokemon: [],
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });
    // Post - Create items on the server
    return this.http.post<Trainer>(apiTrainers, trainer, { headers });
  }

  // IF User || CreatedUser - Store user
}
