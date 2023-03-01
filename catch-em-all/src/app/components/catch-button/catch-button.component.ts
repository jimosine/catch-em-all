import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchService } from 'src/app/services/catch.service';
import { UserService } from 'src/app/services/user.service';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent implements OnInit {
  faCircle = faCircleNotch //circle icon for the loading spinner

  public loading: boolean = false
  public isCaught: boolean = false
  @Input() pokemonName: string = ""

  constructor(
    private readonly catchService: CatchService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.isCaught = this.userService.inCollection(this.pokemonName)
  }

  onCatchClick(): void {
    this.loading = true
    this.catchService.catchPokemon(this.pokemonName)
      .subscribe({
        next: (trainer: Trainer) => {
          this.loading = false
          this.isCaught = this.userService.inCollection(this.pokemonName)
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message);

        }
      })
  }
}
