import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchService } from 'src/app/services/catch.service';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent {

  @Input() pokemonName: string = ""

  get loading(): boolean {
    return this.catchService.loading
  }

  constructor(private readonly catchService: CatchService) { }

  onCatchClick(): void {
    alert("clicked " + this.pokemonName)
    this.catchService.catchPokemon(this.pokemonName)
      .subscribe({
        next: (response: Trainer) => {
          console.log("NEXT", response);

        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message);

        }
      })
  }
}
