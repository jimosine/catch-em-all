import { Component } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent {

  get trainer(): Trainer | undefined {
    return this.userService.trainer
  }

  get pokemons(): string[] {
    if (this.userService.trainer) {
      return this.userService.trainer.pokemon
    }

    return []
  }

  constructor(
    private userService: UserService
  ) { }

}
