//Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

//Declaration
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  //Inject services
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  //Whenever a user is logged in and tries to return to the login page
  //Redirect to the catalogue page
  ngOnInit(): void {
    if (this.userService.trainer) {
      this.handleLogin()
    }
  }

  handleLogin(): void {
    this.router.navigateByUrl('/catalogue');
  }
}
