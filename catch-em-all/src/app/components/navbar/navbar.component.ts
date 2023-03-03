//Imports
import { Component } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { UserService } from 'src/app/services/user.service';

//Declaration
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  //We need to check if a user is logged in, to display certain links on the navbar
  get trainer(): Trainer | undefined {
    return this.userService.trainer
  }

  //Inject service to retrieve trainer
  constructor(private readonly userService: UserService) { }

}
