//Imports
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchService } from 'src/app/services/catch.service';
import { UserService } from 'src/app/services/user.service';

//Import Icons
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

//Declaration
@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})


export class CatchButtonComponent implements OnInit {
  //Circle icon for the loading spinner
  faCircle = faCircleNotch

  //Initialiaze the loading variable as false.
  //The isCaught variable has false as default value, but is checked upon init
  //The pokemons name is provided by the pokemon item component
  public loading: boolean = false
  public isCaught: boolean = false
  @Input() pokemonName: string = ""

  //Inject the services
  constructor(
    private readonly catchService: CatchService,
    private readonly userService: UserService
  ) { }

  //Whenever the button is rendered, check if the pokemon is already captured.
  ngOnInit(): void {
    this.isCaught = this.userService.inCollection(this.pokemonName)
  }

  //Whenever the button is clicked, set loading to true and add the pokemon 
  //to the trainer's collection in the server and state.
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
