import { Project } from './../shared/project.model';
import { ProjectsService } from './../shared/projects.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data.storage.service';
import { Subscription } from 'rxjs/Subscription';
import { TasksService } from './tasks.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Data } from '@angular/router/src/config';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit, OnDestroy {
  projects = null;
  projectSelectedIndex = -1;
  projectSelected = null;
  startedEditing = null;
  subscription: Subscription;
  loggedUser: User = null;
  usersSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private projectsService: ProjectsService) { }

  ngOnInit() {
    this.usersSubscription = this.authService.usersLoaded.subscribe(
      (flag: boolean) => {
        if (flag === true) {
          this.loggedUser = this.authService.getLoggedUser();
          this.projects = this.projectsService.getProjects();
          this.projectSelectedIndex = this.tasksService.projectSelected;
          this.tasksService.selectProject(this.projectSelectedIndex);
          this.dataStorageService.getTasks();
        }
      }
    );

    this.subscription = this.tasksService.startedEditingEvent.subscribe(
      (index: number) => {
        this.startedEditing = index;
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

  isLoaded() {
    if (this.loggedUser !== null && this.projects !== null ) {
      return true;
    } else {
      return false;
    }
  }

  selectProject(project: Project, index: number) {
    this.projectSelected = project.name;
    this.projectSelectedIndex = index;
    this.tasksService.selectProject(index);

    // checking the route
    if (this.router.url === '/task-manager') {
      this.router.navigate(['tasks'], {relativeTo: this.route});
    }
  }

  hasAccess(project: Project) {
    if (project === null) {
      return false;
    } else if (project.roleAccess.indexOf(this.authService.loggedUser.role) > -1) {
      return true;
    } else {
      return false;
    }
  }

}
