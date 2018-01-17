import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data.storage.service';
import { Subscription } from 'rxjs/Subscription';
import { Project } from './project.model';
import { TasksService } from './tasks.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit, OnDestroy {
  projects = [];
  projectSelectedIndex = -1;
  projectSelected = null;
  startedEditing = null;
  subscription: Subscription;
  loggedUser: User;

  constructor(private tasksService: TasksService, private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedUser();
    console.log(this.loggedUser);
    this.projects = this.tasksService.getProjectsByRole(this.loggedUser.role);
    console.log(this.projects);
    this.projectSelectedIndex = this.tasksService.projectSelected;
    this.tasksService.selectProject(this.projectSelectedIndex);
    this.subscription = this.tasksService.startedEditingEvent.subscribe(
      (index: number) => {
        this.startedEditing = index;
      }
    );
    this.dataStorageService.getTasks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectProject(project: Project, index: number) {
    this.projectSelected = project.name;
    this.projectSelectedIndex = index;
    this.tasksService.selectProject(index);
  }

  userHasAcess() {
    if (this.tasksService.roleExists(this.loggedUser.role)) {
      return true;
    } else {
      return false;
    }
  }
}
