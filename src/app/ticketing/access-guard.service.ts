import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../auth/auth.service';
import { TasksService } from './../task-manager/tasks.service';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketingGuard implements CanActivate {
  subscription: Subscription;
  flag: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    this.subscription = this.authService.usersLoaded.subscribe(
      (flag: boolean) => {
        console.log(flag);
      }
    );
    if (this.flag) {
      this.router.navigate(['ticketing/ticketing-options']);
      return true;
    } else {
      this.router.navigate(['ticketing']);
    }
    return false;
  }

}
