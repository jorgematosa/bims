import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { InfoManagerService } from './info-manager.service';
import { Subscription } from 'rxjs';
import { Project } from '../shared/project.model';
import { ProjectsService } from '../shared/projects.service';
import { User } from './../auth/user.model';

@Component({
  selector: 'app-info-manager',
  templateUrl: './info-manager.component.html',
  styleUrls: ['./info-manager.component.css']
})
export class InfoManagerComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userLoadedSubscription: Subscription;
  projectSelected: Project;
  projects: Project[] = null;
  loggedUser: User = null;

  constructor(
    private authService: AuthService,
    private projectsService: ProjectsService,
    private infoManagerService: InfoManagerService) { }

  ngOnInit() {
    this.subscription = this.infoManagerService.projectSelected.subscribe(
      (project: Project) => {
        this.projectSelected = project;
      }
    );
    this.userLoadedSubscription = this.authService.usersLoaded.subscribe(
      (flag: boolean) => {
        if (flag === true) {
          this.loggedUser = this.authService.loggedUser;
          this.projects = this.projectsService.getProjects();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userLoadedSubscription.unsubscribe();
  }

  isLoaded() {
    if (this.loggedUser !== null && this.projects !== null ) {
      return true;
    } else {
      return false;
    }
  }

  selectProject(project: Project) {
    this.infoManagerService.projectSelected.next(project);
  }

}
