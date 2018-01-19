import { AuthService } from './../auth/auth.service';
import { TasksService } from './../task-manager/tasks.service';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class LoadingGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private taskService: TasksService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    if (this.authService.isAuthenticated() && this.authService.loggedUser !== null) {
      return true;
    } else {
      this.router.navigate(['/']); // colocar uma animação de loading
    }
    return false;
  }
}
