import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  //Inject Service and the Router
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // When there is a user in de localStorage you may go to the other pages in the application
    if (this.userService.trainer) {
      return true;
      // When you don't have logged in or you dont have a user you go to the loginPage
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
