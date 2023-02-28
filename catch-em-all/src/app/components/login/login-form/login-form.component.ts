import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {}

  ngOnInit(): void {}

  public loginSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;

    this.loginService.login(username).subscribe({
      next: (trainer: Trainer) => {
        this.router.navigateByUrl('/catalogue');
      },
      error: () => {},
    });
  }
}
