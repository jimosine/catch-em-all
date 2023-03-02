//Imports
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

//Declaration
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})

export class LoginFormComponent {


  @Output() login: EventEmitter<void> = new EventEmitter();

  //Inject services
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService
  ) { }

  //Whenever the form is submitted, set the user input to the username constant
  public loginSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;

    //Try to login the user with the specified name
    this.loginService.login(username).subscribe({
      next: (trainer: Trainer) => {
        this.userService.trainer = trainer;
        this.login.emit();
      },
      error: () => { },
    });
  }

}