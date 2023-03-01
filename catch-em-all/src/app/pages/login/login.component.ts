import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }
  ngOnInit(): void {
    if (this.userService.trainer) {
      this.router.navigateByUrl('/catalogue');
    }
  }

  handleLogin(): void {
    this.router.navigateByUrl('/catalogue');
  }
}
