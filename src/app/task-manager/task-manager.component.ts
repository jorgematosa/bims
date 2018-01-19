import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data.storage.service';
import { Subscription } from 'rxjs/Subscription';
import { Project } from './project.model';
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
  loggedUser: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit() {
    setTimeout(
      () => {
        this.loggedUser = this.authService.getLoggedUser();
        this.projects = this.tasksService.getProjectsByRole(this.loggedUser.role);
        this.projectSelectedIndex = this.tasksService.projectSelected;
        this.tasksService.selectProject(this.projectSelectedIndex);
        this.subscription = this.tasksService.startedEditingEvent.subscribe(
          (index: number) => {
            this.startedEditing = index;
          }
        );
        this.dataStorageService.getTasks();
      }, 1400
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  userHasAcess() {
    if (this.tasksService.roleExists(this.loggedUser.role)) {
      return true;
    } else {
      return false;
    }
  }
}
