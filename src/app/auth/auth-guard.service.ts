import { ModulesService } from './../shared/module.service';
import { ProjectsService } from './../shared/projects.service';
import { TasksService } from './../task-manager/tasks.service';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private projectsService: ProjectsService,
    private modulesService: ModulesService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    if (
      this.authService.isAuthenticated() &&
      this.authService.loggedUser !== null &&
      this.projectsService.getProjects().length > 0 &&
      this.modulesService.getModules().length > 0
    ) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
    return false;
  }
}
